'use client';
import { BookletCategoriesEnum, BookletCitiesArabicEnum, BookletCitiesEnum } from '@schemas/index';
import { createContext, useContext, useEffect, useState } from 'react';

const EN = {
    "LoginPage": {
        "title": "Welcome Back!",
        "subtitle": "Please enter your email and password to login.",
        "forgot": "Forgot Password?",
        "login": "Login",
        "logging": "Logging in...",
        "register": "Don't have an account?",
        "signUp": "Sign Up",
        "welocome": "Welcome to",
        "cms": "Contract Management System.",
        "manage": "Manage, track, and streamline your contracts with ease.",
        "start": "Let's get you started!",
        "email": "Email",
        "password": "Password"
    },
    "RegisterPage": {
        "title": "Welcome Back!",
        "name": "Name",
        "email": "Email",
        "password": "Password",
        "confirmPassword": "Confirm Password",
        "phone": "Phone",
        "organizationName": "Organization Name",
        "organization": "Organization",
        "individual": "Individual",
        "userType": "User Type",
        "register": "Register",
        "registering": "Registering...",
        "already": "Already have an account?",
        "login": "Login",
    },
    "Header": {
        "hello": "Hello",
        "logout": "Logout",
        "profile": "Profile",
    },
    "SideNav": {
        "booklets": "Booklets",
    },
    "NavHeader": {
        "create": "Create Booklet",
        "update": "Edit Booklet",
        "tasks": "Booklet Tasks",
        "view": "View Booklet",
        "perform": "Perform Booklet Task",
        "view-task": "View Booklet Task",
        "booklets": "Booklets",
        "preview": "Preview Booklet",
        "hide": "Hide Preview"
    },
    "CreateUpdataBookletForm": {
        "bookletType": "Booklet Type",
        "bookletCategory": "Booklet Category",
        "select": "Select Booklet Category",
        "projectName": "Bid/Project Name",
        "bookletNumber": "Booklet Number",
        "issueDate": "Issue Date",
        "selectDate": "Select Day & Date",
        "issueCity": "Issue City",
        "selectCity": "Select City",
        "create": "Create",
        "creating": "Creating",
        "update": "Update",
        "updating": "Updating",
        "cancel": "Cancel",
        "internal": "Internal",
        "external": "External",
        "description": "Description"
    },
    "BookletTable": {
        "category": "Category",
        "dateOfCreation": "Date of Creation",
        "projectName": "Project Name",
        "bookletNumber": "No.",
        "department": "Department",
        "actions": "Actions",
        "IT Department": "IT Department"
    },
    "BookletTasksTable": {
        "status": "Status",
        "taskName": "Task Name",
        "taskType": "Task Type",
        "actions": "Actions",
        "Pending": "Pending",
        "Completed": "Completed",
        "InProgress": "In Progress",
        "Add": "Add"
    },
    "SelectOptions": {
        [BookletCategoriesEnum.IT]: BookletCategoriesEnum.IT as string,
        [BookletCitiesEnum.Abha]: BookletCitiesEnum.Abha as string,
        [BookletCitiesEnum.Dammam]: BookletCitiesEnum.Dammam as string,
        [BookletCitiesEnum.Jeddah]: BookletCitiesEnum.Jeddah as string,
        [BookletCitiesEnum.Madina]: BookletCitiesEnum.Madina as string,
        [BookletCitiesEnum.Mecca]: BookletCitiesEnum.Mecca as string,
        [BookletCitiesEnum.Riyadh]: BookletCitiesEnum.Riyadh as string,
        [BookletCitiesEnum.Taif]: BookletCitiesEnum.Taif as string,
    },
    "TaskForm": {
        "submit": "Submit",
        "submitting": "Submitting",
        "next": "Next",
    },
    "DeleteDialog": {
        "title": "Are you sure?",
        "description": "This action cannot be undone. This will permanently delete this record.",
        "cancel": "Cancel",
        "continue": "Continue"
    },
    "ProfilePage": {
        "accountSetting": "Account Setting",
        "changePassword": "Change Password",
        "loggingOut": "Logging out...",
        "logout": "Logout",
    },
    "UserPasswordForm": {
        "currentPassword": "Current Password",
        "newPassword": "New Password",
        "confirmNewPassword": "Confirm New Password",
        "changePassword": "Change Password",
        "changePasswording": "Changing Password...",
        "cancel": "Cancel",
        "continue": "Continue"
    },
    "UserSettingForm": {
        "name": "Name",
        "email": "Email",
        "phone": "Phone",
        "update": "Update",
        "updating": "Updating",
        "cancel": "Cancel",
    },
    "RadioGroup": {
        "Other": "Other",
        "Cash": "Cash",
        "Certified Cheque": "Certified Cheque",
        "yes": "Yes",
        "no": "No"
    }
}

