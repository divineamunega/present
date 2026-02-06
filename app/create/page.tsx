"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Layout from "../../components/Layout";
import TemplateCard from "../../components/TemplateCard";
import AmountChips from "../../components/AmountChips";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { giftTemplates } from "../../lib/templates";
import { createCode, formatCurrency } from "../../lib/utils";
import { saveGift, savePayment } from "../../lib/storage";
import { headingStyle } from "../../lib/typography";

export default function CreatePresentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const linkType: "request" | "claimable" = typeParam === "claimable" ? "claimable" : "request";

  const [templateId, setTemplateId] = useState<string>(giftTemplates[0].id);
  const [title, setTitle] = useState(giftTemplates[0].title);
  const [note, setNote] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    giftTemplates[0].suggestedAmounts[1] ?? giftTemplates[0].suggestedAmounts[0],
  );

  const template = useMemo(
    () => giftTemplates.find((item) => item.id === templateId),
    [templateId],
  );

  useEffect(() => {
    if (!template) return;
    setTitle(template.title);
    setSelectedAmount(template.suggestedAmounts[0] ?? null);
  }, [template]);

  const canSubmit = Boolean(template && creatorName.trim().length > 1 && selectedAmount);

  return (
    <Layout>
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                {linkType === "claimable" ? "Send link" : "Request link"}
              </p>
              <h1
                className="mt-2 text-3xl font-black leading-[1.1] sm:text-4xl"
                style={headingStyle}
              >
                {linkType === "claimable" ? "Send a present" : "Request a present"}
              </h1>
              <Link
                href="/dashboard"
                className="mt-3 inline-flex text-xs font-bold uppercase tracking-widest text-[var(--foreground)] underline"
              >
                Back to dashboard
              </Link>
            </div>
            <Card shadow="soft" className="bg-white/70" disableHoverFx>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                {linkType === "claimable" ? "Gifter pays first" : "Shareable link"}
              </p>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                {linkType === "claimable"
                  ? "Pay now, then send the claim link."
                  : "Anyone can contribute once you share."}
              </p>
            </Card>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {giftTemplates.map((item) => (
              <TemplateCard
                key={item.id}
                template={item}
                selected={item.id === templateId}
                emphasize={linkType === "request"}
                onSelect={() => setTemplateId(item.id)}
              />
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card shadow="pop" className="bg-white/70">
              <h2 className="text-xl font-extrabold leading-tight" style={headingStyle}>
                Personalize your link
              </h2>
              <div className="mt-4 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                  Present title
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="mt-2 w-full rounded-lg border-2 border-[#cbd5e1] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-pop transition-all duration-300 ease-bounce focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                  Note
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={3}
                    placeholder={
                      linkType === "claimable"
                        ? "Write a message they will smile at"
                        : "Tell people what you are saving for"
                    }
                    className="mt-2 w-full rounded-lg border-2 border-[#cbd5e1] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-pop transition-all duration-300 ease-bounce focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
                  />
                </label>
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                  Your name
                  <input
                    value={creatorName}
                    onChange={(event) => setCreatorName(event.target.value)}
                    placeholder="e.g. Ada"
                    className="mt-2 w-full rounded-lg border-2 border-[#cbd5e1] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-pop transition-all duration-300 ease-bounce focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
                  />
                </label>
              </div>
            </Card>

            <Card className="bg-white/70">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]" style={headingStyle}>
                {linkType === "claimable" ? "Step 1: Choose amount" : "Requested amount"}
              </h3>
              {template ? (
                <div className="mt-4">
                  <AmountChips
                    amounts={template.suggestedAmounts}
                    selected={selectedAmount}
                    onSelect={setSelectedAmount}
                    customAllowed={false}
                  />
                </div>
              ) : null}
              {linkType === "claimable" ? (
                <div className="mt-6 space-y-3 text-sm text-[var(--muted-foreground)]">
                  <p><strong>Step 2:</strong> Pay now</p>
                  <p><strong>Step 3:</strong> Get claim link</p>
                  <p><strong>Step 4:</strong> Recipient claims</p>
                </div>
              ) : null}
              <Button
                className="mt-6 w-full"
                variant="primary"
                shape="pill"
                disabled={!canSubmit}
                onClick={() => {
                  if (!template || !selectedAmount) return;
                  const code = createCode();
                  saveGift({
                    code,
                    templateId: template.id,
                    title: title.trim() || template.title,
                    suggestedAmounts: template.suggestedAmounts,
                    customAllowed: template.customAllowed,
                    note: note.trim(),
                    createdAt: new Date().toISOString(),
                    creatorName: creatorName.trim(),
                    type: linkType,
                    claimed: false,
                  });

                  if (linkType === "claimable") {
                    savePayment({
                      code,
                      amount: selectedAmount,
                      createdAt: new Date().toISOString(),
                      fromName: creatorName.trim() || undefined,
                      status: "success",
                    });
                    router.push(`/share/${code}`);
                  } else {
                    router.push(`/share/${code}`);
                  }
                }}
              >
                {linkType === "claimable"
                  ? `Pay ${selectedAmount ? formatCurrency(selectedAmount) : ""} & get link`
                  : "Create request link"}
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
