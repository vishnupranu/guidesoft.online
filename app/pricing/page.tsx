import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const pricingTiers = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    desc: 'Perfect for exploring and building small projects',
    features: [
      '1 project',
      'Community support',
      'Basic templates',
      'Standard deploy',
      'Standard AI model',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    desc: 'For creators and founders shipping real products',
    features: [
      'Unlimited projects',
      'Priority support',
      'All 100+ templates',
      'Custom domains',
      'Advanced AI models',
      'Real-time collaboration',
      'Team seats (up to 5)',
      'Analytics dashboard',
    ],
    cta: 'Start Building',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For teams that need full control and dedicated support',
    features: [
      'Everything in Pro',
      'SSO & audit logs',
      'Dedicated account manager',
      '99.9% SLA guarantee',
      'Custom integrations',
      'On-premise option',
      'Custom AI fine-tuning',
      'Unlimited team seats',
    ],
    cta: 'Talk to Sales',
    popular: false,
  },
]

const comparisonFeatures = [
  { name: 'Projects', starter: '1', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Templates', starter: 'Basic', pro: 'All 100+', enterprise: 'All + Custom' },
  { name: 'AI Models', starter: 'Standard', pro: 'Advanced', enterprise: 'Custom Fine-tuned' },
  { name: 'Deploy', starter: 'Standard', pro: 'Custom Domains', enterprise: 'Dedicated Infra' },
  { name: 'Support', starter: 'Community', pro: 'Priority', enterprise: '24/7 Dedicated' },
  { name: 'Team Seats', starter: '1', pro: '5', enterprise: 'Unlimited' },
  { name: 'Analytics', starter: false, pro: true, enterprise: true },
  { name: 'SSO / SAML', starter: false, pro: false, enterprise: true },
  { name: 'Audit Logs', starter: false, pro: false, enterprise: true },
  { name: 'SLA', starter: false, pro: false, enterprise: '99.9%' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800">
            Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
            Start free, upgrade when you need more. No surprise bills, no fine print.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {pricingTiers.map((tier, idx) => (
            <div
              key={tier.name}
              className={`relative bg-white dark:bg-zinc-900 rounded-3xl p-8 border ${tier.popular ? 'border-orange-300 dark:border-orange-700 shadow-xl shadow-orange-500/10' : 'border-zinc-200 dark:border-zinc-800'} flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{tier.desc}</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-black">{tier.price}</span>
                {tier.period && <span className="text-zinc-500 dark:text-zinc-400 text-lg">{tier.period}</span>}
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
                <Link href={tier.name === 'Enterprise' ? '#contact' : '/auth/signin'}>
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Compare every feature</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="pb-4 font-semibold w-1/3">Feature</th>
                  <th className="pb-4 font-semibold text-center">Starter</th>
                  <th className="pb-4 font-semibold text-center">Pro</th>
                  <th className="pb-4 font-semibold text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feat) => (
                  <tr key={feat.name} className="border-b border-zinc-100 dark:border-zinc-800/50">
                    <td className="py-4 text-zinc-700 dark:text-zinc-300">{feat.name}</td>
                    <td className="py-4 text-center">
                      {typeof feat.starter === 'boolean' ? (
                        feat.starter ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-zinc-400">-</span>
                      ) : (
                        <span className="text-zinc-700 dark:text-zinc-300">{feat.starter}</span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {typeof feat.pro === 'boolean' ? (
                        feat.pro ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-zinc-400">-</span>
                      ) : (
                        <span className="text-zinc-700 dark:text-zinc-300">{feat.pro}</span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {typeof feat.enterprise === 'boolean' ? (
                        feat.enterprise ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-zinc-400">-</span>
                      ) : (
                        <span className="text-zinc-700 dark:text-zinc-300">{feat.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
