import type { ExpenseProps } from "@/types/expense";
import { ExpenseCategory } from '@/types/expense'

export const mockExpenses: ExpenseProps[] = [
  {
    id: 1,
    amount: 45000,
    category: ExpenseCategory.Food,
    date: new Date("2026-09-01"),
    notes: "Nasi padang lunch",
  },
  {
    id: 2,
    amount: 150000,
    category: ExpenseCategory.Transport,
    date: new Date("2026-09-02"),
    notes: "Grab to office",
  },
  {
    id: 3,
    amount: 750000,
    category: ExpenseCategory.Bills,
    date: new Date("2026-09-03"),
    notes: "Electricity bill",
  },
  {
    id: 4,
    amount: 25000,
    category: ExpenseCategory.Food,
    date: new Date("2026-09-04"),
    notes: "Kopi & snack",
  },
  {
    id: 5,
    amount: 500000,
    category: ExpenseCategory.Others,
    date: new Date("2026-09-05"),
    notes: "Birthday gift",
  },
  {
    id: 6,
    amount: 300000,
    category: ExpenseCategory.Transport,
    date: new Date("2026-09-06"),
    notes: "Fuel",
  },
];