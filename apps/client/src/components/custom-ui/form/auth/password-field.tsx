"use client"
import React, { useState } from "react";
import { useFieldContext } from "..";
import { FieldErrors } from "../field-errors";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type TextFieldProps = {
  label: string;
  isInline?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const AuthPasswordField = ({ label, isInline = false, className, ...inputProps }: TextFieldProps) => {
  const field = useFieldContext<string>();
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("space-y-2", isInline && "flex items-center gap-2")}>
      {isInline ? (
        <Label htmlFor={field.name} className="font-semibold min-w-[220px] flex items-center gap-1 !m-0">
          {label}
          {inputProps.required && <span className="text-[#3C9E19]">*</span>}
        </Label>
      ) : (
        <div className="space-y-1 !m-0">
          <Label htmlFor={field.name} className="font-semibold text-[#525355] !m-0">{label}</Label>
        </div>
      )}
      <div className="relative w-full">
        <Input
          name={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          type={showPassword ? "text" : "password"}
          className={cn(
            "bg-white h-12 border-[#EAEDF3]",
            field.state.meta.isTouched && field.state.meta.errors.length > 0 ? "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-300/40" : "",
            className
          )}
          {...inputProps}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9AA7] cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
