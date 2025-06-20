import { makeApiResponse } from "@/utils/response";
import type { Booklet } from "@schemas/index";
import Elysia, { type Context } from "elysia";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import { convertToPDF, create, del, findOne, findTask, paginate, update, updateTask } from "./booklet";
import { getHTML } from "./getHTML";
import { PDFDocument } from 'pdf-lib';
import { join } from 'path';

export const bookletRouter = new Elysia({ prefix: '/booklets' })
    .onError(({ error }) => {
        return makeApiResponse(error.toString(), (error as any).cause, error);
    })
    .get('/:id/download', async ({ params, set, request }: Context & { params: { id: string } }) => {
        try {
            // Fetch the data for the generated PDF
            const projection = { _id: 1, projectName: 1, bookletTasks: 1, bookletNumber: 1, issueDate: 1, issueCity: 1, category: 1 };
            const { data } = await findOne(params.id, projection);
            const tasks: any = {}
            data.data.bookletTasks.forEach((item: any) => {
                if (item.inputType === 'radio') {
                    tasks[item.inputName] = item.data?.children?.find((child: any) => child.value === item.data.value)?.children || item.data?.children?.find((child: any) => child.value === item.data.value)?.value
                }
                else if (item.inputType === 'table' || item.inputType === 'list' || item.inputType === 'rows-table') {
                    tasks[item.inputName] = item.data
                }
                else if (item.inputType === 'dynamic-table') {
                    tasks[item.inputName] = item.tableData
                }
                else {
                    tasks[item.inputName] = item.data.value
                }
            })

            const html = getHTML(tasks || {});
            const firstPdfBuffer = await convertToPDF(html);

            const mergedPdf = await PDFDocument.create();

            const firstPdf = await PDFDocument.load(firstPdfBuffer);
            const copiedPages = await mergedPdf.copyPages(firstPdf, firstPdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
            const uploadsDir = join(__dirname, '../../../uploads');
            const pdfFiles: string[] = Array.isArray(tasks?.attachments)
                ? tasks.attachments.map((item: any) =>
                    join(uploadsDir, `${params.id}-${item}.pdf`)
                )
                : [];

            for (const filePath of pdfFiles) {
                try {
                    const fileBuffer = await Bun.file(filePath).arrayBuffer();
                    const pdfDoc = await PDFDocument.load(fileBuffer);
                    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                    copiedPages.forEach((page) => mergedPdf.addPage(page));
                } catch (err: any) {
                    console.warn(`Failed to load PDF at ${filePath}: ${err.message}`);
                }
            }
            const mergedPdfBuffer = await mergedPdf.save();

            set.headers['Content-Type'] = 'application/pdf';
            set.headers['Content-Disposition'] = `attachment; filename="${new Date().getTime()}.pdf"`;
            set.headers['Content-Length'] = mergedPdfBuffer.length.toString();

            return Buffer.from(mergedPdfBuffer);
        } catch (error: any) {
            set.status = StatusCodes.INTERNAL_SERVER_ERROR;
            throw new Error(error.message, { cause: StatusCodes.INTERNAL_SERVER_ERROR });
        }
    })
    .derive(async ({ headers, set }) => {
        const token = headers.authorization?.split(' ')[1];
        if (!token) {
            set.status = StatusCodes.FORBIDDEN;
            throw new Error('No token provided', { cause: StatusCodes.FORBIDDEN });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!);
            return { user: decoded, token: token };
        } catch (err: any) {
            set.status = StatusCodes.UNAUTHORIZED;
            throw new Error('Invalid or expired token', { cause: StatusCodes.UNAUTHORIZED });
        }
    })
    .post('/create', async ({ body, set }: Context & { body: Booklet }) => {
        const { data, status } = await create(body);
        set.status = status;
        return { ...data };
    })
    .get('/:id', async ({ params, set }: Context & { params: { id: string } }) => {
        const projection = { _id: 1, bookletType: 1, bookletNumber: 1, projectName: 1, issueCity: 1, issueDate: 1, category: 1 };
        const { data, status } = await findOne(params.id, projection);
        set.status = status;
        return { ...data };
    })
    .get('/:id/tasks', async ({ params, set, user }: Context & { params: { id: string }, user: any }) => {
        const projection = { _id: 1, projectName: 1, bookletTasks: 1 };
        console.log(user)
        const { data, status } = await findOne(params.id, projection);
        set.status = status;
        return { ...data };
    })
    .get('/:id/tasks/:taskId', async ({ params, set }: Context & { params: { id: string, taskId: string } }) => {
        const { data, status } = await findTask(params.id, params.taskId);
        set.status = status;
        return { ...data };
    })
    .post('/:id/update', async ({ params, body, set }: Context & { params: { id: string }, body: Booklet }) => {
        const { data, status } = await update(params.id, body);
        set.status = status;
        return { ...data };
    })
    .post('/:id/delete', async ({ params, set }: Context & { params: { id: string } }) => {
        const { data, status } = await del(params.id);
        set.status = status;
        return { ...data };
    })
    .post('/:id/tasks/:taskId/perform', async ({ params, body, set }: Context & { params: { id: string, taskId: string }, body: any }) => {
        const { data, status } = await updateTask(params.id, params.taskId, body.data, body.tableData);
        set.status = status;
        return { ...data };
    })
    .post('/paginate', async ({ body, set }: Context & { body: any }) => {
        const { page = 1, limit = 10, filter = {} } = body;
        const projection = { _id: 1, bookletType: 1, bookletNumber: 1, projectName: 1, issueCity: 1, issueDate: 1, category: 1 };
        const { data, status } = await paginate({ page, limit, filter, projection });
        set.status = status;
        return { ...data };
    })