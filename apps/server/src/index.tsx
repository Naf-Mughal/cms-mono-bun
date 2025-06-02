import { bookletTasksSeed } from "@/data/seeds/booklet";
import FirstPage from '@ui/templates/IT/FirstPage'
import SecondPage from '@ui/templates/IT/SecondPage'
import ThirdPage from '@ui/templates/IT/ThirdPage'
import FourteenthPage from '@ui/templates/IT/FourteenthPage'
import FourthPage from '@ui/templates/IT/FourthPage'
import FifthPage from '@ui/templates/IT/FifthPage'
import SixthPage from '@ui/templates/IT/SixthPage'
import SeventhPage from '@ui/templates/IT/SeventhPage'
import EighthPage from '@ui/templates/IT/EighthPage'
import NinthPage from '@ui/templates/IT/NinthPage'
import TenthPage from '@ui/templates/IT/TenthPage'
import EleventhPage from '@ui/templates/IT/EleventhPage'
import TwelfthPage from '@ui/templates/IT/TwelfthPage'
import ThirteenthPage from '@ui/templates/IT/ThirteenthPage'
import FifteenthPage from '@ui/templates/IT/FifteenthPage'
import SixteenthPage from '@ui/templates/IT/SixteenthPage'
import SeventeenthPage from '@ui/templates/IT/SeventeenthPage'
import EighteenthPage from '@ui/templates/IT/EighteenthPage'
import NinteenthPage from '@ui/templates/IT/NinteenthPage'
import TwentiethPage from '@ui/templates/IT/TwentiethPage'
import TwentyFirstPage from '@ui/templates/IT/TwentyFirstPage'
import TwentySecondPage from '@ui/templates/IT/TwentySecondPage'
import TwentyThirdPage from '@ui/templates/IT/TwentyThirdPage'
import TwentyFourthPage from '@ui/templates/IT/TwentyFourthPage'
import TwentyFifthPage from '@ui/templates/IT/TwentyFifthPage'
import TwentySixthPage from '@ui/templates/IT/TwentySixthPage'
import TwentySeventhPage from '@ui/templates/IT/TwentySeventhPage'
import TwentyEighthPage from '@ui/templates/IT/TwentyEighthPage'
import TwentyNinthPage from '@ui/templates/IT/TwentyNinthPage'
import puppeteer from 'puppeteer'
import ReactDOMServer from "react-dom/server";

const tasks: any = {}
bookletTasksSeed.forEach((item: any) => {
    if (item.inputType === 'radio') {
        tasks[item.inputName] = item.data?.children?.find((child: any) => child.value === item.data.value)?.children?.value
    }
    else if (item.inputType === 'table' || item.inputType === 'nested-list') {
        tasks[item.inputName] = item.data
    }
    else if (item.inputType === 'dynamic-table') {
        tasks[item.inputName] = item.tableData
    }
    else {
        tasks[item.inputName] = item.data.value
    }
})

console.log(tasks)

const getPageComponent = (currentPageNumber: number, tasks: any): React.ReactNode => {
    switch (currentPageNumber) {
        case 1:
            return <FirstPage tasks={tasks} />
        case 2:
            return <SecondPage tasks={tasks} />
        case 3:
            return <ThirdPage tasks={tasks} />
        case 4:
            return <FourthPage tasks={tasks} />
        case 5:
            return <FifthPage tasks={tasks} />
        case 6:
            return <SixthPage tasks={tasks} />
        case 7:
            return <SeventhPage tasks={tasks} />
        case 8:
            return <EighthPage tasks={tasks} />
        case 9:
            return <NinthPage tasks={tasks} />
        case 10:
            return <TenthPage tasks={tasks} />
        case 11:
            return <EleventhPage tasks={tasks} />
        case 12:
            return <TwelfthPage tasks={tasks} />
        case 13:
            return <ThirteenthPage tasks={tasks} />
        case 14:
            return <FourteenthPage tasks={tasks} />
        case 15:
            return <FifteenthPage tasks={tasks} />
        case 16:
            return <SixteenthPage tasks={tasks} />
        case 17:
            return <SeventeenthPage tasks={tasks} />
        case 18:
            return <EighteenthPage tasks={tasks} />
        case 19:
            return <NinteenthPage tasks={tasks} />
        case 20:
            return <TwentiethPage tasks={tasks} />
        case 21:
            return <TwentyFirstPage tasks={tasks} />
        case 22:
            return <TwentySecondPage tasks={tasks} />
        case 23:
            return <TwentyThirdPage tasks={tasks} />
        case 24:
            return <TwentyFourthPage tasks={tasks} />
        case 25:
            return <TwentyFifthPage tasks={tasks} />
        case 26:
            return <TwentySixthPage tasks={tasks} />
        case 27:
            return <TwentySeventhPage tasks={tasks} />
        case 28:
            return <TwentyEighthPage tasks={tasks} />
        case 29:
            return <TwentyNinthPage tasks={tasks} />
        default:
            return <FirstPage tasks={tasks} />
    }
}

const contentComponents = Array.from({ length: 29 }, (_, index) =>
    getPageComponent(index + 1, tasks)
);

const html = ReactDOMServer.renderToStaticMarkup(
    <div dir="rtl" className="content-wrapper">
        {contentComponents.map((component, index) => (
            <div key={index} className="content-page">
                {component}
            </div>
        ))}
    </div>
);

(async () => {
    const updatedHtml = `
<html>
  <head>
    <meta charset="utf-8">
    <title>Tailwind PDF</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @media print {
        html, body {
          margin: 0;
          padding: 0;
        }
        
        /* Allow content to flow naturally */
        .content-page {
          margin-bottom: 20px;
        }
        
        /* Prevent empty pages */
        .content-wrapper {
          overflow: visible;
        }
        
        /* Ensure proper spacing */
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
      .border-b { border-bottom-width: 1px !important; }
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
  </head>
  <body class="bg-white text-gray-800">
    <!-- Main content without extra padding that might cause blank pages -->
    <div style="padding: 10px;">
      ${html}
    </div>
  </body>
</html>
`;

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(updatedHtml, {
        waitUntil: 'networkidle0',
        timeout: 30000
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
    const pdfPath = 'booklet.pdf';
    const pdf = await page.pdf({
        path: pdfPath,
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
    });

    await browser.close();
    console.log(`✅  PDF written to ${pdfPath}`);
})();