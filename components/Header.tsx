"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<
    "speaker" | "requestor" | "admin" | null
  >(null);
  const [displayName, setDisplayName] = useState<string | null>(
    null
  );
  const dashboardPath =
    role === "speaker"
      ? "/dashboard/speaker"
      : role === "requestor"
      ? "/dashboard/requestor"
      : null;
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userRole = session?.user?.user_metadata
        ?.role as "speaker" | "requestor" | "admin" | undefined;
      const name =
        (session?.user?.user_metadata?.name as
          | string
          | undefined) ||
        (session?.user?.user_metadata?.full_name as
          | string
          | undefined) ||
        null;
      setSignedIn(!!session?.user);
      setRole(userRole ?? null);
      setDisplayName(name);
    };
    void init();

    const updateRecovery = () => {
      if (typeof window === "undefined") return;
      const hashParams = new URLSearchParams(
        window.location.hash.replace("#", "")
      );
      const hashType = hashParams.get("type");
      setIsRecovery(
        window.location.pathname === "/login" &&
          hashType === "recovery"
      );
    };

    updateRecovery();
    window.addEventListener("hashchange", updateRecovery);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const userRole = session?.user?.user_metadata
          ?.role as "speaker" | "requestor" | "admin" | undefined;
        const name =
          (session?.user?.user_metadata?.name as
            | string
            | undefined) ||
          (session?.user?.user_metadata?.full_name as
            | string
            | undefined) ||
          null;
        setSignedIn(!!session?.user);
        setRole(userRole ?? null);
        setDisplayName(name);
      }
    );

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("hashchange", updateRecovery);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="text-[#111111] sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Dharma Speakers Bureau"
              width={58}
              height={58}
              priority
            />
            
<span className="ml-2 text-center text-[13px] md:text-[14px] font-semibold tracking-normal !text-[#cd2c2e] leading-snug">
  <span className="block">Dharma</span>
  <span className="block">Speakers Bureau</span>
</span>
</div>
          </Link>

          {/* CENTER: Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-[#2B2B2B]">
            <Link href="/about" className="hover:text-black transition">
              About
            </Link>
            <Link href="/speakers" className="hover:text-black transition">
              Speakers
            </Link>
            <Link href="/programs" className="hover:text-black transition">
              Programs
            </Link>
            <Link href="/thoughts" className="hover:text-black transition">
              Thoughts
            </Link>
            <Link href="/contact" className="hover:text-black transition">
              Contact
            </Link>
          </nav>

          {/* RIGHT: Actions */}
<div className="flex flex-wrap items-center gap-3 md:gap-6 border-l border-gray-200 pl-4 md:pl-6">
  <button
    type="button"
    onClick={() => setMobileOpen(true)}
    className="md:hidden text-gray-700 hover:text-gray-900 transition"
    aria-expanded={mobileOpen}
    aria-label="Open menu"
  >
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  </button>
  
  {(role !== "requestor" || !signedIn) && (
    <Link
      href="/join"
      className="hidden md:inline-flex rounded-md bg-[#D4A441] px-3 py-2 text-xs md:text-sm font-medium text-white hover:bg-[#C2953A] transition whitespace-nowrap"
    >
      <span className="hidden md:inline">Join as a Speaker</span>
      <span className="md:hidden">Join</span>
    </Link>
  )}

  {(role === "requestor" || !signedIn) && !isRecovery && (
    <Link
      href="/request"
      className="hidden md:inline-flex rounded-md bg-[#D4A441] px-3 py-2 text-xs md:text-sm font-medium text-white hover:bg-[#C2953A] transition whitespace-nowrap"
    >
      <span className="hidden md:inline">Request a Speaker</span>
      <span className="md:hidden">Request</span>
    </Link>
  )}

  {signedIn ? (
    <>
      <button
        type="button"
        onClick={handleLogout}
        className="hidden md:inline-flex text-xs md:text-sm font-medium text-gray-700 hover:text-gray-900 transition whitespace-nowrap"
      >
        Logout
      </button>
      {displayName && dashboardPath && (
        <Link
          href={dashboardPath}
          className="hidden md:inline-flex text-left text-xs md:text-sm text-gray-700 leading-tight hover:text-gray-900 transition"
        >
          <span className="block">Namaste</span>
          <span className="block">{displayName}</span>
        </Link>
      )}
    </>
  ) : (
    <Link
      href="/login"
      className="hidden md:inline-flex text-xs md:text-sm font-medium text-gray-700 hover:text-gray-900 transition whitespace-nowrap"
    >
      Login
    </Link>
  )}
</div>
        </div>

        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-[#faf9f6] shadow-2xl flex flex-col">
              <div className="w-full bg-white border-b border-[#E6E4DF] p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="Dharma Speakers Bureau"
                    width={28}
                    height={28}
                  />
                  <span className="text-base font-semibold tracking-wide text-[#8B2B2C]">
                    Dharma Speakers Bureau
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 hover:text-gray-900"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 flex flex-col gap-6 flex-1">
              <nav className="flex flex-col gap-2 text-[15px] text-gray-800">
                <Link
                  href="/about"
                  className="px-2 py-2 rounded-md hover:bg-white transition"
                  onClick={() => setMobileOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/speakers"
                  className="px-2 py-2 rounded-md hover:bg-white transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Speakers
                </Link>
                <Link
                  href="/programs"
                  className="px-2 py-2 rounded-md hover:bg-white transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Programs
                </Link>
                <Link
                  href="/thoughts"
                  className="px-2 py-2 rounded-md hover:bg-white transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Thoughts
                </Link>
                <Link
                  href="/contact"
                  className="px-2 py-2 rounded-md hover:bg-white transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              <div className="mt-auto border-t border-[#E6E4DF] pt-4 flex flex-col gap-3">
                {(role !== "requestor" || !signedIn) && (
                  <Link
                    href="/join"
                    className="rounded-md bg-[#D4A441] px-4 py-2 text-sm font-medium text-white hover:bg-[#C2953A] transition text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Join as a Speaker
                  </Link>
                )}

                {(role === "requestor" || !signedIn) &&
                  !isRecovery && (
                    <Link
                      href="/request"
                      className="rounded-md bg-[#D4A441] px-4 py-2 text-sm font-medium text-white hover:bg-[#C2953A] transition text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Request a Speaker
                    </Link>
                  )}

                {signedIn ? (
                  <>
                    {displayName && dashboardPath && (
                      <Link
                        href={dashboardPath}
                        className="text-sm text-gray-700 hover:text-gray-900 transition"
                        onClick={() => setMobileOpen(false)}
                      >
                        Namaste {displayName}
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="text-left text-sm text-gray-700 hover:text-gray-900 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-md border border-[#C7B89B] px-4 py-2 text-sm text-gray-800 hover:bg-white transition text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
