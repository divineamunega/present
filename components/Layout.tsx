"use client";

import Link from "next/link";
import GeoLogo from "./GeoLogo";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[var(--muted)] opacity-60" />
        <div className="absolute top-20 right-10 h-40 w-40 rounded-full bg-[var(--muted)] opacity-50" />
        <div className="absolute bottom-10 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[var(--muted)] opacity-50" />
        <div className="absolute inset-0 pattern-dots opacity-25" />
      </div>

      <header className="mx-auto max-w-6xl px-4 pt-6 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border-2 border-[var(--foreground)] bg-white px-4 py-3 shadow-pop md:px-6">
          <Link
            href="/"
            className="focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
          >
            <GeoLogo />
          </Link>
          <nav className="flex flex-1 items-center justify-end text-xs font-bold uppercase tracking-widest text-[var(--foreground)]">
            <Link
              href="/sign-in"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] shadow-pop transition-all duration-300 ease-bounce hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>
      <main className="pb-16">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 pb-12 md:px-8">
        <div className="rounded-[24px] border-2 border-[var(--foreground)] bg-white px-6 py-8 shadow-pop">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <GeoLogo />
              <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                Present is a playful way to collect moments, money, and memories.
                Built for Nigeria, ready for every celebration.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["No fees", "Shareable links", "Instant stats"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border-2 border-[var(--foreground)] bg-[var(--muted)] px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-pop"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-sm font-medium text-[var(--foreground)]">
                <li>
                  <Link href="/create" className="underline decoration-2 underline-offset-4">
                    Create a present link
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="underline decoration-2 underline-offset-4">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/u/present" className="underline decoration-2 underline-offset-4">
                    Public present wall
                  </Link>
                </li>
                <li>
                  <Link href="/sign-in" className="underline decoration-2 underline-offset-4">
                    Sign in with Google
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Resources
              </p>
              <ul className="mt-3 space-y-2 text-sm font-medium text-[var(--foreground)]">
                <li>Help Center</li>
                <li>Safety & Trust</li>
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
              <p className="mt-6 text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                Valentine is the launch. Presents are forever.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t-2 border-[var(--foreground)] pt-4 text-xs text-[var(--muted-foreground)] md:flex-row md:items-center md:justify-between">
            <span>© 2026 Present. All rights reserved.</span>
            <span>Made with love in Lagos.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
