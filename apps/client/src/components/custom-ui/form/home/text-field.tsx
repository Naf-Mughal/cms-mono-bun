import React from "react";
import { useFieldContext } from "..";
import { FieldErrors } from "../field-errors";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TextFieldProps = {
  label: string;
  isInline?: boolean;
  labelClass?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const formatNumberWithCommas = (value: string) => {
  const raw = value.replace(/,/g, "");
  if (!/^\d*$/.test(raw)) return value; // Return original if non-numeric
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const TextField = ({
  label,
  isInline = true,
  labelClass,
  className,
  ...inputProps
}: TextFieldProps) => {
  const field = useFieldContext<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/,/g, "");

    if (/^\d*$/.test(rawValue)) {
      const formatted = formatNumberWithCommas(rawValue);
      field.handleChange(rawValue); // Store raw value
      e.target.value = formatted;
    } else {
      // Allow strings that are not numbers
      field.handleChange(inputValue);
    }
  };

  const value = (() => {
    const raw = field.state.value || "";
    if (/^\d+$/.test(raw)) {
      return formatNumberWithCommas(raw);
    }
    return raw;
  })();

  return (
    <div className="space-y-2">
      <div className={`flex flex-col ${isInline && "md:flex-row items-center"} gap-2`}>
        <Label
          htmlFor={field.name}
          className={cn("font-semibold min-w-[220px] flex items-center gap-1", labelClass)}
        >
          {label}
          {inputProps.required && <span className="text-[#3C9E19]">*</span>}
        </Label>
        <Input
          name={field.name}
          value={value}
          onChange={handleChange}
          className={cn(
            "bg-[#F6F8FC] h-12 border-0 pr-12",
            field.state.meta.isTouched && field.state.meta.errors.length > 0
              ? "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-300/40"
              : "",
            className
          )}
          {...inputProps}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
