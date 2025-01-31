import Env from '@/lib/env';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    "/[businessID]",
                    "/listing-login",
                    "/listing-signup",
                    "/login",
                    "/signup",
                    "/services/[service]",
                    "/subscription"
                ],
                disallow: [
                    '/listing-forgot-password/[type]',
                    '/listing-password-update-with-otp/[type]/[input]',
                    '/listing-signup-with-otp-password/[type]/[input]',
                    '/listing-verify/[type]/[input]',
                    '/listing-profile/[id]',
                    '/forgot-password/[type]',
                    '/user-verify/[type]/[input]',
                    '/user-profile/[id]',
                    '/feedback/[userType]',
                    '/privacy-policy',
                    '/terms-and-conditions',
                    '/admin',
                    '/admin/*',
                    '/api/*',
                    '/auth/callback'
                ],
            },
        ],
        sitemap: `${Env.BASE_URL}/sitemap.xml`,
        host: `${Env.BASE_URL}`,
    };
}

// /robots.txt