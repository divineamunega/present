import type { Gift, Payment } from "./types";
import { createId } from "./utils";

const GIFTS_KEY = "gift-links";
const PAYMENTS_KEY = "gift-payments";

let giftsCache: Gift[] | null = null;
let paymentsCache: Payment[] | null = null;

const isClient = () => typeof window !== "undefined";

const read = <T,>(key: string, fallback: T): T => {
  if (!isClient()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  if (!isClient()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getGifts = () => {
  if (giftsCache) return giftsCache;
  giftsCache = read<Gift[]>(GIFTS_KEY, []);
  return giftsCache;
};

export const getGift = (code: string) =>
  getGifts().find((gift) => gift.code === code) ?? null;

export const saveGift = (gift: Gift) => {
  const next = [...getGifts(), gift];
  giftsCache = next;
  write(GIFTS_KEY, next);
};

export const updateGift = (code: string, updates: Partial<Gift>) => {
  const next = getGifts().map((gift) =>
    gift.code === code ? { ...gift, ...updates } : gift,
  );
  giftsCache = next;
  write(GIFTS_KEY, next);
};

export const getPayments = () => {
  if (paymentsCache) return paymentsCache;
  paymentsCache = read<Payment[]>(PAYMENTS_KEY, []);
  return paymentsCache;
};

export const getPaymentsByCode = (code: string) =>
  getPayments().filter((payment) => payment.code === code);

export const savePayment = (payment: Omit<Payment, "id">) => {
  const entry: Payment = { ...payment, id: createId() };
  const next = [entry, ...getPayments()];
  paymentsCache = next;
  write(PAYMENTS_KEY, next);
  return entry;
};

export const getPaymentsByCreator = (creatorName: string) => {
  const gifts = getGifts().filter((gift) => gift.creatorName === creatorName);
  const codes = new Set(gifts.map((gift) => gift.code));
  return getPayments().filter((payment) => codes.has(payment.code));
};

export const seedDemoData = () => {
  const existing = getGifts().find((gift) => gift.code === "DEMO01");
  if (existing) return;
  const demoGift: Gift = {
    code: "DEMO01",
    templateId: "dinner",
    title: "Dinner for Two",
    suggestedAmounts: [5000, 12000, 20000],
    customAllowed: true,
    note: "Made for Demo",
    createdAt: new Date().toISOString(),
    creatorName: "Demo",
  };
  saveGift(demoGift);
  savePayment({
    code: "DEMO01",
    amount: 12000,
    createdAt: new Date().toISOString(),
    fromName: "Tolu",
    message: "Enjoy tonight!",
    status: "success",
  });
};
