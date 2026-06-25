import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function splitTextList(value: string | null) {
  if (!value) return [];

  return value
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function isUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function parsePublication(line: string): { title: string; url: string | null } {
  const parts = line.split("|").map((s) => s.trim());
  if (parts.length >= 2 && isUrl(parts[1])) {
    return { title: parts[0], url: parts[1] };
  }
  return { title: line.trim(), url: null };
}

export default async function SpeakerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("speakers")
    .select("*")
    .eq("slug", slug)

  const speaker = data?.[0];

  if (!speaker) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-gray-700">
        Speaker not found
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12">
      <div className="space-y-6">
        {speaker.photo_url ? (
          <img
            src={speaker.photo_url}
            alt={speaker.full_name}
            className="w-full rounded-xl bg-gray-200 object-cover"
          />
        ) : (
          <div className="w-full aspect-square rounded-xl bg-[#F1ECE2] flex items-center justify-center text-5xl font-serif text-[#8B7C66]">
            {(speaker.full_name || "Speaker")
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part: string) => part[0])
              .join("")
              .toUpperCase()}
          </div>
        )}

        <Link
          href={`/request?speaker=${encodeURIComponent(
            speaker.full_name
          )}`}
          className="inline-flex w-full items-center justify-center rounded-md bg-[#D4A441] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C2953A]"
        >
          Request This Speaker
        </Link>
      </div>

      <div className="space-y-10">
        <h1 className="text-3xl font-serif text-[#111111]">
          {speaker.full_name}
        </h1>

        {speaker.location && (
          <p className="mt-2 text-sm text-gray-600">
            {speaker.location}
          </p>
        )}

        {speaker.detailed_bio && (
          <p className="mt-6 text-[17px] leading-relaxed">
            {speaker.detailed_bio}
          </p>
        )}

        {Array.isArray(speaker.talk_topics) &&
          speaker.talk_topics.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif text-[#111111] mb-4">
                Key Topics
              </h2>
              <div className="flex flex-wrap gap-3">
                {speaker.talk_topics.map((topic: string) => (
                  <span
                    key={topic}
                    className="rounded-full bg-[#F1ECE2] px-4 py-2 text-sm text-[#4A4A4A]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </section>
          )}

        {splitTextList(speaker.key_publications).length > 0 && (
          <section>
            <h2 className="text-2xl font-serif text-[#111111] mb-4">
              Books / Publications
            </h2>
            <ul className="space-y-3 text-[16px] leading-relaxed text-[#4A4A4A] list-disc pl-5">
              {splitTextList(speaker.key_publications).map((publication) => {
                const { title, url } = parsePublication(publication);
                return (
                  <li key={publication}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4 hover:text-[#2B2B2B]"
                      >
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {(splitTextList(speaker.sample_talk_links).length > 0 ||
          splitTextList(speaker.media_mentions).length > 0) && (
          <section>
            <h2 className="text-2xl font-serif text-[#111111] mb-4">
              Sample Talks / Media
            </h2>

            <div className="space-y-6">
              {splitTextList(speaker.sample_talk_links).length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-[#2B2B2B] mb-3">
                    Sample Talks
                  </h3>
                  <ul className="space-y-2 text-[16px] text-[#4A4A4A]">
                    {splitTextList(speaker.sample_talk_links).map(
                      (item) => (
                        <li key={item}>
                          {isUrl(item) ? (
                            <a
                              href={item}
                              target="_blank"
                              rel="noreferrer"
                              className="underline underline-offset-4 hover:text-[#2B2B2B]"
                            >
                              {item}
                            </a>
                          ) : (
                            item
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {splitTextList(speaker.media_mentions).length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-[#2B2B2B] mb-3">
                    Media
                  </h3>
                  <ul className="space-y-2 text-[16px] text-[#4A4A4A]">
                    {splitTextList(speaker.media_mentions).map((item) => (
                      <li key={item}>
                        {isUrl(item) ? (
                          <a
                            href={item}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-4 hover:text-[#2B2B2B]"
                          >
                            {item}
                          </a>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
