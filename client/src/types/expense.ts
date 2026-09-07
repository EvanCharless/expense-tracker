export type ExpenseProps = {
  id: number;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  notes: string;
};

export const ExpenseCategory = {
  Food: "food",
  Transport: "transport",
  Education: "education",
  Entertainment: "entertainment",
  Shopping: "shopping",
  Others: "others",
} as const;

export type ExpenseCategory = (typeof ExpenseCategory)[keyof typeof ExpenseCategory];