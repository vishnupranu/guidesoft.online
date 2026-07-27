# GUIDESOFT.AI — Implementation Prompt

## Context
You are building the next-generation AI-powered coding platform. Users will land on a premium marketing page, sign up, and immediately start building applications through natural language conversation with AI agents. The platform must feel magical, instant, and powerful — competing directly with lovable.dev, bolt.new, and replit.com.

## Core User Experience

### 1. The Landing Experience
When a user first arrives, they see:
- A bold, confident headline: "Build Full-Stack Apps with AI. No Code Required."
- An animated preview showing code being generated in real-time
- Social proof: "Join 50,000+ founders shipping faster"
- Three simple steps: Describe → Customize → Deploy
- Template showcase with live previews
- Clear pricing with "Start Building Free" CTA

The entire page should feel premium, fast, and futuristic — but not intimidating. Every element should guide the user toward their first project.

### 2. The Onboarding Journey
After sign-up:
- Welcome screen with personalized greeting
- Quick 3-step tour highlighting the chat interface, preview, and deploy button
- Template selection: "What would you like to build today?"
- First project creation wizard with AI guidance
- Instant gratification: first preview loads within 10 seconds

### 3. The Core Workspace
The main workspace is a split-pane interface:
- **Left Sidebar**: File tree showing project structure
- **Center Top**: AI Chat interface (primary interaction)
- **Center Bottom**: Code editor with Monaco
- **Right Panel**: Live preview with device toggles
- **Bottom Panel**: Terminal, console, and deploy controls

The AI chat is the hero. Users type natural language prompts like:
- "Build a SaaS landing page with pricing and testimonials"
- "Add user authentication with email and Google"
- "Create a dashboard with analytics charts"
- "Style this with a modern dark theme"

The AI responds with:
- Generated code in the editor
- Live preview updates
- Explanation of what was built
- Suggestions for next steps

### 4. Vibe Coding
Special mode where users can:
- Upload a design image or paste a Figma link
- AI extracts the design system (colors, fonts, spacing)
- Generates pixel-perfect code matching the design
- User can tweak via natural language: "Make the header sticky", "Change primary color to blue"

### 5. Template System
Users can browse templates by category:
- SaaS Starter
- E-commerce Store
- Portfolio Website
- Blog Platform
- AI Chatbot
- Mobile App
- Dashboard
- Landing Page

Each template shows:
- Live preview
- Feature list
- Tech stack
- One-click "Use Template" button
- AI customization prompt suggestions

### 6. Agent Capabilities
The platform runs autonomous agents that can:
- Build entire applications from a single prompt
- Make multiple files simultaneously
- Install dependencies automatically
- Run tests and fix bugs
- Deploy to production
- Iterate based on user feedback

Agents have different personas:
- **Builder**: Full-stack development
- **Designer**: UI/UX and styling
- **Debugger**: Bug fixing and optimization
- **Tester**: QA and testing

### 7. Deployment
One-click deployment:
- Click "Deploy" button
- Automatic build and deploy to Vercel
- Custom domain support
- SSL certificate
- Environment variables management
- Deployment history with rollback

## Marketing Pages Structure

### Homepage Sections
1. **Hero**: Headline + subheadline + CTA buttons + animated preview
2. **Trusted By**: Logo cloud of companies
3. **How It Works**: 3-step visual guide
4. **Features**: 6 feature cards with icons
5. **Templates**: Preview of template gallery
6. **Testimonials**: Customer quotes with photos
7. **Pricing**: 3-tier pricing table
8. **FAQ**: Common questions
9. **CTA**: Final call to action
10. **Footer**: Links and social

### Pricing Page
- Free tier: 5 projects, basic AI
- Pro tier ($29/mo): Unlimited projects, advanced AI, priority support
- Enterprise tier (custom): SSO, dedicated support, SLA

### Templates Page
- Grid of template cards
- Category sidebar
- Search bar
- Template detail modal with preview

## Design Principles
- **Speed**: Every interaction feels instant
- **Clarity**: No jargon, no confusion
- **Delight**: Micro-interactions, smooth animations
- **Trust**: Clear pricing, no hidden fees, transparent
- **Power**: Advanced features accessible but not overwhelming

## Content Guidelines
- Write for builders, founders, and dreamers
- Use active voice and present tense
- Avoid technical jargon in marketing copy
- Focus on outcomes, not features
- Use social proof naturally
- Keep paragraphs short and scannable

## Technical Notes (for implementation)
- Next.js 16 with App Router
- React 19 with Server Components
- Tailwind CSS for styling
- shadcn/ui for component library
- Monaco Editor for code editing
- Vercel Sandbox for code execution
- Multi-provider AI gateway
- PostgreSQL for data persistence
- GitHub, Google, Vercel OAuth

## Success Criteria
- User can create first project in < 2 minutes
- First preview loads in < 10 seconds
- Zero configuration required
- Works on mobile (responsive)
- Accessible (WCAG 2.1 AA)
- SEO optimized
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