const AR = {
    "LoginPage": {
        "title": "مرحبًا بعودتك!",
        "subtitle": "يرجى إدخال بريدك الإلكتروني وكلمة المرور لتسجيل الدخول.",
        "forgot": "هل نسيت كلمة المرور؟",
        "login": "تسجيل الدخول",
        "logging": "جارٍ تسجيل الدخول...",
        "register": "ليس لديك حساب؟",
        "signUp": "إنشاء حساب",
        "welocome": "مرحبًا بك في",
        "cms": "نظام إدارة العقود.",
        "manage": "قم بإدارة وتتبع وتبسيط عقودك بسهولة.",
        "start": "لنبدأ الآن!",
        "email": "البريد الإلكتروني",
        "password": "كلمة المرور"
    },
    "RegisterPage": {
        "title": "مرحبًا بعودتك!",
        "name": "الاسم",
        "email": "البريد الإلكتروني",
        "password": "كلمة المرور",
        "confirmPassword": "تاكيد كلمة المرور",
        "phone": "رقم الجوال",
        "organizationName": "اسم المؤسسة",
        "organization": "مؤسسة",
        "individual": "فرد",
        "userType": "نوع المستخدم",
        "register": "تسجيل",
        "registering": "جارٍ التسجيل...",
        "already": "هل لديك حساب؟",
        "login": "تسجيل الدخول"
    },
    "Header": {
        "hello": "مرحبًا",
        "logout": "تسجيل الخروج",
        "profile": "الملف الشخصي"
    },
    "SideNav": {
        "booklets": "النموذج"
    },
    "NavHeader": {
        "create": "إنشاء كتيب",
        "update": "تعديل الكتيب",
        "tasks": "مهام الكتيب",
        "view": "عرض الكتيب",
        "perform": "تنفيذ مهمة الكتيب",
        "view-task": "عرض اجراء النموذج",
        "booklets": "النماذج",
        "preview": "عرض النموذج",
        "hide": "اخفاء عرض النموذج"
    },
    "CreateUpdataBookletForm": {
        "bookletType": "نوع النموذج",
        "bookletCategory": "فئة النموذج",
        "select": "حدد فئة النموذج",
        "projectName": "اسم المشروع",
        "bookletNumber": "رقم النموذج",
        "issueDate": "تاريخ الاصدار",
        "selectDate": "حدد تاريخ الاصدار",
        "issueCity": "مدينة الاصدار",
        "selectCity": "حدد مدينة الاصدار",
        "create": "انشاء",
        "creating": "جارٍ الانشاء...",
        "update": "تعديل",
        "updating": "جارٍ التعديل...",
        "cancel": "الغاء",
        "internal": "داخلي",
        "external": "خارجي",
        "description": "وصف"
    },
    "BookletTable": {
        "category": "فئة النموذج",
        "dateOfCreation": "تاريخ الانشاء",
        "projectName": "اسم المشروع",
        "bookletNumber": "رقم النموذج",
        "department": "قسم النموذج",
        "actions": "الاجراءات",
        "IT Department": "قسم تقنية المعلومات"
    },
    "BookletTasksTable": {
        "status": "الحالة",
        "taskName": "اسم الاجراء",
        "taskType": "نوع الاجراء",
        "actions": "الاجراءات",
        "Pending": "قيد الانتظار",
        "Completed": "مكتمل",
        "InProgress": "في تَقَدم",
        "Add": "يضيف"
    },
    "SelectOptions": {
        [BookletCategoriesEnum.IT]: "تقنية المعلومات",
        [BookletCitiesEnum.Abha]: BookletCitiesEnum.Abha as string,
        [BookletCitiesEnum.Dammam]: BookletCitiesArabicEnum.Dammam as string,
        [BookletCitiesEnum.Jeddah]: BookletCitiesArabicEnum.Jeddah as string,
        [BookletCitiesEnum.Madina]: BookletCitiesArabicEnum.Madina as string,
        [BookletCitiesEnum.Mecca]: BookletCitiesArabicEnum.Mecca as string,
        [BookletCitiesEnum.Riyadh]: BookletCitiesArabicEnum.Riyadh as string,
        [BookletCitiesEnum.Taif]: BookletCitiesArabicEnum.Taif as string,
    },
    "TaskForm": {
        "submit": "تنفيذ",
        "submitting": "جارٍ التاكيد...",
        "next": "التالي"
    },
    "DeleteDialog": {
        "title": "هل انت متاكد؟",
        "description": "لا يمكن التراجع عن هذا الاجراء. سوف يتم حذف هذا السجل بشكل دائم.",
        "cancel": "الغاء",
        "continue": "موافق"
    },
    "ProfilePage": {
        "accountSetting": "إعدادات الحساب",
        "changePassword": "تغيير كلمة المرور",
        "loggingOut": "جارٍ الخروج...",
        "logout": "خروج"
    },
    "UserPasswordForm": {
        "currentPassword": "كلمة المرور الحالية",
        "newPassword": "كلمة المرور الجديدة",
        "confirmNewPassword": "تأكيد كلمة المرور الجديدة",
        "changePassword": "تغيير كلمة المرور",
        "changePasswording": "جارٍ تغيير كلمة المرور...",
        "cancel": "الغاء",
        "continue": "موافق"
    },
    "UserSettingForm": {
        "name": "الاسم",
        "email": "البريد الالكتروني",
        "phone": "رقم الهاتف",
        "update": "تحديث",
        "updating": "جارٍ التحديث...",
        "cancel": "الغاء",
    },
    "RadioGroup": {
        "Other": "أخرى",
        "Cash": "نقدي",
        "Certified Cheque": "شيك مصدق",
        "yes": "نعم",
        "no": "لا"
    }
}

