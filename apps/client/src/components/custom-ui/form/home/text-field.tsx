import React, { useEffect, useRef, useState } from "react";
import { useFieldContext } from "..";
import { FieldErrors } from "../field-errors";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type TextFieldProps = {
  label: string;
  isInline?: boolean;
  labelClass?: string;
  isNumaric?: boolean;
} & React.TextareaHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const formatNumberWithCommas = (value: string, isNumaric: boolean = false) => {
  const raw = value.replace(/,/g, "");
  if (!/^\d*$/.test(raw)) return value;
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const TextField = ({
  label,
  isInline = true,
  labelClass,
  isNumaric = false,
  className,
  ...inputProps
}: TextFieldProps) => {
  const field = useFieldContext<string>();
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selection, setSelection] = useState<{ start: number | null; end: number | null }>({ start: null, end: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/,/g, "");

    if (isNumaric && /^\d*$/.test(rawValue)) {
      const formatted = formatNumberWithCommas(rawValue);
      field.handleChange(rawValue); // Store raw value
      e.target.value = formatted;
    } else {
      field.handleChange(inputValue);
    }
  };

  const value = (() => {
    const raw = field.state.value || "";
    if (isNumaric && /^\d+$/.test(raw)) {
      return formatNumberWithCommas(raw);
    }
    return raw;
  })();

  // Save selection before any potential re-render
  const handleSelectionChange = () => {
    if (document.activeElement === inputRef.current || document.activeElement === textareaRef.current) {
      const el = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
      setSelection({
        start: el.selectionStart,
        end: el.selectionEnd,
      });
    }
  };

  // Restore focus and selection after switching between input/textarea
  useEffect(() => {
    if (!isFocused) return;
    
    const element = isMultiline ? textareaRef.current : inputRef.current;
    if (element) {
      element.focus();
      if (selection.start !== null && selection.end !== null) {
        // Use setTimeout to ensure the element is focused before setting selection
        setTimeout(() => {
          element.setSelectionRange(selection.start, selection.end);
        }, 0);
      }
    }
  }, [isMultiline, isFocused, selection]);

  // Detect multiline and update height
  useEffect(() => {
    if (!spanRef.current || !inputRef.current) return;

    // Save current selection before any DOM updates
    handleSelectionChange();
    
    // Force reflow to ensure accurate measurements
    spanRef.current.textContent = value || inputProps.placeholder || '';

    const inputRect = inputRef.current.getBoundingClientRect();
    const spanRect = spanRef.current.getBoundingClientRect();
    const isMulti = spanRect.height > inputRect.height; // Use a threshold to prevent flickering

    if (isMulti !== isMultiline) {
      setIsMultiline(isMulti);
    }

    // Update textarea height if it's multiline
    if (isMulti && inputRef.current.tagName === 'TEXTAREA') {
      const textarea = inputRef.current as any;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(48, textarea.scrollHeight)}px`; // Min height of 3 lines
    }
  }, [value, inputProps.placeholder, isMultiline]);

  return (
    <div className="space-y-2">
      <div className={`flex flex-col ${isInline && "md:flex-row items-center"} gap-2`} dir={inputProps.dir}>
        <Label
          htmlFor={field.name}
          className={cn("font-semibold min-w-[220px] flex items-center gap-1", labelClass)}
        >
          {label}
          {inputProps.required && <span className="text-[#3C9E19]">*</span>}
        </Label>
        <div className="relative w-full">
          <span
            ref={spanRef}
            className="absolute left-0 right-0 whitespace-pre-wrap break-words w-full px-4 py-2 text-base"
            style={{ visibility: "hidden" }}
          >
            {value || inputProps.placeholder}
          </span>

          {isMultiline ? (
            <Textarea
              ref={textareaRef}
              name={field.name}
              className={cn(
                "bg-[#F6F8FC] min-h-12 overflow-hidden resize-none border-0 w-full px-4 py-2 text-base leading-tight",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-300/40"
                  : "",
                className
              )}
              value={value}
              onChange={handleChange}
              rows={1}
              onInput={(e: any) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // Add a small delay to allow for click events to process
                setTimeout(() => setIsFocused(false), 200);
              }}
              {...inputProps}
            />
          ) : (
            <Input
              ref={inputRef}
              name={field.name}
              className={cn(
                "bg-[#F6F8FC] h-12 border-0 w-full px-4 py-2 text-base leading-tight",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-300/40"
                  : "",
                className
              )}
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // Add a small delay to allow for click events to process
                setTimeout(() => setIsFocused(false), 200);
              }}
              {...inputProps}
            />
          )}
        </div>
      </div>

      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
