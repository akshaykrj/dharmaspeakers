export default function ThoughtsPage() {
  return (
    <main className="bg-[#faf9f6] text-[#111111]">
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif">
              Essays &amp; Reflections
            </h2>
          </div>

          <div className="md:col-span-2 space-y-6">
            <p className="leading-relaxed text-gray-800">
              This section features written reflections and essays by speakers
              associated with the Dharma Speakers Bureau. These writings engage
              with Dharmic ideas as they intersect with modern contexts and
              lived experience.
            </p>

            {/* Placeholder */}
            <div className="mt-8 border border-dashed border-gray-300 rounded-lg p-6 text-sm text-gray-600">
              Essays and reflections will appear here as they are published.
            </div>
          </div>
        </section>

        {/* TRANSCRIPTS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif">
              Transcripts
            </h2>
          </div>

          <div className="md:col-span-2 space-y-6">
            <p className="leading-relaxed text-gray-800">
              Transcripts present edited textual records of selected talks,
              dialogues, and conversations hosted by or associated with the
              Bureau.
            </p>

            {/* Placeholder */}
            <div className="mt-8 border border-dashed border-gray-300 rounded-lg p-6 text-sm text-gray-600">
              Transcripts will be listed here as they are added.
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
