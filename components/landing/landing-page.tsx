'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PricingCardSection } from '@/components/billing/pricing-card';
import { AUTO_CONNECTED_MODELS } from '@/lib/ai/llm-branding';
import { TaskForm } from '@/components/task-form';
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
  Server,
  Workflow,
  ArrowRight,
  Flame,
  CheckCircle2,
  Box,
  Compass,
  Laptop
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* BRAND HEADER & NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/80 px-4 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="relative p-1.5 rounded-xl bg-primary/10 border border-primary/30 group-hover:border-primary transition-colors">
                <img src="/guidesoft-logo.png" alt="GuideSoft AI" className="h-6 w-6 object-contain" />
              </div>
              <span className="font-black text-lg tracking-tight text-foreground">
                GUIDESOFT<span className="text-primary font-extrabold">.AI</span>
              </span>
            </a>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-primary/10 text-primary border border-primary/20 shadow-sm">
              <Flame className="w-3 h-3 text-primary animate-pulse" /> Top AI Builder Engine
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <a href="#platform" className="hover:text-primary transition-colors">Workspace</a>
            <a href="#models" className="hover:text-primary transition-colors">AI Models</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills & Agents</a>
            <a href="#pricing" className="hover:text-primary transition-colors">UPI Pricing</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact Admin</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#pricing"
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/25 hover:shadow-primary/40 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" /> Access (₹499)
            </a>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO WITH GLOWING AURA & ANIMATIONS */}
      <section className="relative pt-20 pb-16 px-4 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm shadow-primary/10"
        >
          <Sparkles className="w-4 h-4 text-primary" /> Autonomous Multi-Agent AI Builder Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] max-w-5xl mx-auto text-foreground"
        >
          Enterprise AI Coding & <br />
          <span className="bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent underline decoration-primary/40">
            Model Orchestration Engine
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed"
        >
          Engineered with inspiration from top 5 AI builders (v0, Bolt, Cursor, Windsurf, Lovable). Direct integration with Vercel Sandbox, Claude Code, and our Ollama + LLaMA fine-tuned backend.
        </motion.p>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto"
        >
          {['Cursor CLI Engine', 'Bolt.new Sandbox', 'v0 Multi-Modal', 'Lovable Agents', 'Windsurf Skills', 'Ollama + LLaMA'].map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-card/80 border border-primary/20 text-foreground text-xs font-semibold shadow-xs flex items-center gap-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" /> {tech}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#platform"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-white font-extrabold text-base hover:bg-primary/90 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2.5 group"
          >
            <Terminal className="w-5 h-5 group-hover:rotate-6 transition-transform" /> Launch Agent Workspace
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base hover:bg-muted border border-border transition-all flex items-center justify-center gap-2.5"
          >
            <Zap className="w-5 h-5 text-primary" /> Subscribe with GPay / UPI
          </a>
        </motion.div>
      </section>

      {/* SECTION 2: LIVE CODING AGENT TASK STUDIO */}
      <section id="platform" className="py-14 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            Interactive AI Studio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-3 text-foreground tracking-tight">
            Live Coding Workspace
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
            Select your repository, choose an AI orchestrator, and prompt the agent to generate and deploy code seamlessly.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-primary/30 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-primary/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
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
        </motion.div>
      </section>

      {/* SECTION 3: TOP 5 BUILDERS BRAND MODELS SHOWCASE */}
      <section id="models" className="py-20 px-4 bg-muted/40 border-y border-border/80 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Next-Gen Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-3 tracking-tight">
              Auto-Connected Brand AI Models
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-2xl mx-auto">
              Our hybrid neural engine merges Ollama local speed with LLaMA 70B deep reasoning, inspired by the top 5 AI builder architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUTO_CONNECTED_MODELS.map((model, idx) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-card border border-border hover:border-primary/50 p-6 rounded-2xl relative shadow-md flex flex-col justify-between group transition-colors"
              >
                {model.isDefault && (
                  <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Default Brand
                  </span>
                )}

                <div>
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit text-primary mb-4 group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {model.name}
                  </h3>
                  <span className="inline-block mt-1 text-[11px] font-bold text-primary/80 bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                    {model.inspiration}
                  </span>

                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed font-normal">
                    {model.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold">
                  <span className="text-foreground/80">{model.provider} Engine</span>
                  <span className="text-primary font-bold uppercase text-[10px] flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> {model.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SKILLS & MULTI-AGENT CONNECTIONS */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Agent Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-3 tracking-tight">
              Autonomous Agent Skills & Pipeline
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-2xl mx-auto">
              Equipped with custom skill triggers, file parsers, live sandboxes, and strict RBAC controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border p-7 rounded-2xl shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit text-primary mb-4">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">OpenClaw Agent Core</h3>
              <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed font-normal">
                Autonomous task breakdown, dependency resolution, web scraping, and seamless Git repository sync.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
                <CheckCircle2 className="w-4 h-4" /> Multi-Agent Execution Enabled
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border p-7 rounded-2xl shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit text-primary mb-4">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">Claude Skills Orchestrator</h3>
              <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed font-normal">
                Deep architectural reasoning prompts and reusable skill packages pre-configured in backend dashboard settings.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
                <CheckCircle2 className="w-4 h-4" /> System Prompts Synced
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border p-7 rounded-2xl shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit text-primary mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">Strict RBAC & Security</h3>
              <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed font-normal">
                Admin rights strictly assigned to <span className="font-bold text-primary">pranu21m@gmail.com</span>. Non-paid repository cloning restricted.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
                <CheckCircle2 className="w-4 h-4" /> Super Admin Guard Active
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING & UPI PAYMENT GATEWAY */}
      <section id="pricing" className="py-16 bg-muted/30 border-y border-border/80">
        <PricingCardSection />
      </section>

      {/* SECTION 6: CONTACT SUPER ADMIN */}
      <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-primary/20 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden"
        >
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Direct Support
            </span>
            <h2 className="text-3xl font-extrabold text-foreground mt-3 tracking-tight">Contact Super Admin</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-normal">
              Submissions are delivered directly to <span className="font-bold text-primary">admin@guidesoft.online</span>
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full text-sm p-3.5 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="you@domain.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full text-sm p-3.5 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Subject</label>
              <input
                type="text"
                placeholder="Enterprise Plan / API Integration Inquiry"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full text-sm p-3.5 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your inquiry or requirement..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full text-sm p-3.5 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {contactStatus && (
              <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
                {contactStatus}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-primary text-white font-extrabold text-sm hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> {isSubmitting ? 'Sending...' : 'Send Message to admin@guidesoft.online'}
            </button>
          </form>
        </motion.div>
      </section>

      {/* COMPREHENSIVE BRAND FOOTER WITH DOWNLOAD BUTTONS */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-border">
          <div>
            <h4 className="text-lg font-black text-foreground flex items-center gap-2">
              <img src="/guidesoft-logo.png" alt="GuideSoft Logo" className="h-6 w-6 object-contain" />
              GUIDESOFT<span className="text-primary">.AI</span>
            </h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-normal">
              Enterprise AI model orchestration, automated coding, OpenClaw & Claude skills, and secure RBAC platform.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-foreground mb-3">Platform</h5>
            <ul className="space-y-2 text-xs font-medium text-muted-foreground">
              <li><a href="#platform" className="hover:text-primary transition-colors">Coding Agent Workspace</a></li>
              <li><a href="#models" className="hover:text-primary transition-colors">Ollama & LLaMA Models</a></li>
              <li><a href="#skills" className="hover:text-primary transition-colors">OpenClaw Engine</a></li>
              <li><a href="/marketplace" className="hover:text-primary transition-colors">Plugins & Connectors</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-foreground mb-3">Membership & Security</h5>
            <ul className="space-y-2 text-xs font-medium text-muted-foreground">
              <li><a href="#pricing" className="hover:text-primary transition-colors">Basic Plan (₹499)</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Premium Developer (₹3,999/mo)</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">GPay & UPI Checkout</a></li>
              <li><span className="text-primary font-bold">Super Admin: pranu21m@gmail.com</span></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-foreground mb-3">Download Applications</h5>
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => alert('GuideSoft Desktop DMG / Installer is ready for deployment.')}
                className="px-3.5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-xs font-bold flex items-center gap-2.5 text-foreground hover:border-primary/40 transition-colors shadow-xs"
              >
                <Monitor className="w-4 h-4 text-primary" /> Desktop App (DMG)
              </button>
              <a
                href="https://apple.com"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-xs font-bold flex items-center gap-2.5 text-foreground hover:border-primary/40 transition-colors shadow-xs"
              >
                <Smartphone className="w-4 h-4 text-primary" /> iOS App Store
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-xs font-bold flex items-center gap-2.5 text-foreground hover:border-primary/40 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 text-primary" /> Android Play Store
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
          <p>© {new Date().getFullYear()} GuideSoft Online. All Rights Reserved.</p>
          <p>Contact: <a href="mailto:admin@guidesoft.online" className="text-primary underline">admin@guidesoft.online</a></p>
        </div>
      </footer>
    </div>
  );
}
