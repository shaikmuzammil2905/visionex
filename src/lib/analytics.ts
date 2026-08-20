// Google Analytics 4 (GA4) Integration Helper

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const isGAConfigured = Boolean(
  GA_MEASUREMENT_ID && 
  GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && 
  !GA_MEASUREMENT_ID.includes('placeholder')
);

// Initialize GA script tag dynamically if valid measurement ID is present
export function initAnalytics(): void {
  if (!isGAConfigured || typeof window === 'undefined') return;

  if (document.getElementById('ga-script')) return;

  const script1 = document.createElement('script');
  script1.id = 'ga-script';
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  });
}

// Track page view event
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return;
  if (isGAConfigured && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  } else {
    // Development console audit
    // console.log(`[Analytics: PageView] ${path}`);
  }
}

// Track custom user actions
export function trackEvent(action: string, category: string, label?: string, value?: number): void {
  if (typeof window === 'undefined') return;
  if (isGAConfigured && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    // console.log(`[Analytics: Event] ${category} -> ${action} (${label || ''})`);
  }
}

export const analytics = {
  trackJoinCommunity: (source: string) => trackEvent('join_community_click', 'Engagement', source),
  trackContactSubmit: (subject: string) => trackEvent('contact_form_submitted', 'Leads', subject),
  trackWhatsAppClick: (context: string) => trackEvent('whatsapp_click', 'Contact', context),
  trackPhoneClick: () => trackEvent('phone_call_click', 'Contact', '9652553433'),
  trackBlogView: (slug: string, title: string) => trackEvent('blog_article_viewed', 'Content', `${slug}: ${title}`),
  trackRegister: (role: string) => trackEvent('user_signup', 'Auth', role),
  trackLogin: () => trackEvent('user_login', 'Auth', 'success'),
};
