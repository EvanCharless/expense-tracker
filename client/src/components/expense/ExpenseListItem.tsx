import { memo } from "react";
import type { ExpenseProps } from "@/types/expense";
import { formatDate, CATEGORY_LABELS, formatRupiah } from "@/utils/format";
import { CalendarDays, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExpenseListItemProps {
  expense: ExpenseProps;
  onEdit: (expense: ExpenseProps) => void;
  onRemove: (id: ExpenseProps["id"]) => void;
}

function ExpenseListItem({ expense, onEdit, onRemove }: ExpenseListItemProps) {
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
          <Badge variant="secondary">{CATEGORY_LABELS[expense.category]}</Badge>
        </div>

        <h4>Amount: {formatRupiah(expense.amount)}</h4>

        <div className="flex flex-row gap-2 items-center">
          <Button variant="default" onClick={() => onEdit(expense)}>
            <Pencil data-icon="inline-start" /> Edit
          </Button>

          <Button variant="default" onClick={() => onRemove(expense.id)}>
            <Trash data-icon="inline-start" /> Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(ExpenseListItem);
