import { Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F1ECE2] text-[#2B2B2B]">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10">

        <div>
          <p className="!text-[#2B2B2B] font-serif text-lg mb-2">Dharma Speakers Bureau</p>
          <p className="text-sm leading-relaxed">
            An initiative to connect the world with authentic Dharmic voices.
          </p>
          <p className="text-sm mt-3">
            <a href="mailto:dsb@dharma360.com" className="hover:text-[#D4A441] transition">
              dsb@dharma360.com
            </a>
          </p>
          <div className="mt-7">
            <p className="!text-[#2B2B2B] text-xs font-medium uppercase tracking-[0.16em] mb-3">Follow us</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-wide">
              <a
                href="https://www.instagram.com/dharmaspeakers/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#D4A441] transition"
              >
                <Instagram size={15} strokeWidth={1.8} aria-hidden="true" />
                Instagram
              </a>
              <a
                href="https://x.com/DharmaSpeakers"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#D4A441] transition"
              >
                <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" aria-hidden="true" fill="currentColor">
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 15.4 6.2 22H3l7.3-8.4L2.7 2H9l4.4 6.1L18.9 2Zm-1.1 18h1.7L8 3.9H6.2L17.8 20Z" />
                </svg>
                X
              </a>
              <a
                href="https://www.linkedin.com/showcase/dharma-speakers-bureau/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#D4A441] transition"
              >
                <Linkedin size={15} strokeWidth={1.8} aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@DharmaSpeakersBureau"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#D4A441] transition"
              >
                <Youtube size={16} strokeWidth={1.8} aria-hidden="true" />
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div>
          <p className="!text-[#2B2B2B] text-sm font-medium uppercase tracking-wide mb-4">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-[#D4A441] transition">About</a></li>
            <li><a href="/speakers" className="hover:text-[#D4A441] transition">Speaker Directory</a></li>
            <li><a href="/programs" className="hover:text-[#D4A441] transition">Programs</a></li>
            <li><a href="/thoughts" className="hover:text-[#D4A441] transition">Thoughts</a></li>
          </ul>
        </div>

        <div>
          <p className="!text-[#2B2B2B] text-sm font-medium uppercase tracking-wide mb-4">Get Involved</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/request" className="hover:text-[#D4A441] transition">Request a Speaker</a></li>
            <li><a href="/join" className="hover:text-[#D4A441] transition">Join as a Speaker</a></li>
            <li><a href="/contact" className="hover:text-[#D4A441] transition">Contact</a></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-[#E6E4DF] max-w-6xl mx-auto px-6 py-4">
        <p className="text-xs !text-[#4A4A4A]">© 2026 Dharma Speakers Bureau. All rights reserved.</p>
      </div>
    </footer>
  );
}
