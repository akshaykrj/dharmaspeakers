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

        {/* ONGOING & PAST PROGRAMS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif">
              Ongoing &amp; Past Programs
            </h2>
          </div>

          <div className="md:col-span-2 space-y-6">
            <p className="leading-relaxed text-gray-800">
              This section documents the Bureau’s active and completed
              initiatives, including thematic series, lecture cycles,
              workshops, and collaborations supported over time.
            </p>

            {/* Placeholder for future program listings */}
            <div className="mt-8 border border-dashed border-gray-300 rounded-lg p-6 text-sm text-gray-600">
              Program listings will appear here as initiatives are added.
            </div>
          </div>
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

            {/* Placeholder for calendar */}
            <div className="mt-8 border border-dashed border-gray-300 rounded-lg p-6 text-sm text-gray-600">
              Upcoming events will be listed here.
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
