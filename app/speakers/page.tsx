import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function SpeakersPage() {
  const { data: speakers, error } = await supabase
    .from("speakers")
    .select(`
      full_name,
      short_bio,
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
          Speakers Directory
        </h1>
        <p className="text-[16px] text-[#4A4A4A] max-w-3xl leading-relaxed">
          A curated directory of scholars, practitioners, and professionals
          whose work engages with Dharmic thought and its contemporary
          applications.
        </p>
      </section>

      {/* Speaker Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        {speakers && speakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {speakers.map((speaker) => (
              <div
                key={speaker.slug}
                className="border border-[#E6E4DF] p-6 bg-white"
              >
                <div className="flex gap-6">
                  <div className="w-32 shrink-0">
                    {speaker.photo_url ? (
                      <img
                        src={speaker.photo_url}
                        alt={speaker.full_name}
                        className="w-full aspect-square object-cover rounded-md bg-gray-200"
                      />
                    ) : (
                      <div className="w-full aspect-square rounded-md bg-[#F1ECE2] flex items-center justify-center text-xl font-serif text-[#8B7C66]">
                        {(speaker.full_name || "Speaker")
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                        .map((part: string) => part[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}

                    <div className="mt-3 text-center">
                      <Link
                        href={`/speakers/${speaker.slug}`}
                        className="inline-block text-[14px] text-[#2B2B2B] underline underline-offset-4"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-serif text-[#2B2B2B] mb-2">
                      {speaker.full_name}
                    </h2>

                    {speaker.core_knowledge_domains && (
                      <p className="text-[14px] text-[#6A6A6A] mb-1">
                        {speaker.core_knowledge_domains.join(", ")}
                      </p>
                    )}

                    {speaker.location && (
                      <p className="text-[14px] text-[#6A6A6A] mb-3">
                        {speaker.location}
                      </p>
                    )}

                    {speaker.short_bio && (
                      <p className="text-[15px] text-[#4A4A4A] leading-relaxed">
                        {speaker.short_bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
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
