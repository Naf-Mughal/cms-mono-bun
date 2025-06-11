import { Label } from "@/components/ui/label";
import { useFieldContext } from "..";
import { FieldErrors } from "../field-errors";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  dir?: string;
};

export const SelectField = ({
  label,
  options,
  placeholder,
  required,
  dir
}: SelectFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2" dir={dir}>
      <div className="flex flex-col md:flex-row items-center gap-2 w-full">
        <Label htmlFor={field.name} className="font-semibold min-w-[220px] flex items-center gap-1">{label} {required && <span className="text-[#3C9E19]">*</span>}</Label>
        <Select
          value={field.state.value}
          onValueChange={(value) => field.handleChange(value)}
          name={field.name}
          dir={dir as any}
        >
          <SelectTrigger id={field.name} onBlur={field.handleBlur} className="w-full bg-[#F6F8FC] !h-12 border-0">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="w-full border-0" position="item-aligned">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} className="hover:!bg-[#F6F8FC] h-12">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
