"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import TemplateCard from "../../components/TemplateCard";
import AmountChips from "../../components/AmountChips";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { giftTemplates } from "../../lib/templates";
import { createCode } from "../../lib/utils";
import { saveGift } from "../../lib/storage";
import { headingStyle } from "../../lib/typography";

export default function CreateGiftPage() {
  const router = useRouter();
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

  const canSubmit = Boolean(template && creatorName.trim().length > 1);

  return (
    <Layout>
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Create present link
              </p>
              <h1
                className="mt-2 text-3xl font-black leading-[1.1] sm:text-4xl"
                style={headingStyle}
              >
                Pick a template
              </h1>
            </div>
            <Card accent="accent" className="bg-white/70 md:max-w-xs">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Valentine ready
              </p>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Create now, share in seconds.
              </p>
            </Card>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {giftTemplates.map((item) => (
              <TemplateCard
                key={item.id}
                template={item}
                selected={item.id === templateId}
                onSelect={() => setTemplateId(item.id)}
              />
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card accent="accent" shadow="pop" className="bg-white/70">
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
                  Note to senders
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={3}
                    placeholder="Add a short message"
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

            <Card accent="accent" className="bg-white/70">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]" style={headingStyle}>
                Suggested amounts
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
              <Button
                className="mt-6 w-full"
                variant="primary"
                shape="pill"
                disabled={!canSubmit}
                onClick={() => {
                  if (!template) return;
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
                  });
                  router.push(`/share/${code}`);
                }}
              >
                Generate link
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
