export type Gift = {
  code: string;
  templateId: string;
  title: string;
  suggestedAmounts: number[];
  customAllowed: boolean;
  note: string;
  createdAt: string;
  creatorName: string;
  type: "request" | "claimable";
  claimed?: boolean;
};

export type Payment = {
  id: string;
  code: string;
  amount: number;
  fromName?: string;
  message?: string;
  createdAt: string;
  status: "success";
};

export type GiftTemplate = {
  id: string;
  emoji: string;
  title: string;
  copy: string;
  suggestedAmounts: number[];
  customAllowed: boolean;
};
