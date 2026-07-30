import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  Zap, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  BarChart2, 
  Clock, 
  Cpu, 
  Search, 
  ChevronRight, 
  Layers, 
  Star, 
  Check, 
  HelpCircle,
  FolderSync,
  Bot
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenUpload: () => void;
  onOpenPricing: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onOpenUpload,
  onOpenPricing,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [demoState, setDemoState] = useState<'idle' | 'processing' | 'done'>('idle');

  const handleRunDemo = () => {
    setDemoState('processing');
    setTimeout(() => {
      setDemoState('done');
    }, 1800);
  };

  const features = [
    {
      icon: <Cpu className="h-6 w-6 text-[#4F8CFF]" />,
      title: 'AI Document Understanding',
      description: 'Automatically extracts over 20 structured fields including Merchant, GST, Line Items, Amounts, Dates & Serial numbers with confidence scoring.',
    },
    {
      icon: <FolderSync className="h-6 w-6 text-emerald-400" />,
      title: 'Auto Folderless Organization',
      description: 'Zero manual sorting. Instantly categorizes, tags, and renames files using deterministic patterns like 2026-07-18_Dell_Laptop_Invoice_₹68999.pdf.',
    },
    {
      icon: <Bot className="h-6 w-6 text-purple-400" />,
      title: 'Gemini RAG Natural Language Chat',
      description: 'Ask complex financial queries like "Which warranty expires in 60 days?" or "Show all Amazon purchases above ₹10,000" in plain conversational English.',
    },
    {
      icon: <Clock className="h-6 w-6 text-amber-400" />,
      title: 'Smart Reminder & Expiry Engine',
      description: 'Proactively alerts you before warranty, vehicle insurance, passport, and AMC renewals lapse with custom lead times.',
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-cyan-400" />,
      title: 'Automated Expense Analytics',
      description: 'Real-time category spend breakdowns, GST input tax credit (ITC) tracking, and executive AI summaries in a single pane.',
    },
    {
      icon: <Shield className="h-6 w-6 text-rose-400" />,
      title: 'Bank-Grade AES-256 Vault Security',
      description: 'SOC2 compliant structure, encrypted storage at rest, strict JWT access control, and real-time immutable audit trail logs.',
    },
  ];

  const testimonials = [
    {
      name: 'Vikram Sethi',
      role: 'Chief Financial Officer at TechNova',
      comment: 'PaperMind saved our accounting team over 40 hours a month. Invoices are parsed, GST numbers verified, and categorizations applied seamlessly.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      name: 'Ananya Sharma',
      role: 'Founder & CEO, ScaleCraft',
      comment: 'The natural language chat is pure magic. Asking "Show all medical claim bills from last quarter" returns exact highlighted PDFs in milliseconds.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      name: 'Rohit Verma',
      role: 'Freelance Architect & Consultant',
      comment: 'Never missed a laptop warranty or vehicle insurance deadline since using PaperMind. The auto-renaming structure alone is worth the subscription.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: 'How does PaperMind automatically rename and organize my documents?',
      a: 'PaperMind uses multimodal Gemini AI to read document images or PDFs, extract key fields like purchase date, merchant name, product, and total price, and then generates a standardized filename like YYYY-MM-DD_Vendor_Item_Amount.pdf.',
    },
    {
      q: 'Is my financial data secure and private?',
      a: 'Yes. PaperMind enforces AES-256 encryption for documents in transit and at rest. Your data is isolated and never used for public LLM training without explicit consent.',
    },
    {
      q: 'Can I export parsed data to Excel, CSV, or accounting tools?',
      a: 'Absolutely. You can export filtered views or your entire vault metadata into CSV/Excel format with 1-click for seamless GST filing and tax reporting.',
    },
    {
      q: 'What document formats are supported?',
      a: 'PaperMind supports high-resolution JPEGs, PNGs, screenshots, camera photos, and multi-page PDFs up to 50MB per file.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white selection:bg-[#4F8CFF] selection:text-white space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow backdrop blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#4F8CFF]/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[200px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-xs font-semibold text-[#4F8CFF] animate-fadeIn">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>PaperMind • Autonomous AI Document Vault &amp; Expense Engine</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
        >
          Think Less. <br />
          <span className="bg-gradient-to-r from-white via-[#4F8CFF] to-purple-400 bg-clip-text text-transparent">
            Find Faster.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          PaperMind exists to eliminate the stress of finding important documents. Instead of manually organizing folders, simply upload your files—PaperMind understands everything automatically using AI.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-2xl bg-[#4F8CFF] hover:bg-[#3b76e6] text-white font-bold text-sm shadow-xl shadow-[#4F8CFF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>Launch Vault App</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            onClick={onOpenPricing}
            className="px-8 py-4 rounded-2xl bg-[#1C1D22] border border-white/10 hover:border-white/20 text-white font-bold text-sm hover:bg-[#25262c] transition-all flex items-center gap-2"
          >
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Explore Pricing &amp; Enterprise</span>
          </button>
        </motion.div>

        {/* Security badges bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-emerald-400" /> SOC2 Type II Certified</span>
          <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-[#4F8CFF]" /> AES-256 Vault Encryption</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-purple-400" /> 99.8% Extraction Accuracy</span>
        </div>

        {/* INTERACTIVE DEMO PREVIEW CARD */}
        <div className="mt-14 max-w-4xl mx-auto bg-[#15161A] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl glass-panel relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">live_ocr_engine_demo.ts</span>
            </div>
            <span className="text-xs text-[#4F8CFF] font-semibold bg-[#4F8CFF]/10 px-2.5 py-1 rounded-full border border-[#4F8CFF]/20">
              Interactive Preview
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-left">
            <div className="border border-dashed border-white/20 hover:border-[#4F8CFF] bg-[#1C1D22] rounded-2xl p-6 text-center space-y-4 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#4F8CFF]/10 text-[#4F8CFF] flex items-center justify-center mx-auto">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">IMG_9284_Dell_Invoice.pdf</p>
                <p className="text-[11px] text-slate-400">Sample Laptop Invoice • 2.8 MB</p>
              </div>
              <button
                onClick={handleRunDemo}
                disabled={demoState === 'processing'}
                className="w-full py-2.5 bg-[#4F8CFF] text-white rounded-xl text-xs font-bold hover:bg-[#3b76e6] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {demoState === 'processing' ? (
                  <>
                    <Sparkles className="h-3.5 w-3.5 animate-spin" />
                    <span>Extracting Metadata &amp; GST...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5" />
                    <span>Test AI Extraction</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-[#1C1D22] rounded-2xl p-5 border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400 text-[11px] border-b border-white/5 pb-2">
                <span>AI EXTRACTION RESULT</span>
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> 99.4% Confidence</span>
              </div>
              
              <div className="space-y-1.5">
                <p className="flex justify-between"><span className="text-slate-400">Auto Renamed:</span> <span className="text-[#4F8CFF] truncate max-w-[180px]">2026-07-18_Dell_Laptop_Invoice_₹68999.pdf</span></p>
                <p className="flex justify-between"><span className="text-slate-400">Merchant:</span> <span className="text-white">Dell Technologies</span></p>
                <p className="flex justify-between"><span className="text-slate-400">Category:</span> <span className="text-purple-400">Electronics</span></p>
                <p className="flex justify-between"><span className="text-slate-400">Total Amount:</span> <span className="text-emerald-400 font-bold">₹68,999</span></p>
                <p className="flex justify-between"><span className="text-slate-400">Warranty Expiry:</span> <span className="text-amber-400">2028-07-18 (2 Years)</span></p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* FEATURES GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#4F8CFF]">Engineered for Modern SaaS</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything You Need in an AI Document Engine
          </p>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Built from the ground up for individuals, business owners, and accounting professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-[#1C1D22] border border-white/10 hover:border-[#4F8CFF]/50 p-6 rounded-2xl transition-all space-y-4 group"
            >
              <div className="p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#4F8CFF] transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Loved By Finance Teams</h2>
          <p className="text-3xl font-extrabold text-white">Trusted by 10,000+ Smart Users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-[#15161A] border border-white/10 rounded-2xl p-6 space-y-4 text-left">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">"{t.comment}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                <div>
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400">Got Questions?</h2>
          <p className="text-3xl font-extrabold text-white">Frequently Asked Questions</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#1C1D22] border border-white/10 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-white flex justify-between items-center hover:text-[#4F8CFF] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${activeFaq === idx ? 'rotate-90 text-[#4F8CFF]' : 'text-slate-500'}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#1C1D22] via-[#15161A] to-[#1C1D22] border border-[#4F8CFF]/30 rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden glow-subtle">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#4F8CFF]/20 rounded-full blur-2xl" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Upgrade Your Document Workflow?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Experience zero-effort document organization, automated warranty alerts, and instant Gemini AI search today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="px-8 py-3.5 bg-[#4F8CFF] hover:bg-[#3b76e6] text-white rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Launch App Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 pt-10 text-center text-xs text-slate-500 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#4F8CFF] flex items-center justify-center text-white font-black text-xs">P</div>
            <span className="font-bold text-white text-sm">PaperMind</span>
            <span className="text-[10px] text-slate-400">© 2026 PaperMind Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-slate-400">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-white transition-colors">SOC2 Compliance</a>
            <a href="#docs" className="hover:text-white transition-colors">API Docs</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
