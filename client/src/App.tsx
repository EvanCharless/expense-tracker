import { useState, useMemo } from "react";
import { CalendarDays, Pencil, Trash } from "lucide-react";
import {
  ExpenseCategory,
  type ExpenseProps,
  type AddExpenseForm,
} from "@/types/expense";
import { formatDate } from "@/utils/formatDate";
import { mockExpenses } from "@/data/mockExpenses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddExpenseModal } from "@/components/AddExpenseModal";
import { ExpenseFilter } from "@/components/ExpenseFilter";
import { type DateRange } from "react-day-picker";

function App() {
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>(mockExpenses);

  const [selectedCategory, setSelectedCategory] = useState<
    ExpenseCategory | "all"
  >("all");

  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();

  const displayExpenseList = useMemo(() => {
    let list = expenseList;

    if (selectedCategory && selectedCategory !== "all")
      list = list.filter((item) => item.category === selectedCategory);

    if (selectedDate?.from && selectedDate?.to) {
      const startDate = new Date(selectedDate.from);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(selectedDate.to);
      endDate.setHours(23, 59, 59, 999);

      list = list.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    return list;
  }, [expenseList, selectedCategory, selectedDate]);

  const onResetFilters = () => {
    setSelectedCategory("all");
    setSelectedDate(undefined);
  };

  const onAddExpense = async (formData: AddExpenseForm) => {
    console.log(formData);
  };

  const onEdit = async () => {};
  const onRemove = async () => {};

  return (
    <>
      <div className="p-10 flex flex-col items-center justify-center gap-6 bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% min-w-full min-h-screen">
        <h1>Expense Tracker</h1>

        <AddExpenseModal onAddExpense={onAddExpense} />

        <div className="w-full flex flex-row flex-wrap items-center gap-2 mt-10 max-w-360">
          <ExpenseFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onResetFilters={onResetFilters}
          />

          {displayExpenseList.map((expense) => {
            return (
              <div
                key={expense.id}
                className="w-full flex flex-col gap-6 border-t-2 border-white"
              >
                <div className="w-full flex flex-col gap-4 items-start text-white py-8">
                  <div className="flex flex-row gap-2">
                    <CalendarDays />
                    <h2>{formatDate(expense.date)}</h2>
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <h3>{expense.notes || "Untitled"}</h3>
                    <Badge variant="secondary">{expense.category}</Badge>
                  </div>

                  <h4>Amount: {expense.amount}</h4>

                  <div className="flex flex-row gap-2 items-center">
                    <Button variant="default" onClick={onEdit}>
                      <Pencil data-icon="inline-start" /> Edit
                    </Button>

                    <Button variant="default" onClick={onRemove}>
                      <Trash data-icon="inline-start" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
