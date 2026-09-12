import type { ExpenseProps } from "@/types/expense";
import ExpenseListItem from "./ExpenseListItem";

interface ExpenseListProps {
  expenseList: ExpenseProps[];
  onEdit: (expense: ExpenseProps) => void;
  onRemove: (id: ExpenseProps["id"]) => void;
}

function ExpenseList({ expenseList, onEdit, onRemove }: ExpenseListProps) {
  return (
    <>
      {expenseList.map((expense) => {
        return (
          <ExpenseListItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        );
      })}
    </>
  );
}

export default ExpenseList;
