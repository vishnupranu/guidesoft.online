export interface ConnectedModel {
  id: string;
  name: string;
  provider: 'GuideSoft' | 'OpenClaw' | 'Anthropic' | 'Ollama' | 'LLaMA';
  description: string;
  capability: string;
  isDefault: boolean;
  status: 'active' | 'connected';
}

export const AUTO_CONNECTED_MODELS: ConnectedModel[] = [
  {
    id: 'guidesoft-hyper-matrix-v4',
    name: 'GuideSoft Speed Engine',
    provider: 'GuideSoft',
    description: 'High-velocity full-stack code synthesis, UI component generation, and real-time auto-completion.',
    capability: 'Instant Code & UI Generation',
    isDefault: true,
    status: 'active',
  },
  {
    id: 'guidesoft-sovereign-agent-v1',
    name: 'GuideSoft Sovereign Agent',
    provider: 'OpenClaw',
    description: 'Autonomous multi-file software engineering agent for complex workflows and automated terminal tasks.',
    capability: 'Autonomous Multi-Agent System',
    isDefault: false,
    status: 'active',
  },
  {
    id: 'guidesoft-omni-synthesizer',
    name: 'GuideSoft DeepReason Core',
    provider: 'Anthropic',
    description: 'Advanced architectural synthesis, algorithmic optimization, multi-file refactoring, and logic deduction.',
    capability: 'Complex Problem Solving',
    isDefault: false,
    status: 'connected',
  },
  {
    id: 'guidesoft-algorithmic-deductor',
    name: 'GuideSoft Enterprise Omni',
    provider: 'Ollama',
    description: 'End-to-end full-stack app building with custom database schemas, API connectors, and security audits.',
    capability: 'Enterprise Stack Orchestration',
    isDefault: false,
    status: 'connected',
  },
];

export function getBrandNotificationBanner(): { brand: string; subtitle: string } {
  return {
    brand: 'GuideSoft AI Product Suite',
    subtitle: 'Autonomous Full-Stack Software Development Platform',
  };
}
