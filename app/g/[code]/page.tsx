"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import AmountChips from "../../../components/AmountChips";
import { getGift, savePayment } from "../../../lib/storage";
import { formatCurrency } from "../../../lib/utils";
import { headingStyle } from "../../../lib/typography";

export default function GiftPage() {
  const params = useParams();
  const router = useRouter();
  const code = typeof params.code === "string" ? params.code : "";
  const [giftTitle, setGiftTitle] = useState<string | null>(null);
  const [suggestedAmounts, setSuggestedAmounts] = useState<number[]>([]);
  const [customAllowed, setCustomAllowed] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [fromName, setFromName] = useState("");
  const [message, setMessage] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [simulateFail, setSimulateFail] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;
    const present = getGift(code);
    if (!present) {
      setLoading(false);
      return;
    }
    setGiftTitle(present.title);
    setSuggestedAmounts(present.suggestedAmounts);
    setCustomAllowed(present.customAllowed);
    setSelectedAmount(present.suggestedAmounts[0] ?? null);
    setLoading(false);
  }, [code]);

  const amountValue = useMemo(() => {
    const custom = Number(customAmount);
    if (customAllowed && customAmount && custom > 0) return custom;
    return selectedAmount ?? 0;
  }, [customAllowed, customAmount, selectedAmount]);

  if (!loading && !giftTitle) {
    return (
      <Layout>
        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-3xl font-black leading-[1.1]"
              style={headingStyle}
            >
              Present not found
            </h1>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              This present code doesn&apos;t exist. Ask the creator to share a new
              link.
            </p>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              Present for
            </p>
            <h1
              className="mt-2 text-3xl font-black leading-[1.1]"
              style={headingStyle}
            >
              {giftTitle || "Loading..."}
            </h1>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
              This is a cash present towards {giftTitle}. Recipient receives the
              funds.
            </p>
            <div className="mt-6">
              <AmountChips
                amounts={suggestedAmounts}
                selected={selectedAmount}
                onSelect={setSelectedAmount}
                customAllowed={customAllowed}
                customValue={customAmount}
                onCustomChange={(value) => {
                  setCustomAmount(value);
                  if (value) setSelectedAmount(null);
                }}
              />
            </div>
            <div className="mt-6 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Your name (optional)
                <input
                  value={fromName}
                  onChange={(event) => setFromName(event.target.value)}
                  className="mt-2 w-full rounded-lg border-2 border-[#cbd5e1] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-pop transition-all duration-300 ease-bounce focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Message (optional)
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-lg border-2 border-[#cbd5e1] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-pop transition-all duration-300 ease-bounce focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
                />
              </label>
            </div>
          </Card>

          <Card accent="accent" className="bg-white/70">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              Payment summary
            </p>
            <p className="mt-3 text-3xl font-black leading-[1.1]" style={headingStyle}>
              {amountValue ? formatCurrency(amountValue) : "Pick amount"}
            </p>
            <label className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              <input
                type="checkbox"
                checked={simulateFail}
                onChange={(event) => setSimulateFail(event.target.checked)}
                className="h-4 w-4 rounded border-0 text-[var(--foreground)]"
              />
              Simulate payment failure
            </label>
            {paymentError ? (
              <p className="mt-3 text-sm text-[var(--foreground)]">
                {paymentError}
              </p>
            ) : null}
            <Button
              className="mt-6 w-full"
              variant="primary"
              shape="pill"
              disabled={!amountValue}
              onClick={() => {
                if (!amountValue) return;
                if (simulateFail) {
                  setPaymentError("Payment failed. Try again.");
                  return;
                }
                savePayment({
                  code,
                  amount: amountValue,
                  createdAt: new Date().toISOString(),
                  fromName: fromName.trim() || undefined,
                  message: message.trim() || undefined,
                  status: "success",
                });
                router.push(`/success?code=${code}`);
              }}
            >
              Pay now
            </Button>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
