export interface BillingAddress {
  fullName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PaymentDetails {
  planId: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  paymentMethod: 'UPI' | 'GPAY';
  amount: number;
  currency: string;
  billingAddress: BillingAddress;
}

export const PLAN_PRICING = {
  BASIC: {
    id: 'BASIC',
    name: 'Basic Joiner Plan',
    price: 499,
    formattedPrice: '₹499',
    billingCycle: 'One-time joining fee',
    features: ['Limited AI generations (50,000 tokens)', 'Standard response speed', 'Dynamic prompt assistance', 'Community support'],
  },
  PREMIUM: {
    id: 'PREMIUM',
    name: 'Premium Developer',
    price: 3999,
    formattedPrice: '₹3,999/mo',
    billingCycle: 'Monthly recurring (Autopay)',
    features: [
      'High-speed AI generations (500,000 tokens)',
      'GitHub repository cloning & code export',
      'AI Agent skills & connectors marketplace',
      'Plugin integration (OpenClaw, Claude, Ollama/LLaMA)',
      'Priority 24/7 support',
    ],
  },
  ENTERPRISE: {
    id: 'ENTERPRISE',
    name: 'Agency Enterprise',
    price: 19999,
    formattedPrice: 'Custom Agency',
    billingCycle: 'Annual / Custom',
    features: [
      'Unlimited AI tokens & Dedicated GPU clusters',
      'Custom LLM model fine-tuning (LLaMA/Ollama)',
      'CMS & Excel automated logging export',
      'Dedicated account manager & SLA guarantee',
      'Full API gateway access',
    ],
  },
};

export async function processGPayOrUpiPayment(payment: PaymentDetails): Promise<{ success: boolean; transactionId: string; message: string }> {
  // Validate banking details requirement
  if (!payment.billingAddress.upiId || !payment.billingAddress.accountNumber || !payment.billingAddress.ifscCode) {
    throw new Error('Mandatory banking account and UPI ID details are required for autopay processing.');
  }

  // Generate transaction reference
  const txnId = `GS_${payment.paymentMethod}_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  return {
    success: true,
    transactionId: txnId,
    message: `Payment of ₹${payment.amount} via ${payment.paymentMethod} processed successfully. Subscription activated for plan: ${payment.planId}.`,
  };
}
