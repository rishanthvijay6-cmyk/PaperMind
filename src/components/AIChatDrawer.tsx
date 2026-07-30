import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  FileText, 
  HelpCircle, 
  ArrowRight,
  RotateCw
} from 'lucide-react';
import { VaultDocument } from '../types';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  documents: VaultDocument[];
  onSelectDocument: (doc: VaultDocument) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  matchingDocIds?: string[];
  timestamp: string;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  documents,
  onSelectDocument,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: "Hello! I am **PaperMind Assistant**. Ask me any question about your receipts, warranties, GST numbers, insurance policies, or spending trends across your vault.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'When does my AC warranty expire?',
    'How much did I spend on electronics this year?',
    'Show all invoices above ₹50,000.',
    'Which purchases are still under warranty?',
    'Show all hotel bills from Bengaluru.',
    'Find my insurance policy.',
    'How much GST did I pay this financial year?',
    'Find all invoices from Amazon.',
    'How much did I spend on medical expenses?',
    'Which subscriptions renew next month?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, documents }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.answer,
          matchingDocIds: data.matchingDocumentIds || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error('AI Chat Error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-[#111114] border-l border-slate-200 dark:border-[#1E1E24] shadow-2xl flex flex-col transition-all">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-blue-600 text-white">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">PaperMind Natural Search &amp; Chat</h3>
            <p className="text-[11px] text-blue-100">Powered by Gemini 3.6 Flash</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Suggested Quick Queries */}
      <div className="p-3 bg-gray-50 dark:bg-[#15161A] border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
        <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
          Suggested Queries:
        </span>
        <div className="flex gap-1.5 pb-1">
          {quickPrompts.slice(0, 5).map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300 text-xs font-medium whitespace-nowrap hover:border-blue-500 hover:text-blue-600 transition shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`h-8 w-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
              }`}
            >
              {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={`space-y-2 max-w-[80%]`}>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-gray-100 dark:bg-[#1C1D22] text-gray-900 dark:text-slate-100 rounded-tl-none border border-gray-200 dark:border-white/10'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.text}</div>
              </div>

              {/* Matching Document Chips */}
              {msg.matchingDocIds && msg.matchingDocIds.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-gray-500 dark:text-slate-400">
                    Matching Vault Documents ({msg.matchingDocIds.length}):
                  </span>
                  <div className="flex flex-col gap-1">
                    {msg.matchingDocIds.map((docId) => {
                      const doc = documents.find((d) => d.id === docId);
                      if (!doc) return null;
                      return (
                        <button
                          key={docId}
                          onClick={() => onSelectDocument(doc)}
                          className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 hover:border-blue-500 text-left text-xs transition"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                            <span className="font-mono text-[11px] truncate font-semibold text-gray-800 dark:text-slate-200">
                              {doc.autoRenamedFileName}
                            </span>
                          </div>
                          <span className="font-bold text-blue-600 text-[11px] ml-2">
                            {doc.currency}{doc.totalAmount.toLocaleString()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <span className="text-[10px] text-gray-400 block px-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <RotateCw className="h-4 w-4 animate-spin" />
            <span>PaperMind Assistant is searching your documents...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111114]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask anything about your vault..."
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1C1D22] px-3.5 py-2.5 text-xs text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition shadow-xs"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
