"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import StatTile from "../../components/StatTile";
import { getGifts, getPayments } from "../../lib/storage";
import { formatCurrency, formatDate } from "../../lib/utils";
import { headingStyle } from "../../lib/typography";

export default function DashboardPage() {
  const [loaded, setLoaded] = useState(false);
  const [giftsCount, setGiftsCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [recentPayments, setRecentPayments] = useState<ReturnType<
    typeof getPayments
  >>([]);
  const [withdrawMessage, setWithdrawMessage] = useState("");

  const refresh = () => {
    const presents = getGifts();
    const payments = getPayments();
    setGiftsCount(presents.length);
    setPaymentsCount(payments.length);
    setTotalReceived(
      payments.reduce((sum, payment) => sum + payment.amount, 0),
    );
    setRecentPayments(payments.slice(0, 5));
    setLoaded(true);
  };

  useEffect(() => {
    refresh();
  }, []);

  const empty = loaded && paymentsCount === 0;

  return (
    <Layout>
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Creator dashboard
              </p>
              <h1
                className="mt-2 text-3xl font-black leading-[1.1] md:text-4xl"
                style={headingStyle}
              >
                Your present stats
              </h1>
            </div>
            <Button variant="secondary" shape="pill">
              Export summary
            </Button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <StatTile label="Total received" value={formatCurrency(totalReceived)} />
            <StatTile label="Present links" value={`${giftsCount}`} accent="accent" />
            <StatTile label="Presents paid" value={`${paymentsCount}`} accent="accent" />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card accent="accent" shadow="pop" className="bg-white/70">
              <h2 className="text-xl font-extrabold leading-tight" style={headingStyle}>
                Recent presents
              </h2>
              {empty ? (
                <div className="mt-4 rounded-[24px] bg-white/90 p-4 shadow-pop">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    No presents yet. Share your link to start collecting.
                  </p>
                  <div className="mt-3">
                    <Link href="/create">
                      <Button variant="primary" shape="pill">
                        Create a present link
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {recentPayments.map((payment) => (
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
                Withdraw
              </h3>
              <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                Withdrawals are processed to your payout account.
              </p>
              {withdrawMessage ? (
                <p className="mt-4 text-sm font-bold uppercase tracking-widest text-[var(--foreground)]">
                  {withdrawMessage}
                </p>
              ) : null}
              <Button
                className="mt-6 w-full"
                variant="secondary"
                shape="pill"
                onClick={() =>
                  setWithdrawMessage("Withdrawal queued. Funds arriving soon.")
                }
              >
                Withdraw now
              </Button>
              <Link
                href="/u/present"
                className="mt-4 block text-xs font-bold uppercase tracking-widest text-[var(--foreground)] underline"
              >
                View public stats
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
