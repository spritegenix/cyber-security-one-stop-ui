import Env from "@/lib/env";
import type { MetadataRoute } from "next";
import { fetchBusinessSlugsSSR, fetchCategoriesSSR } from "./_queryCall/ssr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const data = await fetchBusinessSlugsSSR();

        if (!data || !data.getAllBusinesses) {
            console.warn("No business slugs found.");
            return [
                {
                    url: `${Env.BASE_URL}`,
                    changeFrequency: "weekly",
                    priority: 1,
                },
            ];
        }

        const businessEntries: MetadataRoute.Sitemap = data.getAllBusinesses.map(
            ({ slug }: { slug: string }) => (
                { url: `${Env.BASE_URL}${slug}`, changeFrequency: "weekly", priority: 0.8, }
            )
        );

        const category = await fetchCategoriesSSR();

        if (!category || !category.allCategories) {
            console.warn("No categories found.");
            return [
                {
                    url: `${Env.BASE_URL}`,
                    changeFrequency: "weekly",
                    priority: 0.8,
                },
            ];
        }

        const categoryEntries: MetadataRoute.Sitemap = category.allCategories.map(
            ({ slug }: { slug: string }) => (
                { url: `${Env.BASE_URL}services/${slug}`, changeFrequency: "weekly", priority: 0.8, }
            )
        );

        return [
            { url: `${Env.BASE_URL}`, changeFrequency: "weekly", priority: 1, },
            { url: `${Env.BASE_URL}login`, changeFrequency: "monthly", priority: 0.8 },
            { url: `${Env.BASE_URL}signup`, changeFrequency: "monthly", priority: 0.8 },
            { url: `${Env.BASE_URL}listing-login`, changeFrequency: "monthly", priority: 0.8 },
            { url: `${Env.BASE_URL}listing-signup`, changeFrequency: "monthly", priority: 0.8 },
            { url: `${Env.BASE_URL}subscription`, changeFrequency: "monthly", priority: 0.7 },
            { url: `${Env.BASE_URL}privacy-policy`, changeFrequency: "yearly", priority: 0.5 },
            ...businessEntries,
            ...categoryEntries
        ];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [
            {
                url: `${Env.BASE_URL}`,
                changeFrequency: "weekly",
                priority: 1,
            },
        ];
    }
}



// /sitemap.xml