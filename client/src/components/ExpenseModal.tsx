import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "lucide-react";
import {
  ExpenseCategory,
  type ExpenseFormData,
  type ExpenseProps,
} from "@/types/expense";

type ExpenseModalProps = {
  open: boolean;
  expenseData: ExpenseProps | null;
  onOpenChange: (isOpen: boolean) => void;
  onAddExpense: (payload: ExpenseFormData) => void;
  onEditExpense: (id: ExpenseProps["id"], payload: ExpenseFormData) => void;
};

const formSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  category: z.enum(
    Object.values(ExpenseCategory) as [ExpenseCategory, ...ExpenseCategory[]],
    { message: "Please select a category" },
  ),
  date: z.date({ message: "Date is required" }),
  notes: z.string().max(200, "Notes must be under 200 characters").optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ExpenseModal({
  open,
  expenseData,
  onOpenChange,
  onAddExpense,
  onEditExpense,
}: ExpenseModalProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: (() => {
      if (expenseData) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...existingData } = expenseData;
        return existingData;
      }
      return {
        amount: 0,
        category: ExpenseCategory.Others,
        date: new Date(),
        notes: "",
      };
    })(),
    // Note:
    // IIFE (Immediately Invoked Function Expression) — a function defined and called immediately in the same expression.
    // () at the end — immediately calls that function
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { control, handleSubmit } = form;
  const dateVal = useWatch({ control, name: "date" });

  const categories = useMemo(() => {
    return [
      { label: "Select a category", value: null },
      ...Object.entries(ExpenseCategory).map(([key, value]) => ({
        label: key,
        value,
      })),
    ];
  }, []);

  const isEditMode = expenseData?.id;

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    if (isEditMode) onEditExpense(expenseData.id, values);
    else onAddExpense(values);
  };

  useEffect(() => {
    if (form) form.reset();
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-black!">
              {isEditMode ? "Edit" : "Add"} Expense
            </DialogTitle>
            <DialogDescription>
              Enter the details of your expense below.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="my-6">
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="amount">Amount</FieldLabel>
                  <Input
                    {...field}
                    value={field.value as number}
                    id="amount"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    placeholder="Input the amount"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    items={categories}
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="date"
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="date">Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          data-empty={!dateVal}
                          className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                          {dateVal ? (
                            format(dateVal, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <ChevronDownIcon data-icon="inline-end" />
                        </Button>
                      }
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        id="date"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        defaultMonth={field.value}
                      />
                    </PopoverContent>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Popover>
                </Field>
              )}
            />

            <Controller
              name="notes"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="notes">Notes</FieldLabel>
                  <Input
                    {...field}
                    id="notes"
                    aria-invalid={fieldState.invalid}
                    placeholder="Write down expense notes"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
