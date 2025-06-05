"use client"
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

type RadioFieldProps = {
    label: string;
    value: string;
    selected?: boolean;
    onClick?: () => void;
};

export const RadioField = ({ label, value, selected, onClick }: RadioFieldProps) => {
    return (
        <Label htmlFor={value} className={`flex cursor-pointer items-center space-x-2 flex-1 h-12 bg-white border rounded-md p-4 ${selected ? "text-[#09B96D] border-[#09B96D]" : "border-[#D3D8E1]"} cursor-pointer`} onClick={onClick}>
            <RadioGroupItem
                id={value}
                value={value}
                className={`${selected ? "bg-[#09B96D]" : ""} !text-white`}
                onClick={onClick}
            />
            {label}
        </Label>
    );
};
