import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-[#D8D8D8] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex items-center justify-between">
        
        {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
                <Image
                src="/logo.png"
                alt="Dharma Speakers Bureau"
                width={48}
                height={48}
                priority
            />
        <span className="font-serif text-xl text-[#cc2a2c]">
            Dharma Speakers Bureau
                </span>
            </Link>


        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/about" className="text-[#3A3A3A] hover:text-[#000000]">About</Link>
          <Link href="/speakers" className="text-[#3A3A3A] hover:text-[#000000]">Speakers</Link>
          <Link href="/programs" className="text-[#3A3A3A] hover:text-[#000000]">Programs</Link>
          <Link href="/thoughts" className="text-[#3A3A3A] hover:text-[#000000]">Thoughts</Link>
          <Link href="/contact" className="text-[#3A3A3A] hover:text-[#000000]">Contact</Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-4 text-sm">
        <Link
  href="/join"
  className="border border-[#2B2B2B] text-[#2B2B2B] bg-transparent px-5 py-2 rounded-sm text-sm tracking-wide"
>
  Join as a Speaker
</Link>

<Link
  href="/request"
  className="bg-[#D6A645] text-white px-5 py-2 rounded-sm text-sm tracking-wide"
>
  Request a Speaker
</Link>
<a
  href="/login"
  className="ml-6 rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 transition"
>
  Login
</a>


        </div>


      </div>
    </header>
  );
}
