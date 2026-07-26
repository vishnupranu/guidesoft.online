'use client';

import React, { useState } from 'react';
import { PLAN_PRICING, PaymentDetails, processGPayOrUpiPayment } from '@/lib/payments/payment-service';
import { Check, Shield, CreditCard, Sparkles, AlertCircle } from 'lucide-react';

interface PricingModalProps {
  currentPlan?: string;
  onSuccess?: () => void;
}

export function PricingCardSection({ currentPlan = 'UNPAID', onSuccess }: PricingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'BASIC' | 'PREMIUM' | 'ENTERPRISE'>('PREMIUM');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'GPAY'>('UPI');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      const plan = PLAN_PRICING[selectedPlan];
      const payload: PaymentDetails = {
        planId: selectedPlan,
        paymentMethod,
        amount: plan.price,
        currency: 'INR',
        billingAddress: form,
      };

      const result = await processGPayOrUpiPayment(payload);
      setPaymentStatus(`Success! Transaction ID: ${result.transactionId}`);
      setTimeout(() => {
        setShowCheckoutModal(false);
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err: any) {
      setPaymentStatus(`Payment Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
          GuideSoft AI Memberships
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-foreground">
          Choose Your AI Accelerator Tier
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          No free generation. Secure GPay & UPI payment gateway with automatic banking account verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(Object.keys(PLAN_PRICING) as Array<keyof typeof PLAN_PRICING>).map((key) => {
          const plan = PLAN_PRICING[key];
          const isSelected = selectedPlan === key;
          const isPopular = key === 'PREMIUM';

          return (
            <div
              key={key}
              className={`relative rounded-2xl p-8 transition-all duration-200 border flex flex-col justify-between ${
                isPopular
                  ? 'bg-card border-primary ring-2 ring-primary/50 shadow-xl shadow-primary/10'
                  : 'bg-card/50 border-border hover:border-primary/50'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{plan.billingCycle}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-foreground">{plan.formattedPrice}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-sm text-foreground/90">
                      <Check className="w-4 h-4 text-primary shrink-0 mr-2.5 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60">
                <button
                  onClick={() => {
                    setSelectedPlan(key);
                    setShowCheckoutModal(true);
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    isPopular
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20'
                      : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-white'
                  }`}
                >
                  {currentPlan === key ? 'Active Subscription' : `Subscribe with GPay / UPI`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <h3 className="text-2xl font-bold text-foreground mb-1">
              Checkout - {PLAN_PRICING[selectedPlan].name}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Total Amount: <span className="font-bold text-primary">{PLAN_PRICING[selectedPlan].formattedPrice}</span>
            </p>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Select Payment Gateway
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`py-2.5 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 ${
                      paymentMethod === 'UPI' ? 'border-primary bg-primary/10 text-primary' : 'border-border'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" /> UPI ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('GPAY')}
                    className={`py-2.5 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 ${
                      paymentMethod === 'GPAY' ? 'border-primary bg-primary/10 text-primary' : 'border-border'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Google Pay
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">UPI ID (Autopay)</label>
                  <input
                    required
                    type="text"
                    placeholder="user@upi / mobile@gpay"
                    value={form.upiId}
                    onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Bank Name</label>
                  <input
                    required
                    type="text"
                    placeholder="HDFC / SBI / ICICI"
                    value={form.bankName}
                    onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">IFSC Code</label>
                  <input
                    required
                    type="text"
                    placeholder="HDFC0001234"
                    value={form.ifscCode}
                    onChange={(e) => setForm({ ...form, ifscCode: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Account Number</label>
                <input
                  required
                  type="password"
                  placeholder="Banking Account Number"
                  value={form.accountNumber}
                  onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Address</label>
                  <input
                    required
                    type="text"
                    placeholder="Street Address"
                    value={form.streetAddress}
                    onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Pincode</label>
                  <input
                    required
                    type="text"
                    placeholder="500001"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-border bg-background text-foreground"
                  />
                </div>
              </div>

              {paymentStatus && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium ${
                    paymentStatus.startsWith('Success')
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-destructive/10 text-destructive border border-destructive/20'
                  }`}
                >
                  {paymentStatus}
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  className="w-1/3 py-2.5 px-4 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-2/3 py-2.5 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing Payment...' : `Pay ${PLAN_PRICING[selectedPlan].formattedPrice} via ${paymentMethod}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
