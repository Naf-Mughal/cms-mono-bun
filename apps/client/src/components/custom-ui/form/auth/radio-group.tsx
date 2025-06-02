import { Checkbox } from "@/components/ui/checkbox";
import { useFieldContext } from "../";
import { FieldErrors } from "../field-errors";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { ReactNode } from "react";

type CheckboxFieldProps = {
    label?: string;
    children: ReactNode;
};

export const AuthRadioGroupField = ({ label, children }: CheckboxFieldProps) => {
    const field = useFieldContext<string>();

    return (
        <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                <Label htmlFor={field.name} className="font-semibold text-[#525355]">{label}</Label>
                <RadioGroup name={field.name} className="flex gap-2 w-full" defaultValue={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                    {children}
                </RadioGroup>
            </div>
            <FieldErrors meta={field.state.meta} />
        </div>
    );
};