const Languages = {
    en: EN,
    ar: AR
}

const Direction = {
    en: "ltr",
    ar: "rtl"
}


interface LangContextType {
    setLang: (lang: "en" | "ar" | null) => void;
    lang: "en" | "ar" | null;
    messages: typeof EN
    dir: string
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLang] = useState<"en" | "ar" | null>("en");
    const [dir, setDir] = useState<string>("ltr")
    const [messages, setMessages] = useState<typeof EN>(EN);

    useEffect(() => {
        const stored = localStorage.getItem('lang');
        if (stored && stored !== 'null' && stored !== 'undefined' && stored !== '') {
            setLang(stored as any);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('lang', lang!);
        setMessages(Languages[lang!])
        setDir(Direction[lang!])
    }, [lang])

    return (
        <LangContext.Provider value={{ lang, setLang, messages, dir }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error('useLang must be used within LangProvider');
    return { lang: ctx.lang, setLang: ctx.setLang, messages: ctx.messages, dir: ctx.dir };
};


export const useTranslations = (namespace: string) => {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error('useTranslations must be used within LangProvider');

    return (key: string) => {
        const namespaceMessages = ctx.messages[namespace as keyof typeof ctx.messages];
        if (!namespaceMessages) {
            console.warn(`Namespace "${namespace}" not found in translations`);
            return key; // Return the key as fallback
        }

        const translation = namespaceMessages[key as keyof typeof namespaceMessages];
        if (!translation) {
            console.warn(`Translation key "${key}" not found in namespace "${namespace}"`);
            return key; // Return the key as fallback
        }

        return translation;
    };
};