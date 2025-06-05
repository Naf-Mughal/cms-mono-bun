'use client';
import { createContext, useContext, useState } from 'react';
interface PreviewContextType {
    setPreview: (preview: boolean) => void;
    preview: boolean;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export const PreviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [preview, setPreview] = useState<boolean>(true);

    return (
        <PreviewContext.Provider value={{ preview, setPreview }}>
            {children}
        </PreviewContext.Provider>
    );
};

export const usePreview = () => {
    const ctx = useContext(PreviewContext);
    if (!ctx) throw new Error('usePreview must be used within PreviewProvider');
    return { preview: ctx.preview, setPreview: ctx.setPreview };
};
