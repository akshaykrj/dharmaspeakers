export const metadata = {
  title: "About",
  description: "Learn about the Dharma Speakers Bureau — our purpose, vision, mission, and principles of curation.",
};

export default function About() {
  return (
    <main>

      {/* PAGE HEADER */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto pt-20 pb-16">
          <h1 className="text-4xl font-serif mb-6 text-[#2B2B2B]">About</h1>
          <p className="text-lg leading-relaxed text-gray-700">
            The Dharma Speakers Bureau is a professional initiative to curate, support, and
            connect speakers grounded in Dharmic knowledge with institutions and audiences
            across the world.
          </p>
        </div>
      </section>

      {/* WHAT DO WE MEAN BY DHARMA */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20">
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-10 text-[#2B2B2B]">
            What Do We Mean by Dharma?
          </h2>

          <div className="max-w-4xl space-y-6">
            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              By Dharma, we refer to the underlying principles that sustain
              order, meaning, and balance in individual life and collective
              existence. Dharma is a contextual and reflective framework that
              guides right action (kartavya), ethical discernment (viveka), and
              responsibility (rna) in changing circumstances.
            </p>

            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              Rooted in Sanatan thought, Dharma recognizes that truth must be
              lived and applied according to time, place, and role. In this
              sense, Dharma integrates inner orientation with outward conduct,
              connecting philosophy with practice, values with action, and
              personal integrity with social responsibility.
            </p>

            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              Whether applied to family life, professional work, leadership, or
              public life, Dharma serves as a compass for navigating moral
              complexity, resolving dilemmas (dharma-sankata), and acting in
              ways that uphold both individual growth and collective well-being.
            </p>
          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20">
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-10 text-[#2B2B2B]">
            Purpose
          </h2>

          <div className="max-w-4xl space-y-6">
            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              By curating and connecting speakers across domains, the Bureau
              helps bridge ancient wisdom with present-day contexts in a manner
              that is thoughtful, accessible, and responsible.
            </p>

            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              Equally, the Bureau serves to support speakers themselves by
              providing structure and continuity to their public engagement. It
              reduces the burden of ad hoc outreach and coordination, allowing
              speakers to focus on study, reflection, and articulation, while
              ensuring their work reaches appropriate platforms and audiences.
            </p>

            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              In doing so, the Dharma Speakers Bureau contributes to a
              sustainable ecosystem where Dharmic ideas are not only preserved,
              but actively and coherently expressed in the life of society
              today.
            </p>
          </div>
        </div>
      </section>

      {/* VISION, MISSION, OBJECTIVE */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20 grid md:grid-cols-3 gap-16">

          <div>
            <h3 className="font-serif text-lg mb-3 text-[#2B2B2B]">
              Vision
            </h3>
            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              To become the world&apos;s most trusted platform for authentic
              Dharmic voices.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-3 text-[#2B2B2B]">
              Mission
            </h3>
            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              To curate, support, and amplify Dharmic speakers who articulate
              Bharat&apos;s civilizational wisdom with depth, dignity, and
              contemporary relevance.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-3 text-[#2B2B2B]">
              Objective
            </h3>
            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              To enable any institution, anywhere in the world, to easily
              discover and engage credible Dharmic speakers through a single
              professional bureau.
            </p>
          </div>

        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20">
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-10 text-[#2B2B2B]">
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Curation</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">
                We carefully identify and curate speakers who are grounded in dharmic knowledge and practice, ensuring depth, authenticity, and intellectual integrity. Each speaker is reviewed for their understanding, articulation, and ability to engage responsibly with contemporary audiences.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Representation</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">
                We represent speakers with dignity and professionalism, presenting their work clearly and accurately to institutions and platforms. This representation preserves the speaker&apos;s voice and intent while providing a trusted institutional interface for engagement.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Connection</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">
                We connect speakers with universities, cultural bodies, media platforms, and other institutions seeking dharmic perspectives. Each connection is made thoughtfully, aligning the speaker&apos;s expertise with the context, audience, and purpose of the engagement.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Support</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">
                We provide ongoing support that allows speakers to focus on study, reflection, and teaching. By managing coordination and engagement processes, we help create a sustainable and respectful ecosystem for dharmic dialogue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THEMES WE EXPLORE */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20">
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-10 text-[#2B2B2B]">
            Themes We Explore
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl">
            {[
              "Daily life and ethical decision-making",
              "Parenting, family, and relationships",
              "Work, leadership, and responsibility",
              "Loss, grief, and resilience",
              "Dharma Sankat and moral dilemmas",
              "Society, culture, and civilizational continuity",
              "Modern applications of dharmic thought",
              "Integration of theory and practice",
            ].map((theme) => (
              <div key={theme} className="border-l-2 border-[#D6A645] pl-4 text-[#3A3A3A]">
                {theme}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINS OF KNOWLEDGE */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20">
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-10 text-[#2B2B2B]">
            Domains of Knowledge
          </h2>
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-14 max-w-5xl">
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Dharma &amp; Philosophy</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">This domain explores the philosophical foundations of Sanatan Dharma, including classical darshanas, ethical reasoning, and metaphysical inquiry. Speakers engage with fundamental questions of duty, self, knowledge, and liberation, while articulating how these ideas continue to inform reflective life and moral discernment today.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Indian Knowledge Systems</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">This domain encompasses the diverse intellectual traditions developed across the Indian subcontinent, including education, health, sciences, language, and epistemology. Speakers draw upon both textual and lived traditions to demonstrate the coherence, depth, and contemporary relevance of these systems.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Society, Ethics &amp; Polity</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">This domain examines social order, responsibility, governance, and justice through dharmic frameworks. Speakers address questions of collective life, ethical decision-making, and public responsibility, offering perspectives that balance individual freedom with social harmony and long-term wellbeing.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Culture, Arts &amp; Aesthetics</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">This domain engages with artistic and cultural expressions as carriers of meaning and values. Speakers explore literature, music, dance, ritual, and visual arts as living traditions, highlighting how aesthetic experience shapes sensibility, identity, and shared cultural memory.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Leadership, Business &amp; Work</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">This domain brings dharmic perspectives to professional and organizational life. Speakers address leadership, work, and enterprise through the lens of responsibility, purpose, and ethical action, helping bridge inner values with outward conduct in contemporary workplaces.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-lg">Ecology &amp; Sustainability</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">This domain reflects on the relationship between humans and the natural world through dharmic thought. Speakers explore ecological balance, stewardship, and sustainability, drawing on traditional understandings of nature to inform responsible and enduring approaches to environmental challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES OF CURATION */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20">
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-10 text-[#2B2B2B]">
            Principles of Curation
          </h2>

          <div className="max-w-4xl">
            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
              The principles of curation are central to the Bureau&apos;s
              functioning. Speakers are curated with care, based on depth of
              understanding, authenticity of grounding, ethical conduct, and
              the ability to engage responsibly with diverse audiences.
            </p>

            <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed mt-6">
              The process remains non-sectarian and inclusive, while firmly
              rooted in Dharmic traditions, ensuring that every voice
              represented by the Bureau upholds its commitment to trust,
              balance, and thoughtful dialogue.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
