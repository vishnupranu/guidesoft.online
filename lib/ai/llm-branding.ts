export interface ConnectedModel {
  id: string;
  name: string;
  provider: 'Ollama' | 'LLaMA' | 'GuideSoft' | 'Anthropic' | 'OpenClaw';
  description: string;
  isDefault: boolean;
  status: 'active' | 'connected';
}

export const AUTO_CONNECTED_MODELS: ConnectedModel[] = [
  {
    id: 'guidesoft-hybrid-v1',
    name: 'GuideSoft AI Model (Ollama + LLaMA)',
    provider: 'GuideSoft',
    description: 'Custom fine-tuned hybrid model combining Ollama local speed and LLaMA 70B reasoning.',
    isDefault: true,
    status: 'active',
  },
  {
    id: 'openclaw-agent-v1',
    name: 'OpenClaw Agent Orchestrator',
    provider: 'OpenClaw',
    description: 'Autonomous multi-agent execution pipeline with custom skills engine.',
    isDefault: false,
    status: 'active',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet (GuideSoft Skills)',
    provider: 'Anthropic',
    description: 'Advanced code generation and architectural synthesis model.',
    isDefault: false,
    status: 'connected',
  },
  {
    id: 'deepseek-r1-ollama',
    name: 'DeepSeek R1 (Ollama Powered)',
    provider: 'Ollama',
    description: 'Reasoning model for complex algorithmic calculations and logic deduction.',
    isDefault: false,
    status: 'connected',
  },
];

export function getBrandNotificationBanner(): { brand: string; subtitle: string } {
  return {
    brand: 'GuideSoft AI Brand Model',
    subtitle: 'Engineered with Ollama & LLaMA Hybrid Architecture',
  };
}
