import Link from "next/link";
import Image from "next/image";
import { getUpcomingEvents } from "@/lib/events";

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();
  return (
    <main>

      {/* HERO */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto py-20 md:py-32 grid md:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <div className="order-2 md:order-1">
            <h1 className="text-[22px] md:text-4xl font-serif leading-snug tracking-tight text-center md:text-left !text-[#eba32e]">
              An initiative to connect the world
              <br className="hidden md:block" />
              with authentic Dharmic voices
            </h1>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/speakers"
                className="inline-flex items-center justify-center rounded-md bg-[#D4A441] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#C2953A] transition"
              >
                Browse Speakers
              </Link>
              <Link
                href="/request"
                className="inline-flex items-center justify-center rounded-md border border-[#D4A441] px-5 py-2.5 text-sm font-medium text-[#D4A441] hover:bg-[#FBF6EC] transition"
              >
                Request a Speaker
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative w-full h-[180px] md:h-[420px] order-1 md:order-2">
            <Image
              src="/landing.png"
              alt="Dharma Speakers Bureau"
              fill
              className="object-cover rounded-sm opacity-95"
              priority
            />
          </div>

        </div>
      </section>

      {/* UPCOMING PROGRAMS */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-serif text-3xl tracking-tight">Upcoming Programs</h2>
            <Link href="/programs" className="text-sm text-[#D4A441] hover:underline">
              See all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {upcomingEvents.slice(0, 2).map((event) => (
              <div key={event.title} className="border border-[#E6E4DF] rounded-md p-5 flex gap-4 items-start">
                {event.photoUrl ? (
                  <Image
                    src={event.photoUrl}
                    alt={event.speaker}
                    width={56}
                    height={56}
                    className="rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-[#F1ECE2] flex items-center justify-center shrink-0 text-sm font-serif text-[#8B7C66]">
                    {event.speaker.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium tracking-wide text-[#D4A441] mb-1">{event.type}</p>
                  <h3 className="text-base font-serif text-[#111111] mb-1 leading-snug">{event.title}</h3>
                  <p className="text-sm text-[#6A6A6A]">{event.speaker} &nbsp;·&nbsp; {event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20">
          <h2 className="font-serif text-3xl tracking-tight mb-12">
            Who We Serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
            {[
              { title: "Universities & Research Institutions", body: "Academic lectures, seminars, and dialogues that bring Dharmic perspectives into scholarly spaces." },
              { title: "Think Tanks & Policy Bodies", body: "Dharmic reasoning applied to ethics, governance, and civilizational questions in public discourse." },
              { title: "Cultural Organizations", body: "Programs for temples and cultural bodies that interpret living traditions in accessible, grounded ways." },
              { title: "Media Platforms & Conferences", body: "Informed voices for panels, interviews, and public conversations represented with accuracy and nuance." },
              { title: "Businesses & Leadership Forums", body: "Values-based leadership and ethical decision-making through a Dharmic lens for professional life." },
            ].map(({ title, body }) => (
              <div key={title} className="border-l-2 border-[#D6A645] pl-4">
                <h3 className="font-serif text-base mb-1 text-[#2B2B2B]">{title}</h3>
                <p className="text-[14px] text-[#6A6A6A] leading-snug">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORIGIN */}
      <section className="px-6 md:px-16">
        <div className="max-w-6xl mx-auto border-t border-[#E6E4DF] py-20">
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
