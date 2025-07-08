import { Elysia, t } from "elysia";
import path from "path";
import { mkdirSync, unlinkSync } from "fs";
import { access } from "fs/promises";

export const uploadRouter = new Elysia({ prefix: "/uploads" })
    // Upload endpoint for PDFs (original)
    .post(
        "/upload",
        async ({ body, set }) => {
            try {
                const { file, itemName, prefix } = body as {
                    file?: File;
                    itemName?: string;
                    prefix?: string;
                };

                // Validate inputs
                if (!file) {
                    set.status = 400;
                    return { error: "No file uploaded" };
                }
                if (!itemName) {
                    set.status = 400;
                    return { error: "itemName is required" };
                }
                if (!prefix) {
                    set.status = 400;
                    return { error: "prefix is required" };
                }

                if (file.type !== "application/pdf") {
                    set.status = 400;
                    return { error: "Only .pdf files are allowed" };
                }

                // Sanitize prefix and itemName to prevent invalid filenames
                const sanitizedPrefix = prefix.replace(/[^a-zA-Z0-9-]/g, "");
                const sanitizedItemName = itemName.replace(/[^a-zA-Z0-9-]/g, "");
                if (!sanitizedPrefix || !sanitizedItemName) {
                    set.status = 400;
                    return { error: "Invalid prefix or itemName" };
                }

                // Ensure uploads directory exists
                const uploadDir = path.join(process.cwd(), "uploads");
                mkdirSync(uploadDir, { recursive: true });

                // Create new file name and path
                const newFileName = `${sanitizedPrefix}-${sanitizedItemName}.pdf`;
                const newFilePath = path.join(uploadDir, newFileName);

                // Write file to disk
                try {
                    const fileBuffer = await file.arrayBuffer();
                    await Bun.write(Bun.file(newFilePath), fileBuffer);
                } catch (renameError) {
                    console.error("Write error:", renameError);
                    throw new Error(`Failed to write file: ${(renameError as Error).message}`);
                }

                // Return the file path relative to the uploads directory
                const relativeFilePath = path.join("uploads", newFileName).replace(/\\/g, "/");

                set.status = 200;
                return { filePath: relativeFilePath };
            } catch (error) {
                console.error("Upload error:", (error as Error).message, (error as Error).stack);
                set.status = 500;
                return { error: "Failed to upload file", details: (error as Error).message };
            }
        },
        {
            body: t.Object({
                file: t.File({ maxSize: '1000m' }), 
                itemName: t.String(),
                prefix: t.String(),
            }),
        }
    )
    // Upload endpoint for images (PNG/JPG)
    .post(
        "/upload-logo",
        async ({ body, set }) => {
            try {
                const { file, itemName } = body as {
                    file?: File;
                    itemName?: string;
                };

                // Validate inputs
                if (!file) {
                    set.status = 400;
                    return { error: "No file uploaded" };
                }
                if (!itemName) {
                    set.status = 400;
                    return { error: "itemName is required" };
                }

                // Check file type
                const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
                if (!allowedTypes.includes(file.type)) {
                    set.status = 400;
                    return { error: "Only PNG and JPG files are allowed" };
                }

                // Sanitize itemName to prevent invalid filenames
                const sanitizedItemName = itemName.replace(/[^a-zA-Z0-9-]/g, "");
                if (!sanitizedItemName) {
                    set.status = 400;
                    return { error: "Invalid itemName" };
                }

                // Ensure uploads directory exists
                const uploadDir = path.join(process.cwd(), "uploads");
                mkdirSync(uploadDir, { recursive: true });

                // Get file extension from MIME type
                const getExtension = (mimeType: string): string => {
                    switch (mimeType) {
                        case "image/png":
                            return ".png";
                        case "image/jpeg":
                        case "image/jpg":
                            return ".jpg";
                        default:
                            return ".jpg"; // fallback
                    }
                };

                // Create new file name and path
                const fileExtension = getExtension(file.type);
                const newFileName = `${sanitizedItemName}${fileExtension}`;
                const newFilePath = path.join(uploadDir, newFileName);

                // Write file to disk
                try {
                    const fileBuffer = await file.arrayBuffer();
                    await Bun.write(Bun.file(newFilePath), fileBuffer);
                } catch (writeError) {
                    console.error("Write error:", writeError);
                    throw new Error(`Failed to write file: ${(writeError as Error).message}`);
                }

                // Return the file path relative to the uploads directory
                const relativeFilePath = path.join("uploads", newFileName).replace(/\\/g, "/");

                set.status = 200;
                return { filePath: relativeFilePath };
            } catch (error) {
                console.error("Upload error:", (error as Error).message, (error as Error).stack);
                set.status = 500;
                return { error: "Failed to upload file", details: (error as Error).message };
            }
        },
        {
            body: t.Object({
                file: t.File(),
                itemName: t.String(),
            }),
        }
    )
    // Delete endpoint
    .delete(
        "/delete",
        async ({ body, set }) => {
            try {
                const { filePath } = body as { filePath?: string };
                if (!filePath) {
                    set.status = 400;
                    return { error: "filePath is required" };
                }

                const resolvedPath = path.resolve(filePath);
                const uploadDir = path.join(process.cwd(), "uploads");

                // Security: Ensure file is within uploads directory
                if (!resolvedPath.startsWith(uploadDir)) {
                    set.status = 403;
                    return { error: "Invalid file path" };
                }

                // Check if file exists
                try {
                    await access(resolvedPath);
                } catch {
                    set.status = 200;
                    return { error: "File not found" };
                }

                // Delete the file
                unlinkSync(resolvedPath);

                set.status = 200;
                return { message: "File deleted successfully" };
            } catch (error) {
                console.error("Delete error:", (error as Error).message, (error as Error).stack);
                set.status = 500;
                return { error: "Failed to delete file", details: (error as Error).message };
            }
        },
        {
            body: t.Object({
                filePath: t.String(),
            }),
        }
    )
    // Check endpoint to verify file existence
    .post(
        "/check",
        async ({ body, set }) => {
            try {
                const { filenames } = body as { filenames?: string[] };
                if (!Array.isArray(filenames) || filenames.length === 0) {
                    set.status = 400;
                    return { error: "filenames must be a non-empty array" };
                }

                const uploadDir = path.join(process.cwd(), "uploads");
                const existingFiles: string[] = [];

                // Check each file
                for (const filePath of filenames) {
                    const resolvedPath = path.resolve(filePath);
                    // Security: Ensure file is within uploads directory
                    if (!resolvedPath.startsWith(uploadDir)) {
                        continue; // Skip invalid paths
                    }
                    try {
                        await access(resolvedPath);
                        // Normalize path to use forward slashes for consistency
                        const normalizedPath = filePath.replace(/\\/g, "/");
                        existingFiles.push(normalizedPath);
                    } catch {
                        // File doesn't exist, skip
                    }
                }

                set.status = 200;
                return { existingFiles };
            } catch (error) {
                console.error("Check error:", (error as Error).message, (error as Error).stack);
                set.status = 500;
                return { error: "Failed to check files", details: (error as Error).message };
            }
        },
        {
            body: t.Object({
                filenames: t.Array(t.String()),
            }),
        }
    );