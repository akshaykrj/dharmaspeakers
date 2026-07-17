import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "**.indica.today" },
      { protocol: "https", hostname: "indica.today" },
      { protocol: "https", hostname: "**.bodharesearch.in" },
      { protocol: "https", hostname: "bodharesearch.in" },
      { protocol: "https", hostname: "**.pragyata.com" },
      { protocol: "https", hostname: "pragyata.com" },
      { protocol: "https", hostname: "**.indiafacts.org.in" },
      { protocol: "https", hostname: "indiafacts.org.in" },
      { protocol: "https", hostname: "**.thip.media" },
      { protocol: "https", hostname: "thip.media" },
      { protocol: "https", hostname: "**.sagepub.com" },
      { protocol: "https", hostname: "sagepub.com" },
      { protocol: "https", hostname: "**.researchgate.net" },
      { protocol: "https", hostname: "researchgate.net" },
      { protocol: "https", hostname: "**.raghuananthanarayanan.com" },
      { protocol: "https", hostname: "raghuananthanarayanan.com" },
      { protocol: "https", hostname: "**.3rdspace.in" },
    ],
  },
};

export default nextConfig;
