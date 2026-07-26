'use client';

import React, { useState } from 'react';
import { PricingCardSection } from '@/components/billing/pricing-card';
import { AUTO_CONNECTED_MODELS } from '@/lib/ai/llm-branding';
import { TaskForm } from '@/components/task-form';
import { SharedHeader } from '@/components/shared-header';
import { RepoSelector } from '@/components/repo-selector';
import { ThemeToggle } from '@/components/theme-toggle';
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
  Github,
  Globe,
  Terminal,
  Server
} from 'lucide-react';

interface LandingPageProps {
  initialSelectedOwner?: string;
  initialSelectedRepo?: string;
  initialInstallDependencies?: boolean;
  initialMaxDuration?: number;
  initialKeepAlive?: boolean;
  initialEnableBrowser?: boolean;
  maxSandboxDuration?: number;
  user?: any;
  initialStars?: number;
}

export function LandingPage({
  initialSelectedOwner = '',
  initialSelectedRepo = '',
  initialInstallDependencies = false,
  initialMaxDuration = 300,
  initialKeepAlive = false,
  initialEnableBrowser = false,
  maxSandboxDuration = 300,
  user = null,
  initialStars = 1200,
}: LandingPageProps) {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTaskSubmitting, setIsTaskSubmitting] = useState(false);

  const [selectedOwner, setSelectedOwner] = useState(initialSelectedOwner);
  const [selectedRepo, setSelectedRepo] = useState(initialSelectedRepo);

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

  const handleTaskSubmit = async (taskData: any) => {
    setIsTaskSubmitting(true);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (res.ok) {
        const data = await res.json();
        window.location.href = `/tasks/${data.id || data.taskId}`;
      } else {
        alert('Active paid membership required to generate and execute tasks.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTaskSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white flex flex-col justify-between">
      {/* BRAND HEADER & NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <img src="/guidesoft-logo.png" alt="GuideSoft AI" className="h-8 w-8 object-contain" />
              <span className="font-black text-lg tracking-tight text-foreground">
                GUIDESOFT<span className="text-primary">.AI</span>
              </span>
            </a>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-primary/10 text-primary border border-primary/20">
              Ollama + LLaMA Hybrid
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            <a href="#platform" className="hover:text-primary transition-colors">Coding Agent Platform</a>
            <a href="#models" className="hover:text-primary transition-colors">Brand Models</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills & Agents</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing & UPI</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact Admin</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#pricing"
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              Get Access (₹499)
            </a>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="relative pt-16 pb-12 px-4 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
          <Sparkles className="w-4 h-4" /> Autonomous AI Coding Agent Platform
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none max-w-5xl mx-auto">
          Enterprise AI Coding Platform & <span className="text-primary underline decoration-primary/30">Model Orchestrator</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-normal">
          Connected directly to Vercel Sandbox, Claude Code, OpenAI Codex, Cursor CLI, and our combined Ollama & LLaMA brand backend.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#platform"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
          >
            <Terminal className="w-5 h-5" /> Launch Coding Agent Workspace
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-lg hover:bg-muted border border-border transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 text-primary" /> Subscribe (GPay / UPI)
          </a>
        </div>
      </section>

      {/* SECTION 2: CONNECTED CODING AGENT PLATFORM WORKSPACE */}
      <section id="platform" className="py-12 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Live Coding Workspace
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">Interactive AI Task Studio</h2>
          <p className="text-muted-foreground mt-2">Select your repository, pick an AI agent (Claude Code, Gemini, Codex, Cursor), and generate code.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl">
          <TaskForm
            onSubmit={handleTaskSubmit}
            isSubmitting={isTaskSubmitting}
            selectedOwner={selectedOwner}
            selectedRepo={selectedRepo}
            initialInstallDependencies={initialInstallDependencies}
            initialMaxDuration={initialMaxDuration}
            initialKeepAlive={initialKeepAlive}
            initialEnableBrowser={initialEnableBrowser}
            maxSandboxDuration={maxSandboxDuration}
          />
        </div>
      </section>

      {/* SECTION 3: AUTO-CONNECTED BRAND MODELS */}
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

      {/* SECTION 4: SKILLS & OPENCLAW / CLAUDE CONNECTORS */}
      <section id="skills" className="py-16 px-4 bg-muted/20 border-b border-border">
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

      {/* SECTION 5: PRICING & PAYMENT GATEWAY */}
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
              <li><a href="#platform" className="hover:text-primary transition-colors">Coding Agent Workspace</a></li>
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
