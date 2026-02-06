"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { getGift } from "../../../lib/storage";
import { headingStyle } from "../../../lib/typography";

export default function SharePage() {
  const params = useParams();
  const code = typeof params.code === "string" ? params.code : "";
  const [giftExists, setGiftExists] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const giftLink = useMemo(() => {
    if (!code) return "";
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/g/${code}`;
  }, [code]);

  useEffect(() => {
    if (!code) return;
    setGiftExists(Boolean(getGift(code)));
  }, [code]);

  if (giftExists === false) {
    return (
      <Layout>
        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-3xl font-black leading-[1.1]"
              style={headingStyle}
            >
              Link not found
            </h1>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              We couldn&apos;t find that present code. Try creating a new link.
            </p>
            <div className="mt-6">
              <Link href="/create">
                <Button variant="primary" shape="pill">Create a present link</Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Card accent="accent" shadow="pop" className="bg-white/70">
            <h1 className="text-3xl font-black leading-[1.1]" style={headingStyle}>
              Share your link
            </h1>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              Send it on WhatsApp, Instagram, or anywhere.
            </p>
            <div className="mt-6 rounded-[24px] bg-white/90 p-4 shadow-pop">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Present link
              </p>
              <p className="mt-2 break-all text-sm font-medium text-[var(--foreground)]">
                {giftLink || "Loading..."}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="primary"
                shape="pill"
                onClick={async () => {
                  if (!giftLink) return;
                  await navigator.clipboard.writeText(giftLink);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? "Copied!" : "Copy link"}
              </Button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Send love with this present link: ${giftLink}`,
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="secondary" shape="pill">
                  Share WhatsApp
                </Button>
              </a>
            </div>
          </Card>
          <Card accent="accent" className="bg-white/70">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              Next steps
            </p>
            <h2 className="mt-3 text-2xl font-black leading-[1.1]" style={headingStyle}>
              Track your presents
            </h2>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              Watch presents roll in and withdraw when you&apos;re ready.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href={`/g/${code}`}>
                <Button variant="secondary" shape="pill" className="w-full">
                  View present page
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" shape="pill" className="w-full">
                  Go to dashboard
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
