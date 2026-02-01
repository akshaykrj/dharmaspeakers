export default function Footer() {
  return (
    <footer className="bg-white px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">

        {/* IDENTITY */}
        <div className="max-w-sm">
          <p className="font-serif text-base text-[#2B2B2B] mb-3">
            Dharma Speakers Bureau
          </p>
          <p className="text-[14px] leading-relaxed text-[#3A3A3A]">
            An initiative to connect the world with authentic Dharmic voices.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <p className="text-[12px] uppercase tracking-wide text-[#6B6B6B] mb-4">
            Explore
          </p>
          <ul className="space-y-2 text-[14px] text-[#3A3A3A]">
            <li>About</li>
            <li>Speakers</li>
            <li>Programs</li>
            <li>Thoughts</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="max-w-sm">
          <p className="text-[12px] uppercase tracking-wide text-[#6B6B6B] mb-4">
            Contact
          </p>
          <p className="text-[14px] leading-relaxed text-[#3A3A3A]">
            For institutional inquiries and collaborations, write to us at: dsb@dharma360.com
          </p>
        </div>

      </div>

      {/* BASELINE */}
      <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-[#E5E5E5] text-[13px] text-[#6B6B6B]">
        © {new Date().getFullYear()} Dharma Speakers Bureau. All rights reserved.
      </div>
    </footer>
  );
}
