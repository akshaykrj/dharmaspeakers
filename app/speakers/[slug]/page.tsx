import { supabase } from "@/lib/supabase";

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
      <div>
        <img
          src={speaker.photo_url}
          alt={speaker.full_name}
          className="w-full rounded-xl bg-gray-200 object-cover"
        />
      </div>

      <div>
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
      </div>
    </main>
  );
}
