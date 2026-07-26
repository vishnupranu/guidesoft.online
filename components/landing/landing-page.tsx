'use client';

import React, { useState } from 'react';
import { PricingCardSection } from '@/components/billing/pricing-card';
import { AUTO_CONNECTED_MODELS } from '@/lib/ai/llm-branding';
import { 
  Sparkles, 
  Cpu, 
  Code, 
  Layers, 
  ShieldCheck, 
  Download, 
  Smartphone, 
  Monitor, 
  Zap, 
  Bot, 
  Send,
  Lock,
  Github
} from 'lucide-react';

export function LandingPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (res.ok) {
        setContactStatus('Inquiry submitted to admin@guidesoft.online successfully!');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setContactStatus(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setContactStatus(`Submission error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* SECTION 1: HERO */}
      <section className="relative pt-24 pb-16 px-4 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
          <Sparkles className="w-4 h-4" /> Powered by GuideSoft AI (Ollama + LLaMA)
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none max-w-4xl mx-auto">
          Next-Gen AI Platform for <span className="text-primary underline decoration-primary/30">Developers & Agencies</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
          Enterprise AI model orchestration, automated coding, OpenClaw & Claude skills, and secure RBAC restricted to verified subscribers.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" /> Start Membership
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-lg hover:bg-muted border border-border transition-all flex items-center justify-center gap-2"
          >
            <Code className="w-5 h-5 text-primary" /> View Live Generations
          </a>
        </div>
      </section>

      {/* SECTION 2: AI MODELS & BRAND ORCHESTRATION */}
      <section id="models" className="py-16 px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground">Auto-Connected Brand Models</h2>
            <p className="text-muted-foreground mt-2">Combined Ollama and LLaMA hybrid backend engine with pre-integrated agents.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUTO_CONNECTED_MODELS.map((model) => (
              <div key={model.id} className="bg-card border border-border p-6 rounded-2xl relative shadow-sm">
                {model.isDefault && (
                  <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    Default Brand
                  </span>
                )}
                <Cpu className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground">{model.name}</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{model.description}</p>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">{model.provider}</span>
                  <span className="text-emerald-500 font-bold uppercase text-[10px]">● {model.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: LIVE GENERATION PREVIEW (CHAT, CODING, WEBDEV, IMAGES) */}
      <section id="demo" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Dynamic Workspace
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">Coding, WebDev & Prompting Studio</h2>
          <p className="text-muted-foreground mt-2">Interactive ChatGPT-like generation workspace built for high-performance software engineering.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-muted/80 px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono font-bold text-muted-foreground">guidesoft-studio-v2.0</span>
            </div>
            <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">
              Super Admin: pranu21m@gmail.com
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center shrink-0">
                U
              </div>
              <div className="bg-muted p-4 rounded-2xl text-sm max-w-2xl border border-border">
                Build a responsive full-stack dashboard component with White & Orangered styling, FastAPI backend, and GPay checkout integration.
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">
                GS
              </div>
              <div className="bg-primary/5 p-4 rounded-2xl text-sm max-w-3xl border border-primary/20 space-y-3">
                <div className="text-xs font-bold text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> GuideSoft AI Hybrid Model Generation
                </div>
                <p>Generated full-stack TypeScript & FastAPI architecture payload:</p>
                <pre className="bg-black/90 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`// FastAPI Backend Endpoint (/api/v1/chat/completions)
@app.post("/api/v1/chat/completions")
def generate_chat(request: ChatRequest):
    return {"status": "success", "brand": "GuideSoft AI"}
`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SKILLS & OPENCLAW / CLAUDE CONNECTORS */}
      <section className="py-16 px-4 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border p-6 rounded-2xl">
            <Bot className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold">OpenClaw Engine</h3>
            <p className="text-xs text-muted-foreground mt-2">
              Autonomous task breakdown and plugin management for web scraping, file parsing, and Git repository sync.
            </p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl">
            <Layers className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold">Claude Skills Orchestrator</h3>
            <p className="text-xs text-muted-foreground mt-2">
              Deep reasoning system prompts and skill triggers pre-configured in backend dashboard settings.
            </p>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold">Strict Role Access Control</h3>
            <p className="text-xs text-muted-foreground mt-2">
              Admin rights strictly assigned to <span className="font-bold text-primary">pranu21m@gmail.com</span>. Non-paid user cloning blocked.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING */}
      <section id="pricing" className="py-16">
        <PricingCardSection />
      </section>

      {/* SECTION 6: CONTACT ADMIN & SUPPORT FORM */}
      <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-foreground">Contact Super Admin</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Submissions are delivered directly to <span className="font-bold text-primary">admin@guidesoft.online</span>
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-border bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="you@domain.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-border bg-background text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Subject</label>
              <input
                type="text"
                placeholder="Enterprise Plan / API Inquiry"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-border bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your inquiry or requirement..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-border bg-background text-foreground"
              />
            </div>

            {contactStatus && (
              <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs font-medium">
                {contactStatus}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> {isSubmitting ? 'Sending...' : 'Send Message to admin@guidesoft.online'}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER & MOBILE APP DOWNLOAD BADGES */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> GuideSoft AI Platform
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} GuideSoft Online. All Rights Reserved. Super Admin: pranu21m@gmail.com
            </p>
          </div>

          {/* Desktop PWA & Mobile App Store download links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => alert('GuideSoft Desktop DMG / Installer ready for deployment.')}
              className="px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-xs font-semibold flex items-center gap-2 text-foreground"
            >
              <Monitor className="w-4 h-4 text-primary" /> Desktop DMG / App
            </button>
            <a
              href="https://apple.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-xs font-semibold flex items-center gap-2 text-foreground"
            >
              <Smartphone className="w-4 h-4 text-primary" /> iOS App Store
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-xs font-semibold flex items-center gap-2 text-foreground"
            >
              <Download className="w-4 h-4 text-primary" /> Android Google Play
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
