"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Edit, Trash2, Plus, Check, X } from "lucide-react"
import { toast } from "sonner"
import { Client } from "@/lib/eden"
import { usePreview } from "@/providers/preview"

interface MultiUploadProps {
    data: { value: string[] }
    prefix?: string
    onChange: (data: { value: string[] }) => void
}

interface FileCheckResponse {
    existingFiles: string[]
    error?: string
    details?: string
}

interface FileUploadResponse {
    filePath: string
    error?: string
    details?: string
}

interface DeleteFileResponse {
    message: string
    error?: string
    details?: string
}

interface ApiError {
    status: number
    value: {
        type: string
        on: string
        summary?: string
        message?: string
        found?: unknown
        property?: string
        expected?: string
    }
}

export const MultiUpload = ({ data, prefix, onChange }: MultiUploadProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editName, setEditName] = useState<string>("")
    const [isAdding, setIsAdding] = useState(false)
    const [addName, setAddName] = useState<string>("")
    const [files, setFiles] = useState<{ [index: number]: { file: File; path: string; prefix?: string } | null }>({})
    const fileInputRefs = useRef<{ [index: number]: HTMLInputElement | null }>({})
    const client = Client()
    const { setPreview } = usePreview()

    useEffect(() => {
        setPreview(false)
    }, [])

    // React Query for checking files on server
    const fileCheckQuery = useQuery({
        queryKey: ['fileCheck', data.value, prefix],
        queryFn: async (): Promise<FileCheckResponse> => {
            if (!data.value.length || !client) {
                return { existingFiles: [] }
            }

            const filenames = data.value.map((item) =>
                prefix ? `uploads/${prefix}-${item}.pdf` : `uploads/${item}.pdf`
            )

            const { data: response, error } = await client.api.uploads.check.post({ filenames })

            if (error) {
                const errorMessage = typeof error === 'string' ? error :
                    (error as ApiError)?.value?.message || 'Failed to check files'
                throw new Error(errorMessage)
            }

            // Handle the response properly based on its structure
            if (response) {
                if ('error' in response && response.error) {
                    throw new Error(response.error)
                }
                if ('existingFiles' in response) {
                    return { existingFiles: response.existingFiles || [] }
                }
            }

            return { existingFiles: [] }
        },
        retry: (failureCount, error) => {
            return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })

    // React Query mutation for file upload
    const uploadMutation = useMutation({
        mutationFn: async ({ file, itemName, index }: { file: File; itemName: string; index: number }): Promise<FileUploadResponse> => {
            if (!client) {
                throw new Error('Client not found')
            }

            const uploadData = {
                file: file,
                itemName: itemName,
                prefix: prefix || ""
            }

            const { data: response, error } = await client.api.uploads.upload.post(uploadData)

            if (error) {
                const errorMessage = typeof error === 'string' ? error :
                    (error as ApiError)?.value?.message || 'Upload failed'
                throw new Error(errorMessage)
            }

            // Handle the response properly based on its structure
            if (response) {
                if ('error' in response && response.error) {
                    throw new Error(response.error)
                }
                if ('filePath' in response && response.filePath) {
                    return { filePath: response.filePath }
                }
            }

            throw new Error('Invalid response: file path not found')
        },
        onSuccess: (data, variables) => {
            const { itemName, index } = variables
            const displayFileName = `${itemName}.pdf`
            const renamedFile = new File([variables.file], displayFileName, { type: variables.file.type })

            const newFiles = {
                ...files,
                [index]: {
                    file: renamedFile,
                    path: data.filePath,
                    prefix
                }
            }
            setFiles(newFiles)

            toast.success("File Uploaded", {
                description: `${displayFileName} has been successfully uploaded to the server.`,
            })
        },
        onError: (error: Error, variables) => {
            const { itemName, index } = variables
            const displayFileName = `${itemName}.pdf`

            toast.error("Upload Failed", {
                description: `Failed to upload ${displayFileName} to the server.`,
            })

            if (fileInputRefs.current[index]) {
                fileInputRefs.current[index]!.value = ""
            }
        },
        retry: (failureCount, error) => {
            if (error.message.includes('Invalid file format') ||
                error.message.includes('File too large')) {
                return false
            }
            return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })

    // React Query mutation for file deletion
    const deleteMutation = useMutation({
        mutationFn: async ({ filePath, itemName, index }: { filePath: string; itemName: string; index: number }): Promise<DeleteFileResponse> => {
            if (!client) {
                throw new Error('Client not found')
            }

            const { data: response, error } = await client.api.uploads.delete.delete({ filePath })

            if (error) {
                const errorMessage = typeof error === 'string' ? error :
                    (error as ApiError)?.value?.message || 'Delete failed'
                throw new Error(errorMessage)
            }

            // Handle the response properly based on its structure
            if (response) {
                if ('error' in response && response.error) {
                    throw new Error(response.error)
                }
                if ('message' in response && response.message) {
                    return { message: response.message }
                }
            }

            return { message: 'File deleted successfully' }
        },
        onSuccess: (response, variables) => {
            const { itemName, index } = variables

            // Update data array - fix the variable name conflict
            const newDataArray = { ...data, value: [...data.value] }
            newDataArray.value.splice(index, 1)

            // Update files state
            const newFiles = { ...files }
            delete newFiles[index]
            const reindexedFiles: { [index: number]: { file: File; path: string; prefix?: string } | null } = {}
            Object.keys(newFiles).forEach((key) => {
                const oldIndex = Number.parseInt(key)
                const newIndex = oldIndex > index ? oldIndex - 1 : oldIndex
                reindexedFiles[newIndex] = newFiles[oldIndex] as any
            })

            setFiles(reindexedFiles)
            onChange(newDataArray)

            toast.success("File Deleted", {
                description: `${itemName}.pdf has been removed from the server.`,
            })

            toast("Item Deleted", {
                description: `"${itemName}" has been removed from the list.`,
            })
        },
        onError: (error: Error, variables) => {
            const { itemName } = variables
            toast.error("Delete Failed", {
                description: `Failed to delete ${itemName}.pdf from the server: ${error.message}`,
            })
        },
        retry: (failureCount, error) => {
            if (error.message.includes('File not found') ||
                error.message.includes('Permission denied')) {
                return false
            }
            return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })

    // Update files state when query data changes
    useEffect(() => {
        if (fileCheckQuery.data?.existingFiles) {
            const existingFiles = fileCheckQuery.data.existingFiles
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

            setFiles(newFiles)
        }
    }, [fileCheckQuery.data, data.value, prefix])

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
        if (fileCheckQuery.isFetching || deleteMutation.isPending) {
            toast.error("Cannot Delete", {
                description: "Please wait until the current operation is complete.",
            })
            return
        }

        const deletedItem = data.value[index]
        if (!deletedItem) {
            toast.error("Error", {
                description: "Item not found.",
            })
            return
        }

        const filePath = prefix ? `uploads/${prefix}-${deletedItem}.pdf` : `uploads/${deletedItem}.pdf`

        deleteMutation.mutate({ filePath, itemName: deletedItem, index })
    }

    const handleFileUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (fileCheckQuery.isFetching || uploadMutation.isPending) {
            toast.error("Cannot Upload", {
                description: "Please wait until the current operation is complete.",
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
        if (!itemName) {
            toast.error("Error", {
                description: "Item not found.",
            })
            return
        }

        uploadMutation.mutate({ file, itemName, index })
    }

    const isLoading = fileCheckQuery.isFetching || uploadMutation.isPending || deleteMutation.isPending

    return (
        <div className="space-y-4">
            {/* Show loading state */}
            {fileCheckQuery.isError && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                    Failed to verify files on the server: {fileCheckQuery.error?.message}
                </div>
            )}

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
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleEditConfirm(index)}
                                            className="mx-1 text-green-600"
                                            disabled={isLoading}
                                        >
                                            <Check size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleEditCancel}
                                            className="mx-1 text-red-600"
                                            disabled={isLoading}
                                        >
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
                                        disabled={isLoading}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(index)}
                                        disabled={isLoading}
                                        className={`p-1 rounded-full ${isLoading
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
                                disabled={isLoading}
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
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        onClick={handleAddConfirm}
                        className="mx-1 p-2 text-green-600 hover:text-green-700"
                        disabled={isLoading}
                    >
                        <Check size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={handleAddCancel}
                        className="mx-1 p-2 text-red-600 hover:text-red-700"
                        disabled={isLoading}
                    >
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="flex items-center justify-center w-max cursor-pointer text-[#09B96D]"
                    disabled={isLoading}
                >
                    <Plus size={20} className="mr-2" />
                    <span className="font-medium">
                        {isLoading ? 'Loading...' : 'Add More'}
                    </span>
                </button>
            )}
        </div>
    )
}