"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import Card from "../../../components/Card";
import StatTile from "../../../components/StatTile";
import Button from "../../../components/Button";
import { getGifts, getPaymentsByCreator } from "../../../lib/storage";
import { formatCurrency, formatDate } from "../../../lib/utils";
import { headingStyle } from "../../../lib/typography";

export default function PublicStatsPage() {
  const [payments, setPayments] = useState<ReturnType<
    typeof getPaymentsByCreator
  >>([]);
  const [giftCount, setGiftCount] = useState(0);
  const [total, setTotal] = useState(0);

  const refresh = () => {
    const presents = getGifts().filter((present) => present.creatorName === "Demo");
    const creatorPayments = getPaymentsByCreator("Demo");
    setGiftCount(presents.length);
    setPayments(creatorPayments);
    setTotal(creatorPayments.reduce((sum, p) => sum + p.amount, 0));
  };

  useEffect(() => {
    refresh();
  }, []);

  const empty = payments.length === 0;

  return (
    <Layout>
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Public stats
              </p>
              <h1
                className="mt-2 text-3xl font-black leading-[1.1] md:text-4xl"
                style={headingStyle}
              >
                Demo Present Wall
              </h1>
            </div>
            <Button variant="secondary" shape="pill">
              Share public wall
            </Button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <StatTile label="Total received" value={formatCurrency(total)} />
            <StatTile label="Present links" value={`${giftCount}`} accent="accent" />
            <StatTile label="Presents delivered" value={`${payments.length}`} accent="accent" />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card accent="accent" shadow="pop" className="bg-white/70">
              <h2 className="text-xl font-extrabold leading-tight" style={headingStyle}>
                Recent presents
              </h2>
              {empty ? (
                <div className="mt-4 rounded-[24px] bg-white/90 p-4 shadow-pop">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    No presents yet. Share your link to start collecting.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {payments.slice(0, 6).map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between rounded-[24px] bg-white/90 px-4 py-3 text-sm shadow-pop"
                    >
                      <div>
                        <p className="font-bold uppercase tracking-widest text-[var(--foreground)]">
                          {payment.fromName || "Anonymous"}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {formatDate(payment.createdAt)}
                        </p>
                      </div>
                      <p className="text-sm font-black" style={headingStyle}>
                        {formatCurrency(payment.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
            <Card accent="accent" className="bg-white/70">
              <h3
                className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]"
                style={headingStyle}
              >
                Get your own link
              </h3>
              <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                Create a new present link and start collecting.
              </p>
              <Link href="/create" className="mt-6 block">
                <Button variant="primary" shape="pill" className="w-full">
                  Create a present link
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
