export default function ContactPage() {
  return (
    <main className="bg-[#faf9f6] text-[#111111]">
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

        {/* PAGE HEADER */}
        <section className="max-w-3xl">
          <h1 className="text-4xl font-serif mb-6">
            Contact
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            For enquiries related to the Dharma Speakers Bureau, please use the
            appropriate channel below. We aim to respond with care and clarity.
          </p>
        </section>

        {/* GENERAL CONTACT */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif">
              General Contact
            </h2>
          </div>

          <div className="md:col-span-2 space-y-4">
            <p className="leading-relaxed text-gray-800">
              For general questions, information about the Bureau, or
              clarifications, please reach out to us at:
            </p>

            <p className="text-gray-900">
              <a
                href="mailto:dsb@dharma360.com"
                className="underline hover:text-gray-700 transition"
              >
                dsb@dharma360.com
              </a>
            </p>
          </div>
        </section>

    

        {/* SPEAKER ENQUIRIES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif">
              Speaker Enquiries
            </h2>
          </div>

          <div className="md:col-span-2 space-y-6">
            <p className="leading-relaxed text-gray-800">
              Individuals interested in joining the Bureau as speakers, or
              existing speakers with questions related to their association,
              may write to us at:
            </p>

            <p className="text-gray-900">
              <a
                href="mailto:dsb@dharma360.com"
                className="underline hover:text-gray-700 transition"
              >
                dsb@dharma360.com
              </a>
            </p>

            <div>
              <a
                href="/join"
                className="inline-block rounded-md bg-[#D4A441] px-6 py-3 text-sm font-medium text-white hover:bg-[#C2953A] transition"
              >
                Join as a Speaker
              </a>
            </div>
          </div>
        </section>

        {/* INSTITUTIONAL ENQUIRIES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif">
              Institutional Enquiries
            </h2>
          </div>

          <div className="md:col-span-2 space-y-6">
            <p className="leading-relaxed text-gray-800">
              Institutions such as universities, think tanks, cultural
              organizations, media platforms, businesses, and leadership forums
              interested in engaging a speaker for lectures, dialogues, panels,
              workshops, or other programs may contact us through the
              institutional enquiries channel.
            </p>

            <div>
              <a
                href="/request"
                className="inline-block rounded-md bg-[#D4A441] px-6 py-3 text-sm font-medium text-white hover:bg-[#C2953A] transition"
              >
                Request a Speaker
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
