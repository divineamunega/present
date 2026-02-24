"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import StatTile from "../../components/StatTile";
import { getPayments } from "../../lib/storage";
import { formatCurrency, formatDate } from "../../lib/utils";
import { headingStyle } from "../../lib/typography";

export default function WalletPage() {
  const [payments, setPayments] = useState(getPayments());

  useEffect(() => {
    setPayments(getPayments());
  }, []);

  const totalBalance = useMemo(
    () => payments.reduce((sum, payment) => sum + payment.amount, 0),
    [payments],
  );

  const lastPayment = payments[0];

  return (
    <Layout>
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Wallet
              </p>
              <h1 className="mt-2 text-3xl font-black leading-[1.1] md:text-4xl" style={headingStyle}>
                Your balance
              </h1>
            </div>
            <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest underline">
              Back to dashboard
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <StatTile label="Available balance" value={formatCurrency(totalBalance)} />
            <StatTile label="Pending payout" value={formatCurrency(0)} />
            <StatTile
              label="Last payment"
              value={lastPayment ? formatCurrency(lastPayment.amount) : formatCurrency(0)}
            />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card shadow="pop" className="bg-white/70" disableHoverFx>
              <h2 className="text-xl font-extrabold" style={headingStyle}>
                Withdraw funds
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Withdrawals are sent to your payout account within 24–48 hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="primary" shape="pill">Withdraw to bank</Button>
                <Button variant="outline" shape="pill">Add payout method</Button>
                <Button variant="outline" shape="pill">Export statement</Button>
              </div>
            </Card>

            <Card shadow="soft" className="bg-white/70" disableHoverFx>
              <h3 className="text-lg font-extrabold" style={headingStyle}>
                Recent wallet activity
              </h3>
              <div className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
                {payments.length === 0 ? (
                  <p>No wallet activity yet.</p>
                ) : (
                  payments.slice(0, 5).map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between rounded-[16px] border-2 border-[var(--foreground)] bg-white px-4 py-3 shadow-pop"
                    >
                      <div>
                        <p className="font-bold">{payment.fromName || "Anonymous"}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {formatDate(payment.createdAt)}
                        </p>
                      </div>
                      <p className="font-bold">{formatCurrency(payment.amount)}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
