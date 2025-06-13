import { StatusCodes } from "http-status-codes";
import { BookletTaskStatusesEnum } from "@schemas/index";
import type { Booklet, TaskValue } from "@schemas/index";
import { bookletTasksSeed } from "@/data/seeds/booklet";
import Booklets from "@/db/booklet.model";
import { makeApiResponse } from "@/utils/response";
import puppeteer from "puppeteer";

export const create = async (booklet: Booklet) => {
    try {
        booklet.bookletTasks = bookletTasksSeed
        const newBooklet = await Booklets.create(booklet)
        return { data: makeApiResponse("Booklet created successfully", StatusCodes.OK, newBooklet), status: StatusCodes.OK };
    }
    catch (error: any) {
        return { data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error), status: StatusCodes.INTERNAL_SERVER_ERROR };
    }
};

export const findOne = async (id: string, projection = {}) => {
    try {
        const booklet = await Booklets.findOne({ _id: id }, projection)
        if (!booklet) return { data: makeApiResponse("Booklet not found", StatusCodes.NOT_FOUND, {}), status: StatusCodes.NOT_FOUND };
        return { data: makeApiResponse("Booklet found successfully", StatusCodes.OK, booklet), status: StatusCodes.OK };
    }
    catch (error: any) {
        return { data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error), status: StatusCodes.INTERNAL_SERVER_ERROR };
    }
};

export const findTask = async (id: string, taskId: string) => {
    try {
        const booklet = await Booklets.findOne(
            { _id: id },
            { bookletTasks: { $elemMatch: { _id: taskId } } }
        )
        if (!booklet) return { data: makeApiResponse("Booklet not found", StatusCodes.NOT_FOUND, {}), status: StatusCodes.NOT_FOUND };
        return { data: makeApiResponse("Booklet found successfully", StatusCodes.OK, booklet.bookletTasks?.[0]), status: StatusCodes.OK };
    }
    catch (error: any) {
        return { data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error), status: StatusCodes.INTERNAL_SERVER_ERROR };
    }
};

const getValue = (query: string, obj: any): any => {
    if (obj && typeof obj === 'object') {
        for (const [key, value] of Object.entries(obj)) {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                const result = getValue(`${query}.${key}`, value);
                if (result) return result;
            } else {
                return {
                    returnedKey: `${query}.${key}`,
                    returnedValue: value
                };
            }
        }
    }
    return null; // If nothing found
};

export const updateTask = async (id: string, taskId: string, data: TaskValue, tableData?: any) => {
    const updateFields: any = {};
    console.log(data)
    if (data) {
        for (const [key, value] of Object?.entries(data)) {
            if (typeof value === 'object' && !Array.isArray(value) && value) {
                const { returnedKey, returnedValue } = getValue(`bookletTasks.$.data.${key}`, value);
                updateFields[returnedKey] = returnedValue;
            } else {
                updateFields[`bookletTasks.$.data.${key}`] = value;
            }
        }
    }
    try {
        const booklet = await Booklets.findOneAndUpdate(
            { _id: id, "bookletTasks._id": taskId },
            { $set: { "bookletTasks.$.status": BookletTaskStatusesEnum.Completed, "bookletTasks.$.tableData": tableData, ...updateFields } },
            { bookletTasks: { $elemMatch: { _id: taskId } }, new: true }
        )
        if (!booklet) return { data: makeApiResponse("Booklet not found", StatusCodes.NOT_FOUND, {}), status: StatusCodes.NOT_FOUND };
        return { data: makeApiResponse("Booklet found successfully", StatusCodes.OK, booklet.bookletTasks?.[0]), status: StatusCodes.OK };
    }
    catch (error: any) {
        return { data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error), status: StatusCodes.INTERNAL_SERVER_ERROR };
    }
};

export const update = async (id: string, booklet: Booklet) => {
    try {
        const updatedBooklet = await Booklets.findOneAndUpdate({ _id: id }, booklet, { new: true })
        if (!updatedBooklet) return { data: makeApiResponse("Booklet not found", StatusCodes.NOT_FOUND, {}), status: StatusCodes.NOT_FOUND };
        return { data: makeApiResponse("Booklet updated successfully", StatusCodes.OK, updatedBooklet), status: StatusCodes.OK };
    }
    catch (error: any) {
        return { data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error), status: StatusCodes.INTERNAL_SERVER_ERROR };
    }
};

export const del = async (id: string) => {
    try {
        const deletedBooklet = await Booklets.findOneAndDelete({ _id: id }, { new: true })
        if (!deletedBooklet) return { data: makeApiResponse("Booklet not found", StatusCodes.NOT_FOUND, {}), status: StatusCodes.NOT_FOUND };
        return { data: makeApiResponse("Booklet deleted successfully", StatusCodes.OK, {}), status: StatusCodes.OK };
    }
    catch (error: any) {
        return { data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error), status: StatusCodes.INTERNAL_SERVER_ERROR };
    }
};


