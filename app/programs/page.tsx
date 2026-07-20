import Image from "next/image";
import { getUpcomingEvents } from "@/lib/events";

export const metadata = {
  title: "Programs",
  description: "Upcoming and past programs by the Dharma Speakers Bureau — DharmaLIVE webinars, lectures, and events.",
};

export const revalidate = 60;

export default async function ProgramsPage() {
  const upcomingEvents = await getUpcomingEvents();
  return (
    <main>
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

        {/* PAGE HEADER */}
        <section className="max-w-3xl">
          <h1 className="text-4xl font-serif mb-6">
            Programs
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            The Dharma Speakers Bureau curates and supports a range of programs
            that foster thoughtful engagement with Dharmic ideas across
            academic, cultural, and public platforms.
          </p>
        </section>

        {/* EVENT CALENDAR */}
        <section className="space-y-6 border-t border-[#E6E4DF] pt-8">
          <div>
            <h2 className="text-2xl font-serif mb-3">
              Event Calendar
            </h2>
            <p className="leading-relaxed text-gray-800">
              The Event Calendar presents upcoming lectures, dialogues, and
              engagements involving speakers associated with the Bureau.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="bg-[#FAFAF8] border border-[#E6E4DF] rounded-md p-5 flex gap-4 items-start">
                {event.photoUrl ? (
                  <Image src={event.photoUrl} alt={event.speaker} width={64} height={64} className="rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#F1ECE2] flex items-center justify-center shrink-0 text-base font-serif text-[#8B7C66]">
                    {event.speaker.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium tracking-wide text-[#D4A441] mb-1">{event.type}</p>
                  <h3 className="text-lg font-serif text-[#111111] mb-1">{event.title}</h3>
                  <p className="text-sm text-[#6A6A6A]">{event.speaker} &nbsp;·&nbsp; {event.date} &nbsp;·&nbsp; {event.timePst} &nbsp;·&nbsp; {event.timeIst}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ONGOING & PAST PROGRAMS */}
        <section className="space-y-8 border-t border-[#E6E4DF] pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-serif">
                Ongoing &amp; Past Programs
              </h2>
            </div>

            <div className="md:col-span-2">
              <p className="leading-relaxed text-gray-800">
                This section documents the Bureau’s active and completed
                initiatives, including thematic series, lecture cycles,
                workshops, and collaborations supported over time.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-wide text-[#D4A441] border-b border-[#E6E4DF] pb-3">DharmaLIVE Webinars</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {[
                { title: "Living with Purpose (Purushartha)", speaker: "Shivakumar G V", index: 1, videoId: "nCB-KEyZGhQ", photo: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/shivakumar.jpeg" },
                { title: "Dharma, Health and Leadership", speaker: "Dr. P. Rammanohar", index: 3, videoId: "9PQleyenLOw", photo: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/rammanohar.jpg" },
                { title: "Leadership and Rasa in Indian Psychology of Emotion", speaker: "Dr. Shilpa Pandit", index: 4, videoId: "BDKrnRtC400", photo: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/shilpa%20pandit.jpg" },
                { title: "The Aryan Invasion Theory: Origins, Debates, Landscape", speaker: "Amritanshu Pandey", index: 5, videoId: "xRu17aT-7Zs", photo: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/amritanshupandey.jpeg" },
                { title: "Dissolving Caste Consciousness", speaker: "Pt. Satish K Sharma", index: 6, videoId: "uPjF3oV8io8", photo: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/satish%20sharma.jpeg" },
                { title: "Myths and Learnings from Ramayan and Mahabharat", speaker: "Ami Ganatra", index: 7, videoId: "O2vzy_fRbOc", photo: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/ami.webp" },
                { title: "The Five Seats of Power: Leadership Archetypes from the Mahabharata", speaker: "Raghu Ananthanarayanan", index: 8, videoId: "8slGoeTI8V0", photo: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/raghu.png" },
                { title: "Hindu Mandirs: History, Architecture, Economics and Practices", speaker: "Pankaj Saxena", index: 9, videoId: "ViqZcgo2_58", photo: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/pankaj.jpeg" },
              ].map(({ title, speaker, index, videoId, photo }) => (
                <li key={index}>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}&list=PLOtQBzYuP-bY3P3hxr2vUIk6-mSo8pnAR&index=${index}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col h-full group bg-[#FAFAF8] border border-[#E6E4DF] rounded-md overflow-hidden hover:border-[#D4A441] transition"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition">
                        <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-[#D4A441]/90 transition">
                          <span className="text-white text-xs pl-0.5">▶</span>
                        </div>
                      </div>
                      {photo && (
                        <div className="absolute bottom-2 left-2 w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow">
                          <Image
                            src={photo}
                            alt={speaker}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-[13px] text-[#2B2B2B] group-hover:text-[#D4A441] transition leading-snug font-medium">{title}</p>
                      <p className="text-[11px] text-[#6A6A6A] mt-0.5">{speaker}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </main>
  );
}
