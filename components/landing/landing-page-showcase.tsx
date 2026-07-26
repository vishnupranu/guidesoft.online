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
  Send 
} from 'lucide-react';

export function LandingPageShowcase() {
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
    <div className="w-full bg-background text-foreground border-t border-border mt-12">
      {/* SECTION 1: AUTO-CONNECTED BRAND MODELS */}
      <section id="models" className="py-16 px-4 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
              GuideSoft Brand Engine
            </span>
            <h2 className="text-3xl font-extrabold text-foreground mt-3">Auto-Connected AI Models</h2>
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

      {/* SECTION 2: AGENT SKILLS & CONNECTORS */}
      <section id="skills" className="py-16 px-4 bg-muted/10 border-b border-border">
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

      {/* SECTION 3: PRICING & PAYMENT GATEWAY */}
      <section id="pricing" className="py-16">
        <PricingCardSection />
      </section>

      {/* SECTION 4: CONTACT SUPER ADMIN FORM */}
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

      {/* COMPREHENSIVE BRAND FOOTER */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-border">
          <div>
            <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
              <img src="/guidesoft-logo.png" alt="GuideSoft Logo" className="h-6 w-6 object-contain" />
              GUIDESOFT<span className="text-primary">.AI</span>
            </h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Enterprise AI model orchestration, automated coding, OpenClaw & Claude skills, and secure RBAC platform.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-foreground mb-3">Platform</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Coding Agent Workspace</a></li>
              <li><a href="#models" className="hover:text-primary transition-colors">Ollama & LLaMA Models</a></li>
              <li><a href="#skills" className="hover:text-primary transition-colors">OpenClaw Engine</a></li>
              <li><a href="/marketplace" className="hover:text-primary transition-colors">Plugins & Connectors</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-foreground mb-3">Membership & Security</h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#pricing" className="hover:text-primary transition-colors">Basic Plan (₹499)</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Premium Developer (₹3,999/mo)</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">GPay & UPI Checkout</a></li>
              <li><span className="text-primary font-semibold">Super Admin: pranu21m@gmail.com</span></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-foreground mb-3">Download Applications</h5>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => alert('GuideSoft Desktop DMG / Installer ready for deployment.')}
                className="px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold flex items-center gap-2 text-foreground"
              >
                <Monitor className="w-4 h-4 text-primary" /> Desktop App (DMG)
              </button>
              <a
                href="https://apple.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold flex items-center gap-2 text-foreground"
              >
                <Smartphone className="w-4 h-4 text-primary" /> iOS App Store
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-semibold flex items-center gap-2 text-foreground"
              >
                <Download className="w-4 h-4 text-primary" /> Android Play Store
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} GuideSoft Online. All Rights Reserved.</p>
          <p>Contact: <a href="mailto:admin@guidesoft.online" className="text-primary underline">admin@guidesoft.online</a></p>
        </div>
      </footer>
    </div>
  );
}
