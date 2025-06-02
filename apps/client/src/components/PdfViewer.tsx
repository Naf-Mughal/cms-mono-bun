'use client';

import { useEffect, useRef, useState } from 'react';
import axiosClient from '@/lib/clientAxios';
import { useRouter } from 'next/navigation';
import MorphingLoader from './custom-ui/morphing-loader';

const PdfIframeViewer = ({ endpoint, reload = false, path }: { path: string, endpoint: string, reload: boolean }) => {
    const timestamp = new Date().getTime();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const pdfUrlRef = useRef<string | null>(null);
    const router = useRouter();
    console.log("PdfIframeViewer endpoint", path);

    useEffect(() => {
        const fetchPdf = async () => {
            setLoading(true)
            try {
                // Fetch the JSON response that contains the Base64-encoded PDF
                const response = await axiosClient.get(endpoint,
                    {
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache',
                            'Expires': '0',
                        },
                    }
                );
                // Assuming the JSON is in the form { base64: '...' }
                const base64Pdf: string = response.data.base64;

                // Create a Data URL for the PDF using the Base64 string
                const dataUrl = `data:application/pdf;base64,${base64Pdf}`;
                setPdfUrl(dataUrl);
                pdfUrlRef.current = dataUrl;
                // setTimeout(() => {
                setLoading(false);
                // }, 5000);
            } catch (err) {
                console.error('Failed to load PDF:', err);
                setError('Failed to load document.');
            }
        };

        if (reload) {
            router.push(`${path}?preview=true`);
        } else {
            fetchPdf();
        }
        return () => {
            pdfUrlRef.current = null;
        };
    }, [endpoint, reload, router, path]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    if (loading || reload) {
        return <MorphingLoader message="Loading your PDF..." color="#09b96d" />;
    }

    return (
        <iframe
            key={timestamp}
            src={pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
            className="w-full h-full bg-white"
            style={{ border: 'none' }}
            title="PDF Document"
        />
    );
};

export default PdfIframeViewer;
