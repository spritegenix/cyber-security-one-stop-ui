import Env from '@/lib/env'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    //   const business = await fetchBusinessById({ businessSlug: id });
    // const businessEntries: MetadataRoute.Sitemap = business.map((item: any) => ({
    //     url: `${Env.BASE_URL}/${item?.slug}`,
    //     // lastModified: new Date(),
    //     changeFrequency: 'weekly',
    //     priority: 2,
    // }));
    return [
        {
            url: `${Env.BASE_URL}`,
            // lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // ...businessEntries,
    ]
}


// /sitemap.xml