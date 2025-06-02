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

export const BookletCitiesTranslations: Record<string, string> = {
    [BookletCitiesEnum.Jeddah]: "جدة",
    [BookletCitiesEnum.Riyadh]: "الرياض",
    [BookletCitiesEnum.Mecca]: "مكة",
    [BookletCitiesEnum.Madina]: "المدينة المنورة",
    [BookletCitiesEnum.Dammam]: "الدمام",
    [BookletCitiesEnum.Abha]: "أبها",
    [BookletCitiesEnum.Taif]: "الطائف",
};