import { UserSession, isSuperAdmin } from './rbac';

export interface TierLimits {
  dailyTokenLimit: number;
  canCloneGithub: boolean;
  canUsePlugins: boolean;
  canUseSkills: boolean;
  canAccessApiGateway: boolean;
  maxCustomAgents: number;
}

export const TIER_CONFIG: Record<string, TierLimits> = {
  UNPAID: {
    dailyTokenLimit: 0, // No free generation
    canCloneGithub: false,
    canUsePlugins: false,
    canUseSkills: false,
    canAccessApiGateway: false,
    maxCustomAgents: 0,
  },
  BASIC: {
    dailyTokenLimit: 50000, // ₹499 one-time joining fee
    canCloneGithub: false,
    canUsePlugins: false,
    canUseSkills: false,
    canAccessApiGateway: false,
    maxCustomAgents: 2,
  },
  PREMIUM: {
    dailyTokenLimit: 500000, // ₹3999/mo
    canCloneGithub: true,
    canUsePlugins: true,
    canUseSkills: true,
    canAccessApiGateway: true,
    maxCustomAgents: 25,
  },
  ENTERPRISE: {
    dailyTokenLimit: 5000000, // Agency custom tier
    canCloneGithub: true,
    canUsePlugins: true,
    canUseSkills: true,
    canAccessApiGateway: true,
    maxCustomAgents: 100,
  },
  SUPER_ADMIN: {
    dailyTokenLimit: 99999999,
    canCloneGithub: true,
    canUsePlugins: true,
    canUseSkills: true,
    canAccessApiGateway: true,
    maxCustomAgents: 999,
  },
};

export function checkFeatureAccess(session: UserSession | null, feature: keyof TierLimits): { allowed: boolean; reason?: string } {
  if (!session) {
    return { allowed: false, reason: 'Authentication required. Please sign in.' };
  }

  if (isSuperAdmin(session.email)) {
    return { allowed: true };
  }

  if (!session.isPaid || !session.subscriptionPlan) {
    return { 
      allowed: false, 
      reason: 'No active plan. Access requires subscription (Basic ₹499 joining fee or Premium ₹3999/mo).' 
    };
  }

  if (!session.bankAccountDetailsAdded) {
    return { 
      allowed: false, 
      reason: 'Mandatory banking address and account verification incomplete. Please update billing settings.' 
    };
  }

  const limits = TIER_CONFIG[session.role] || TIER_CONFIG.UNPAID;
  const isAllowed = Boolean(limits[feature]);

  if (!isAllowed) {
    return {
      allowed: false,
      reason: `Feature '${feature}' requires Premium (₹3999/mo) or Enterprise tier plan.`,
    };
  }

  return { allowed: true };
}
