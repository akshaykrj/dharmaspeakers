import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dharmaspeakers.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/speakers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/programs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/thoughts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/join`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];
}
