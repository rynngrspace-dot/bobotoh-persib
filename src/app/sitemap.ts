import { MetadataRoute } from 'next'
import { getAllChants } from '@/lib/chantData'

export default function sitemap(): MetadataRoute.Sitemap {
  const chants = getAllChants();
  
  const chantEntries: MetadataRoute.Sitemap = chants.map((chant) => ({
    url: `https://chantpersib.com/chant/${chant.slug}`, // Update with real domain
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: 'https://chantpersib.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...chantEntries,
  ]
}
