'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { HeroAnimation } from '@/components/landing/hero-animation'
import { TrustedLogos } from '@/components/landing/trusted-logos'
import { FeatureCard } from '@/components/landing/feature-card'
import {
  Zap,
  ArrowRight,
  Check,
  Sparkles,
  Rocket,
  Layout,
  Code2,
  Globe,
  Layers,
  Bot,
  Send,
  ChevronRight,
  Star,
  Play,
  Menu,
  X,
  Search,
  Filter,
  ChevronDown,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

const steps = [
  {
    icon: Sparkles,
    title: 'Describe Your App',
    desc: 'Tell our AI what you want to build in plain English. No technical knowledge needed—just describe your idea.',
  },
  {
    icon: Code2,
    title: 'AI Builds It Live',
    desc: 'Watch as your app comes to life in real time. Every line of code, every design choice, happens instantly.',
  },
  {
    icon: Rocket,
    title: 'Ship Instantly',
    desc: 'Deploy your finished app with one click. Share it with the world or keep building more features.',
  },
]

const features = [
  {
    icon: Bot,
    title: 'AI That Actually Understands',
    description: 'Our AI doesn\'t just generate code—it thinks through your requirements and builds exactly what you imagine.',
  },
  {
    icon: Globe,
    title: 'Real-Time Preview',
    description: 'See your app evolve as it\'s being built. Play, click, and interact with a live preview while AI works.',
  },
  {
    icon: Zap,
    title: 'One-Click Deploy',
    description: 'Go from idea to live app in minutes. No servers, no configuration, no complex deployment pipelines.',
  },
  {
    icon: Layers,
    title: 'Template Library',
    description: 'Start from 100+ professionally designed templates or build from scratch—whatever gets you moving faster.',
  },
  {
    icon: Code2,
    title: 'Vibe Coding',
    description: 'Just describe what you want. The AI handles the syntax, the structure, and the best practices automatically.',
  },
  {
    icon: Layers,
    title: 'Agent Collaboration',
    description: 'Multiple AI agents work together—one designs, one codes, one tests—delivering polished apps every time.',
  },
]

const templates = [
  { name: 'SaaS App', desc: 'Subscription platforms, dashboards, and admin panels', color: 'from-sky-500 to-blue-600' },
  { name: 'E-commerce', desc: 'Online stores with payments, inventory, and checkout', color: 'from-emerald-500 to-teal-600' },
  { name: 'Portfolio', desc: 'Personal brand sites and creative portfolios', color: 'from-purple-500 to-indigo-600' },
  { name: 'Dashboard', desc: 'Analytics, monitoring, and data visualization apps', color: 'from-orange-500 to-amber-600' },
]

const testimonials = [
  { name: 'Sarah Chen', role: 'Founder, LaunchPad', quote: 'I went from idea to a live SaaS product in under 2 hours. Our team thought we hired a senior dev overnight.' },
  { name: 'Marcus Johnson', role: 'CTO, Bloom Health', quote: 'The AI understood our complex data visualization needs better than some engineers we interviewed.' },
  { name: 'Aisha Patel', role: 'Creator, DesignFlow', quote: 'Finally, a tool that lets me focus on the product, not the build process. It\'s genuinely magic.' },
]

const faqs = [
  { q: 'Do I need coding experience?', a: 'Not at all. If you can describe what you want in plain English, our AI handles everything else.' },
  { q: 'How fast can I launch my first app?', a: 'Most users go from idea to a live, working app in under 30 minutes.' },
  { q: 'What tech stacks do you support?', a: 'We support React, Next.js, Vue, Svelte, Tailwind CSS, Node.js, Python, and PostgreSQL—plus many more.' },
  { q: 'Can I export my code?', a: 'Absolutely. You own 100% of everything built with GUIDESOFT.AI. Export anytime, deploy anywhere.' },
  { q: 'Is there a free plan?', a: 'Yes! Start building for free with our Starter plan. Upgrade to Pro when you need more power.' },
  { q: 'What happens when I hit deploy?', a: 'We handle hosting, SSL, scaling, and updates. You just focus on growing your product.' },
]

const pricingTiers = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Perfect for exploring and small projects',
    features: ['1 project', 'Community support', 'Basic templates', 'Standard deploy'],
    cta: 'Start for Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    desc: 'For creators shipping real products',
    features: ['Unlimited projects', 'Priority support', 'All templates', 'Custom domains', 'Advanced AI models', 'Team collaboration'],
    cta: 'Start Building',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For teams that need full control',
    features: ['Everything in Pro', 'SSO & audit logs', 'Dedicated support', 'SLA guarantee', 'Custom integrations', 'On-premise option'],
    cta: 'Talk to Sales',
    popular: false,
  },
]

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.6])

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20">
                G
              </div>
              <span className="font-black text-lg tracking-tight">
                GUIDESOFT<span className="text-orange-500">.AI</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors">How It Works</a>
              <a href="#features" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors">Features</a>
              <a href="#templates" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors">Templates</a>
              <a href="#pricing" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors">Pricing</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-zinc-600 dark:text-zinc-400" asChild>
                <a href="/auth/signin">Sign In</a>
              </Button>
              <Button size="sm" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold" asChild>
                <a href="/auth/signin">Start Building Free</a>
              </Button>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-4 space-y-3"
          >
            <a href="#how-it-works" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">How It Works</a>
            <a href="#features" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">Features</a>
            <a href="#templates" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">Templates</a>
            <a href="#pricing" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">Pricing</a>
            <div className="pt-3 flex gap-3">
              <Button variant="ghost" size="sm" className="flex-1" asChild>
                <a href="/auth/signin">Sign In</a>
              </Button>
              <Button size="sm" className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900" asChild>
                <a href="/auth/signin">Start Building Free</a>
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div style={{ opacity: heroOpacity }} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Now in Public Beta</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
              >
                Build Full-Stack Apps with{' '}
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  AI
                </span>
                . No Code Required.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed font-medium"
              >
                Describe your idea in plain English. Watch AI build, design, and launch your app in real time. No coding, no complexity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Button size="lg" className="h-12 px-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold rounded-xl shadow-xl shadow-zinc-900/20 dark:shadow-zinc-100/10 transition-all" asChild>
                  <a href="/auth/signin">
                    Start Building Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <button className="h-12 px-8 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
              >
                <Check className="w-4 h-4 text-emerald-500" />
                Free forever plan. No credit card required.
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <HeroAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedLogos />

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Three steps. Zero complexity.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Building software shouldn't require a computer science degree. Here's all it takes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className="relative bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2">
                  Step {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-zinc-300 dark:text-zinc-700">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything you need to ship fast
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Powerful features wrapped in a simple interface. Build apps the way you've always imagined.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section id="templates" className="py-24 px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">Templates</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Start from a template or build from scratch
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Jumpstart your project with professionally designed app templates. Every template is fully customizable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <motion.div
                key={template.name}
                whileHover={{ y: -4 }}
                className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <div className={`h-40 bg-gradient-to-br ${template.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layout className="w-12 h-12 text-white/90" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{template.desc}</p>
                  <button className="mt-4 w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    Use Template
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Loved by founders everywhere
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Simple pricing, no surprises
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Start free, scale when you're ready. Every plan includes everything you need to build amazing apps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white dark:bg-zinc-900 rounded-3xl p-8 border ${tier.popular ? 'border-orange-300 dark:border-orange-700 shadow-xl shadow-orange-500/10' : 'border-zinc-200 dark:border-zinc-800'} flex flex-col`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{tier.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-black">{tier.price}</span>
                  {tier.period && <span className="text-zinc-500 dark:text-zinc-400 text-sm">{tier.period}</span>}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-zinc-700 dark:text-zinc-300">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${tier.popular ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'}`}
                  asChild
                >
                  <a href={tier.name === 'Enterprise' ? '/pricing' : '/auth/signin'}>
                    {tier.cta}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-amber-100/50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-[2.5rem] -z-10 blur-xl" />
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-12 sm:p-16 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
                Ready to build the future?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                Join 50,000+ founders who are already building apps with AI. Your next great idea is one description away.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button size="lg" className="h-14 px-10 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold rounded-xl shadow-xl text-lg" asChild>
                  <a href="/auth/signin">
                    Start Building Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-10 rounded-xl text-base font-semibold" asChild>
                  <a href="/pricing">View Pricing</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <a href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20">
                  G
                </div>
                <span className="font-black text-lg tracking-tight">
                  GUIDESOFT<span className="text-orange-500">.AI</span>
                </span>
              </a>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mb-6">
                The fastest way to build and ship full-stack apps. Describe your idea, and let AI bring it to life.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-300 transition-colors">
                  <Send className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-300 transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#features" className="hover:text-orange-500 transition-colors">Features</a></li>
                <li><a href="#templates" className="hover:text-orange-500 transition-colors">Templates</a></li>
                <li><a href="#pricing" className="hover:text-orange-500 transition-colors">Pricing</a></li>
                <li><a href="/templates" className="hover:text-orange-500 transition-colors">Explore All</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              GUIDESOFT.AI. All rights reserved.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Built with passion for builders everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
