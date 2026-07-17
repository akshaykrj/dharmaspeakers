import Image from "next/image";

export const metadata = {
  title: "Thoughts",
  description: "Essays and reflections by DSB speakers exploring Dharmic ideas across temples, civilisation, history, leadership, yoga, and Ayurveda.",
};

async function getOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 604800 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DSB-Bot/1.0)" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match =
      html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i) ||
      html.match(/name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);
    const img = match?.[1] ?? null;
    if (!img) return null;
    // Resolve relative URLs
    if (img.startsWith("http")) return img;
    const base = new URL(url);
    return new URL(img, base.origin).href;
  } catch {
    return null;
  }
}

const themes = [
  {
    theme: "Temples & Sacred Traditions",
    articles: [
      { title: "Many Meanings Of The Hindu Temple", speaker: "Pankaj Saxena", source: "Indica Today", url: "https://www.indica.today/long-reads/many-meanings-of-the-hindu-temple/", year: "2022" },
      { title: "The Story Of A Priest", speaker: "Pankaj Saxena", source: "Indica Today", url: "https://www.indica.today/long-reads/the-story-of-a-priest/", year: "2023" },
      { title: "Kṣetra, Śāstra, Utsava", speaker: "Pankaj Saxena", source: "Bodha", url: "https://www.bodharesearch.in/blog/kshetrashastrautsava", year: "" },
      { title: "Shall Non-Brahmins Become Temple Priests?", speaker: "Pankaj Saxena", source: "Pragyata", url: "https://pragyata.com/shall-non-brahmins-become-temple-priests/", year: "" },
      { title: "What if We Don't Free Hindu Temples?", speaker: "Pankaj Saxena", source: "Pragyata", url: "https://pragyata.com/what-if-we-dont-free-hindu-temples/", year: "" },
    ],
  },
  {
    theme: "Civilization, Culture & Dharma",
    articles: [
      { title: "Turners of Time — How Hindu Festivals Rotate the Year", speaker: "Pankaj Saxena", source: "Bodha", url: "https://www.bodharesearch.in/blog/turnersoftime", year: "" },
      { title: "Svayambodha and Śatrubodha — Two Wheels of Civilization", speaker: "Pankaj Saxena", source: "Bodha", url: "https://www.bodharesearch.in/blog/svayambodha-shatrubodha", year: "" },
      { title: "Culture and Warfare — Finding Balance Through Dharma", speaker: "Pankaj Saxena", source: "Bodha", url: "https://www.bodharesearch.in/blog/cultureandwarfare", year: "" },
      { title: "The Problem of Culture Transmission", speaker: "Pankaj Saxena", source: "Bodha", url: "https://www.bodharesearch.in/blog/problemofculturetransmission", year: "" },
      { title: "Secularism Was Never Ours", speaker: "Pankaj Saxena", source: "Indiafacts", url: "https://www.indiafacts.org.in/secularism-was-never-ours/", year: "" },
      { title: "Hinduism in the Blind Spot — Part 1", speaker: "Amritanshu Pandey", source: "Bodha", url: "https://www.bodharesearch.in/blog/hinduisminblindspot1", year: "2023" },
      { title: "Hinduism in the Blind Spot — Part 2", speaker: "Amritanshu Pandey", source: "Bodha", url: "https://www.bodharesearch.in/blog/hinduisminblindspot2", year: "2023" },
      { title: "A Dharmic Lens to Civilizational Theory", speaker: "Amritanshu Pandey", source: "Bodha", url: "https://www.bodharesearch.in/blog/dharmic-lens-civilizational-theory", year: "" },
      { title: "The Dharmika Gene", speaker: "Amritanshu Pandey", source: "Bodha", url: "https://www.bodharesearch.in/blog/dharmikagene", year: "" },
      { title: "Civilizations as Kārmika Streams", speaker: "Amritanshu Pandey", source: "Bodha", url: "https://www.bodharesearch.in/blog/civilizations-as-karmic-streams", year: "" },
    ],
  },
  {
    theme: "History, Origins & Vedic Knowledge",
    articles: [
      { title: "How to Build a Civilization", speaker: "Amritanshu Pandey", source: "Bodha", url: "https://www.bodharesearch.in/blog/how-to-build-a-civilization", year: "" },
      { title: "Grand History — Part 1", speaker: "Amritanshu Pandey", source: "Bodha", url: "https://www.bodharesearch.in/blog/grandhistoryone", year: "" },
      { title: "14 Lokas and 0 Telescopes — The Cosmos SETI Cannot Scan", speaker: "Amritanshu Pandey", source: "Bodha", url: "https://www.bodharesearch.in/blog/14-lokas-0-telescopes", year: "2026" },
      { title: "Bhāratīya Wanderlust — A Defence of the Out-of-India Model, Part 1", speaker: "Amritanshu Pandey", source: "Bodha", url: "https://www.bodharesearch.in/blog/bharatiya-wanderlust-1", year: "" },
      { title: "AiholePrashasti: Inscriptional Evidence Against the Aryan Invasion Theory", speaker: "Shivakumar G V", source: "Indica Today", url: "https://www.indica.today/long-reads/aiholeprashasti-inscriptional-evidence-against-the-aryan-invasion-theory/", year: "" },
    ],
  },
  {
    theme: "Leadership, Governance & Knowledge Systems",
    articles: [
      { title: "Indian Knowledge Systems — A Vision", speaker: "Shivakumar G V", source: "Indica Today", url: "https://www.indica.today/long-reads/indian-knowledge-systems-a-vision/", year: "2024" },
      { title: "Rāja Dharma: Puruṣārtha as a Policy Imperative", speaker: "Shivakumar G V", source: "Indica Today", url: "https://www.indica.today/long-reads/part-1-raja-dharma-purusartha-as-a-policy-imperative/", year: "2026" },
      { title: "Excellence and Legacy as a Function of Swadharma and Purushartha", speaker: "Shivakumar G V", source: "Indica Today", url: "https://www.indica.today/quick-reads/indic-uvacha-excellence-and-legacy-as-a-function-of-swadharma-and-purushartha/", year: "2026" },
      { title: "The Altered Distance: State–Community Relations and Representational Politics", speaker: "Shivakumar G V", source: "Indica Today", url: "https://www.indica.today/long-reads/the-altered-distance-state-community-relations-the-rise-of-representational-politics-in-india/", year: "2026" },
      { title: "Recovering An Indigenous Knowledge System & Overcoming the Colonising Mind", speaker: "Raghu Ananthanarayanan", source: "3rd Space", url: "https://www.raghuananthanarayanan.com/uploads/7/4/5/2/74524639/recovering_an_indigenous_knowledge_system___overcoming_the_colonising_mind_-_3rd_space_feb_.pdf", year: "2024" },
    ],
  },
  {
    theme: "Yoga, Mind & Consciousness",
    articles: [
      { title: "The Yogasutras, Performing Arts, and Health", speaker: "Raghu Ananthanarayanan", source: "Indica Today", url: "https://www.indica.today/long-reads/the-yogasutras-yoga-performing-arts-and-health/", year: "" },
      { title: "Patanjali's Mindfulness — The 7 Steps to Self-Fullness", speaker: "Raghu Ananthanarayanan", source: "Indica Today", url: "https://www.indica.today/research/patanjali-mindfulness-the-7-steps-to-self-fullness/", year: "" },
      { title: "Fulfillment through Yoga", speaker: "Raghu Ananthanarayanan", source: "Indica Today", url: "https://www.indica.today/long-reads/fulfillment-through-yoga/", year: "" },
      { title: "Religious or Spiritual — Where Are We Headed?", speaker: "Raghu Ananthanarayanan", source: "OHeraldo", url: "https://www.raghuananthanarayanan.com/uploads/7/4/5/2/74524639/religious_or_spiritual_%E2%80%93_where_are_we_headed.pdf", year: "2024" },
      { title: "Metaphors of Bhagavata — Part 1", speaker: "Shivakumar G V", source: "Indica Today", url: "https://www.indica.today/long-reads/part-1-metaphors-of-bhagavata/", year: "" },
      { title: "Conceptualising Bhāvana: Contemplative Hindu Traditions & Emotion", speaker: "Dr. Shilpa Pandit", source: "Sage Journals", url: "https://journals.sagepub.com/doi/full/10.1177/1354067X221118919", year: "2022" },
      { title: "Decolonizing Consciousness: Reclaiming the Indian Psychology of Well-being", speaker: "Dr. Shilpa Pandit", source: "ResearchGate", url: "https://www.researchgate.net/publication/368377558_Decolonizing_Consciousness_Reclaiming_the_Indian_Psychology_of_Well-being", year: "2023" },
    ],
  },
  {
    theme: "Ayurveda & Traditional Healing",
    articles: [
      { title: "From Fragmentation to Wholeness: Why Traditional Medicine Matters Today", speaker: "Dr. P. Rammanohar", source: "THIP Media", url: "https://www.thip.media/uncategorized/from-fragmentation-to-wholeness-why-traditional-medicine-matters-today/132716/", year: "2025" },
      { title: "Debunking Popular Myths About Ayurveda: A Fact-Check Perspective", speaker: "Dr. P. Rammanohar", source: "THIP Media", url: "https://www.thip.media/expert-columns/debunking-popular-myths-about-ayurveda-a-fact-check-perspective/134830/", year: "2025" },
      { title: "Metabolic Disorders and Weight Management: An Ayurvedic View", speaker: "Dr. P. Rammanohar", source: "THIP Media", url: "https://www.thip.media/expert-columns/metabolic-disorders-and-weight-management-an-ayurvedic-view/130193/", year: "2025" },
    ],
  },
];

