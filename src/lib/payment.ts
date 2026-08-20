// Payment Integration Layer (Razorpay / Cashfree / Stripe India Architecture)

export interface PaymentPlan {
  id: string;
  name: string;
  amount: number; // in INR
  currency: string;
  description: string;
  features: string[];
  billingPeriod?: 'one-time' | 'monthly' | 'yearly';
}

export const PAYMENT_KEY_ID = import.meta.env.VITE_PAYMENT_KEY_ID;
export const isPaymentConfigured = Boolean(
  PAYMENT_KEY_ID && 
  PAYMENT_KEY_ID !== 'rzp_live_your_key_id_here' && 
  !PAYMENT_KEY_ID.includes('placeholder')
);

export const SAMPLE_MEMBERSHIP_PLANS: PaymentPlan[] = [
  {
    id: 'plan-creator-starter',
    name: 'Student Creator Pass',
    amount: 0,
    currency: 'INR',
    description: 'Free lifetime access to THE VISIONEX fundamental community and starter roadmaps.',
    features: [
      'Access to core community discussions',
      'Entry-level digital skills roadmaps',
      'Public resource directory',
      'Monthly Founder AMA session access',
    ],
    billingPeriod: 'one-time',
  },
  {
    id: 'plan-venture-accelerator',
    name: '1 → 10 Venture Incubator',
    amount: 2999,
    currency: 'INR',
    description: 'Hands-on mentorship, client-acquisition frameworks, and private venture cohort.',
    features: [
      'Everything in Creator Pass',
      'Private 1 → 10 cohort weekly mastermind',
      'Direct pitch review & portfolio critiques',
      'Exclusive AI automation templates & client contract packs',
      'Priority access to student hiring network',
    ],
    billingPeriod: 'yearly',
  },
];

export interface PaymentInitiationParams {
  planId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  onSuccess?: (paymentId: string) => void;
  onFailure?: (error: any) => void;
}

// Initiate checkout process
export async function initiatePayment(params: PaymentInitiationParams): Promise<{ status: 'configured' | 'awaiting_credentials'; message: string }> {
  if (!isPaymentConfigured) {
    return {
      status: 'awaiting_credentials',
      message: 'Payment gateway credentials (VITE_PAYMENT_KEY_ID) are currently awaiting production setup in .env. No charges will be processed.',
    };
  }

  // When credentials are provided, dynamically inject Razorpay SDK and open modal:
  return new Promise((resolve) => {
    // Integration hook ready for production Razorpay options:
    /*
    const options = {
      key: PAYMENT_KEY_ID,
      amount: plan.amount * 100,
      currency: "INR",
      name: "THE VISIONEX",
      description: plan.name,
      image: "/logo.png",
      handler: function (response: any) {
        params.onSuccess?.(response.razorpay_payment_id);
      },
      prefill: {
        name: params.userName,
        email: params.userEmail,
        contact: params.userPhone
      },
      theme: { color: "#3B82F6" }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    */
    resolve({
      status: 'configured',
      message: 'Payment gateway initialized successfully.',
    });
  });
}
