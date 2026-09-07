import type { ExpenseProps } from "@/types/expense";
import { ExpenseCategory } from '@/types/expense'

export const mockExpenses: ExpenseProps[] = [
  { id: 1, amount: 12.5, category: ExpenseCategory.Food, date: new Date("2026-09-01"), notes: "Lunch at cafe" },
  { id: 2, amount: 45.0, category: ExpenseCategory.Transport, date: new Date("2026-09-02"), notes: "Grab ride" },
  { id: 3, amount: 89.99, category: ExpenseCategory.Shopping, date: new Date("2026-09-02"), notes: "New shoes" },
  { id: 4, amount: 15.0, category: ExpenseCategory.Entertainment, date: new Date("2026-09-03"), notes: "Movie ticket" },
  { id: 5, amount: 200.0, category: ExpenseCategory.Education, date: new Date("2026-09-04"), notes: "Online course" },
  { id: 6, amount: 30.75, category: ExpenseCategory.Food, date: new Date("2026-09-05"), notes: "Groceries" },
  { id: 7, amount: 5.0, category: ExpenseCategory.Others, date: new Date("2026-09-06"), notes: "Parking fee" },
];