export default async function ThoughtsPage() {
  // Fetch all OG images in parallel (server-side, cached 1 week)
  const allArticles = themes.flatMap((t) => t.articles);
  const ogResults = await Promise.allSettled(allArticles.map((a) => getOgImage(a.url)));
  const ogMap: Record<string, string | null> = {};
  allArticles.forEach((a, i) => {
    const r = ogResults[i];
    ogMap[a.url] = r.status === "fulfilled" ? r.value : null;
  });

  return (
    <main>
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

        {/* PAGE HEADER */}
        <section className="max-w-3xl">
          <h1 className="text-4xl font-serif mb-6">
            Thoughts
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            This section brings together reflective writing and textual records
            that explore Dharmic ideas in conversation with contemporary life,
            experience, and inquiry.
          </p>
        </section>

        {/* ESSAYS & REFLECTIONS */}
        <section className="space-y-8 border-t border-[#E6E4DF] pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-serif">
                Essays &amp; Reflections
              </h2>
            </div>
            <div className="md:col-span-2">
              <p className="leading-relaxed text-gray-800">
                Written reflections and essays by speakers associated with the Dharma Speakers Bureau,
                exploring Dharmic ideas as they intersect with modern contexts and lived experience.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {themes.map(({ theme, articles }) => (
              <div key={theme}>
                <p className="text-sm font-medium uppercase tracking-wide text-[#D4A441] mb-3">{theme}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {articles.map(({ title, speaker, source, url, year }) => {
                    const thumb = ogMap[url];
                    return (
                      <li key={url}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex flex-col h-full rounded-md border border-[#E6E4DF] bg-white overflow-hidden hover:border-[#D4A441] transition group"
                        >
                          {thumb ? (
                            <div className="relative w-full aspect-[16/9]">
                              <Image
                                src={thumb}
                                alt={title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-full aspect-[16/9] bg-[#F1ECE2] flex items-center justify-center">
                              <span className="text-[11px] text-[#9A8A72] font-medium">{source}</span>
                            </div>
                          )}
                          <div className="px-3 py-2.5 flex flex-col flex-1">
                            <p className="text-[13px] text-[#2B2B2B] group-hover:text-[#D4A441] transition leading-snug flex-1">{title}</p>
                            <p className="text-[11px] text-[#D4A441] mt-2">{speaker}</p>
                            <p className="text-[11px] text-[#8A8A8A]">{source}{year ? ` · ${year}` : ""}</p>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>


      </div>
    </main>
  );
}
