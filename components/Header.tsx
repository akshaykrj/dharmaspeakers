"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);
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
  
  {(role !== "requestor" || !signedIn) && (
    <Link
      href="/join"
      className="rounded-md bg-[#D4A441] px-5 py-2 text-sm font-medium text-white hover:bg-[#C2953A] transition"
    >
      Join as a Speaker
    </Link>
  )}

  {(role === "requestor" || !signedIn) && !isRecovery && (
    <Link
      href="/request"
      className="rounded-md bg-[#D4A441] px-5 py-2 text-sm font-medium text-white hover:bg-[#C2953A] transition"
    >
      Request a Speaker
    </Link>
  )}

  {signedIn ? (
    <>
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
      >
        Logout
      </button>
      {displayName && dashboardPath && (
        <Link
          href={dashboardPath}
          className="text-left text-sm text-gray-700 leading-tight hover:text-gray-900 transition"
        >
          <span className="block">Namaste</span>
          <span className="block">{displayName}</span>
        </Link>
      )}
    </>
  ) : (
    <Link
      href="/login"
      className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
    >
      Login
    </Link>
  )}
</div>
        </div>
      </div>
    </header>
  );
}
