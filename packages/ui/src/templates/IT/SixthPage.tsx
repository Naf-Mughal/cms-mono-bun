import React from 'react'
import { useTaskHighlight, createTaskRef } from '../../hooks/useTaskHighlight'
import { PaymentTypesArabicEnum } from '@schemas/index'

const SixthPage: React.FC<any> = ({ tasks, currentTask }: { tasks: any, currentTask?: any }) => {
  const baseBorder = '1px solid #D1D5DB' // Tailwind gray-300 border color
  const headerBg = '#595959' // Tailwind gray-600 background
  const headerTextColor = 'white'
  const greenText = '#047857' // Tailwind green-700
  const blackText = '#000000'

  const { elementRefs } = useTaskHighlight(currentTask)
  const createRef = (taskName: string) => createTaskRef(elementRefs, taskName)

  return (
    <div style={{ width: '100%', color: blackText }}>
      <div style={{ paddingTop: 24, paddingBottom: 24, rowGap: 16, display: 'flex', flexDirection: 'column' }}>
        {/* Section 1 */}
        <div style={{ borderBottom: baseBorder, paddingBottom: 16 }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: blackText }}>1. تعريفات</h3>
          <table style={{ width: '100%', textAlign: 'right', border: baseBorder, fontSize: 14, color: blackText, borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: headerBg, fontWeight: 600 }}>
              <tr>
                <th style={{ border: baseBorder, padding: 8, color: headerTextColor }}>المصطلح</th>
                <th style={{ border: baseBorder, padding: 8, color: headerTextColor }}>التعريف</th>
              </tr>
            </thead>
            <tbody>
              <tr ref={createRef('nameOfGovtEntity')}>
                <td style={{ border: baseBorder, padding: 8 }}>الجهة الحكومية</td>
                <td
                  style={{
                    border: baseBorder,
                    padding: 8,
                    color: tasks?.nameOfGovtEntity ? blackText : blackText,
                  }}
                >
                  {tasks?.nameOfGovtEntity || "تحدده الجهة الحكومية."}
                </td>
              </tr>
              <tr>
                <td style={{ border: baseBorder, padding: 8 }}>المتنافس</td>
                <td style={{ border: baseBorder, padding: 8 }}>
                  مقدم العرض أو المشارك في المنافسة الراغب في تقديم العرض.
                </td>
              </tr>
              <tr>
                <td style={{ border: baseBorder, padding: 8 }}>المنافسة</td>
                <td style={{ border: baseBorder, padding: 8 }}>
                  تشمل جميع إجراءات ووثائق طلب تقديم العروض من قبل الجهة الحكومية ومقدمي العروض حتى الترسية.
                </td>
              </tr>
              <tr>
                <td style={{ border: baseBorder, padding: 8 }}>النظام</td>
                <td style={{ border: baseBorder, padding: 8 }}>
                  نظام المنافسات والمشتريات الحكومية الصادر بالمرسوم الملكي رقم (م/128) وتاريخ 13/11/1440هـ.
                </td>
              </tr>
              <tr>
                <td style={{ border: baseBorder, padding: 8 }}>اللائحة التنفيذية</td>
                <td style={{ border: baseBorder, padding: 8 }}>
                  اللائحة التنفيذية لنظام المنافسات والمشتريات الحكومية الصادرة بقرار وزير المالية رقم (1242) وتاريخ 21/3/1441هـ المعدّلة بقرار وزير المالية رقم (3479) وتاريخ 11/8/1441هـ، ورقم (451) وتاريخ 7/4/1444هـ.
                </td>
              </tr>
              <tr>
                <td style={{ border: baseBorder, padding: 8 }}>المفردات والجمع</td>
                <td style={{ border: baseBorder, padding: 8 }}>
                  تدل الكلمات الواردة بصيغة المفرد على ذات المدلول بصيغة الجمع ويكون العكس صحيحاً أيضاً إذا تطلب سياق النص ذلك.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2 */}
        <div style={{ borderBottom: baseBorder, paddingBottom: 16 }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: blackText }}>2. تعريف عن المنافسة</h3>
          <p>
            يكون طرح إجراءات هذه المنافسة بما في ذلك استلام العروض عن طريق وسيلة بديلة عن البوابة الإلكترونية؛ وهي{' '}
            <span
              ref={createRef('toReceiveBiddingOffers')}
              style={{
                color: tasks?.toReceiveBiddingOffers ? blackText : blackText,
                display: 'inline-block',
                padding: '2px 4px',
                borderRadius: '4px'
              }}
            >
              (الموقع الإلكتروني للجهة الحكومية: {tasks?.toReceiveBiddingOffers || ""})
            </span>{' '}
            ويشار إليها في هذه الكراسة بـ"الوسيلة البديلة".
          </p>
        </div>

        {/* Section 3 */}
        <div style={{ borderBottom: baseBorder, paddingBottom: 16 }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: blackText }}>3. تكاليف وثائق المنافسة</h3>
          <table style={{ width: '100%', textAlign: 'right', border: baseBorder, fontSize: 14, marginTop: 8, borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: headerBg, fontWeight: 600 }}>
              <tr>
                <th style={{ border: baseBorder, padding: 8, color: headerTextColor }} colSpan={2}>تكاليف وثائق المنافسة</th>
                <th style={{ border: baseBorder, padding: 8, color: headerTextColor }}>آلية الدفع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  ref={createRef('valueInNumber')}
                  style={{
                    border: baseBorder,
                    padding: 8,
                    color: tasks?.valueInNumber ? blackText : blackText
                  }}
                >
                  {tasks?.valueInNumber || "القيمة بالأرقام (...  ريال سعودي)"}
                </td>
                <td
                  ref={createRef('valueInWords')}
                  style={{
                    border: baseBorder,
                    padding: 8,
                    color: tasks?.valueInWords ? blackText : blackText
                  }}
                >
                  {tasks?.valueInWords || "القيمة بالتفقيط"}
                </td>
                <td
                  ref={createRef('paymentMethod')}
                  style={{
                    border: baseBorder,
                    padding: 8,
                    color: tasks?.paymentMethod ? blackText : blackText
                  }}
                  colSpan={1}
                >
                  {tasks?.paymentMethod?.value || PaymentTypesArabicEnum[tasks?.paymentMethod as keyof typeof PaymentTypesArabicEnum] || ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4 */}
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: blackText }}>4. المواعيد المتعلقة بالمنافسة</h3>
          <p style={{ color: greenText }}>
            اللائحة التنفيذية لنظام المنافسات والمشتريات الحكومية. وإن استمر العطل التقني لمدة تزيد على ثلاثة أيام متصلة تعين تنفيذه بشكل ورقي، على أن ترفع الجهة الحكومية ما تم عمله من إجراءات إلى البوابة فور زوال العطل.
          </p>
          <table style={{ width: '100%', textAlign: 'right', border: baseBorder, fontSize: 14, marginTop: 16, borderCollapse: 'collapse', color: blackText }}>
            <thead style={{ backgroundColor: headerBg, fontWeight: 600 }}>
              <tr>
                <th style={{ border: baseBorder, padding: 8, color: headerTextColor }}>المرحلة</th>
                <th style={{ border: baseBorder, padding: 8, color: headerTextColor }}>تاريخ الاستحقاق</th>
              </tr>
            </thead>
            <tbody>
              <tr ref={createRef('letterOfConfirmationOfParticipation')}>
                <td style={{ border: baseBorder, padding: 8 }}>خطاب تأكيد المشاركة</td>
                <td
                  style={{ border: baseBorder, padding: 8 }}
                >
                  {tasks?.letterOfConfirmationOfParticipation || "تحدده الجهة الحكومية"}
                </td>
              </tr>
              <tr ref={createRef('sendQuestionsAndInquiries')}>
                <td style={{ border: baseBorder, padding: 8 }}>إرسال الأسئلة والاستفسارات</td>
                <td
                  style={{ border: baseBorder, padding: 8 }}
                >
                  {tasks?.sendQuestionsAndInquiries || "تحدده الجهة الحكومية"}
                </td>
              </tr>
              <tr ref={createRef('submitOffers')}>
                <td style={{ border: baseBorder, padding: 8 }}>تقديم العروض</td>
                <td
                  style={{ border: baseBorder, padding: 8 }}
                >
                  {tasks?.submitOffers || "تحدده الجهة الحكومية"}
                </td>
              </tr>
              <tr ref={createRef('openOffers')}>
                <td style={{ border: baseBorder, padding: 8 }}>فتح العروض</td>
                <td
                  style={{ border: baseBorder, padding: 8 }}
                >
                  {tasks?.openOffers || "تحدده الجهة الحكومية"}
                </td>
              </tr>
              <tr ref={createRef('theAwardDay')}>
                <td style={{ border: baseBorder, padding: 8 }}>الترسية</td>
                <td
                  style={{ border: baseBorder, padding: 8 }}
                >
                  {tasks?.theAwardDay || "تحدده الجهة الحكومية"}
                </td>
              </tr>
              <tr ref={createRef('startWork')}>
                <td style={{ border: baseBorder, padding: 8 }}>بدء الأعمال</td>
                <td
                  style={{ border: baseBorder, padding: 8 }}
                >
                  {tasks?.startWork || "تحدده الجهة الحكومية"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SixthPage
