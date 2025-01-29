import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Cybersecurity One Stop",
        short_name: "CybersecurityOneStop",
        description:
            "Cybersecurity One Stop provides expert fraud prevention, cyber threat protection, and security solutions to safeguard individuals and businesses.",
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#e03944',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
        screenshots: [
            {
                src: "screenshots/homePage.png",
                sizes: "1280x720",
                type: "image/png",
            },
        ],
        categories: [
            "Financial Fraud",
            "Investment Fraud",
            "Credit Card Fraud",
            "Tax Fraud",
            "Cyber Fraud",
            "Social Media Fraud",
            "Online Shopping Fraud",
            "Telecom Fraud",
            "Corporate Fraud",
            "Employment Fraud",
            "Real Estate Fraud",
            "Insurance Fraud",
            "Identity Theft",
            "Romance Fraud",
            "Charity Fraud",
            "Healthcare Fraud",
        ],
        lang: "en",
    }
}

