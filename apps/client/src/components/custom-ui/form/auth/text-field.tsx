import React from "react";
import { useFieldContext } from "..";
import { FieldErrors } from "../field-errors";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TextFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const AuthTextField = ({ label, className, ...inputProps }: TextFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={field.name} className="font-semibold text-[#525355]">{label}</Label>
        <Input
          name={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          className={cn(
            "bg-white h-12 border-[#EAEDF3]",
            field.state.meta.isTouched && field.state.meta.errors.length > 0 ? "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-300/40" : "",
            className
          )}
          {...inputProps}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