export const paginate = async ({ page = 1, limit = 10, filter = {}, projection = {} }: { page: number, limit: number, filter?: any, projection?: any }) => {
    try {
        const skip = (page - 1) * limit;
        const booklets = await Booklets.find(filter, projection).skip(skip).limit(limit);
        const totalDocuments = await Booklets.countDocuments();
        const totalPages = Math.ceil(totalDocuments / limit);

        const paginationData = {
            booklets,
            totalDocuments,
            totalPages,
            currentPage: page,
            perPage: limit,
        };

        return {
            data: makeApiResponse("Booklets fetched successfully", StatusCodes.OK, paginationData),
            status: StatusCodes.OK
        };
    } catch (error: any) {
        console.error(error);
        return {
            data: makeApiResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR, error),
            status: StatusCodes.INTERNAL_SERVER_ERROR
        };
    }
};

export const convertToPDF = async (html: string) => {
    const updatedHtml = `
  <html>
    <head>
      <meta charset="utf-8">
      <title>Tailwind PDF</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @font-face {
          font-family: 'Arial Regular';
          font-style: normal;
          font-weight: normal;
          src: local('Arial Regular'), url('https://devapi.euqud.io/api/fonts/ARIAL.woff') format('woff');
        }
        @font-face {
          font-family: 'Arial Bold';
          font-style: normal;
          font-weight: bold;
          src: local('Arial Bold'), url('https://devapi.euqud.io/api/fonts/ARIALBD.woff') format('woff');
        }
        @font-face {
          font-family: 'Arial Italic';
          font-style: italic;
          font-weight: normal;
          src: local('Arial Italic'), url('https://devapi.euqud.io/api/fonts/ARIALI.woff') format('woff');
        }
        /* Add other fonts as needed, ensuring unique font-family names and correct font-weight/font-style */

        @media print {
          html, body {
            margin: 0;
            padding: 0;
          }
          .content-page {
            margin-bottom: 20px;
          }
          .content-wrapper {
            overflow: visible;
          }
          * {
            box-sizing: border-box;
          }
        }

        * {
          font-family: 'Arial Regular', Arial, sans-serif !important;
        }

        /* Tailwind styles */
        .max-w-\\[1200px\\] { max-width: 1200px !important; }
        /* ... other Tailwind styles ... */
      </style>
    </head>
    <body class="bg-white text-gray-800">
      <div style="padding: 10px;">
        ${html}
      </div>
    </body>
  </html>
  `;

    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--font-render-hinting=medium',
                '--enable-font-antialiasing'
            ],
            headless: 'new',
            dumpio: true // Enable for debugging
        });
        const page = await browser.newPage();

        // Log console messages for debugging
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        await page.setContent(updatedHtml, {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Wait for fonts to load
        await page.waitForFunction(() => {
            const fonts = document.fonts;
            return fonts.ready.then(() => fonts.size > 0);
        });

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '40mm',
                right: '15mm',
                bottom: '40mm',
                left: '15mm'
            },
            displayHeaderFooter: true,
            headerTemplate: `
          <div style="font-size: 12px; width: 100%; direction: rtl; font-family: 'Arial Regular', Arial, sans-serif; margin: 0 15mm; padding: 10px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 16px 0; background: white; border-bottom: 1px solid #d1d5db; display: flex; align-items: center; justify-content: space-between;">
              <div style="text-align: right; line-height: 1.2;">
                <h1 style="font-size: 16px; font-weight: bold; color: #1f2937; margin: 0 0 3px 0;">المملكة العربية السعودية</h1>
                <h2 style="font-size: 14px; font-weight: 500; color: #374151; margin: 0 0 3px 0;">اسم الجهة الحكومية</h2>
                <h3 style="font-size: 14px; font-weight: 500; color: #374151; margin: 0 0 3px 0;">اسم الإدارة</h3>
                <h4 style="font-size: 14px; font-weight: 500; color: #374151; margin: 0;">اسم النموذج</h4>
              </div>
              <div style="width: auto; height: 60px; padding: 8px; background: #6b7280; display: flex; align-items: center; justify-content: center; border-radius: 6px;">
                <span style="color: white; font-size: 12px;">شعار الجهة</span>
              </div>
            </div>
          </div>
        `,
            footerTemplate: `
          <div style="font-size: 12px; width: 100%; direction: rtl; font-family: 'Arial Regular', Arial, sans-serif; margin: 0 15mm; padding: 10px 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 12px 0; font-size: 12px; text-align: right; border-top: 1px solid #d1d5db;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px;">
                <div>
                  <p style="margin: 0 0 2px 0; font-size: 11px;">رقم الصفحة</p>
                  <p style="margin: 0; font-weight: bold;"><span class="pageNumber"></span> من <span class="totalPages"></span></p>
                </div>
                <div>تاريخ الإصدار: <span style="display: inline-block; border-bottom: 1px solid #9CA3AF; width: 80px; height: 14px;"></span></div>
                <div>رقم النسخة: الثانية</div>
                <div>رقم الكراسة: <span style="display: inline-block; border-bottom: 1px solid #9CA3AF; width: 80px; height: 14px;"></span></div>
              </div>
            </div>
          </div>
        `
        });

        await browser.close();
        console.log(`✅ PDF generated`);
        return pdf;
    } catch (error: any) {
        console.error('PDF generation failed:', error.message);
        throw new Error(error.message, { cause: StatusCodes.INTERNAL_SERVER_ERROR });
    }
};
