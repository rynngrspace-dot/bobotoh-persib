import { MetadataRoute } from 'next'
import { getAllChants } from '@/lib/chantData'

export default function sitemap(): MetadataRoute.Sitemap {
  const chants = getAllChants();
  
  const chantEntries: MetadataRoute.Sitemap = chants.map((chant) => ({
    url: `https://chantpersib.vercel.app/chant/${chant.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: 'https://chantpersib.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://chantpersib.vercel.app/suara-bobotoh',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...chantEntries,
  ]
}
