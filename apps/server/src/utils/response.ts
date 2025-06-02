export interface ApiResponse<T = any> {
    message: string;
    code: number;
    data: T;
}

export const makeApiResponse = <T = any>(
    message: string,
    status_code: number,
    data?: T
): ApiResponse<T> => {
    return {
        message,
        code: status_code,
        data: data ?? ([] as unknown as T),
    };
};