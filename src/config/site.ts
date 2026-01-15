export const siteConfig = {
    name: 'TubeCourse',
    description: 'AI-powered YouTube playlist summarizer. Transform lengthy video courses into digestible summaries.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    ogImage: '/og.png',
    links: {
        twitter: 'https://twitter.com/tubecourse',
        github: 'https://github.com/tubecourse',
    },
    creator: 'TubeCourse Team',
    keywords: [
        'YouTube',
        'playlist',
        'summarizer',
        'AI',
        'course',
        'learning',
        'education',
        'video summary',
    ],
};

export type SiteConfig = typeof siteConfig;
