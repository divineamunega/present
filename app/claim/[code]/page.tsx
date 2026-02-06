"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "../../../components/Layout";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { getGift, updateGift } from "../../../lib/storage";
import { headingStyle } from "../../../lib/typography";

export default function ClaimPage() {
  const params = useParams();
  const code = typeof params.code === "string" ? params.code : "";
  const [title, setTitle] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (!code) return;
    const link = getGift(code);
    if (!link) return;
    setTitle(link.title);
    setClaimed(Boolean(link.claimed));
  }, [code]);

  if (!title) {
    return (
      <Layout>
        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-black" style={headingStyle}>
              Link not found
            </h1>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Card shadow="pop" className="bg-white/70" disableHoverFx>
            <h1 className="text-3xl font-black" style={headingStyle}>
              {claimed ? "Already claimed" : "Claim your present"}
            </h1>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              {claimed
                ? "This present has already been claimed."
                : `You’ve been sent ${title}. Claim it now.`}
            </p>
            {!claimed ? (
              <div className="mt-6">
                <Button
                  variant="primary"
                  shape="pill"
                  onClick={() => {
                    updateGift(code, { claimed: true });
                    setClaimed(true);
                  }}
                >
                  Claim present
                </Button>
              </div>
            ) : null}
          </Card>
        </div>
      </section>
    </Layout>
  );
}
