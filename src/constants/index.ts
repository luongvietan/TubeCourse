// Navigation Links
export const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
] as const;

// Dashboard Navigation
export const DASHBOARD_NAV = [
    { href: '/dashboard', label: 'Overview', icon: 'LayoutDashboard' },
    { href: '/dashboard/courses', label: 'My Courses', icon: 'BookOpen' },
    { href: '/dashboard/settings', label: 'Settings', icon: 'Settings' },
    { href: '/dashboard/billing', label: 'Billing', icon: 'CreditCard' },
] as const;

// Pricing Plans
export const PRICING_PLANS = [
    {
        name: 'Free',
        price: '$0',
        description: 'Perfect for trying out TubeCourse',
        features: [
            '3 playlists per month',
            'Basic summaries',
            'Email support',
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Pro',
        price: '$19',
        description: 'For serious learners',
        features: [
            'Unlimited playlists',
            'Advanced AI summaries',
            'Key points extraction',
            'Export to PDF/Markdown',
            'Priority support',
        ],
        cta: 'Start Pro Trial',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For teams and organizations',
        features: [
            'Everything in Pro',
            'Team collaboration',
            'API access',
            'Custom integrations',
            'Dedicated support',
        ],
        cta: 'Contact Sales',
        popular: false,
    },
] as const;

// Course Status Colors
export const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
} as const;

// Limits
export const LIMITS = {
    FREE_PLAYLISTS_PER_MONTH: 3,
    MAX_VIDEOS_PER_PLAYLIST: 100,
    MAX_VIDEO_DURATION: 3600 * 4, // 4 hours in seconds
} as const;
