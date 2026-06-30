export default function ProgramsPage() {
  return (
    <main className="bg-[#faf9f6] text-[#111111]">
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif">
              Event Calendar
            </h2>
          </div>

          <div className="md:col-span-2 space-y-6">
            <p className="leading-relaxed text-gray-800">
              The Event Calendar presents upcoming lectures, dialogues, and
              engagements involving speakers associated with the Bureau.
            </p>

            <div className="mt-8 space-y-4">

              <div className="border border-[#E6E4DF] bg-white rounded-md p-5 flex gap-4 items-start">
                <img src="https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/rohitarya.jpg" alt="Rohit Arya" className="w-16 h-16 rounded-full object-cover shrink-0" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#D4A441] mb-1">Dharma Live Webinar</p>
                  <h3 className="text-lg font-serif text-[#111111] mb-1">
                    Where does Spiritual Development happen? In a cave or market place
                  </h3>
                  <p className="text-sm text-[#6A6A6A]">Rohit Arya &nbsp;·&nbsp; 13 August 2026 &nbsp;·&nbsp; 7:30 PM</p>
                </div>
              </div>

              <div className="border border-[#E6E4DF] bg-white rounded-md p-5 flex gap-4 items-start">
                <img src="https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/ami.webp" alt="Ami Ganatra" className="w-16 h-16 rounded-full object-cover shrink-0" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#D4A441] mb-1">Dharma Live Webinar</p>
                  <h3 className="text-lg font-serif text-[#111111] mb-1">
                    Why Are We This Way: A Guide to Hindu Shastras
                  </h3>
                  <p className="text-sm text-[#6A6A6A]">Ami Ganatra &nbsp;·&nbsp; 10 September 2026 &nbsp;·&nbsp; 7:30 PM</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ONGOING & PAST PROGRAMS */}
        <section className="space-y-8">
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

          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-[#D4A441]">DharmaLIVE Webinars</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                {[
                  { title: "Living with Purpose (Purushartha)", speaker: "Shivakumar G V", index: 1, videoId: "nCB-KEyZGhQ", photo: "https://dzlcgtzpkdejfjsdndtu.supabase.co/storage/v1/object/public/Speakers/shivakumar.jpeg" },
                  { title: "The Decision That Changes Everything — Ram vs Ravan", speaker: "Dr. Vishwananth M.V. Guha", index: 2, videoId: "FevtxTk7s_8", photo: null },
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
                      className="block group"
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-md">
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition">
                          <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-[#D4A441]/90 transition">
                            <span className="text-white text-sm pl-1">▶</span>
                          </div>
                        </div>
                        {photo && (
                          <div className="absolute bottom-2 left-2">
                            <img
                              src={photo}
                              alt={speaker}
                              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow"
                            />
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-[13px] text-[#2B2B2B] group-hover:text-[#D4A441] transition leading-snug font-medium">{title}</p>
                      <p className="text-[12px] text-[#6A6A6A] mt-0.5">{speaker}</p>
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
