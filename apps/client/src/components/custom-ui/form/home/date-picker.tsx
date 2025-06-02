"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useFieldContext } from ".."

export function DatePicker({ className }: { className?: string }) {
    const field = useFieldContext<string>()

    // Parse the string date from field value when available
    const getDateFromField = React.useCallback(() => {
        if (!field.state.value) return undefined
        try {
            const parsedDate = parse(field.state.value, "yyyy-MM-dd", new Date())
            // Check if the date is valid
            return !isNaN(parsedDate.getTime()) ? parsedDate : undefined
        } catch (e) {
            console.error("Error parsing date:", e)
            return undefined
        }
    }, [field.state.value])

    const [date, setDate] = React.useState<Date | undefined>(getDateFromField())

    // Update local state when field value changes
    React.useEffect(() => {
        setDate(getDateFromField())
    }, [field.state.value, getDateFromField])

    // Handle date selection
    const handleSelect = (newDate: Date | undefined) => {
        setDate(newDate)

        // Format date as ISO string (YYYY-MM-DD) for the form field
        if (newDate && !isNaN(newDate.getTime())) {
            try {
                const formattedDate = format(newDate, "yyyy-MM-dd")
                field.handleChange(formattedDate)
            } catch (e) {
                console.error("Error formatting date:", e)
                field.handleChange("")
            }
        } else {
            field.handleChange("")
        }
    }

    return (
        <>
            <input type="hidden" name={field.name} value={date && !isNaN(date.getTime()) ? format(date, "yyyy-MM-dd") : ""} />
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "bg-[#F6F8FC] h-12 border-0 pr-12 w-full text-start justify-start",
                            field.state.meta.isTouched && field.state.meta.errors.length > 0
                                ? "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-300/40"
                                : "",
                            className
                        )}
                        onClick={() => field.handleBlur()}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date && !isNaN(date.getTime()) ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
                </PopoverContent>
            </Popover>
        </>
    )
}
