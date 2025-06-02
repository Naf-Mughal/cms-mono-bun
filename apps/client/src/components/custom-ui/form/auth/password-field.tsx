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
} & React.InputHTMLAttributes<HTMLInputElement>;

export const AuthPasswordField = ({ label, className, ...inputProps }: TextFieldProps) => {
  const field = useFieldContext<string>();
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={field.name} className="font-semibold text-[#525355]">{label}</Label>
        <div className="relative">
          <Input
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            type={showPassword ? "text" : "password"}
            className={cn(
              "bg-white h-12 border-[#EAEDF3] pr-12",
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
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
