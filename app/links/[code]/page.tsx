"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "../../../components/Layout";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { getGift, getPaymentsByCode } from "../../../lib/storage";
import { formatCurrency, formatDate } from "../../../lib/utils";
import { headingStyle } from "../../../lib/typography";

export default function LinkDetailPage() {
  const params = useParams();
  const code = typeof params.code === "string" ? params.code : "";
  const [title, setTitle] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [type, setType] = useState<"request" | "claimable" | null>(null);
  const [claimed, setClaimed] = useState<boolean>(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!code) return;
    const link = getGift(code);
    if (!link) return;
    setTitle(link.title);
    setCreatedAt(link.createdAt);
    setType(link.type);
    setClaimed(Boolean(link.claimed));
    const payments = getPaymentsByCode(code);
    setTotal(payments.reduce((sum, p) => sum + p.amount, 0));
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
      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Card shadow="pop" className="bg-white/70" disableHoverFx>
            <h1 className="text-3xl font-black" style={headingStyle}>
              {title}
            </h1>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {type === "claimable" ? "Send link" : "Request link"}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[16px] border-2 border-[var(--foreground)] bg-white px-4 py-3 text-sm shadow-pop">
                <p className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  Total collected
                </p>
                <p className="mt-2 text-lg font-bold">
                  {formatCurrency(total)}
                </p>
              </div>
              <div className="rounded-[16px] border-2 border-[var(--foreground)] bg-white px-4 py-3 text-sm shadow-pop">
                <p className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  Status
                </p>
                <p className="mt-2 text-lg font-bold">
                  {type === "claimable" ? (claimed ? "Claimed" : "Unclaimed") : "Active"}
                </p>
              </div>
              <div className="rounded-[16px] border-2 border-[var(--foreground)] bg-white px-4 py-3 text-sm shadow-pop">
                <p className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  Created
                </p>
                <p className="mt-2 text-lg font-bold">
                  {createdAt ? formatDate(createdAt) : "-"}
                </p>
              </div>
              <div className="rounded-[16px] border-2 border-[var(--foreground)] bg-white px-4 py-3 text-sm shadow-pop">
                <p className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  Link code
                </p>
                <p className="mt-2 text-lg font-bold">{code}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" shape="pill">Copy link</Button>
              <Button variant="primary" shape="pill">Share</Button>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
