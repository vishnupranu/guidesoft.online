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
  free_user: {
    dailyTokenLimit: 0,
    canCloneGithub: false,
    canUsePlugins: false,
    canUseSkills: false,
    canAccessApiGateway: false,
    maxCustomAgents: 0,
  },
  paid_user: {
    dailyTokenLimit: 500000,
    canCloneGithub: true,
    canUsePlugins: true,
    canUseSkills: true,
    canAccessApiGateway: true,
    maxCustomAgents: 25,
  },
  admin: {
    dailyTokenLimit: 5000000,
    canCloneGithub: true,
    canUsePlugins: true,
    canUseSkills: true,
    canAccessApiGateway: true,
    maxCustomAgents: 100,
  },
  super_admin: {
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

  const role = session.user.role
  const limits = TIER_CONFIG[role] || TIER_CONFIG.free_user;
  const isAllowed = Boolean(limits[feature]);

  if (!isAllowed) {
    return {
      allowed: false,
      reason: `Feature '${feature}' requires Premium or higher tier access.`,
    };
  }

  return { allowed: true };
}
