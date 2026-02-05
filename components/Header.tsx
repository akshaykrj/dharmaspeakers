import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="text-[#111111] sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Dharma Speakers Bureau"
              width={40}
              height={40}
              priority
            />
            
<span className="ml-2 text-xl font-semibold tracking-wide !text-[#cd2c2e]">
  DSB
</span>
</div>
          </Link>

          {/* CENTER: Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <Link href="/about" className="hover:text-gray-900 transition">
              About
            </Link>
            <Link href="/speakers" className="hover:text-gray-900 transition">
              Speakers
            </Link>
            <Link href="/programs" className="hover:text-gray-900 transition">
              Programs
            </Link>
            <Link href="/thoughts" className="hover:text-gray-900 transition">
              Thoughts
            </Link>
            <Link href="/contact" className="hover:text-gray-900 transition">
              Contact
            </Link>
          </nav>

          {/* RIGHT: Actions */}
<div className="flex items-center gap-6 border-l border-gray-200 pl-6">
  
  <Link
    href="/join"
    className="rounded-md bg-[#D4A441] px-5 py-2 text-sm font-medium text-white hover:bg-[#C2953A] transition"
  >
    Join as a Speaker
  </Link>


  <Link
    href="/request"
    className="rounded-md bg-[#D4A441] px-5 py-2 text-sm font-medium text-white hover:bg-[#C2953A] transition"
  >
    Request a Speaker
  </Link>

  <Link
    href="/login"
     className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
  >
    Login
  </Link>
</div>
        </div>
      </div>
    </header>
  );
}
