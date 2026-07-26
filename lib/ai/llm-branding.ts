export interface ConnectedModel {
  id: string;
  name: string;
  provider: 'GuideSoft' | 'OpenClaw' | 'Anthropic' | 'Ollama' | 'LLaMA';
  description: string;
  inspiration: string;
  isDefault: boolean;
  status: 'active' | 'connected';
}

export const AUTO_CONNECTED_MODELS: ConnectedModel[] = [
  {
    id: 'guidesoft-hyper-matrix-v4',
    name: 'GuideSoft Hyper-Matrix v4.5',
    provider: 'GuideSoft',
    description: 'Hybrid Neural Core orchestrating Ollama local inference speed & LLaMA 70B deep reasoning.',
    inspiration: 'Inspired by Cursor & Bolt.new',
    isDefault: true,
    status: 'active',
  },
  {
    id: 'guidesoft-sovereign-agent-v1',
    name: 'GuideSoft Sovereign Agent Matrix',
    provider: 'OpenClaw',
    description: 'Autonomous multi-agent execution pipeline with custom skills engine & sandbox isolation.',
    inspiration: 'Inspired by Lovable & Windsurf',
    isDefault: false,
    status: 'active',
  },
  {
    id: 'guidesoft-omni-synthesizer',
    name: 'GuideSoft Omni-Synthesizer Pro',
    provider: 'Anthropic',
    description: 'High-speed multi-modal code synthesis & UI generation agent with real-time preview.',
    inspiration: 'Inspired by v0.dev',
    isDefault: false,
    status: 'connected',
  },
  {
    id: 'guidesoft-algorithmic-deductor',
    name: 'GuideSoft Algorithmic Reasoning Core',
    provider: 'Ollama',
    description: 'Deep logic deduction engine for algorithmic optimization, debugging & test generation.',
    inspiration: 'Inspired by Claude Code & DeepSeek',
    isDefault: false,
    status: 'connected',
  },
];

export function getBrandNotificationBanner(): { brand: string; subtitle: string } {
  return {
    brand: 'GuideSoft Hyper-Matrix Neural Model',
    subtitle: 'Powered by Ollama + LLaMA Autonomous Hybrid Architecture',
  };
}
