import { Checkbox } from "@/components/ui/checkbox";
import { useFieldContext } from "..";
import { FieldErrors } from "../field-errors";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { ReactNode } from "react";

type CheckboxFieldProps = {
    label: string;
    children: ReactNode;
    required?: boolean;
};

export const RadioGroupField = ({ label, children, required = false }: CheckboxFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <div className="space-y-2 w-full">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <Label htmlFor={field.name} className="font-semibold w-[220px] flex items-center gap-1">{label} {required && <span className="text-[#3C9E19]">*</span>}</Label>
                <RadioGroup name={field.name} className="flex gap-2 w-full md:max-w-[320px]" defaultValue={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                    {children}
                </RadioGroup>
            </div>
            <FieldErrors meta={field.state.meta} />
        </div>
    );
};
