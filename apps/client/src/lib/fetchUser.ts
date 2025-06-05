export const fetchUser = async (): Promise<{ isAuthenticated: boolean }> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) throw new Error('Not authenticated');

    // Optional: validate with an API request
    return { isAuthenticated: true };
};
