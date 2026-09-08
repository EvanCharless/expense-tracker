import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import { ExpenseCategory, type AddExpenseForm } from "@/types/expense";

type AddExpenseProps = {
  onAddExpense: (data: AddExpenseForm) => void;
};

export function AddExpenseModal({ onAddExpense }: AddExpenseProps) {
  const [open, setOpen] = useState<boolean>(false);

  // TODO: Add validation, such as required
  const [formData, setFormData] = useState<AddExpenseForm>({
    amount: 0,
    category: ExpenseCategory.Others,
    date: new Date(),
    notes: "",
  });

  const categories = useMemo(
    () =>
      Object.entries(ExpenseCategory).map(([key, value]) => ({
        label: key,
        value,
      })),
    [],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          setFormData({
            amount: 0,
            category: ExpenseCategory.Others,
            date: new Date(),
            notes: "",
          });
        }
        setOpen(open);
      }}
    >
      <DialogTrigger render={<Button variant="outline">Add Expense</Button>} />

      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAddExpense(formData);
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-black!">Add Expense</DialogTitle>
            <DialogDescription>
              Enter the details of your expense below.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="my-6">
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                defaultValue={0}
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
                }
                required
              />
            </Field>

            <Field>
              <Label htmlFor="category">Category</Label>
              <Select
                items={categories}
                value={formData.category}
                defaultValue={"formData.category"}
                onValueChange={(val) => {
                  setFormData((prev) => ({
                    ...prev,
                    category: val as ExpenseCategory,
                  }));
                }}
                required
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant={"outline"}
                    data-empty={!formData.date}
                    className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {formData.date ? (
                      format(formData.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <ChevronDownIcon data-icon="inline-end" />
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(val) =>
                    setFormData((prev) => ({ ...prev, date: val }))
                  }
                  defaultMonth={formData.date}
                  required
                />
              </PopoverContent>
            </Popover>

            <Field>
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
