'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Shield,
  Terminal,
  Database,
  Code2,
  Cpu,
  Wrench,
  CheckCircle2,
  SlidersHorizontal,
  FileCode,
  Globe,
  Bot,
  Layers,
  BookOpen,
} from 'lucide-react'

export interface AgentSkill {
  id: string
  name: string
  category: 'Web & DevTools' | 'Database & Data' | 'System & Files' | 'GitHub & Prompts'
  description: string
  isEnabled: boolean
  accessLevel: 'Read-Only' | 'Full Access' | 'Sandboxed'
  openSourcePrompt?: string
}

const SYSTEM_PROMPTS = [
  {
    agent: 'Claude Code CLI System Prompt',
    source: 'Anthropic OpenSource Agent Spec',
    prompt:
      'You are Claude Code, an autonomous pair programmer working in a sandboxed shell environment. Prioritize editing existing files over creating new files. Inspect logs before diagnosing errors. Run TypeScript type checks and verification commands after edits.',
  },
  {
    agent: 'OpenAI Codex CLI System Prompt',
    source: 'OpenAI Codex Exec',
    prompt:
      'You are Codex CLI operating inside a Vercel Sandbox. Output executable shell commands and code diffs directly. Use non-blocking async execution for long builds.',
  },
  {
    agent: 'Cursor Composer System Prompt',
    source: 'Cursor Open AI Stack',
    prompt:
      'You are Cursor Composer, an AI agent capable of multi-file edits across the codebase. Keep layout calculations dynamic and strictly scope conditional logic.',
  },
  {
    agent: 'DeepSeek R1 Reasoning System Prompt',
    source: 'DeepSeek Open-Source Model',
    prompt:
      'You are DeepSeek R1. Execute deep architectural reasoning before tool calls. Wrap mathematical derivations and algorithmic planning inside structured step-by-step thinking.',
  },
]

