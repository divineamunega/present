"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { getGift } from "../../lib/storage";
import { headingStyle } from "../../lib/typography";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";
  const [giftTitle, setGiftTitle] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    const present = getGift(code);
    setGiftTitle(present?.title ?? null);
  }, [code]);

  return (
    <Layout>
      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Card accent="accent" shadow="pop" className="bg-white/70">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              Love delivered
            </p>
            <h1
              className="mt-3 text-4xl font-black leading-[1.05]"
              style={headingStyle}
            >
              Love delivered
            </h1>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              {giftTitle
                ? `Your present to ${giftTitle} is on the way.`
                : "Your present is on the way."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/">
                <Button variant="secondary" shape="pill">
                  Back home
                </Button>
              </Link>
              {code ? (
                <Link href={`/g/${code}`}>
                  <Button variant="outline" shape="pill">
                    Present page
                  </Button>
                </Link>
              ) : null}
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
