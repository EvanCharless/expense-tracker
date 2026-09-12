import { ExpenseCategory } from '@/types/expense'

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export const CATEGORY_LABELS = Object.fromEntries(
  Object.entries(ExpenseCategory).map(([key, value]) => [value, key])
) as Record<ExpenseCategory, string>;
