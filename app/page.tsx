export default function Home() {
  return (
    <main className="bg-white">

      {/* HERO */}
<section className="px-6 md:px-16 py-16 md:py-28">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    {/* TEXT */}
    <div className="order-2 md:order-1">
      <h1 className="text-2xl md:text-4xl font-serif leading-snug tracking-tight text-center md:text-left !text-[#eba32e]">
        An initiative to connect the world<br />
        with authentic Dharmic voices
      </h1>
    </div>

    {/* IMAGE */}
    <div className="relative w-full h-[220px] md:h-[420px] order-1 md:order-2">
      <img
        src="/landing.png"
        alt="Dharma Speakers Bureau"
        className="w-full h-full object-cover rounded-sm opacity-95"
        
      />
    </div>

  </div>
</section>


      {/* WHAT WE DO */}
      <section className="px-6 md:px-16 py-24 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl tracking-tight mb-12">
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
                We represent speakers with dignity and professionalism, presenting their work clearly and accurately to institutions and platforms. This representation preserves the speaker’s voice and intent while providing a trusted institutional interface for engagement.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg">Connection</h3>
              <p className="text-[15px] md:text-base text-[#3A3A3A]">
                We connect speakers with universities, cultural bodies, media platforms, and other institutions seeking dharmic perspectives. Each connection is made thoughtfully, aligning the speaker’s expertise with the context, audience, and purpose of the engagement.
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
<section className="px-6 md:px-16 py-24">
  <div className="max-w-6xl mx-auto">
    <h2 className="font-serif text-3xl tracking-tight mb-12">
      Themes We Explore
    </h2>

    <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl">
      <div className="border-l-2 border-[#D6A645] pl-4">
        Daily life and ethical decision-making
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        Parenting, family, and relationships
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        Work, leadership, and responsibility
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        Loss, grief, and resilience
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        Dharma Sankat and moral dilemmas
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        Society, culture, and civilizational continuity
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        Modern applications of dharmic thought
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        Integration of theory and practice
      </div>
    </div>
  </div>
</section>


      {/* DOMAINS OF KNOWLEDGE */}
<section className="px-6 md:px-16 py-24 bg-[#FAF9F6]">
  <div className="max-w-6xl mx-auto">
    <h2 className="font-serif text-3xl tracking-tight mb-12">
      Domains of Knowledge
    </h2>

    <div className="grid md:grid-cols-2 gap-x-20 gap-y-14 max-w-5xl">
      
      <div className="space-y-3">
        <h3 className="font-serif text-lg">
          Dharma & Philosophy
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
           This domain explores the philosophical foundations of Sanatan Dharma, including classical darshanas, ethical reasoning, and metaphysical inquiry. Speakers engage with fundamental questions of duty, self, knowledge, and liberation, while articulating how these ideas continue to inform reflective life and moral discernment today.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-lg">
          Indian Knowledge Systems
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          This domain encompasses the diverse intellectual traditions developed across the Indian subcontinent, including education, health, sciences, language, and epistemology. Speakers draw upon both textual and lived traditions to demonstrate the coherence, depth, and contemporary relevance of these systems.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-lg">
          Society, Ethics & Polity
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          This domain examines social order, responsibility, governance, and justice through dharmic frameworks. Speakers address questions of collective life, ethical decision-making, and public responsibility, offering perspectives that balance individual freedom with social harmony and long-term wellbeing.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-lg">
          Culture, Arts & Aesthetics
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          This domain engages with artistic and cultural expressions as carriers of meaning and values. Speakers explore literature, music, dance, ritual, and visual arts as living traditions, highlighting how aesthetic experience shapes sensibility, identity, and shared cultural memory.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-lg">
          Leadership, Business & Work
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          This domain brings dharmic perspectives to professional and organizational life. Speakers address leadership, work, and enterprise through the lens of responsibility, purpose, and ethical action, helping bridge inner values with outward conduct in contemporary workplaces.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-lg">
          Ecology & Sustainability
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          This domain reflects on the relationship between humans and the natural world through dharmic thought. Speakers explore ecological balance, stewardship, and sustainability, drawing on traditional understandings of nature to inform responsible and enduring approaches to environmental challenges.
        </p>
      </div>

    </div>
  </div>
</section>

{/* WHO WE SERVE */}
<section className="px-6 md:px-16 py-24">
  <div className="max-w-6xl mx-auto">
    <h2 className="font-serif text-3xl tracking-tight mb-12">
      Who We Serve
    </h2>

    <div className="max-w-4xl space-y-12">
      
      <div className="border-l-2 border-[#D6A645] pl-4">
        <h3 className="font-serif text-lg mb-2">
          Universities & Research Institutions
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          We work with universities and research institutions seeking rigorous, authentic engagement with dharmic thought. The Bureau supports academic lectures, seminars, courses, and dialogues that bring traditional and contemporary perspectives into scholarly spaces with intellectual seriousness and contextual clarity.
        </p>
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        <h3 className="font-serif text-lg mb-2">
          Think Tanks & Policy Bodies
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          We engage with think tanks and policy-oriented institutions exploring ethics, governance, society, and civilizational frameworks. Our speakers contribute perspectives rooted in dharmic reasoning, offering depth and long-term orientation to discussions on public life and decision-making.
        </p>
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        <h3 className="font-serif text-lg mb-2">
          Cultural Organizations
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          We support cultural organizations and temples in curating meaningful public programs that draw from living traditions. The Bureau helps connect practitioners and scholars who can interpret ritual, practice, and heritage in ways that are accessible, reflective, and grounded.
        </p>
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        <h3 className="font-serif text-lg mb-2">
          Media Platforms & Conferences
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          We work with media platforms and conference organizers seeking informed and responsible voices for panels, interviews, and public conversations. The Bureau helps ensure that dharmic perspectives are represented with accuracy, balance, and nuance in public discourse.
        </p>
      </div>

      <div className="border-l-2 border-[#D6A645] pl-4">
        <h3 className="font-serif text-lg mb-2">
          Businesses & Leadership Forums
        </h3>
        <p className="text-[15px] md:text-base text-[#3A3A3A]">
          We engage with businesses and leadership forums interested in values-based leadership, ethical decision-making, and organizational culture. Our speakers bring dharmic perspectives to conversations on work, responsibility, and long-term thinking, helping bridge principles and practice in professional life.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* ORIGIN */}
<section className="px-6 md:px-16 py-24 bg-[#FAF9F6]">
  <div className="max-w-6xl mx-auto">
    <div className="max-w-4xl">
      <h2 className="font-serif text-3xl tracking-tight mb-6">
        Origin
      </h2>

      <p className="text-[15px] md:text-base text-[#3A3A3A] leading-relaxed">
        Despite a growing global interest in Indian civilization and dharmic worldviews, there is no coherent institutional mechanism that enables the discovery and engagement of authentic Dharmic speakers. Scholars, traditional practitioners, and educators operate in fragmented silos, often without visibility or administrative support. This fragmentation has allowed misrepresentation, oversimplification, and ideologically driven narratives to dominate public discourse. At the same time, speakers are burdened with managing logistics, negotiations, and payments on their own, leading to inefficiencies, under-compensation, and lost opportunities. Institutions, on the other hand, struggle to identify credible voices and coordinate engagements reliably. DSB is created to address these structural gaps. 
      </p>
    </div>
  </div>
</section>


    </main>
  );
}
