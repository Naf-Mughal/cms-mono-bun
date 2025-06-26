"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Trash2, Upload } from "lucide-react"
import { toast } from "sonner"
import { Client } from "@/lib/eden"
import { usePreview } from "@/providers/preview"

interface SingleUploadProps {
    prefix: string
    onChange?: (hasFile: boolean) => void
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

export const SingleUpload = ({ prefix, onChange }: SingleUploadProps) => {
    const [file, setFile] = useState<{ file: File; path: string } | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const client = Client()
    const { setPreview } = usePreview()

    useEffect(() => {
        setPreview(false)
    }, [])

    // React Query for checking if file exists on server
    const fileCheckQuery = useQuery({
        queryKey: ['fileCheck', prefix],
        queryFn: async (): Promise<FileCheckResponse> => {
            if (!prefix || !client) {
                return { existingFiles: [] }
            }

            // Check for both jpg and png extensions
            const filenames = [
                `uploads/${prefix}.jpg`,
                `uploads/${prefix}.png`
            ]

            const { data: response, error } = await client.api.uploads.check.post({ filenames })

            if (error) {
                const errorMessage = typeof error === 'string' ? error :
                    (error as ApiError)?.value?.message || 'Failed to check files'
                throw new Error(errorMessage)
            }

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
        enabled: !!prefix,
        retry: (failureCount, error) => {
            return failureCount < 2
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })

    // React Query mutation for file upload
    const uploadMutation = useMutation({
        mutationFn: async ({ file }: { file: File }): Promise<FileUploadResponse> => {
            if (!client) {
                throw new Error('Client not found')
            }

            const uploadData = {
                file: file,
                itemName: prefix,
                prefix: ""
            }

            const { data: response, error } = await client.api.uploads["upload-logo"].post(uploadData)

            if (error) {
                const errorMessage = typeof error === 'string' ? error :
                    (error as ApiError)?.value?.message || 'Upload failed'
                throw new Error(errorMessage)
            }

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
            const { file } = variables
            const fileExtension = file.name.split('.').pop()?.toLowerCase()
            const displayFileName = `${prefix}.${fileExtension}`
            const renamedFile = new File([file], displayFileName, { type: file.type })

            setFile({
                file: renamedFile,
                path: data.filePath
            })

            onChange?.(true)

            toast.success("File Uploaded", {
                description: `${displayFileName} has been successfully uploaded to the server.`,
            })
        },
        onError: (error: Error) => {
            toast.error("Upload Failed", {
                description: `Failed to upload file to the server: ${error.message}`,
            })

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
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
        mutationFn: async ({ filePath }: { filePath: string }): Promise<DeleteFileResponse> => {
            if (!client) {
                throw new Error('Client not found')
            }

            const { data: response, error } = await client.api.uploads.delete.delete({ filePath })

            if (error) {
                const errorMessage = typeof error === 'string' ? error :
                    (error as ApiError)?.value?.message || 'Delete failed'
                throw new Error(errorMessage)
            }

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
        onSuccess: (response) => {
            setFile(null)
            onChange?.(false)

            toast.success("File Deleted", {
                description: `File has been removed from the server.`,
            })
        },
        onError: (error: Error) => {
            toast.error("Delete Failed", {
                description: `Failed to delete file from the server: ${error.message}`,
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

    // Update file state when query data changes
    useEffect(() => {
        if (fileCheckQuery.data?.existingFiles) {
            const existingFiles = fileCheckQuery.data.existingFiles

            // Check if any file exists (jpg or png)
            const existingFile = existingFiles.find(filePath =>
                filePath === `uploads/${prefix}.jpg` || filePath === `uploads/${prefix}.png`
            )

            if (existingFile) {
                const extension = existingFile.split('.').pop()
                const fileName = `${prefix}.${extension}`
                const mimeType = extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg' : 'image/png'

                const placeholderFile = new File([new Blob()], fileName, {
                    type: mimeType,
                })

                setFile({ file: placeholderFile, path: existingFile })
                onChange?.(true)
            } else {
                setFile(null)
                onChange?.(false)
            }
        }
    }, [fileCheckQuery.data, prefix, onChange])

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (fileCheckQuery.isFetching || uploadMutation.isPending) {
            toast.error("Cannot Upload", {
                description: "Please wait until the current operation is complete.",
            })
            return
        }

        const selectedFile = event.target.files?.[0]
        if (!selectedFile) return

        // Check if file is jpg or png
        const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()
        const validExtensions = ['jpg', 'jpeg', 'png']

        if (!fileExtension || !validExtensions.includes(fileExtension)) {
            toast.error("Invalid File Format", {
                description: "Please upload a .jpg or .png file.",
            })
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
            return
        }

        // Check MIME type as well
        if (!selectedFile.type.startsWith('image/')) {
            toast.error("Invalid File Type", {
                description: "Please upload a valid image file.",
            })
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
            return
        }

        uploadMutation.mutate({ file: selectedFile })
    }

    const handleDelete = async () => {
        if (fileCheckQuery.isFetching || deleteMutation.isPending || !file) {
            toast.error("Cannot Delete", {
                description: "Please wait until the current operation is complete.",
            })
            return
        }

        deleteMutation.mutate({ filePath: file.path })
    }

    const isLoading = fileCheckQuery.isFetching || uploadMutation.isPending || deleteMutation.isPending

    return (
        <div className="space-y-4">
            {/* Show loading state */}
            {fileCheckQuery.isError && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                    Failed to verify file on the server: {fileCheckQuery.error?.message}
                </div>
            )}

            <div className="relative flex flex-row-reverse">
                <div className="flex items-center justify-center py-6 px-4 h-full">
                    {file && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isLoading}
                            className={`rounded-full cursor-pointer ${isLoading
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-red-600 hover:text-red-800 hover:bg-red-50"
                                }`}
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>

                <div className="h-full w-full">
                    <label
                        htmlFor="file-upload"
                        className={`flex items-center justify-center w-full p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors ${file
                                ? "border-green-300 bg-green-50 hover:border-green-400"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                    >
                        <div className="text-center">
                            {file ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <Upload size={20} className="text-green-600" />
                                    <span className="text-green-700 font-medium">
                                        {file.file.name}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <Upload size={20} className="text-gray-600" />
                                    <span className="text-gray-600">
                                        Click to upload Logo
                                    </span>
                                </div>
                            )}
                        </div>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isLoading}
                        ref={fileInputRef}
                    />
                </div>

                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md">
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-600">
                                {uploadMutation.isPending ? 'Uploading...' :
                                    deleteMutation.isPending ? 'Deleting...' : 'Loading...'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}