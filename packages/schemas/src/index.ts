import { z, ZodType, type ZodTypeDef } from 'zod';
const phoneRegex = /^$|^\+?[1-9]\d{1,14}$/;

export const userSchema = z.object({
    name: z.string({ required_error: "Name is required" }).max(100).nonempty("Name is required").min(3, "Name must be at least 3 characters"),
    phone: z.string({ required_error: "Phone number is required" }).max(20).refine(
        (val) => val === "" || phoneRegex.test(val),
        { message: "Phone number should start with country code (e.g. +123456789)." }
    ),
    email: z.string({ required_error: "Email is required" }).email("Invalid email").max(50),
    password: z.string({ required_error: "Password is required" }).min(6).max(42),
    organizationName: z.string({ required_error: "Organization Name is required" }).max(100),
    userType: z.enum(["individual", "organization"]),
    confirmPassword: z.string({ required_error: "Confirm Password is required" }).min(6).max(42),
}).superRefine((data, ctx) => {
    if (data.userType === "organization" && (!data.organizationName?.trim() || data.organizationName?.trim().length < 3)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Organization Name must be at least 3 characters",
            path: ["organizationName"],
        });
    }
});

export type UserData = z.infer<typeof userSchema>;

export const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginData = z.infer<typeof loginSchema>

export enum BookletCategoriesEnum {
    HS = "Healthcare Services",
    IT = "Information Technology",
    UP = "Urban Planning",
    EDU = "Education",
    MRH = "Municipal, Rural Affairs and Housing",
    IMR = "Industry and Mineral Resources",
    EWA = "Environment, Water and Agriculture",
}

export enum BookletCitiesEnum {
    Jeddah = "Jeddah",
    Riyadh = "Riyadh",
    Mecca = "Mecca",
    Madina = "Madina",
    Dammam = "Dammam",
    Abha = "Abha",
    Taif = "Taif",
}

export enum BookletCitiesArabicEnum {
    Jeddah = "جدة",
    Riyadh = "الرياض",
    Mecca = "مكة",
    Madina = "المدينة المنورة",
    Dammam = "الدمام",
    Abha = "أبها",
    Taif = "الطائف",
}

export enum BookletTaskStatusesEnum {
    Pending = "Pending",
    Completed = "Completed",
    InProgress = "In Progress"
}

export enum BookletTaskTypesEnum {
    Add = "Add",
    Update = "Change & Edit",
    Attachment = "Attachment",
    Decision = "Decision",
}

export enum PaymentTypesEnum {
    CertifiedCheque = "certified cheque",
    BankTransfer = "bank transfer",
    Other = "other"
}

export enum BookletInputTypesEnum {
    Text = "text",
    Readonly = "readonly",
    Number = "number",
    Date = "date",
    Select = "select",
    Radio = "radio",
    Checkbox = "checkbox",
    TextArea = "textarea",
    File = "file",
    Email = "email",
    Phone = "phone",
    Url = "url",
    Password = "password",
    Price = "price",
    List = "list",
    Table = "table",
    DynamicTable = "dynamic-table",
    NestedList = "nested-list",
    MultiUpload = "multi-upload"
}

export const baseValueSchema = z.object({
    value: z.string().or(z.array(z.string())).nullable(),
    type: z.nativeEnum(BookletInputTypesEnum).default(BookletInputTypesEnum.Text),
});

export interface ValueSchema {
    value: string | string[] | null;
    type?: BookletInputTypesEnum;
    children?: ValueSchema | ValueSchema[];
}

export const valueSchema: ZodType<ValueSchema, ZodTypeDef> = z.lazy(() =>
    baseValueSchema.extend({
        children: valueSchema.or(z.array(valueSchema)).optional(),
    })
);

export const TableSchema = z.object({
    id: z.string(),
    tableName: z.string(),
    columns: z.array(z.string()),
    rows: z.array(z.array(z.string())),
    footerValues: z.array(z.string())
});

export const SummarySchema = z.object({
    total: z.number(),
    tax: z.number(),
    grandTotal: z.number()
});

export const RootSchema = z.object({
    tables: z.array(TableSchema),
    summary: SummarySchema
});

export const genaricBookletsTaskSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    inputName: z.string({ required_error: "Name is required" }),
    data: valueSchema,
    tableData: RootSchema.optional(),
    status: z.nativeEnum(BookletTaskStatusesEnum, { required_error: "Status is required" }).default(BookletTaskStatusesEnum.Pending),
    type: z.nativeEnum(BookletTaskTypesEnum, { required_error: "Task type is required" }).default(BookletTaskTypesEnum.Add),
    inputType: z.nativeEnum(BookletInputTypesEnum, { required_error: "Input type is required" }).default(BookletInputTypesEnum.Text),
    description: z.string({ required_error: "Description is required" }),
    pageNumber: z.number({ required_error: "Page number is required" })
})


export const bookletTasksSchema = z.array(genaricBookletsTaskSchema).optional();

export const bookletSchema = z.object({
    bookletType: z.enum(['internal', 'external'], { required_error: "Booklet Type is required" }),
    category: z.nativeEnum(BookletCategoriesEnum, { required_error: "Category is required" }),
    projectName: z.string({ required_error: "Project Name is required" }),
    bookletNumber: z.string({ required_error: "Booklet Number is required" }),
    issueDate: z.string({ required_error: "Issue Data is required" }),
    issueCity: z.nativeEnum(BookletCitiesEnum, { required_error: "Issue City is required" }),
    bookletTasks: bookletTasksSchema,
});

export type Booklet = z.infer<typeof bookletSchema>;
export type BookletTasks = z.infer<typeof bookletTasksSchema>;
export type GenaricBookletsTask = z.infer<typeof genaricBookletsTaskSchema>;
export type TaskValue = z.infer<typeof valueSchema>;
