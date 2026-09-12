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
  Bills: "bills",
  Others: "others",
} as const;

export type ExpenseCategory = (typeof ExpenseCategory)[keyof typeof ExpenseCategory];

export const CATEGORY_LABELS = Object.fromEntries(
  Object.entries(ExpenseCategory).map(([key, value]) => [value, key])
) as Record<ExpenseCategory, string>;


export type ExpenseFormData = {
  amount: number;
  category: ExpenseCategory;
  date: Date;
  notes: string;
}


export const SORT_OPTIONS = [
  { label: "Amount: Low to High", value: "amount_asc" },
  { label: "Amount: High to Low", value: "amount_desc" },
  { label: "Date: Oldest to Newest", value: "date_asc" },
  { label: "Date: Newest to Oldest", value: "date_desc" },
];

export type sortType = (typeof SORT_OPTIONS)[number]["value"];