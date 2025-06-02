"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Edit, Trash2, Plus, Check, X } from "lucide-react"
import { toast } from "sonner"
import axiosClient from "@/lib/clientAxios"

interface MultiUploadProps {
    data: { value: string[] }
    prefix?: string
    onChange: (data: { value: string[] }) => void
}

export const MultiUpload = ({ data, prefix, onChange }: MultiUploadProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editName, setEditName] = useState<string>("")
    const [isAdding, setIsAdding] = useState(false)
    const [addName, setAddName] = useState<string>("")
    const [files, setFiles] = useState<{ [index: number]: { file: File; path: string; prefix?: string } | null }>({})
    const [isChecking, setIsChecking] = useState<boolean>(false)
    const fileInputRefs = useRef<{ [index: number]: HTMLInputElement | null }>({})

    // Function to check if files exist on the server
    const checkFilesOnServer = async () => {
        if (!data.value.length) {
            setFiles({})
            return
        }

        setIsChecking(true)
        console.log("Starting file check, isChecking:", true)

        try {
            const filenames = data.value.map((item) =>
                prefix ? `uploads/${prefix}-${item}.pdf` : `uploads/${item}.pdf`
            )
            console.log("Checking files on server:", filenames)
            const response = await axiosClient.post("/uploads/check", { filenames })
            const existingFiles = response.data.existingFiles || []
            console.log("Existing files from server:", existingFiles)

            const newFiles: { [index: number]: { file: File; path: string; prefix?: string } | null } = {}
            data.value.forEach((item, index) => {
                const filePath = prefix ? `uploads/${prefix}-${item}.pdf` : `uploads/${item}.pdf`
                if (existingFiles.includes(filePath)) {
                    const fileName = `${item}.pdf`
                    const placeholderFile = new File([new Blob()], fileName, {
                        type: "application/pdf",
                    })
                    newFiles[index] = { file: placeholderFile, path: filePath, prefix }
                } else {
                    newFiles[index] = null
                }
            })

            console.log("Updated files state:", newFiles)
            setFiles(newFiles)
        } catch (error) {
            console.error("Error checking files on server:", error)
            toast.error("Check Failed", {
                description: "Failed to verify files on the server.",
            })
        } finally {
            setIsChecking(false)
            console.log("File check complete, isChecking:", false)
        }
    }

    useEffect(() => {
        checkFilesOnServer()
    }, [data.value, prefix])

    // Helper to check if a name is unique (case-insensitive)
    const isNameUnique = (name: string, excludeIndex?: number): boolean => {
        const lowerName = name.toLowerCase().trim()
        return !data.value.some((item, index) => {
            if (excludeIndex !== undefined && index === excludeIndex) return false
            return item.toLowerCase().trim() === lowerName
        })
    }

    const handleEdit = (index: number, name: string) => {
        setEditingIndex(index)
        setEditName(name)
    }

    const handleEditConfirm = (index: number) => {
        if (!editName.trim()) {
            toast.error("Error", {
                description: "Item name cannot be empty.",
            })
            return
        }

        if (!isNameUnique(editName, index)) {
            toast.error("Error", {
                description: "Item name must be unique.",
            })
            return
        }

        const newData = { ...data, value: [...data.value] }
        newData.value[index] = editName.trim()
        onChange(newData)
        setEditingIndex(null)
        setEditName("")

        toast.success("Item Updated", {
            description: "The item has been successfully updated.",
        })
    }

    const handleEditCancel = () => {
        setEditingIndex(null)
        setEditName("")
    }

    const handleAddConfirm = () => {
        if (!addName.trim()) {
            toast.error("Error", {
                description: "Please enter a name for the new item.",
            })
            return
        }

        if (!isNameUnique(addName)) {
            toast.error("Error", {
                description: "Item name must be unique.",
            })
            return
        }

        const newData = { ...data, value: [...data.value, addName.trim()] }
        onChange(newData)
        setIsAdding(false)
        setAddName("")

        toast.success("Item Added", {
            description: "New item has been successfully added.",
        })
    }

    const handleAddCancel = () => {
        setIsAdding(false)
        setAddName("")
    }

    const handleDelete = async (index: number) => {
        if (isChecking) {
            toast.error("Cannot Delete", {
                description: "Please wait until the file check is complete.",
            })
            return
        }

        const newData = { ...data, value: [...data.value] }
        const deletedItem = newData.value[index]
        const filePath = prefix ? `uploads/${prefix}-${deletedItem}.pdf` : `uploads/${deletedItem}.pdf`
        console.log("Attempting to delete file:", filePath, "for item:", deletedItem)

        // Attempt to delete file from server
        try {
            const response = await axiosClient.delete("/uploads/delete", {
                data: { filePath },
            })
            console.log("Delete response:", response.data)
            toast.success("File Deleted", {
                description: `${deletedItem}.pdf has been removed from the server.`,
            })
        } catch (error: any) {
            console.error("Delete error:", error.response?.data || error.message)
            toast.error("Delete Failed", {
                description: `Failed to delete ${deletedItem}.pdf from the server: ${error.response?.data?.message || error.message}`,
            })
            return // Abort deletion if server delete fails
        }

        newData.value.splice(index, 1)
        const newFiles = { ...files }
        delete newFiles[index]
        const reindexedFiles: { [index: number]: { file: File; path: string; prefix?: string } | null } = {}
        Object.keys(newFiles).forEach((key) => {
            const oldIndex = Number.parseInt(key)
            const newIndex = oldIndex > index ? oldIndex - 1 : oldIndex
            reindexedFiles[newIndex] = newFiles[oldIndex] as any
        })
        setFiles(reindexedFiles)
        onChange(newData)

        toast("Item Deleted", {
            description: `"${deletedItem}" has been removed from the list.`,
        })
    }

    const handleFileUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (isChecking) {
            toast.error("Cannot Upload", {
                description: "Please wait until the file check is complete.",
            })
            return
        }

        const file = event.target.files?.[0]
        if (!file || file.type !== "application/pdf") {
            toast.error("Invalid File Format", {
                description: "Please upload a .pdf file.",
            })
            if (fileInputRefs.current[index]) {
                fileInputRefs.current[index]!.value = ""
            }
            return
        }

        const itemName = data.value[index]
        const serverFileName = prefix ? `${prefix}-${itemName}.pdf` : `${itemName}.pdf`
        const displayFileName = `${itemName}.pdf`
        const renamedFile = new File([file], displayFileName, { type: file.type })

        const formData = new FormData()
        formData.append("file", file)
        formData.append("itemName", itemName as any)
        if (prefix) {
            formData.append("prefix", prefix)
        }

        try {
            const response = await axiosClient.post("/uploads/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            const filePath = response.data.filePath
            const newFiles = { ...files, [index]: { file: renamedFile, path: filePath, prefix } }
            setFiles(newFiles)

            toast.success("File Uploaded", {
                description: `${displayFileName} has been successfully uploaded to the server.`,
            })
        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Upload Failed", {
                description: `Failed to upload ${displayFileName} to the server.`,
            })
            if (fileInputRefs.current[index]) {
                fileInputRefs.current[index]!.value = ""
            }
        }
    }

    return (
        <div className="space-y-4">
            <ol className="space-y-4 my-2 text-black" dir="rtl" lang="ar-sa">
                {data.value.map((item, index) => (
                    <li
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="flex items-center justify-between mb-3 border-b pb-2">
                            <div className="flex items-center">
                                <span className="ml-2 font-medium text-gray-500">{index + 1 + "."}</span>
                                {editingIndex === index ? (
                                    <div className="flex items-center w-full">
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="flex-1 p-1 border rounded"
                                            dir="rtl"
                                            placeholder="أدخل اسم العنصر"
                                        />
                                        <button type="button" onClick={() => handleEditConfirm(index)} className="mx-1 text-green-600">
                                            <Check size={16} />
                                        </button>
                                        <button type="button" onClick={handleEditCancel} className="mx-1 text-red-600">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <h3 className="text-lg font-semibold mr-2">{item}</h3>
                                )}
                            </div>

                            {(hoveredIndex === index || editingIndex === index) && editingIndex !== index && (
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(index, item)}
                                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(index)}
                                        disabled={isChecking}
                                        className={`p-1 rounded-full ${isChecking
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-red-600 hover:text-red-800 hover:bg-red-50"
                                            }`}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-2">
                            <label
                                htmlFor={`file-upload-${index}`}
                                className="flex items-center justify-center w-full p-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 cursor-pointer transition-colors"
                            >
                                <span className="text-gray-600">
                                    {files[index] ? files[index]!.file.name : `${item}.pdf`}
                                </span>
                            </label>
                            <input
                                id={`file-upload-${index}`}
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={(e) => handleFileUpload(index, e)}
                                className="hidden"
                                disabled={isChecking}
                                ref={(el) => (fileInputRefs.current[index] = el) as any}
                            />
                        </div>
                    </li>
                ))}
            </ol>

            {isAdding ? (
                <div className="flex flex-row-reverse items-center mt-4">
                    <input
                        type="text"
                        value={addName}
                        onChange={(e) => setAddName(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        dir="rtl"
                        placeholder="أدخل اسم العنصر"
                    />
                    <button type="button" onClick={handleAddConfirm} className="mx-1 p-2 text-green-600 hover:text-green-700">
                        <Check size={20} />
                    </button>
                    <button type="button" onClick={handleAddCancel} className="mx-1 p-2 text-red-600 hover:text-red-700">
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="flex items-center justify-center w-max cursor-pointer text-[#09B96D]"
                >
                    <Plus size={20} className="mr-2" />
                    <span className="font-medium">Add More</span>
                </button>
            )}
        </div>
    )
}