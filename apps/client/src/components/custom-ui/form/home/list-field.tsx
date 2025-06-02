import React, { useState } from "react";
import { useFieldContext } from "..";
import { FieldErrors } from "../field-errors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Pencil, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ListFieldProps = {
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const ListField = ({
    className,
    ...inputProps
}: ListFieldProps) => {
    const field = useFieldContext<string[] | null>();
    const [showInput, setShowInput] = useState(false);
    const [newValue, setNewValue] = useState("");

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    const addValue = () => {
        if (!newValue.trim()) return;
        const updatedList = [...(field.state.value || []), newValue.trim()];
        field.handleChange(updatedList);
        setNewValue("");
        setShowInput(false);
    };

    const removeValue = (index: number) => {
        const updatedList = [...(field.state.value || [])];
        updatedList.splice(index, 1);
        field.handleChange(updatedList.length ? updatedList : null);
    };

    const startEdit = (index: number, current: string) => {
        setEditIndex(index);
        setEditValue(current);
    };

    const cancelEdit = () => {
        setEditIndex(null);
        setEditValue("");
    };

    const saveEdit = () => {
        if (editIndex === null || !editValue.trim()) return;
        const updatedList = [...(field.state.value || [])];
        updatedList[editIndex] = editValue.trim();
        field.handleChange(updatedList);
        setEditIndex(null);
        setEditValue("");
    };

    return (
        <div className="space-y-3">
            {(field.state.value || []).map((item, index) => (
                <input
                    key={index}
                    type="hidden"
                    name={`${field.name}[]`}
                    value={item}
                    readOnly
                />
            ))}

            <ol className="pr-6 space-y-1 mt-2 text-black" dir="rtl" lang="ar-sa">
                {(field.state.value || []).map((item, index) => {
                    const arabicNumber = (index + 1).toLocaleString("ar-EG");

                    return (
                        <li key={index} className="flex justify-between items-center group">
                            <div className="flex-1">
                                {editIndex === index ? (
                                    <Input
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        dir="rtl"
                                        lang="ar-sa"
                                        className="bg-[#F6F8FC] h-12 border-0"
                                        {...inputProps}
                                    />
                                ) : (
                                    <span>
                                        <span className="ml-2">{arabicNumber}.</span> {item}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {editIndex === index ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={saveEdit}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            <Check size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => startEdit(index, item)}
                                            className="text-blue-600 hover:text-blue-800 hidden group-hover:block"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeValue(index)}
                                            className="text-red-600 hover:text-red-800 hidden group-hover:block"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>

            {showInput && (
                <div className="flex items-center gap-2">
                    <Input
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        dir="rtl"
                        lang="ar-sa"
                        className={cn("bg-[#F6F8FC] h-12 border-0", className)}
                        {...inputProps}
                    />
                    <Button type="button" className="h-12 bg-[#09B96D]" onClick={addValue}>
                        Add
                    </Button>
                </div>
            )}

            <div
                onClick={() => setShowInput((prev) => !prev)}
                className="w-full flex text-[#09b96d] cursor-pointer"
            >
                (Add more)
            </div>

            <FieldErrors meta={field.state.meta} />
        </div>
    );
};
