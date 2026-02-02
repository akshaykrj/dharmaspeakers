export default function Footer() {
  return (
    <footer className="bg-[#c72a2a] text-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-sm tracking-wide">
          © 2026 Dharma Speakers Bureau
          <span className="mx-2 text-[#f0dcdc]">|</span>
          <a
            href="/contact"
            className="text-[#f0dcdc] hover:text-white transition"
          >
            Contact
          </a>
        </p>
      </div>
    </footer>
  );
}
