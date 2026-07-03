import { MetadataRoute } from 'next'

const baseUrl = 'https://nokiantanssiasema.fi'

// Päivitä tämä kun sivun sisältö todella muuttuu merkittävästi
const lastModified = new Date('2026-07-03')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/hinnasto`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
