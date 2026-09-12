import * as z from "zod";
import { ExpenseCategory } from "@/types/expense";

export const formSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  category: z.enum(
    Object.values(ExpenseCategory) as [ExpenseCategory, ...ExpenseCategory[]],
    { message: "Please select a category" },
  ),
  date: z.date({ message: "Date is required" }),
  notes: z.string().max(200, "Notes must be under 200 characters").optional(),
});