export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#aaaaaa]">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <p className="text-white font-serif text-lg mb-2">Dharma Speakers Bureau</p>
          <p className="text-sm leading-relaxed">
            Connecting the world with authentic Dharmic voices.
          </p>
          <p className="text-sm mt-3">
            <a href="mailto:dsb@dharma360.com" className="hover:text-white transition">
              dsb@dharma360.com
            </a>
          </p>
        </div>

        <div>
          <p className="text-white text-sm font-medium uppercase tracking-wide mb-4">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/speakers" className="hover:text-white transition">Speaker Directory</a></li>
            <li><a href="/programs" className="hover:text-white transition">Programs</a></li>
            <li><a href="/thoughts" className="hover:text-white transition">Thoughts</a></li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-medium uppercase tracking-wide mb-4">Get Involved</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/request" className="hover:text-white transition">Request a Speaker</a></li>
            <li><a href="/join" className="hover:text-white transition">Join as a Speaker</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-[#333] max-w-6xl mx-auto px-6 py-4">
        <p className="text-xs text-[#666]">© 2026 Dharma Speakers Bureau. All rights reserved.</p>
      </div>
    </footer>
  );
}