export function SkillsManager() {
  const [skills, setSkills] = useState<AgentSkill[]>([
    {
      id: 'website-cloning',
      name: 'Claude Website Cloning & UI Replicating Skill',
      category: 'Web & DevTools',
      description:
        'Analyzes visual structure, HTML markup, and CSS tokens of target websites to automatically generate 1:1 pixel-perfect React & Tailwind CSS clone artifacts.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt:
        'git clone https://github.com/happies2012-cpu/How-to-Clone-Website---Claude-Skills.git | Extract DOM, styles, typography and recreate in React/Tailwind.',
    },
    {
      id: 'scrapy-ai',
      name: 'Scrapy AI Intelligent Scraper Engine',
      category: 'Web & DevTools',
      description:
        'Autonomous Python Scrapy pipeline integrated with LLM extraction schema parsers for structured web data gathering.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt:
        'git clone https://github.com/happies2012-cpu/scrapy-ai.git | Run distributed spiders with LLM auto-selectors.',
    },
    {
      id: 'crawl4ai',
      name: 'Crawl4AI High-Performance LLM Crawler',
      category: 'Web & DevTools',
      description:
        'Open-source, lightning-fast web crawler tailored for LLMs and RAG pipelines with markdown generation and JS rendering.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt:
        'git clone https://github.com/happies2012-cpu/crawl4ai.git | Extract clean markdown, screenshots, and structured JSON.',
    },
    {
      id: 'turboquant-rs',
      name: 'TurboQuant-RS Rust Quant Analytics Engine',
      category: 'System & Files',
      description:
        'High-speed Rust quantitative engine for low-latency market analysis, model backtesting, and algorithmic execution.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt:
        'npx skillfish add gqadonis/turboquant-rs clone | Compile Rust SIMD quant analytics inside sandbox.',
    },
    {
      id: 'openclaw',
      name: 'OpenClaw Autonomous Open-Source Agent Framework',
      category: 'System & Files',
      description:
        'Distributed multi-agent orchestration framework supporting FastAPI, LangChain, E2B sandboxes, n8n, and Make workflows.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt:
        'git clone https://github.com/happies2012-cpu/openclaw.git | Orchestrate multi-agent CLI loops and fast SDK connectors.',
    },
    {
      id: 'firecrawl',
      name: 'Firecrawl Fast Web Search, Scrape & Research',
      category: 'Web & DevTools',
      description:
        'Firecrawl gives AI agents fast, reliable web context with strong search, clean markdown scraping, live page interaction, document parsing, research index, and page monitoring tools.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt:
        'npx -y firecrawl-cli@latest init --all --browser | Firecrawl API Key: fc-2de8f5294b244f4fb82bd92a81277873',
    },
    {
      id: 'chrome-devtools',
      name: 'Chrome DevTools & A11y Auditor',
      category: 'Web & DevTools',
      description:
        'Enables agent to audit DOM structure, diagnose network calls, test WCAG accessibility, and inspect LCP performance.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt: 'Use Chrome DevTools MCP for DOM inspection, network tracing, and WCAG accessibility auditing.',
    },
    {
      id: 'file-access-sandbox',
      name: 'Sandbox File System & Code Editor Access',
      category: 'System & Files',
      description:
        'Grants direct read, edit, delete, and directory listing permissions inside Vercel Sandbox workspaces.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt: 'Read complete target files before editing. Do not make partial guesses.',
    },
    {
      id: 'github-pr-creator',
      name: 'GitHub PR & Branch Auto-Creator',
      category: 'GitHub & Prompts',
      description:
        'Automatically generates AI branch names, synthesizes commit messages, and creates GitHub Pull Requests directly.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt:
        'Generate descriptive branch names based on intent and push branch to GitHub with synthesized PR summary.',
    },
    {
      id: 'mcp-tool-integrator',
      name: 'Model Context Protocol (MCP) Hub Engine',
      category: 'Web & DevTools',
      description:
        'Connects third-party MCP servers (PostgreSQL, GitHub API, Supabase, Convex) directly to Claude Code and CLI agents.',
      isEnabled: true,
      accessLevel: 'Sandboxed',
      openSourcePrompt: 'Query connected MCP server capabilities and invoke schema endpoints securely.',
    },
    {
      id: 'playwright-testing',
      name: 'Playwright E2E Browser Testing',
      category: 'Web & DevTools',
      description:
        'Runs headless browser automation to test UI user flows, capture screenshots, and inspect console logs.',
      isEnabled: true,
      accessLevel: 'Sandboxed',
      openSourcePrompt: 'Launch headless Playwright browser, verify form submissions, and record UI screenshots.',
    },
    {
      id: 'bigquery-dataform',
      name: 'BigQuery & Dataform ETL Pipeline Helper',
      category: 'Database & Data',
      description: 'Generates SQLX, analyzes BigQuery schemas, and optimizes database transformation scripts.',
      isEnabled: true,
      accessLevel: 'Read-Only',
      openSourcePrompt: 'Inspect BigQuery dataset schemas and optimize SQL dialect for analytical speed.',
    },
    {
      id: 'data-autocleaning',
      name: 'Automated Data Quality & Auto-cleaning',
      category: 'Database & Data',
      description: 'Identifies missing values, applies schema mapping, and runs statistical cleaning logic.',
      isEnabled: true,
      accessLevel: 'Sandboxed',
      openSourcePrompt: 'Clean raw input data, enforce schema types, and log data transformation summaries.',
    },
    {
      id: 'e2b-code-sandbox',
      name: 'E2B MicroVM Code Interpreter',
      category: 'System & Files',
      description: 'Executes LLM-generated code (Python, Node, Rust) in secure, isolated cloud sandboxes for real-time validation.',
      isEnabled: true,
      accessLevel: 'Sandboxed',
      openSourcePrompt: 'Initialize E2B Code Interpreter, run script securely, and return stdout/stderr.',
    },
    {
      id: 'vector-memory-rag',
      name: 'Long-Term Vector Memory (Pinecone/Qdrant)',
      category: 'Database & Data',
      description: 'Provides long-term RAG memory by storing workflows, schemas, and historical context via embeddings.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt: 'Retrieve related semantic context from Vector Store before answering.',
    },
    {
      id: 'n8n-make-webhooks',
      name: 'n8n & Make Workflow Connectors',
      category: 'Web & DevTools',
      description: 'Triggers visual, third-party automation workflows (CRM, Email, Slack) via programmatic webhooks.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt: 'Trigger n8n webhook payload with execution results.',
    },
    {
      id: 'llm-gateway-router',
      name: 'LiteLLM Gateway & Model Router',
      category: 'Web & DevTools',
      description: 'Dynamically routes tasks to optimal LLMs (DeepSeek, Claude 3.7, GPT-4.5) to balance speed, cost, and capability.',
      isEnabled: true,
      accessLevel: 'Full Access',
      openSourcePrompt: 'Route task to appropriate LLM based on taskType (coding vs reasoning).',
    },
    {
      id: 'opentelemetry-tracing',
      name: 'Agent Observability (LangSmith / OTEL)',
      category: 'Web & DevTools',
      description: 'Provides real-time tracing of multi-agent tool calls, token usage, and execution loops.',
      isEnabled: true,
      accessLevel: 'Read-Only',
      openSourcePrompt: 'Log tool execution trace to observability platform.',
    },
  ])

  const [activeTab, setActiveTab] = useState<'skills' | 'prompts'>('skills')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const toggleSkill = (id: string) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s)))
  }

  const categories = ['All', 'Web & DevTools', 'Database & Data', 'System & Files', 'GitHub & Prompts']

  const filteredSkills = activeCategory === 'All' ? skills : skills.filter((s) => s.category === activeCategory)

  return (
    <div className="space-y-6 text-zinc-100 font-sans max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 tracking-tight">
            <Sparkles className="w-6 h-6 text-emerald-400" /> Agentic Skills & Open-Source System Prompts
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Configure specialized agent skills, file system permissions, and GitHub open-source system prompts assigned
            to Claude Code, Codex, Copilot, Cursor, Gemini, and opencode agents.
          </p>
        </div>

        <Badge
          variant="outline"
          className="bg-emerald-950/60 border-emerald-800 text-emerald-400 font-mono text-xs px-3 py-1.5"
        >
          {skills.filter((s) => s.isEnabled).length} Skills Active
        </Badge>
      </div>

      {/* Main Tab Toggle */}
      <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'skills' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Agentic Skills ({skills.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('prompts')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'prompts' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>System Prompts ({SYSTEM_PROMPTS.length})</span>
        </button>
      </div>

      {activeTab === 'skills' ? (
        <div className="space-y-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <Card
                key={skill.id}
                className={`bg-zinc-900 border transition-all ${
                  skill.isEnabled ? 'border-zinc-800' : 'border-zinc-800/40 opacity-60'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-zinc-950 text-emerald-400 font-mono text-[10px]">
                      {skill.category}
                    </Badge>

                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono ${
                        skill.accessLevel === 'Full Access'
                          ? 'border-emerald-800 text-emerald-400 bg-emerald-950/40'
                          : 'border-zinc-700 text-zinc-400 bg-zinc-950'
                      }`}
                    >
                      {skill.accessLevel}
                    </Badge>
                  </div>

                  <CardTitle className="text-base font-bold text-white mt-2 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-emerald-400" />
                    <span>{skill.name}</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-400 leading-relaxed mt-1">
                    {skill.description}
                  </CardDescription>
                </CardHeader>

                {skill.openSourcePrompt && (
                  <CardContent className="py-2 text-[11px] font-mono text-zinc-400 bg-zinc-950/80 rounded-md mx-6 border border-zinc-800/60">
                    <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                      Skill Instruction Prompt:
                    </span>
                    "{skill.openSourcePrompt}"
                  </CardContent>
                )}

                <CardFooter className="pt-3 mt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" /> Vercel Sandbox Isolation
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSkill(skill.id)}
                    className={`h-7 text-xs ${
                      skill.isEnabled
                        ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300 hover:bg-red-950/40 hover:text-red-300'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {skill.isEnabled ? 'Active' : 'Disabled'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* System Prompts & Tools Library Explorer */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" /> System Prompts & Tools Library (102 Tools & Models)
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Cloned directly from{' '}
                <span className="font-mono text-emerald-400">x1xhlol/system-prompts-and-models-of-ai-tools</span> repo
                (Cursor, Manus AI, Devin, Lovable, v0, Bolt, Windsurf, Replit, Claude Code).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {SYSTEM_PROMPTS.map((item, idx) => (
              <Card key={idx} className="bg-zinc-900 border border-zinc-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-emerald-400" />
                      <CardTitle className="text-sm font-bold text-white">{item.agent}</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-zinc-950 text-emerald-400 font-mono text-[10px]">
                      {item.source}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                    {item.prompt}
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
