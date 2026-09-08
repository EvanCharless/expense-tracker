"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExpenseCategory, SORT_OPTIONS, type sortType } from "@/types/expense";
import { type DateRange } from "react-day-picker";

type ExpenseFilterProps = {
  selectedCategory: ExpenseCategory | "all";
  onCategoryChange: (value: ExpenseCategory | "all") => void;
  selectedDate: DateRange | undefined;
  onDateChange: (value: DateRange | undefined) => void;

  selectedSort: sortType;
  onSortChange: (value: sortType) => void;

  onResetFilters: () => void;
};

export function ExpenseFilter({
  selectedCategory,
  onCategoryChange,
  selectedDate,
  onDateChange,
  selectedSort,
  onSortChange,
  onResetFilters,
}: ExpenseFilterProps) {
  const categories = useMemo(
    () => [
      { label: "All", value: "all" },
      ...Object.entries(ExpenseCategory).map(([key, value]) => ({
        label: key,
        value,
      })),
    ],
    [],
  );

  const sortOptions = useMemo(
    () => [
      { label: "All", value: "all" },
      ...SORT_OPTIONS.map((opt) => ({
        label: opt.label,
        value: opt.value,
      })),
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <h2>Filters</h2>
        <div className="flex flex-row gap-4 items-center justify-start w-full">
          <Select
            items={categories}
            defaultValue={selectedCategory}
            onValueChange={(val) => onCategoryChange(val as ExpenseCategory)}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {categories.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Field className="mx-auto w-60">
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    id="date-picker-range"
                    className="justify-start px-2.5 font-normal"
                  >
                    <CalendarIcon data-icon="inline-start" />
                    {selectedDate?.from ? (
                      selectedDate.to ? (
                        <>
                          {format(selectedDate.from, "LLL dd, y")} -{" "}
                          {format(selectedDate.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(selectedDate.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={selectedDate?.from}
                  selected={selectedDate}
                  onSelect={onDateChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </Field>

          <Button onClick={onResetFilters}>Reset Filters</Button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <h2>Sorting</h2>
        <div className="flex flex-row gap-4 items-center justify-start w-full">
          <Select
            items={sortOptions}
            defaultValue={selectedSort}
            onValueChange={(val) => onSortChange(val as sortType)}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sorting</SelectLabel>
                {sortOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
