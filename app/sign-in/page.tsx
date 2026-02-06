import Link from "next/link";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { headingStyle } from "../../lib/typography";

export default function SignInPage() {
  return (
    <Layout>
      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <Card accent="accent" shadow="pop" className="bg-white/70">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Welcome back
              </p>
              <h1
                className="mt-3 text-4xl font-black leading-[1.05] sm:text-5xl"
                style={headingStyle}
              >
                Sign in to your present dashboard
              </h1>
              <p className="mt-3 text-sm text-[var(--muted-foreground)] sm:text-base">
                One tap with Google to pick up where you left off. No passwords,
                no stress.
              </p>
              <div className="mt-8">
                <Button variant="primary" shape="pill" className="w-full">
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-pop">
                      <svg
                        viewBox="0 0 48 48"
                        aria-hidden
                        className="h-4 w-4"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.5 0 6.7 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.5 13.2l8 6.2C12.3 13.4 17.7 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46.1 24.6c0-1.7-.2-3.4-.5-5H24v9.4h12.4c-.6 3-2.3 5.6-4.9 7.3l7.5 5.8c4.4-4.1 7.1-10.2 7.1-17.5z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.5 28.7c-1-2.9-1-6 0-8.9l-8-6.2C-.6 19.7-.6 28.3 2.5 34.4l8-5.7z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7.5-5.8c-2.1 1.4-4.9 2.2-8 2.2-6.3 0-11.7-3.9-13.5-9.3l-8 5.7C6.5 42.6 14.6 48 24 48z"
                        />
                      </svg>
                    </span>
                    Continue with Google
                  </span>
                </Button>
              </div>
              <p className="mt-4 text-xs text-[var(--muted-foreground)]">
                By continuing you agree to our terms and privacy policy.
              </p>
            </Card>

            <Card accent="accent" className="bg-white/70">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Why sign in?
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
                <li className="rounded-[24px] bg-white/90 px-4 py-3 shadow-pop">
                  Track every present from one dashboard.
                </li>
                <li className="rounded-[24px] bg-white/90 px-4 py-3 shadow-pop">
                  Withdraw with a single tap.
                </li>
                <li className="rounded-[24px] bg-white/90 px-4 py-3 shadow-pop">
                  Share new links fast and stay in control.
                </li>
              </ul>
              <Link
                href="/create"
                className="mt-6 inline-flex text-xs font-bold uppercase tracking-widest text-[var(--foreground)] underline"
              >
                Or create a present link
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
