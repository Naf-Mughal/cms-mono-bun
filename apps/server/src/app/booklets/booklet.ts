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
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Narrow';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Narrow'), url('https://devapi.euqud.io/api/fonts/ARIALN.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Italic';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Italic'), url('https://devapi.euqud.io/api/fonts/ARIALI.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Narrow Italic';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Narrow Italic'), url('https://devapi.euqud.io/api/fonts/ARIALNI.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Medium';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Medium'), url('https://devapi.euqud.io/api/fonts/ArialMdm.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Medium Italic';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Medium Italic'), url('https://devapi.euqud.io/api/fonts/ArialMdmItl.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Bold';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Bold'), url('https://devapi.euqud.io/api/fonts/ARIALBD.woff') format('woff');
      font-display: swap;
    }

    @font-face {
        font-family: 'Arial Narrow Bold';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Narrow Bold'), url('https://devapi.euqud.io/api/fonts/ARIALNB.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Bold Italic';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Bold Italic'), url('https://devapi.euqud.io/api/fonts/ARIALBI.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Narrow Bold Italic';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Narrow Bold Italic'), url('https://devapi.euqud.io/api/fonts/ARIALNBI.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Black';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Black'), url('https://devapi.euqud.io/api/fonts/ARIBLK.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Black Italic';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Black Italic'), url('https://devapi.euqud.io/api/fonts/ARIALBLACKITALIC.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Light Regular';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Light Regular'), url('https://devapi.euqud.io/api/fonts/ARIALLGT.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial CE Regular';
      font-style: normal;
      font-weight: normal;
      src: local('Arial CE Regular'), url('https://devapi.euqud.io/api/fonts/ArialCE.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial CE MT Black Regular';
      font-style: normal;
      font-weight: normal;
      src: local('Arial CE MT Black Regular'), url('https://devapi.euqud.io/api/fonts/ArialCEMTBlack.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial CE Bold';
      font-style: normal;
      font-weight: normal;
      src: local('Arial CE Bold'), url('https://devapi.euqud.io/api/fonts/arialceb.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial Light Italic';
      font-style: normal;
      font-weight: normal;
      src: local('Arial Light Italic'), url('https://devapi.euqud.io/api/fonts/ARIALLGTITL.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial CE Italic';
      font-style: normal;
      font-weight: normal;
      src: local('Arial CE Italic'), url('https://devapi.euqud.io/api/fonts/ArialCEItalic.woff') format('woff');
      font-display: swap;
    }

    @font-face {
      font-family: 'Arial CE Bold Italic';
      font-style: normal;
      font-weight: normal;
      src: local('Arial CE Bold Italic'), url('https://devapi.euqud.io/api/fonts/ArialCEBoldItalic.woff') format('woff');
      font-display: swap;
    }

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
        font-family: Arial, sans-serif !important;
      }

      /* Force Tailwind styles to work properly */
      .max-w-\\[1200px\\] { max-width: 1200px !important; }
      .mx-auto { margin-left: auto !important; margin-right: auto !important; }
      .mt-8 { margin-top: 2rem !important; }
      .pt-4 { padding-top: 1rem !important; }
      .pb-4 { padding-bottom: 1rem !important; }
      .text-sm { font-size: 0.875rem !important; }
      .text-right { text-align: right !important; }
      .border-solid { border-style: solid !important; }
      .border-gray-300 { border-color: #d1d5db !important; }
      .border-t { border-top-width: 1px !important; }
      .flex { display: flex !important; }
      .flex-col { flex-direction: column !important; }
      .md\\:flex-row { flex-direction: row !important; }
      .justify-between { justify-content: space-between !important; }
      .items-start { align-items: flex-start !important; }
      .md\\:items-center { align-items: center !important; }
      .mb-2 { margin-bottom: 0.5rem !important; }
      .md\\:mb-0 { margin-bottom: 0 !important; }
      .inline-block { display: inline-block !important; }
      .border-b { border-bottom: 1px solid !important; }
      .border-gray-400 { border-color: #9ca3af !important; }
      .w-24 { width: 6rem !important; }
      .py-6 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
      .px-0 { padding-left: 0 !important; padding-right: 0 !important; }
      .bg-white { background-color: #ffffff !important; }
      .space-y-1 > * + * { margin-top: 0.25rem !important; }
      .text-lg { font-size: 1.125rem !important; }
      .font-bold { font-weight: 700 !important; }
      .text-gray-800 { color: #1f2937 !important; }
      .text-base { font-size: 1rem !important; }
      .font-medium { font-weight: 500 !important; }
      .text-gray-700 { color: #374151 !important; }
      .w-auto { width: auto !important; }
      .h-24 { height: 6rem !important; }
      .p-3 { padding: 0.75rem !important; }
      .bg-gray-500 { background-color: #6b7280 !important; }
      .items-center { align-items: center !important; }
      .justify-center { justify-content: center !important; }
      .rounded-\\[1vw\\] { border-radius: 1vw !important; }
      .text-white { color: #ffffff !important; }
    </style>

    <!-- Preload critical fonts -->
    <link rel="preload" href="https://devapi.euqud.io/api/fonts/ARIAL.woff" as="font" type="font/woff" crossorigin>
    <link rel="preload" href="https://devapi.euqud.io/api/fonts/ARIALBD.woff" as="font" type="font/woff" crossorigin>

    <script>
      // Enhanced font and resource loading detection
      let fontsLoaded = false;
      let tailwindLoaded = false;
      let resourcesLoaded = false;

      function checkAllLoaded() {
        if (fontsLoaded && tailwindLoaded && resourcesLoaded) {
          document.body.setAttribute('data-all-loaded', 'true');
          console.log('All resources loaded successfully');
        }
      }

      // Check Tailwind loading
      function checkTailwind() {
        // Try multiple ways to detect Tailwind
        const hasTailwindClasses = document.querySelector('.bg-white') !== null;
        const hasTailwindScript = document.querySelector('script[src*="tailwindcss"]') !== null;
        const tailwindExists = window.tailwind !== undefined || hasTailwindClasses;

        if (tailwindExists || hasTailwindScript) {
          tailwindLoaded = true;
          console.log('Tailwind detected');
          checkAllLoaded();
        }

        // Fallback timeout for Tailwind
        setTimeout(() => {
          if (!tailwindLoaded) {
            tailwindLoaded = true;
            console.log('Tailwind loading timeout reached');
            checkAllLoaded();
          }
        }, 5000);
      }

      // Enhanced font loading detection
      function checkFonts() {
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(function() {
            // Additional check to verify fonts are actually applied
            const testElement = document.createElement('div');
            testElement.style.fontFamily = 'Arial, sans-serif';
            testElement.style.position = 'absolute';
            testElement.style.visibility = 'hidden';
            testElement.innerHTML = 'Test';
            document.body.appendChild(testElement);

            setTimeout(() => {
              document.body.removeChild(testElement);
              fontsLoaded = true;
              console.log('Fonts loaded via FontFace API');
              checkAllLoaded();
            }, 100);
          }).catch(() => {
            fontsLoaded = true;
            console.log('Font loading failed, proceeding anyway');
            checkAllLoaded();
          });
        } else {
          // Fallback for browsers without FontFace API
          setTimeout(() => {
            fontsLoaded = true;
            console.log('Fonts loaded via timeout fallback');
            checkAllLoaded();
          }, 3000);
        }
      }

      // Check if all external resources are loaded
      function checkResources() {
        const scripts = document.querySelectorAll('script[src]');
        const links = document.querySelectorAll('link[href]');
        let loadedCount = 0;
        const totalResources = scripts.length + links.length;

        function resourceLoaded() {
          loadedCount++;
          if (loadedCount >= totalResources) {
            resourcesLoaded = true;
            console.log('All external resources loaded');
            checkAllLoaded();
          }
        }

        scripts.forEach(script => {
          if (script.complete) {
            resourceLoaded();
          } else {
            script.addEventListener('load', resourceLoaded);
            script.addEventListener('error', resourceLoaded);
          }
        });

        links.forEach(link => {
          if (link.sheet || link.complete) {
            resourceLoaded();
          } else {
            link.addEventListener('load', resourceLoaded);
            link.addEventListener('error', resourceLoaded);
          }
        });

        // Fallback timeout
        setTimeout(() => {
          if (!resourcesLoaded) {
            resourcesLoaded = true;
            console.log('Resource loading timeout reached');
            checkAllLoaded();
          }
        }, 8000);

        // If no external resources, mark as loaded
        if (totalResources === 0) {
          resourcesLoaded = true;
          checkAllLoaded();
        }
      }

      // Start checks when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          checkTailwind();
          checkFonts();
          checkResources();
        });
      } else {
        checkTailwind();
        checkFonts();
        checkResources();
      }

      // Final fallback timeout
      setTimeout(() => {
        if (!document.body.getAttribute('data-all-loaded')) {
          document.body.setAttribute('data-all-loaded', 'true');
          console.log('Final timeout reached, proceeding with PDF generation');
        }
      }, 15000);
    </script>
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
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-extensions',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding'
            ],
            headless: true,
            timeout: 60000
        });

        const page = await browser.newPage();

        // Set longer timeouts for remote environments
        page.setDefaultNavigationTimeout(60000);
        page.setDefaultTimeout(60000);

        // Set user agent to avoid potential blocking
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Enable request interception to handle failures gracefully
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'font' || req.resourceType() === 'stylesheet' || req.resourceType() === 'script') {
                // Add headers for CORS and caching
                req.continue({
                    headers: {
                        ...req.headers(),
                        'Accept': '*/*',
                        'Cache-Control': 'no-cache'
                    }
                });
            } else {
                req.continue();
            }
        });

        page.on('requestfailed', (req) => {
            console.warn(`Request failed: ${req.url()} - ${req.failure()?.errorText}`);
        });

        console.log('Setting page content...');

        // Set content with extended timeout
        await page.setContent(updatedHtml, {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        console.log('Waiting for resources to load...');

        // Wait for our custom loading indicator with extended timeout
        try {
            await page.waitForFunction(() => {
                return document.body.getAttribute('data-all-loaded') === 'true';
            }, {
                timeout: 20000,
                polling: 500
            });
            console.log('All resources loaded successfully');
        } catch (error: any) {
            console.warn('Timeout waiting for resources, proceeding anyway:', error.message);
        }

        // Additional stabilization wait
        console.log('Stabilization wait...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Force repaint multiple times for remote environments
        await page.evaluate(() => {
            // Force multiple repaints
            for (let i = 0; i < 3; i++) {
                document.body.style.display = 'none';
                document.body.offsetHeight; // Trigger reflow
                document.body.style.display = '';
            }

            // Force font rendering
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                const style = window.getComputedStyle(el);
                const fontFamily = style.fontFamily;
                // This forces font computation
                (el as any).style.fontFamily = fontFamily;
            });
        });

        // Final wait after repaint
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Generating PDF...');

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
            <div style="font-size: 12px; width: 100%; direction: rtl; font-family: Arial, sans-serif; margin: 0 15mm; padding: 10px 0;">
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
            <div style="font-size: 12px; width: 100%; direction: rtl; font-family: Arial, sans-serif; margin: 0 15mm; padding: 10px 0;">
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
            `,
            timeout: 60000
        });

        await browser.close();
        console.log('✅ PDF generated successfully');
        return pdf;

    } catch (error: any) {
        console.error('PDF generation error:', error);
        throw new Error(`PDF generation failed: ${error.message}`, {
            cause: StatusCodes.INTERNAL_SERVER_ERROR
        });
    }
}
