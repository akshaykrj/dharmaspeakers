import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function SpeakersPage() {
  const { data: speakers, error } = await supabase
    .from("speakers")
    .select(`
      full_name,
      current_designation,
      core_knowledge_domains,
      location,
      slug,
      photo_url
    `)
    .eq("public_profile", true)
    .order("full_name", { ascending: true });

  if (error) {
    return (
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-24">
        <p className="text-red-600">
          Unable to load speakers at this time.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-[#FBFAF7]">
      
      {/* Page Introduction */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-3xl font-serif text-[#2B2B2B] mb-4">
          Speaker Directory
        </h1>
        <p className="text-[16px] text-[#4A4A4A] max-w-3xl leading-relaxed">
          A curated directory of scholars, practitioners, and professionals
          whose work engages with Dharmic thought and its contemporary
          applications.
        </p>
      </section>

      {/* Speaker Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {speakers && speakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-6">
            {speakers.map((speaker) => (
              <Link
                key={speaker.slug}
                href={`/speakers/${speaker.slug}`}
                className="self-start border border-[#E6E4DF] p-4 bg-white hover:border-[#D4A441] transition block"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-full">
                    {speaker.photo_url ? (
                      <img
                        src={speaker.photo_url}
                        alt={speaker.full_name}
                        className="w-full aspect-[4/3] object-cover object-top rounded-md bg-gray-200"
                      />
                    ) : (
                      <div className="w-full aspect-[4/3] rounded-md bg-[#F1ECE2] flex items-center justify-center text-2xl font-serif text-[#8B7C66]">
                        {(speaker.full_name || "Speaker")
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part: string) => part[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-serif text-[#2B2B2B] mb-1">
                      {speaker.full_name}
                    </h2>

                    {speaker.current_designation && (
                      <p className="text-[13px] text-[#6A6A6A] mb-3 leading-snug">
                        {speaker.current_designation}
                      </p>
                    )}

                    {speaker.core_knowledge_domains && speaker.core_knowledge_domains.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {speaker.core_knowledge_domains.map((domain: string) => (
                          <span
                            key={domain}
                            className="rounded-full bg-[#F1ECE2] px-2.5 py-0.5 text-[12px] text-[#6A5D49]"
                          >
                            {domain}
                          </span>
                        ))}
                      </div>
                    )}

                    {speaker.location && (
                      <p className="text-[14px] text-[#6A6A6A]">
                        {speaker.location}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[#6A6A6A]">
            Speaker profiles will be published shortly.
          </p>
        )}
      </section>

    </main>
  );
}
