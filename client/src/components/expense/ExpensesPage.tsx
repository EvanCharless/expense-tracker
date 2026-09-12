import { useState, useMemo, useCallback } from "react";
import {
  ExpenseCategory,
  type ExpenseProps,
  type ExpenseFormData,
  type sortType,
} from "@/types/expense";
import { formatRupiah } from "@/utils/format";
import { mockExpenses } from "@/data/mockExpenses";
import { Button } from "@/components/ui/button";
import ExpenseList from "@/components/expense/ExpenseList";
import ExpenseFilters from "@/components/expense/ExpenseFilters";
import ExpenseDialog from "@/components/expense/ExpenseDialog";
import { type DateRange } from "react-day-picker";

function ExpensesPage() {
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>(mockExpenses);

  const [selectedCategory, setSelectedCategory] = useState<
    ExpenseCategory | "all"
  >("all");
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const [selectedSort, setSelectedSort] = useState<sortType | "all">("all");

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseProps | null>(
    null,
  );

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

    if (selectedSort === "amount_asc") {
      list = list.toSorted((a, b) => a.amount - b.amount);
    } else if (selectedSort === "amount_desc") {
      list = list.toSorted((a, b) => b.amount - a.amount);
    } else if (selectedSort === "date_asc") {
      list = list.toSorted(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    } else if (selectedSort === "date_desc") {
      list = list.toSorted(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    return list;
  }, [expenseList, selectedCategory, selectedDate, selectedSort]);

  const totalExpenses = useMemo(() => {
    return displayExpenseList.reduce((total, item) => total + item.amount, 0);
  }, [displayExpenseList]);

  const onResetFilters = () => {
    setSelectedCategory("all");
    setSelectedDate(undefined);
  };

  const showAddExpenseDialog = () => {
    setSelectedExpense(null);
    setIsDialogOpen(true);
  };

  const showEditExpenseDialog = useCallback((expense: ExpenseProps) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  }, []);

  const handleRemove = useCallback((id: ExpenseProps["id"]) => {
    setExpenseList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const onAddExpense = async (formData: ExpenseFormData) => {
    const mockId = expenseList.length + 1;
    setExpenseList((prev) => [...prev, { ...formData, id: mockId }]);
  };

  const onEditExpense = async (
    id: ExpenseProps["id"],
    formData: ExpenseFormData,
  ) => {
    setExpenseList((prev) =>
      prev.map((item) => (item.id === id ? { ...formData, id } : item)),
    );
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="p-10 flex flex-col items-center justify-center gap-6 bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% min-w-full min-h-screen">
        <h1>Expense Tracker</h1>

        <h2>Total Expense: {formatRupiah(totalExpenses)}</h2>

        <Button onClick={showAddExpenseDialog}>Add Expense</Button>

        <div className="w-full flex flex-row flex-wrap items-center gap-2 mt-10 max-w-360">
          <ExpenseFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            onResetFilters={onResetFilters}
          />

          <ExpenseList
            expenseList={displayExpenseList}
            onEdit={showEditExpenseDialog}
            onRemove={handleRemove}
          />
        </div>
      </div>

      <ExpenseDialog
        key={selectedExpense?.id ?? "new"}
        open={isDialogOpen}
        expenseData={selectedExpense}
        onOpenChange={setIsDialogOpen}
        onAddExpense={onAddExpense}
        onEditExpense={onEditExpense}
      />
    </>
  );
}

export default ExpensesPage;
