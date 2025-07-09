import { BookletInputTypesEnum, BookletTaskStatusesEnum, BookletTaskTypesEnum, type BookletTasks } from "@schemas/index";

export const bookletTasksSeed: BookletTasks = [
    {
        name: ['Name of Government Orgnization', 'اسم الجهة الحكومية'],
        inputName: 'nameOfGovtEntity',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['Here, write the name of the ministry or government agency.', 'هنا قم بكتابة إسم الوزارة أو الجهة الحكومية'],
        pageNumber: 6
    },
    {
        name: ['To Receive Bidding Offers', 'إستلام عروض المناقصة عبر'],
        inputName: 'toReceiveBiddingOffers',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['In this paragraph, the government entity mentions the site where you should recive bidding. The paragraph is removed if it does not apply.', ''],
        pageNumber: 6
    },
    {
        name: ['Values in numbers (Saudi Riyal)', 'القيمة بالأرقام (... ريال سعودي)'],
        inputName: 'valueInNumber',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Number,
        description: ['In this paragraph, the government entity mentions the value of the competition documents if it intends to sell them. The paragraph is removed if it does not apply.', ''],
        pageNumber: 6
    },
    {
        name: ['The value in words', 'القيمة بالتفقيط'],
        inputName: 'valueInWords',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['In this paragraph, the government entity mentions the value of the competition documents if it intends to sell them. The paragraph is removed if it does not apply.', ''],
        pageNumber: 6
    },
    {
        name: ['Payment Method', 'آلية الدفع'],
        inputName: 'paymentMethod',
        data: {
            value: "Certified Cheque",
            children: [
                {
                    value: "Certified Cheque",
                    type: BookletInputTypesEnum.Readonly,
                },
                {
                    value: "Cash",
                    type: BookletInputTypesEnum.Readonly,
                },
                {
                    value: "Other",
                    type: BookletInputTypesEnum.Text,
                    children: [{
                        value: null,
                        type: BookletInputTypesEnum.Text
                    }]
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Radio,
        description: ['', ''],
        pageNumber: 6
    },
    {
        name: ['Letter of confirmation of participation', 'خطاب تأكيد المشاركة'],
        inputName: 'letterOfConfirmationOfParticipation',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Date,
        description: ['', ''],
        pageNumber: 6
    },
    {
        name: ['Send questions and inquiries', 'إرسال الأسئلة والاستفسارات'],
        inputName: 'sendQuestionsAndInquiries',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Date,
        description: ['', ''],
        pageNumber: 6
    },
    {
        name: ['Submit offers', 'تقديم العروض'],
        inputName: 'submitOffers',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Date,
        description: ['', ''],
        pageNumber: 6
    },
    {
        name: ['Open offers', 'فتح العروض'],
        inputName: 'openOffers',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Date,
        description: ['', ''],
        pageNumber: 6
    },
    {
        name: ['The award day', 'الترسية'],
        inputName: 'theAwardDay',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Date,
        description: ['', ''],
        pageNumber: 6
    },
    {
        name: ['Start work', 'بدء الأعمال'],
        inputName: 'startWork',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Date,
        description: ['', ''],
        pageNumber: 6
    },
    {
        name: ['Regulatory records and licenses', 'السجلات والتراخيص النظامية'],
        inputName: 'regulatoryRecordsAndLicenses',
        data: {
            value: [
                "السجل التجاري، أو التراخيص النظامية في مجال الأعمال المتقدم لها متى كان المتنافس غير ملزم نظاماً بالقيد في السجل التجاري.",
                "شهادة سداد الزكاة أو الضريبة، أو كليهما متى كان المتنافس ملزماً نظاماً بسداد الزكاة والضريبة.",
                "شهادة من المؤسسة العامة للتأمينات الاجتماعية بتسجيل المنشأة في المؤسسة وسداد الحقوق التأمينية.",
                "شهادة الانتساب إلى الغرفة التجارية، متى كان المتنافس ملزماً نظاماً بالانتساب إلى الغرفة التجارية.",
                "شهادة تصنيف في مجال الأعمال المتقدم لها، إذا كانت تلك الأعمال مما يشترط لها التصنيف.",
                "شهادة الانتساب إلى الهيئة السعودية للمقاولين، إذا كانت الأعمال المتقدم لها متعلقة بالإنشاءات والمقاولات.",
                "شهادة الانتساب إلى الهيئة السعودية للمهندسين، إذا كانت الأعمال المتقدم لها أعمالاً هندسية.",
                "ما يثبت أن المنشأة من المنشآت الصغيرة والمتوسطة المحلية، إذا كانت المنشأة من تلك الفئة، وذلك حسب ما تقرره الهيئة العامة للمنشآت الصغيرة والمتوسطة.",
                "شهادة تحقيق النسبة المطلوبة لتوطين الوظائف.",
                "أي وثائق أخرى تطلبها الجهة الحكومية حسب طبيعة المنافسة.",
            ],
        }
        ,
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['Add/Edit/Delete', 'اضافه/تعديل/حذف'],
        pageNumber: 7
    },
    {
        name: ['Government Representative Name', 'اسم ممثل الجهة الحكومية'],
        inputName: 'governmentRepresentativeName',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 7
    },
    {
        name: ['Government Representative Job', 'وظيفة ممثل الجهة الحكومية'],
        inputName: 'governmentRepresentativeJob',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 7
    },
    {
        name: ['Government Representative Phone', 'هاتف ممثل الجهة الحكومية'],
        inputName: 'governmentRepresentativePhone',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 7
    },
    {
        name: ['Government Representative Fax', 'فاكس ممثل الجهة الحكومية'],
        inputName: 'governmentRepresentativeFax',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 7
    },
    {
        name: ['Government Representative Email Address', 'البريد الإلكتروني لممثل الجهة الحكومية'],
        inputName: 'governmentRepresentativeEmailAddress',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 7
    },
    {
        name: ['Address', 'مكان تسليم العروض - العنوان'],
        inputName: 'address',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 8
    },
    {
        name: ['Building', 'مكان تسليم العروض - المبنى'],
        inputName: 'building',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 8
    },
    {
        name: ['Floor', 'مكان تسليم العروض - الطابق'],
        inputName: 'floor',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 8
    },
    {
        name: ['Room or name of department', 'مكان تسليم العروض - الغرفة/ اسم الإدارة'],
        inputName: 'roomNameOfDepartment',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 8
    },
    {
        name: ['Delivery Time', 'وقت التسليم'],
        inputName: 'deliveryTime',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 8
    },
    {
        name: ['Competition Segmentation', 'تجزئة المنافسة'],
        inputName: 'competitionSegmentation',
        data: {
            value: "no",
            children: [
                {
                    value: 'yes',
                    children: {
                        value: 'يحق للجهة تجزئة المنافسة عند الترسية متى اقتضت المصلحة العامة ذلك، على ألّا يكون الهدف من التجزئة التحوّل إلى أساليب الشراء الأخرى و أن تكون طبيعة الأعمال والمشتريات قابلة للتجزئة فعلياً من حيث القيمة والمدة والبنود والعناصر، وأن تكون التجزئة على البنود غير المتماثلة في المنافسة وفي حال اقتضت المصلحة تجزئة البنود المتماثلة؛ فيجب الحصول على موافقة هيئة كفاءة الإنفاق والمشروعات الحكومية قبل طرح المنافسة.في حال تمت تجزئة المنافسة فإنه تتم الترسية على أكثر من متعاقد على أن يتم.',
                    },
                    type: BookletInputTypesEnum.Text
                },
                {
                    value: 'no',
                    children: {
                        value: 'لا يمكن تجزئة المنافسة',
                    },
                    type: BookletInputTypesEnum.Readonly
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Radio,
        description: ['Can the competition be divided ?', 'هل يمكن تجزئة المنافسة ؟'],
        pageNumber: 10,
    },
    {
        name: ['Confirmation of participation in the competition', 'التضامن'],
        inputName: 'confirmationOfParticipationInTheCompetition',
        data: {
            value: 'no',
            children: [
                {
                    value: 'yes',
                    children: {
                        value: [
                            'أن يتم التضامن قبل تقديم العرض بموجب اتفاقية تضامن مبرمة بين أطراف التضامن ومصدقة من الغرفة التجارية أو من الجهات المخولة بالتوثيق ويجوز أن يقدم المتنافسون -المزمع تضامنهم- مع عرضهم كتاباً يتعهدون بموجبه بالدخول في اتفاقية التضامن إذا أشعروا بترسية المنافسة عليهم.',
                            'أن يحدد في الاتفاقية أو كتاب التعهد قائد التضامن كممثل قانوني أمام الجهة الحكومية لاستكمال إجراءات التعاقد وتوقيع العقد ولأغراض المراسلات والمخاطبات.',
                            'أن يوضح في الاتفاقية أو كتاب التعهد الأعمال التي سيقوم بها كل طرف من أطراف التضامن.',
                            'أن تنص اتفاقية التضامن أو كتاب التعهد على التزام ومسؤولية المتضامنين مجتمعين أو منفردين عن تنفيذ كافة الأعمال المطروحة في المنافسة.',
                            'أن يوقع العرض وجميع وثائقه ومستنداته من جميع أطراف التضامن.',
                            'تقدم اتفاقية التضامن مع العرض وجميع وثائقه ومستنداته.',
                            'لا يجوز لأي طرف من أطراف التضامن التقدم للمنافسة بعرض منفرد أو التضامن مع منافس آخر.',
                            'لا يجوز تعديل اتفاقية التضامن بعد تقديمها إلا بموافقة الجهة الحكومية.'
                        ],
                    },
                    type: BookletInputTypesEnum.List
                },
                {
                    value: 'no',
                    children: {
                        value: 'لا يجوز للمنافسين التضامن فيما بينهم',
                    },
                    type: BookletInputTypesEnum.Readonly
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Radio,
        description: ['Is it permissible for competitors to act in solidarity with each other?', 'هل يجوز للمنافسين التضامن فيما بينهم ؟'],
        pageNumber: 12,
    },
    {
        name: ['Post qualification', 'التأهيل اللاحق'],
        inputName: 'postQualification',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['Write No.: The qualification criteria are attached in Appendix No.', 'كتابة رقم ملحق معايير التأهيل المرفق في ملحق رقم.'],
        pageNumber: 13
    },
    {
        name: ['Authrised Currency', 'العملة المعتمدة'],
        inputName: 'authrisedCurrency',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['Keep as is / Edit', 'تعديل / حفظ البند كما هو'],
        pageNumber: 14
    },
    {
        name: ['Timeline to send the inquiries', 'الأسئلة والاستفسارات - الفترة المحددة لتقديم الاستفسارات'],
        inputName: 'timelineToSendInquiries',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 14
    },
    {
        name: ['Timeline to answer the inquiries', 'الأسئلة والاستفسارات - الفترة المحددة للرد على الاستفسارات'],
        inputName: 'timelineToAnswerInquiries',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 14
    },
    {
        name: ['Official email', 'البريد الرسمي'],
        inputName: 'officialEmail',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['The entity determines the alternative means of communication.', 'تحدد الجهة وسيلة التواصل البديلة'],
        pageNumber: 14
    },
    {
        name: ['Technical offer documents', 'وثائق العرض الفني'],
        inputName: 'technicalOfferDocuments',
        data: {
            value: [
                'منهجية إنجاز الأعمال.',
                'الجدول الزمني لتنفيذ الأعمال.',
                'الخبرات السابقة.',
                'فريق العمل.'
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['', ''],
        pageNumber: 15
    },
    {
        name: ['Finacial offer documents', ' وثائق العرض المالي'],
        inputName: 'finacialOfferDocuments',
        data: {
            value: [
                'جدول الكميات شاملا الأسعار.',
                'جدول الدفعات.',
                'الضمان الابتدائي.'
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['', ''],
        pageNumber: 15
    },
    {
        name: ['Writing Prices', 'كتابة الأسعار'],
        inputName: 'writingPrices',
        data: {
            value: "yes",
            children: [
                {
                    value: 'yes',
                    children: {
                        value: 'نعم يجوز إذا أجازت شروط المنافسة ذلك',
                    },
                    type: BookletInputTypesEnum.Readonly
                },
                {
                    value: 'no',
                    children: {
                        value: '.لا يجوز لمقدم العرض ترك أي بند من بنود المنافسة دون تسعير ',
                    },
                    type: BookletInputTypesEnum.Readonly
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Radio,
        description: ['Is it permissible for the bidder to leave any of the tender items unpriced?', 'هل يجوز لمقدم العرض ترك أي من بنود المنافسة دون تسعير؟'],
        pageNumber: 15,
    },
    {
        name: ['Inatial guarantee percentage ', 'نسبة الضمان الابتدائي'],
        inputName: 'inatialGuaranteePercentage',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['The government agency determines the initial guarantee percentage, which should range between 1% and 2%.', 'تحدد الجهة الحكومية نسبة الضمان الابتدائي على ان تتراوح بين ١٪ و٢٪ '],
        pageNumber: 16
    },
    {
        name: ['Alternative offers', 'العروض البديلة'],
        inputName: 'alternativeOffers',
        data: {
            value: "yes",
            children: [
                {
                    value: 'yes',
                    children: {
                        value: null,
                        children: {
                            value: 'نعم.  العروض البديلة مقبولة  على ان تلتزم في الاجراءات الاعتماد والتقييم كما ذُكر في الملحق الخاص بها رقم',
                        },
                        type: BookletInputTypesEnum.Readonly
                    },
                    type: BookletInputTypesEnum.Text
                },
                {
                    value: 'no',
                    children: {
                        value: 'لا العروض البديلة غير مقبولة',
                    },
                    type: BookletInputTypesEnum.Readonly
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Radio,
        description: ['The government agency determines whether alternative bids are acceptable in the competition and the procedures for evaluating and accepting these bids.', 'تحدد الجهة الحكومية إذا كانت العروض البديلة مقبولة في المنافسة وإجراءات تقييم وقبول هذه العروض.'],
        pageNumber: 16,
    },
    {
        name: ['Offers Formatting Requirements', 'متطلبات تنسيق العروض'],
        inputName: 'offersFormattingRequirements',
        data: {
            value: [],
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['The government agency determines additional coordination requirements.', 'تحدد الجهة الحكومية متطلبات التنسيق الاضافية'],
        pageNumber: 16
    },
    {
        name: ['Submit offers Mechanism', 'آلية تقديم العروض'],
        inputName: 'twoFiles',
        data: {
            value: 'تقدم العروض في مظروفين أو ملفين فني ومالي ويجوز للجهة الحكومية اشتراط ذلك في الأعمال والمشتريات التي تقل قيمتها عن (خمسة ملايين) ريال، وفق ما تراه محققاً للمصلحة.',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['The entity has the right to delete this paragraph if the estimated cost is less than five million riyals.', 'يحق للجهة حذف هذه الفقرة إذا كانت التكلفة التقديرية أقل من خمسة ملايين ريال.'],
        pageNumber: 17
    },
    {
        name: ['Submit offers Mechanism', 'آلية تقديم العروض'],
        inputName: 'externalMechanism',
        data: {
            value: 'لا تطبق البنود الفرعية (ب، ه ،و) من البند (أولاً) عند تحديد الوسيلة البديلة من قبل الجهة الحكومية في الأعمال والمشتريات التي تنفذ خارج المملكة العربية السعودية، على أن تلتزم الجهة بالإعلان عن أسماء المتنافسين الذين تقدموا بعروضهم بعد انتهاء موعد تقديم العروض وفتحها من خلال الوسيلة البديلة.'
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 17
    },
    {
        name: ['Criteria for evaluating offers', 'معايير تقييم العروض'],
        inputName: 'criteriaForEvaluatingOffers',
        data: {
            value: [
                'أنه في الأعمال التي لا تتطلب قدرات فنية عالية أو معقدة، يكون تقييم العرض الفني على أساس الاجتياز من عدمه ويكون العرض الفائز الأدنى سعراً',
                'أن تكون النسبة الأعلى للأوزان في الخدمات الاستشارية التي تحتاج إلى قدرات فنية عالية للمعايير الفنية.',
                'يُمنح المنتج الوطني –غير المدرج ضمن القائمة الإلزامية- تفضيل سعري بافتراض سعر المنتج الأجنبي أعلى بنسبة (10%) مما هو مذكور في وثائق العرض، كما تُمنح المنتجات الخاضعة للتفضيل السعري الإضافي -إن وجدت- أفضلية سعرية بحسب ما هو مقرر لها.',
                'يلتزم المتنافس بتقديم نسبة المحتوى المحلي المستهدفة لاجتياز التقييم الفني، وفي حال عدم تقديم نسبة المحتوى المحلي المستهدفة، فيتم استبعاده من المنافسة.',
                'يقيّم العرض -المجتاز للتقييم الفني-، بحيث يكون وزن العرض المالي عند التقييم بنسبة (60%) (وزن السعر)، وتكون أوزان كل من خط الأساس ونسبة المحتوى المحلي المستهدفة وكون الشركة مدرجة في السوق المالية عند التقييم بنسبة (40%)، ويكون التقييم وفقاً للمعادلة التالية: \n نتيجة التقييم المالي = (سعر أقل عرض متأهل فنيًا (بالريال) / سعر العرض للمتنافس المراد تقييمه (بالريال)) × 60% + (نسبة المحتوى المحلي المستهدفة × 50% + خط الأساس × 50% + 5% نقاط للشركة المدرجة) × 40%.  تتم الترسية على المتنافس الحاصل على أعلى تقييم، على ألا يتجاوز الفارق نسبة (10%) بين السعر الوارد في عرض المتنافس الحاصل على أعلى تقييم نهائي وبين أقل سعر وارد في عرض أي من المتنافسين المؤهلين فنيًّا، وفي حال تجاوز الفارق في السعر هذه النسبة فيتم الانتقال للمتنافس الذي يليه في التقييم.'
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['Add/Modify/Delete', 'اضافه / تعديل / حذف'],
        pageNumber: 19
    },
    {
        name: ['Pause time after announcing the results', 'الوقت التوقف بعد إعلان النتائج'],
        inputName: 'downtime',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['The authority shall specify that the suspension period shall not be less than (five) working days and not more than (ten) working days.', 'تحدد الجهة الا تقل فترة التوقف عن (خمسة) أيام عمل ولا تزيد عن (عشرة) ايام عمل '],
        pageNumber: 20
    },
    {
        name: ['Final guarantee percentage', 'نسبة الضمان النهائي'],
        inputName: 'finalGuaranteePercentage',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['Taking into account what is stated in Paragraph (1) of Article (Sixty-One) of the System, the government agency may raise the percentage of the final guarantee by more than (5%) of the contract value if it deems that it is in the interest of competition to do so; provided that the prior approval of the Ministry of Finance is obtained for that before offering the works, and that the percentage of that final guarantee is stated in the competition documents.', 'مع مراعاة ما ورد في الفقرة (1) من المادة (الحادية والستين) من النظام، يجوز للجهة الحكومية رفع نسبة الضمان النهائي بما يتجاوز (5%( من قيمة العقد إذا رأت أن من مصلحة المنافسة الأخذ بذلك؛ شريطة أخذ موافقة وزارة المالية المسبقة على ذلك قبل طرح الأعمال، وأن ينص على نسبة الضمان النهائي تلك في وثائق المنافسة.'],
        pageNumber: 21
    },
    {
        name: ['Final guarantee days', 'مدة الضمان النهائي بالأيام'],
        inputName: 'finalGuaranteeDays',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['Addition', 'إضافة'],
        pageNumber: 21
    },
    {
        name: ['Outside of Kingdom of Saudi Arabia', 'الأعمال والمشتريات التي تم تنفيذها خارج المملكة العربية السعودية'],
        inputName: 'outsideOfKingdomOfSaudiArabia',
        data: {
            value: 'الأعمال والمشتريات التي تنفذ خارج المملكة العربية السعودية.'
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['The government agency that implements its work or secures its purchases outside the Kingdom of Saudi Arabia must add or delete this paragraph as it deems appropriate, with the agency being obligated, in the event that the paragraph is added, to specify an alternative to ensure the quality of project implementation as much as practically possible, in accordance with the procedure in effect in the country.', 'على الجهة الحكومية التي تقوم بتنفيذ أعمالها أو تأمين مشترياتها خارج المملكة العربية السعودية إضافة هذه الفقرة أو حذفها بحسب ما تراه محققًا للمصلحة، مع التزام الجهة في حالة إضافة الفقرة بتحديد البديل لضمان جودة تنفيذ أعمال المشروع قدر الإمكان عملياً وذلك حسب الإجراء المعمول به في الدولة.'],
        pageNumber: 21
    },
    {
        name: ['Fines', 'الغرامات'],
        inputName: 'finesList',
        data: {
            value: []
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['Note: Here the government entity mentions the amount of fines that may be imposed on the contractor to cover all aspects of default, such as delay in implementation, and the fines are graded in their application to ensure there is a balance between the fine and the degree of default, whether it is a fixed amount, a percentage of the value of the item that was not implemented or implemented in violation of the agreement, or any other method consistent with the nature of the item that was not implemented, and the value of the works and items that were not implemented or implemented in violation of the agreement, up to the value of the contract, is deducted from the value of the contract as unsecured items. The government entity also has the right to increase the ceiling of the fine after obtaining the approval of the Minister of Finance, as long as the increase is disclosed to the competitors before submitting their offers.', 'ملاحظة: هنا تدون الجهة الحكومية مقدار الغرامات التي قد تفرضها على المتعاقد بحيث تغطي الغرامة جوانب التقصير كافة، أو التأخير في التنفيذ، وتتدرج في التطبيق؛ بحيث يكون هناك تناسب في الغرامة مع درجة المخالفة سواء كانت بمبلغ مقطوع، أو بنسبة محددة من قيمة البند المقصر في تنفيذه، أو بأسلوب آخر يتواءم مع طبيعة البند المقصر في تنفيذه، وإضافة إلى حسم الغرامة، يتم حسم قيمة الأعمال و البنود غير المنفذة، أو التي نفذت خلافًا لما تم الاتفاق عليه، مهما بلغت قيمتها إلى قيمة العقد ، باعتبارها بنودًا غير مؤمنة كما يحق للجهة الحكومية زيادة سقف الغرامة بعد الحصول على موافقة وزير المالية على أن توضح تلك الزيادة للمتنافسين قبل تقديم عروضهم.'],
        pageNumber: 21
    },
    {
        name: ['Delayment Fines', 'غرامات التأخير'],
        inputName: 'delaymentFines',
        data: {
            value: []
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['Here is the formula and method for calculating fines.', 'هنا تدون صيغة وأسلوب احتساب الغرامات'],
        pageNumber: 22
    },
    {
        name: ['Fine Percentage', 'نسبة إجمالي الغرامة المنصوص عليها في هذا البند'],
        inputName: 'fines',
        data: {
            value: null,
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 22
    },
    {
        name: ['Fines (national product quota)', 'غرامات مخالفة أحكام لائحة تفضيل المحتوى المحلي'],
        inputName: 'finesNationalProductQuota',
        data: {
            value: "عند عدم التزام المتعاقد بحصة المنتجات الوطنية فسيتم إيقاع غرامة مالية وفقاً لملحق الشروط والأحكام الخاص بـآلية التفضيل السعري للمنتج الوطني.",
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['Note: The government agency has the right to delete this paragraph if the scope of work does not include national products subject to the national product price preference mechanism.', 'ملاحظة: يحق للجهة الحكومية حذف هذه الفقرة في حال عدم اشتمال نطاق العمل على منتجات وطنية خاضعة لآلية التفضيل السعري للمنتج الوطني.'],
        pageNumber: 22
    },
    {
        name: ['Fines (local content percentage)', 'نسبة الغرامة عند مخالفة أحكام لائحة تفضيل المحتوى المحلي'],
        inputName: 'finesLocalContentPercentage',
        data: {
            value: 'عند عدم التزام المتعاقد بنسبة المحتوى المحلي المستهدفة، فسيتم إيقاع غرامة مالية تصل إلى 10% من قيمة العقد وفقًا لملحق الشروط والأحكام الخاص بـالآلية المطبقة.',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['Note: The government agency has the right to delete this paragraph if the project does not include a mechanism for weighing local content in the financial evaluation or a mechanism for the minimum required local content.', 'ملاحظة: يحق للجهة الحكومية حذف هذه الفقرة في حال عدم اشتمال المشروع على آلية وزن المحتوى المحلي في التقييم المالي أو آلية الحد الأدنى المطلوب للمحتوى المحلي'],
        pageNumber: 22
    },
    {
        name: ['Insurance', 'قائمة شروط التأمين'],
        inputName: 'insuranceList',
        data: {
            value: []
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['The government agency may add the insurance coverage requirements required in this paragraph.', 'يمكن للجهة الحكومية إضافة اشتراطات تغطية التأمين المطلوبة في هذه الفقرة'],
        pageNumber: 22
    },
    {
        name: ['Project Scope of Work', 'نطاق عمل المشروع'],
        inputName: 'projectScopeOfWork',
        data: {
            value: [
                "تصميم وتطوير نظام إلكتروني لمتابعة تدريب منسوبي الوزارة بحيث يحقق المتطلبات الآتية:",
                "توفير الأعمال الإلكترونية التالية للمستخدمين:",
                "توريد أجهزة استقبال شبكي.",
                "توريد قطع غيار للحاسبات الآلية الخاصة بالجهة الحكومية.",
                "تطوير منظومة الأمن الرقمي [السيبراني] للجهة الحكومية من خلال التالي:",
            ],
            children: [
                {
                    value: "تصميم وتطوير نظام إلكتروني لمتابعة تدريب منسوبي الوزارة بحيث يحقق المتطلبات الآتية:",
                    children: {
                        value: [
                            "‌تصميم واجهات النظام وفق أحدث المعايير القياسية المتبعة، وبحيث تدعم اللغة العربية بالإضافة إلى اللغة الإنجليزية.",
                            "إدارة مجموعات المستخدمين وأدوارهم في النظام والصلاحيات المسندة إليهم.",
                            "إنشاء مساحة عمل خاصة بكل مستخدم من مستخدمي النظام يمكنه من خلالها القيام بالأعمال والمهام المسندة إليه."
                        ]
                    }
                },
                {
                    value: "توفير الأعمال الإلكترونية التالية للمستخدمين:",
                    children: {
                        value: [
                            "‌تسجيل المتدربين على النظام الإلكتروني.",
                            "‌تقرير شهري عن الحضور.",
                            "‌إرسال رد على تقارير المشاكل التقنية التي تواجه المستخدمين، في حال وجودها."
                        ]
                    }
                },
                {
                    value: "تطوير منظومة الأمن الرقمي [السيبراني] للجهة الحكومية من خلال التالي:",
                    children: {
                        value: [
                            "‌تقييم الوضع الراهن للأمن الرقمي ",
                            "‌وضع خطة استراتجية رقمية",
                            "‌وضع خطة لتأهيل الكوادر البشرية"
                        ],
                        children: [
                            {
                                value: "‌تقييم الوضع الراهن للأمن الرقمي ",
                                children: {
                                    value: [
                                        "تحليل وتقييم محاولات الاختراق أو تعطيل المنظومة الرقمية للجهة الحكومية.",
                                        "تحديد الثغرات ونقاط الضعف سواء الإلكترونية أو الناتجة عن أخطاء بشرية."
                                    ]
                                }
                            },
                            {
                                value: "‌وضع خطة استراتجية رقمية",
                                children: {
                                    value: [
                                        "خطة لتحديث أنظمة التشغيل والأجهزة.",
                                        "خطة تحديث استضافات المواقع الرقمية وشهادات الأمان الخاصة بها.",
                                        "خطة تشفير الاتصالات ونقل البيانات باستخدام بروتوكل HTTPS ومفاتيح التشفير ند لـند.",
                                        "تقييم جدوى وكلفة وأمان استعمال برامج إنشاء كلمات المرور مثل 1Password.",
                                        "خطة تحديث استضافات خدمات التخزين السحابية.",
                                        "خطة تحديث أنظمة وأجهزة الخزن الاحتياطي للبيانات.",
                                        "تقييم جدوى وكلفة وأمان استعمال البرامج مفتوحة المصدر."
                                    ]
                                }
                            },
                            {
                                value: "‌وضع خطة لتأهيل الكوادر البشرية",
                                children: {
                                    value: [
                                        "تحليل بيانات الاستخدام والاختراقات والتعطلات للسنتين السابقتين لتحديد أهم نقاط ضعف العنصر البشري التي تشكل خطراً على منظومة الأمن الرقمي.",
                                        "تخطيط وتصميم دورة تدريبية عن المبادئ الأساسية للأمن الرقمي لكافة موظفي للجهة الحكومية.",
                                        "تخطيط وتصميم دورة تدريبية لتأهيل وتدريب ضابط أمن إلكتروني متخصص في كل إدارة."
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['This paragraph explains the scope of work for the project and the details that must be taken into account when providing the service from the contractor. An example of this is shown below', 'في هذه الفقرة يتم توضيح نطاق العمل الخاص بالمشروع والتفاصيل التي يجب مراعاتها عند تقديم الخدمة من المتعاقد. وفيما يلي، مثال على ذلك'],
        pageNumber: 23
    },
    {
        name: ['Period of implementation of the work programme', 'فترة تنفيذ برنامج العمل'],
        inputName: 'periodOfImplementationOfWorkProgramme',
        data: {
            value: 'يلتزم المتعاقد في تنفيذ نطاق الأعمال خلال مدة ستة (6) أسابيع من تاريخ الترسية.',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 23
    },
    {
        name: ['Work Programme', 'برنامج العمل'],
        inputName: 'workProgramme',
        data: {
            value: ['مرحلة تطوير نظام إلكتروني للتدريب', 'مرحلة الدعم الفني'],
            children: [
                {
                    value: 'مرحلة تطوير نظام إلكتروني للتدريب',
                    children: {
                        value: [
                            "توفير دليل استخدام للموظفين والتدريب اللازم لشرح جميع تفاصيل استعمال النظام الجديد.",
                            "تدريب شخصي في مقر الجهة للموظفين لمدة 3 أيام عمل."
                        ]
                    }
                },
                {
                    value: 'مرحلة الدعم الفني',
                    children: {
                        value: [
                            'تقديم الدعم الفني من بداية المشروع حتى الانتهاء وتسليم الأعمال.',
                            'تقديم الصيانة اللازمة للمعدات الإلكترونية في حال وجود مشاكل في الأداء أو ما شابه.'
                        ]
                    }
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['This paragraph explains the project\'s work schedule, detailing the implementation phases and actual completion times. The government agency also requests a plan for distributing the contractor\'s employees and labor throughout the project phases and a timeline for that. The following is an example of this', 'في هذه الفقرة يتم توضيح برنامج العمل الخاص بالمشروع من خلال تفصيل مراحل التنفيذ والأوقات الفعلية لإكمال الأعمال كما تقوم الجهة الحكومية بطلب خطة توزيع موظفي وعمالة المتعاقد خلال مراحل المشروع والجدول الزمني لذلك. وفيما يلي مثال على ذلك'],
        pageNumber: 23
    },
    {
        name: ['Place of work', 'مكان تنفيذ الأعمال'],
        inputName: 'placeOfWork',
        data: {
            value: 'تطوير منظومة الأمن الرقمي السيبراني للجهة الحكومية في موقع الوزارة الرسمي في منطقة جدة',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['This section provides information and details about the site where the work will be performed, as well as whether plans, drawings, and the like will be provided. An example is below', 'في هذه الفقرة يتم توضيح معلومات وتفاصيل الموقع الذي سيتم فيه العمل بالإضافة إلى توضيح ما إذا كان سيتم توفير مخططات ورسومات وما شابه. وفيما يلي مثال على ذلك'],
        pageNumber: 23
    },
    {
        name: ['Training and Knowledge Transfer', 'التدريب ونقل المعرفة'],
        inputName: 'trainingAndKnowledgeTransfer',
        data: {
            value: 'يلتزم المتعاقد بتدريب فريق عمل الجهة الحكومية ونقل المعرفة والخبرة لموظفيها بكافة الوسائل الممكنة ومن ذلك [ التدريب على رأس العمل / العمل جنبًا إلى جنب معهم / ورش العمل التدريبية]، وذلك بما يكفل حصولهم على المعرفة والخبرة اللازمة لمخرجات المشروع.',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['The government agency will delete this item if there is no transfer of knowledge, experience and training.', 'تقوم الجهة الحكومية بحذف هذا البند في حال عدم وجود نقل للمعرفة والخبرة والتدريب'],
        pageNumber: 23
    },
    {
        name: ['Building Government Software', 'بناء البرمجيات الحكومية'],
        inputName: 'buildingGovernmentSoftware',
        data: {
            value: 'يلتزم المتنافس -عند التعاقد لبناء البرمجيات الحكومية- بالفقرة (ه) من قواعد تنظيم البرمجيات الحكومية الحرة ومفتوحة المصدر الصادرة بموجب قرار مجلس الوزراء رقم (14) وتاريخ 2/1/1443هـ، وجميع الأوامر والقرارات والأنظمة والتعليمات الصادرة في هذا الشأن.',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['Note: To maintain this clause, the government entity must aim, through this brochure or part of it, to oblige the competitor to build government software.', 'ملاحظة: يشترط لابقاء هذا البند بأن تهدف الجهة الحكومية من هذه الكراسة أو في جزء منها بإلزام المتنافس ببناء البرمجيات الحكومية'],
        pageNumber: 23
    },
    {
        name: ['Quantity and price table', 'جدول الكميات والأسعار'],
        inputName: 'quantityAndPriceTable',
        data: {
            value: '',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.DynamicTable,
        description: ['This paragraph specifies the quantities, materials, equipment, and other supplies/works and services that will be used in the project, with a statement of the products included in the mandatory list. The statement should include the name of the sector, the name of the product, the product code, the product description, and the extent to which the local content certificate is required for the product’s factory (baseline), and specify the country of origin for other products (attach the prepared tables).', 'في هذه الفقرة يتم توضيح جداول الكميات والمواد والمعدات وغيرها من التوريدات/الأعمال والخدمات التي سيتم استخدامها في المشروع، مع بيان المنتجات المدرجة ضمن القائمة الإلزامية على أن يشتمل البيان على اسم القطاع، اسم المنتج، رمز المنتج، وصف المنتج ومدى اشتراط شهادة المحتوى المحلي لمصنع المنتج (خط الأساس)، وتحديد بلد المنشأ للمنتجات الأخرى (ترفق الجداول المعدة)'],
        pageNumber: 23
    },
    {
        name: ['Labor', 'فريق العمل - الشروط الخاصة بفريق العمل'],
        inputName: 'labor',
        data: {
            value: [
                'يجب على المتعاقد أن يتخذ الترتيبات الخاصة لاستخدام الموظفين ومعاملتهم -مواطنين كانوا أو أجانب- وفقًا لأحكام نظام العمل ونظام التأمينات الاجتماعية والأنظمة الأخرى ذات العلاقة.',
                'يجب على المتعاقد الالتزام بدفع أتعاب العمالة ومراقبة حالة العمل على ألا تكون أقل من المتعارف عليه في القطاع أو نوع الخدمة الذي ينفذ فيه العمل.',
                'يجب على المتعاقد في جميع الأوقات اتخاذ جميع الاحتياطات اللازمة؛ للحفاظ على صحة موظفيه وسلامتهم. وتعيين مسؤول؛ للحفاظ على السلامة والوقاية من الحوادث داخل الموقع، وتكون له سلطة إصدار التعليمات واتخاذ التَّدابير الوقائية لمنع وقوع الحوادث، ويجب على المتعاقد إرسال تفاصيل أي حادث إلى ممثل الجهة في أقرب وقت ممكن بعد وقوعه. يجب على المتعاقد الاحتفاظ بالسجلات وتقديم تقارير بشأن صحة وسلامة العمال والأضرار التي لحقت بالممتلكات. يجب على المتعاقد القيام ببرامج توعوية عن الأمراض واتخاذ التَّدابير الأخرى اللازمة؛ للحد من مخاطر انتقالها بين موظفيه.',
                'باستثناء ما قد ينص عليه العقد فيما بعد، لا يجوز القيام بتنفيذ العمل أثناء الليل أو خلال أيام الجمع، أو أيام الإجازات الرسمية الأخرى بدون إذن مكتوب من الجهة الحكومية أو ممثل الجهة إلا إذا كان العمل ضروريًّا أو لا يمكن الاستغناء عنه مطلقًا من أجل إنقاذ الأرواح أو الممتلكات أو من أجل ضمان سلامة الأعمال، على أن يخطر المتعاقد في مثل هذه الحالة الجهة الحكومية أو ممثل الجهة فورًا، ويُراعى دائمًا أن أحكام هذه الفقرة لا تكون واجبة التَّطبيق في الحالات التي يكون فيها من المعتاد تنفيذ العمل بالتناوب أو على فترتين.',
                'يجب على المتعاقد توفير القوى العاملة ذات الخبرة اللازمة بناءً على المؤهلات المطلوبة لكل وظيفة موضحة في جدول مواصفات العمالة، وللجهة الحكومية حق الموافقة على قبول السعوديين في الوظائف المستهدفة في حال توفر الحد الأدنى من المؤهلات اللازمة لشغل الوظيفة.',
                'يجب على المتعاقد تزويد الجهة الحكومية بسجلات مفصلة لموظفيه مصنفين حسب المهارات؛ حيث يتم تقديم هذه السجلات إلى ممثل الجهة شهريًّا، باستعمال النماذج التي يوافق عليها ممثل الجهة، وذلك إلى أن ينجز المتعاقد الأعمال المطلوبة.',
                'يجب على المتعاقد تزويد الجهة الحكومية بسجلات مفصلة لفريق عمله مصنفين حسب المهارات.',
                'يجب على المتعاقد التأكد من أن جميع المهندسين والفنيين والعاملين بالموقع بما في ذلك الجهاز الفني التنفيذي على كفالته أو كفالة المتعاقد من الباطن المتفق عليهم في هذا العقد. ويجب كذلك وجود عقد عمل رسمي لجميع العاملين معتمد من الجهة الحكومية. يحق للجهة طلب نقل كفالة عمالة المتعاقد (العمال، الفنيين، والمشرفين) التي تعمل مباشرة لدى الجهة الحكومية إلى المتعاقد الجديد وذلك لضمان جودة تنفيذ الأعمال.',
                'يلتزم المتعاقد باستخراج الإقامات اللازمة للموظفين حسب الإجراءات النظامية وفقاً للأنظمة المعمول بها في المملكة.',
                'يلتزم المتعاقد بتأمين الموظفين حسب المسمى الوظيفي والمؤهلات والخبرة المبينة بالجدول التالي [جدول مواصفات فريق العمل].',
                'يلتزم المتعاقد بتخصيص موظفات للعمل في الأقسام النسائية أو المواقع التي تتطلب ذلك.'
            ],
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['Note: The government entity shall amend and add articles according to the scope of work and the nature of the contract, and the government entity shall include the orders and decisions related to this matter. The government entity shall add the requirements of the Localization Guide for Operation and Maintenance Contracts (Localization percentages and minimum wages) in the event that a computer operation and maintenance service is provided.', 'ملاحظة: تقوم الجهة الحكومية بتعديل وإضافة المواد حسب نطاق العمل وطبيعة العقد، وعلى الجهة الحكومية تضمين الأوامر والقرارات المتصلة بهذا الشأن، على الجهة الحكومية إضافة متطلبات دليل توطين عقود التشغيل والصيانة (نسب التوطين والحد الأدنى للأجور) في حال تقديم خدمة تشغيل وصيانة الحاسب الآلي'],
        pageNumber: 24
    },
    {
        name: ['Labor Specification Table', 'جدول مواصفات فريق العمل'],
        inputName: 'laborTable',
        data: {
            value: ["الرقم", "مسمى الوظيفة", "أقل مؤهل للقبول", "الحد الأدنى لسنوات الخبرة"],
            children: [
                {
                    value: "الرقم",
                    children: {
                        value: []
                    }
                },
                {
                    value: "مسمى الوظيفة",
                    children: {
                        value: []
                    }
                },
                {
                    value: "أقل مؤهل للقبول",
                    children: {
                        value: []
                    }
                },
                {
                    value: "الحد الأدنى لسنوات الخبرة",
                    children: {
                        value: []
                    }
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Table,
        description: ['', ''],
        pageNumber: 24
    },
    {
        name: ['Materials', 'الأصناف والمواد'],
        inputName: 'materials',
        data: {
            value: 'يقيم المتعاقد المواد المستخدمة في تنفيذ الأعمال للتأكد من مطابقتها لمواصفات العرض والمقاييس العالمية كما يطلع على نتائج الاختبارات المعمولة للمواد وإعطاء الموافقة (أو عدمها) عليها وتسجيلها والاحتفاظ بنسخة منها، ويجب كذلك أن 	تكون المواد المستخدمة سواء المحلية أو المستوردة لتنفيذ العقد مطابقة للمواصفات القياسية السعودية وما لم تشمله منها هذه المواصفات فيجب أن يكون مطابقة لإحدى المواصفات العالمية المعروفة والتي تحددها الجهة أو من يمثلها. \n ويجوز لممثل الجهة أن يطلب من المتعاقد إعداد بيان واضح ومفصل عن ماهية المواد المستخدمة وعن كل مادة على حدة يرى ممثل الجهة ضرورة استبيانها، وعلى المتعاقد إعداد ذلك البيان كتابةً خلال فترة (10) عشرة أيام من تاريخ طلبها. \n وإذا أخل المتعاقد بتوضيح ماهية المواد المستخدمة في الموعد المحدد فتعتبر تلك المواد خلاف ما تم الاتفاق عليه بالعقد، ولممثل الجهة اتخاذ ما يلزم حسب تقديره من تعليمات أو إجراءات لمعالجة ذلك.',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 24
    },
    {
        name: ['Material Specification Table', 'جدول مواصفات المواد'],
        inputName: 'materialsTable',
        data: {
            value: ["الرقم", "المادة", "المواصفات", "وحدة القياس"],
            children: [
                {
                    value: "الرقم",
                    children: {
                        value: []
                    }
                },
                {
                    value: "المادة",
                    children: {
                        value: []
                    }
                },
                {
                    value: "المواصفات",
                    children: {
                        value: []
                    }
                },
                {
                    value: "وحدة القياس",
                    children: {
                        value: []
                    }
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Table,
        description: ['The government agency determines the required materials.', 'تحدد الجهة الحكومية المواد المطلوبة'],
        pageNumber: 24
    },
    {
        name: ['Equipment Terms', 'المعدات - الشروط الخاصة بالمعدات'],
        inputName: 'equipment',
        data: {
            value: 'ويفحص المتعاقد جميع المعدات ويوصي باعتمادها في حال كانت مطابقة من جميع النواحي للمواصفات والمقاييس العالمية كما يجب عليه فحص جميع شهادات اختبار هذه المعدات التي أجريت في المصنع ومراقبة وتصديق اختباراتها في الموقع أو مكان الصنع وفي جميع الحالات التي تنص فيها شروط توريد المعدات أو المقاييس العالمية على إجراء هذه الاختبارات كما يجب عليه أن يحتفظ بشهادات الاختبارات التي تجري بهذا الخصوص ويجوز إعادة الاختبارات لمرة واحدة فقط.',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 24
    },
    {
        name: ['Equipment Table', 'جدول مواصفات المعدات'],
        inputName: 'equipmentTable',
        data: {
            value: ["الرقم", "الآلة", "المواصفات", "وحدة القياس"],
            children: [
                {
                    value: "الرقم",
                    children: {
                        value: []
                    }
                },
                {
                    value: "الآلة",
                    children: {
                        value: []
                    }
                },
                {
                    value: "المواصفات",
                    children: {
                        value: []
                    }
                },
                {
                    value: "وحدة القياس",
                    children: {
                        value: []
                    }
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Table,
        description: ['The government agency determines the required equipment.', 'تحدد الجهة الحكومية المعدات المطلوبة'],
        pageNumber: 24
    },
    {
        name: ['How to perform business and services', 'طريقة تنفيذ الأعمال والخدمات'],
        inputName: 'howToPerformBusinessAndServices',
        data: {
            value: [],
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.RowsTable,
        description: ['This paragraph explains the method of implementing works and services, and examples of this include:', 'يتم في هذه الفقرة توضيح طريقة تنفيذ الاعمال والخدمات ومن الامثلة على ذلك '],
        pageNumber: 25
    },
    {
        name: ['Quality Specifications', 'مواصفات الجودة'],
        inputName: 'qualitySpecifications',
        data: {
            value: [
                "شهادة أيزو (ISO) سارية أو دليل ضمان الجودة الذي يحدّد نظام إدارة الجودة المؤسسي لدى المتعاقد.",
                "خطة ضمان أو ضبط الجودة"
            ],
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['In this paragraph, the government agency clarifies all the quality conditions and specifications required from the contractor, including specific certificates and standards such as ISO and others.', 'في هذه الفقرة تقوم الجهة الحكومية بتوضيح جميع شروط ومواصفات الجودة المطلوبة من المتعاقد من شهادات ومعايير محددة مثل ISO وغيرها'],
        pageNumber: 25
    },
    {
        name: ['Preference for national products.', 'تفضيل المنتجات الوطنية'],
        inputName: 'preferenceForNationalProducts',
        data: {
            value: [
                'يُمنح المنتج الوطني –غير المدرج ضمن القائمة الإلزامية- تفضيل سعري بافتراض سعر المنتج الأجنبي أعلى بنسبة (10%) مما هو مذكور في وثائق العرض، كما تُمنح المنتجات الخاضعة للتفضيل السعري الإضافي –إن وجدت- أفضلية سعرية بحسب ما هو مقرر لها.',
                'يلتزم مقدم العرض في منافسات التوريد أو المنافسات المختلطة المشتملة على بنود توريد بأن يضمن في عرضه حصة المنتجات الوطنية كما يلتزم بتضمين جدول الكميات ما إذا كانت المنتجات الموردة وطنية أو أجنبية، وفي حال لم يتضمن العرض على حصة المنتجات الوطنية وبيان ما إذا كانت المنتجات وطنية أو أجنبية في جدول الكميات، فسيتم اعتبار المنتجات منتجات أجنبية ولا تخضع للتفضيل السعري أثناء تقييم العروض. علماً بأن حصة المنتجات الوطنية تعرف بأنها نسبة قيمة المنتجات الوطنية التي يلتزم المتنافس بتوريدها مقارنة بإجمالي قيمة العرض، ولا يدخل في ذلك المنتجات الواردة في القائمة الإلزامية.',
                'إذا لم يلتزم المتعاقد -في نهاية العقد- بالوفاء بحصة المنتجات الوطنية المقدمة ضمن عرضه، فسيتم تضمين ذلك في تقييم أداء المتعاقد وسيكون معرضاً للغرامات والعقوبات وفقاً لما هو وارد في الملحق الخاص بآلية التفضيل السعري للمنتج الوطني.',
                'لغرض تطبيق الغرامات والعقوبات فإن العبرة تكون بحصة المنتجات الوطنية.',
                'عند فتح العرض سيتم مطابقة حصة المنتجات الوطنية المقدمة في العرض ومقارنتها بجداول الكميات والأسعار المقدمة من المتنافس في ذات العرض. وفي حال وجد اختلاف بينهما، فسيتم الأخذ بالحصة الأقل بحيث تكون هذه الحصة هي التي يُعتد بها عند إعطاء الأفضلية للمنتج الوطني أو تقييم التزام المتعاقد.'
            ],
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['', ''],
        pageNumber: 26
    },
    {
        name: ['Local Content Weighting & Threshold Criteria', 'معايير وزن المحتوى المحلي والحد الأدنى'],
        inputName: 'localContentWeightingAndThresholdCriteria',
        data: {
            value: 'اشتراطات آلية وزن المحتوى المحلي في التقييم المالي/ آلية الحد الأدنى المطلوب للمحتوى المحلي.',
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.Text,
        description: ['', ''],
        pageNumber: 26
    },
    {
        name: ['Requirements for local content mechanisms', 'اشتراطات آليات المحتوى المحلي (نسبة المحتوى المحلي'],
        inputName: 'requirementsForLocalContentMechanisms',
        data: {
            value: 'نعم. تنطبق على آلية وزن المحتوى الوطني',
            children: [
                {
                    value: 'نعم. تنطبق على آلية وزن المحتوى الوطني',
                    children: {
                        value: [
                            'خط الأساس للمحتوى المحلي المطلوب في هذه المنافسة هو (....)%، والذي يجب على المتنافس تقديم خط أساس في عرضه لا يقل عنه ليتمكن من اجتياز التقييم الفني وفق الشروط والأحكام الملحقة بهذه الكراسة.',
                            'الحد الأدنى المطلوب للمحتوى المحلي في هذه المنافسة هو (....)%، والذي يجب على المتنافس الالتزام به أثناء تقديم نسبة المحتوى المحلي المستهدفة في العقد وفق الشروط والأحكام الملحقة بهذه الكراسة.',
                            'يجوز للمتنافس تقديم خط الأساس للمحتوى المحلي في هذه المنافسة والذي سيكون جزء من معايير التقييم المالي للعروض وفق الشروط والأحكام الملحقة بهذه الكراسة.',
                            'يلتزم المتنافس بتقديم نسبة المحتوى المحلي المستهدفة وفق الشروط والأحكام الملحقة بهذه الكراسة.'
                        ],
                    },
                    type: BookletInputTypesEnum.List
                },
                {
                    value: 'لا تنطبق آلية وزن المحتوى المحلي في التقييم المالي أو آلية الحد الأدنى المطلوب للمحتوى المحلي على العقد.',
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.RadioWithValues,
        description: ['Does the competition include a mechanism for weighing national content in the financial evaluation or a mechanism for the minimum required national content?', 'هل المنافسة تشمل آلية وزن المحتوى الوطني في التقييم المالي او آلية الحد الادنى المطلوب للمحتوى الوطني ؟'],
        pageNumber: 26
    },
    {
        name: ['Economic Participation Program Requirements', 'متطلبات برنامج المشاركة الاقتصادية (التوازن الاقتصادي)'],
        inputName: 'economicParticipationProgramRequirements',
        data: {
            value: 'نعم التكلفة التقديرية أقل من 100 مليون',
            children: [
                {
                    value: 'نعم التكلفة التقديرية أقل من 100 مليون',
                },
                {
                    value: 'لا  التكلفة التقديرية أعلى من 100 مليون',
                    children: {
                        value: [
                            'عرض المشاركة الاقتصادية.',
                            'نموذج التعهد الخاص بالمشاركة الاقتصادية موقع ومختوماً بختم مقدمه.'
                        ],
                    },
                    type: BookletInputTypesEnum.List
                }
            ]
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.RadioWithValues,
        description: ['Is the estimated cost less than 100 million Saudi riyals?', 'هل التكلفة التقديرية اقل من 100 مليون ريال سعودي؟'],
        pageNumber: 27
    },
    {
        name: ['Special Terms', 'الشروط الخاصة'],
        inputName: 'specialTerms',
        data: {
            value: [],
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.List,
        description: ['The government agency adds the special conditions it deems appropriate according to the scope of work.', 'تضيف الجهة الحكومية الشروط الخاصة التي تراها مناسبة بحسب نطاق العمل'],
        pageNumber: 28
    },
    {
        name: ['Logo of Organization', 'شعار الجهة'],
        inputName: 'logo',
        data: {
            value: [],
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.SingleUpload,
        description: ['', ''],
        pageNumber: 0
    },
    {
        name: ['Attachments', 'الملحقات'],
        inputName: 'attachments',
        data: {
            value: [],
        },
        status: BookletTaskStatusesEnum.Pending,
        type: BookletTaskTypesEnum.Add,
        inputType: BookletInputTypesEnum.MultiUpload,
        description: ['', ''],
        pageNumber: 0
    },
]
