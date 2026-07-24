'use client'

import { useState } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { CreditCard, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function UpgradeButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      // 1. Create Order on the server
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
      })

      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'GUIDESOFT.ONLINE',
        description: 'Upgrade to Pro Plan',
        image: '/icon-512x512.png',
        order_id: orderData.id,
        handler: async function (response: any) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyRes.json()

            if (verifyRes.ok) {
              toast.success('Successfully upgraded to Pro!')
              // Refresh the page or session to reflect new role
              router.refresh()
            } else {
              toast.error(verifyData.error || 'Payment verification failed')
            }
          } catch (err) {
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      }

      // @ts-ignore
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response: any) {
        toast.error('Payment failed: ' + response.error.description)
      })

      rzp.open()
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Failed to initiate payment')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault() // keep menu open while loading
        if (!isLoading) handleUpgrade()
      }}
      className="cursor-pointer"
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
      Upgrade to Pro (₹999)
    </DropdownMenuItem>
  )
}
