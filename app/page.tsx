import Link from "next/link";
import { ArrowRight, Check, Triangle } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Layout from "../components/Layout";
import StatTile from "../components/StatTile";
import MotionInView from "../components/MotionInView";
import MagneticTag from "../components/MagneticTag";
import { headingStyle } from "../lib/typography";

const testimonials = [
  {
    name: "Ify",
    quote: "Set up in two minutes. Everyone sent presents the same day.",
  },
  {
    name: "Dami",
    quote: "The link feels premium. The thank-you screen is so sweet.",
  },
  {
    name: "Tola",
    quote: "No stress. Just share and watch it roll in.",
  },
];

const faqs = [
  {
    question: "Is this real payment?",
    answer: "Payments are processed through secure providers in the full product.",
  },
  {
    question: "Can I customize the amounts?",
    answer: "Yes. Templates include suggested amounts and optional custom inputs.",
  },
  {
    question: "Is it only for Valentine?",
    answer: "No. Use it for birthdays, anniversaries, and every celebration.",
  },
];

export default function Home() {
  return (
    <Layout>
      <section className="px-4 pt-12 md:px-10 md:pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <MotionInView className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-pop" />
              Valentine launch · Nigeria
            </div>
            <h1
              className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
              style={headingStyle}
            >
              <span className="text-[var(--foreground)]">Send Love,</span> <br /> Not
              Stress
            </h1>
            <p className="max-w-xl text-base font-medium leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
              Create a present link. Share it. Get presents. Built to feel as warm
              and tangible as the moment itself.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/create">
                <Button variant="primary" shape="pill">
                  Create a present link <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Button>
              </Link>
              <Link
                href="/u/present"
                className="group relative text-sm font-bold uppercase tracking-widest text-[var(--foreground)]"
              >
                View public stats
                <span
                  className="pointer-events-none absolute left-0 top-full mt-1 h-3 w-full transition-transform duration-300 ease-bounce group-hover:-translate-y-0.5"
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 120 12"
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 C 12 2, 22 12, 32 6 C 42 0, 52 12, 62 6 C 72 0, 82 12, 92 6 C 102 0, 112 12, 118 6"
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {["No fees", "Instant share", "Local friendly"].map((item) => (
                <MagneticTag key={item}>{item}</MagneticTag>
              ))}
            </div>
          </MotionInView>

          <MotionInView delay={0.05}>
            <Card
              accent="accent"
              shadow="pop"
              hoverAccent
              hoverAccentColor="purple"
              className="mx-auto w-full max-w-md bg-white/70"
            >
              <div className="overflow-hidden rounded-xl border-2 border-[var(--foreground)] bg-[#8B5CF6] p-2 shadow-pop">
                <div className="overflow-hidden rounded-lg border-2 border-[var(--foreground)] bg-white">
                  <img
                    src="/present.png"
                    alt="Present preview"
                    className="h-64 w-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </MotionInView>
        </div>
      </section>

      <section className="px-4 py-12 md:px-10">
        <MotionInView className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <StatTile label="Total received" value="₦180,500" />
            <StatTile label="Presents delivered" value="36" accent="accent" />
            <StatTile label="Average present" value="₦5,000" accent="accent" />
          </div>
        </MotionInView>
      </section>

      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <MotionInView>
              <Card accent="accent" shadow="pop" className="bg-white/70">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                  How it works
                </p>
                <h3 className="mt-3 text-3xl font-black leading-[1.1]" style={headingStyle}>
                  From idea to present link in minutes.
                </h3>
                <ul className="mt-6 space-y-4 text-sm text-[var(--muted-foreground)]">
                  {["Pick a template", "Set amounts + note", "Share instantly"].map(
                    (step, index) => (
                      <li key={step} className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--foreground)] text-white shadow-pop">
                          0{index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ),
                  )}
                </ul>
              </Card>
            </MotionInView>
            <MotionInView delay={0.05}>
              <Card accent="accent" className="bg-white/70">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                  Built for presents
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Whatsapp share", "Custom amounts", "Present tracking", "Fast setup"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-[24px] border-2 border-[var(--foreground)] bg-white px-4 py-3 text-sm font-medium text-[var(--foreground)] shadow-pop"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <Check className="h-4 w-4 text-[var(--foreground)]" aria-hidden strokeWidth={2.5} />
                  Pay with confidence. Stats update instantly.
                </div>
              </Card>
            </MotionInView>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-10">
        <MotionInView className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Create",
                copy: "Pick a template, set amounts, add a note.",
              },
              {
                title: "Share",
                copy: "Send the link on WhatsApp or anywhere.",
              },
              {
                title: "Collect",
                copy: "Track presents and withdraw when ready.",
              },
            ].map((step, index) => (
              <Card key={step.title} accent="accent" className="bg-white/70">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                    Step 0{index + 1}
                  </span>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--foreground)] text-white shadow-pop">
                    <span className="text-xs font-black">0{index + 1}</span>
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-extrabold leading-tight" style={headingStyle}>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{step.copy}</p>
              </Card>
            ))}
          </div>
        </MotionInView>
      </section>

      <section className="px-4 py-12 md:px-10">
        <MotionInView className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name} accent="accent" className="bg-white/70">
                <p className="text-sm text-[var(--muted-foreground)]">“{item.quote}”</p>
                <p
                  className="mt-4 text-sm font-extrabold uppercase tracking-widest"
                  style={headingStyle}
                >
                  {item.name}
                </p>
              </Card>
            ))}
          </div>
        </MotionInView>
      </section>

      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <MotionInView>
              <Card accent="accent" shadow="pop" className="bg-white/70">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                  Built for creators
                </p>
                <h3 className="mt-3 text-3xl font-black leading-[1.1]" style={headingStyle}>
                  Everything you need to get presents fast.
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
                  {["Shareable link in seconds", "Custom amounts + preset chips", "Instant thank-you screen"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[var(--foreground)]" aria-hidden strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </Card>
            </MotionInView>
            <div className="space-y-4">
              <MotionInView>
                <Card accent="accent" className="bg-white/70">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                    For any occasion
                  </p>
                  <p className="mt-3 text-lg font-extrabold leading-tight" style={headingStyle}>
                    Valentine today, birthdays tomorrow.
                  </p>
                </Card>
              </MotionInView>
              <MotionInView delay={0.05}>
                <Card accent="accent" className="bg-white/70">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                    Local friendly
                  </p>
                  <p className="mt-3 text-lg font-extrabold leading-tight" style={headingStyle}>
                    Designed for Nigeria-first celebrations.
                  </p>
                </Card>
              </MotionInView>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-10">
        <MotionInView className="mx-auto max-w-5xl">
          <Card accent="accent" shadow="pop" className="bg-white/70">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                  Ready to try it?
                </p>
                <h3 className="mt-2 text-3xl font-black leading-[1.1]" style={headingStyle}>
                  Build a present link in minutes.
                </h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  No setup required. Just pick a template and share.
                </p>
              </div>
              <Link href="/create">
                <Button variant="primary" shape="pill">
                  Create a present link
                </Button>
              </Link>
            </div>
          </Card>
        </MotionInView>
      </section>

      <section className="px-4 pb-16 md:px-10">
        <MotionInView className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((item) => (
              <Card key={item.question} accent="accent" className="bg-white/70">
                <p className="text-sm font-extrabold" style={headingStyle}>
                  {item.question}
                </p>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{item.answer}</p>
              </Card>
            ))}
          </div>
        </MotionInView>
      </section>
    </Layout>
  );
}
