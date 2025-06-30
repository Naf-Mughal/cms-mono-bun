"use client"
import { useFieldContext } from "..";
import { FieldErrors } from "../field-errors";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { type ReactNode } from "react";
import { useLang } from "@/providers/language";
import { cn } from "@/lib/utils";

type CheckboxFieldProps = {
    label?: string;
    children: ReactNode;
    required?: boolean;
    className?: string;
    inline?: boolean;
};

export const RadioGroupField = ({ label, children, required = false, className, inline = true }: CheckboxFieldProps) => {
    const field = useFieldContext<string>();
    const { dir } = useLang();

    return (
        <div className="space-y-2 w-full">
            <div className={cn("flex gap-2 w-full", inline ? "flex-row items-center" : "flex-col")}>
                <Label htmlFor={field.name} className={`font-semibold w-[220px] flex items-center gap-1 ${label ? "" : "hidden"}`}>{label} {required && <span className="text-[#3C9E19]">*</span>}</Label>
                <RadioGroup name={field.name} className={cn("flex gap-2 w-full", dir === "rtl" ? "flex-row-reverse" : "flex-row", className)} defaultValue={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                    {children}
                </RadioGroup>
            </div>
            <FieldErrors meta={field.state.meta} />
        </div>
    );
};
