"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import StatTile from "../../components/StatTile";
import { getGifts, getPayments } from "../../lib/storage";
import { formatCurrency, formatDate } from "../../lib/utils";
import { headingStyle } from "../../lib/typography";

export default function DashboardPage() {
  const [tab, setTab] = useState<"request" | "send">("request");
  const [gifts, setGifts] = useState(getGifts());
  const [payments, setPayments] = useState(getPayments());

  const refresh = () => {
    setGifts(getGifts());
    setPayments(getPayments());
  };

  useEffect(() => {
    refresh();
    const onStorage = (event: StorageEvent) => {
      if (event.key?.includes("gift-")) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const stats = useMemo(() => {
    const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
    const peopleReached = payments.length;
    return {
      peopleReached,
      totalLinks: gifts.length,
      totalCollected,
    };
  }, [gifts, payments]);

  const requestLinks = useMemo(
    () =>
      gifts
        .filter((gift) => gift.type === "request")
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [gifts],
  );

  const sendLinks = useMemo(
    () =>
      gifts
        .filter((gift) => gift.type === "claimable")
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [gifts],
  );

  const recentActivity = useMemo(() => {
    const lastPayment = payments[0];
    const paymentsThisWeek = payments.length;
    const byCode = new Map<string, number>();
    payments.forEach((payment) => {
      byCode.set(payment.code, (byCode.get(payment.code) ?? 0) + 1);
    });
    const topLinkCode = Array.from(byCode.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
    const topLink = topLinkCode ? gifts.find((gift) => gift.code === topLinkCode) : null;

    return {
      lastPayment,
      paymentsThisWeek,
      topLink,
    };
  }, [payments, gifts]);

  return (
    <Layout>
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Dashboard
              </p>
              <h1
                className="mt-2 text-3xl font-black leading-[1.1] md:text-4xl"
                style={headingStyle}
              >
                Your presents
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={tab === "send" ? "/create?type=claimable" : "/create?type=request"}>
                <Button variant="primary" shape="pill">
                  {tab === "send" ? "Create send link" : "Create request link"}
                </Button>
              </Link>
              <Link href="/wallet">
                <Button variant="outline" shape="pill">Wallet</Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <StatTile label="People reached" value={`${stats.peopleReached}`} />
            <StatTile label="Total links" value={`${stats.totalLinks}`} />
            <StatTile label="Total collected" value={formatCurrency(stats.totalCollected)} />
          </div>

          <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Link type tabs">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "request"}
              aria-controls="request-panel"
              onClick={() => setTab("request")}
              className={`rounded-full border-2 border-[var(--foreground)] px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-pop transition-all duration-300 ease-bounce ${
                tab === "request"
                  ? "bg-[var(--foreground)] text-white"
                  : "bg-white text-[var(--foreground)]"
              }`}
            >
              Ask for a present
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "send"}
              aria-controls="send-panel"
              onClick={() => setTab("send")}
              className={`rounded-full border-2 border-[var(--foreground)] px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-pop transition-all duration-300 ease-bounce ${
                tab === "send"
                  ? "bg-[var(--foreground)] text-white"
                  : "bg-white text-[var(--foreground)]"
              }`}
            >
              Send a present
            </button>
          </div>
          <p className="mt-3 text-sm text-[var(--muted-foreground)]">
            {tab === "request"
              ? "Create a link so anyone can contribute."
              : "You pay first, then share a claim link."}
          </p>

          {tab === "request" ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" role="tabpanel" id="request-panel">
              <Card shadow="pop" className="bg-white/70" disableHoverFx>
                <h2 className="text-xl font-extrabold" style={headingStyle}>
                  Ask for a present
                </h2>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  Share a link that anyone can contribute to.
                </p>
                <div className="mt-6 space-y-3">
                  {requestLinks.length === 0 ? (
                    <div className="rounded-[16px] border-2 border-[var(--foreground)] bg-white px-4 py-4 text-sm shadow-pop">
                      <p className="text-sm text-[var(--muted-foreground)]">
                        No request links yet. Create your first link.
                      </p>
                      <div className="mt-3">
                        <Link href="/create?type=request">
                          <Button variant="primary" shape="pill">
                            Create request link
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    requestLinks.map((link) => {
                      const paymentsForLink = payments.filter(
                        (payment) => payment.code === link.code,
                      );
                      return (
                        <div
                          key={link.code}
                          className="flex flex-col gap-3 rounded-[16px] border-2 border-[var(--foreground)] bg-white px-4 py-3 text-sm shadow-pop md:flex-row md:items-center md:justify-between"
                        >
                          <div>
                            <p className="font-bold">{link.title}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {formatDate(link.createdAt)} · {paymentsForLink.length} payments
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              shape="pill"
                              onClick={async () => {
                                const linkUrl = `${window.location.origin}/g/${link.code}`;
                                await navigator.clipboard.writeText(linkUrl);
                              }}
                            >
                              Share
                            </Button>
                            <Link href={`/links/${link.code}`}>
                              <Button variant="outline" shape="pill">View details</Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Card>

              <Card shadow="soft" className="bg-white/70" disableHoverFx>
                <h3 className="text-lg font-extrabold" style={headingStyle}>
                  Recent activity
                </h3>
                <div className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
                  {recentActivity.lastPayment ? (
                    <p>
                      Last payment: {formatCurrency(recentActivity.lastPayment.amount)} ·{" "}
                      {formatDate(recentActivity.lastPayment.createdAt)}
                    </p>
                  ) : (
                    <p>No payments yet.</p>
                  )}
                  <p>Payments this week: {recentActivity.paymentsThisWeek}</p>
                  <p>
                    Top link: {recentActivity.topLink?.title ?? "No link yet"}
                  </p>
                </div>
              </Card>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" role="tabpanel" id="send-panel">
              <Card shadow="pop" className="bg-white/70" disableHoverFx>
                <h2 className="text-xl font-extrabold" style={headingStyle}>
                  Send a present
                </h2>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  You pay first, then send a claim link.
                </p>
                <div className="mt-6 space-y-3">
                  {sendLinks.length === 0 ? (
                    <div className="rounded-[16px] border-2 border-[var(--foreground)] bg-white px-4 py-4 text-sm shadow-pop">
                      <p className="text-sm text-[var(--muted-foreground)]">
                        No send links yet. Create one to get a claim link.
                      </p>
                      <div className="mt-3">
                        <Link href="/create?type=claimable">
                          <Button variant="primary" shape="pill">
                            Create send link
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    sendLinks.map((link) => {
                      const paymentsForLink = payments.filter(
                        (payment) => payment.code === link.code,
                      );
                      const paid = paymentsForLink.length > 0;
                      const status = paid
                        ? link.claimed
                          ? "Claimed"
                          : "Unclaimed"
                        : "Unpaid";
                      return (
                        <div
                          key={link.code}
                          className="flex flex-col gap-3 rounded-[16px] border-2 border-[var(--foreground)] bg-white px-4 py-3 text-sm shadow-pop md:flex-row md:items-center md:justify-between"
                        >
                          <div>
                            <p className="font-bold">{link.title}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {status} · {formatDate(link.createdAt)}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              shape="pill"
                              onClick={async () => {
                                const linkUrl = `${window.location.origin}/claim/${link.code}`;
                                await navigator.clipboard.writeText(linkUrl);
                              }}
                            >
                              Copy claim link
                            </Button>
                            <Link href={`/links/${link.code}`}>
                              <Button variant="outline" shape="pill">View status</Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Card>

              <Card shadow="soft" className="bg-white/70" disableHoverFx>
                <h3 className="text-lg font-extrabold" style={headingStyle}>
                  Send checklist
                </h3>
                <div className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
                  <p>1. Select present</p>
                  <p>2. Pay now</p>
                  <p>3. Share claim link</p>
                  <p>4. Recipient claims</p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
