import { NextRequest, NextResponse } from "next/server";
import { axiosAuthClient } from "./lib/axios";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
    const cookieStore = await cookies();
    const headers = new Headers(req.headers);
    headers.set("x-current-path", req.nextUrl.pathname);
    let response: NextResponse;

    try {
        if (headers.get("next-action")) {
            response = NextResponse.next({ request: { headers } });
        } else {
            const regex = /\.(png|jpe?g|gif|pdf)$/i;
            if (
                req.nextUrl.pathname === "/register" ||
                regex.test((req.nextUrl.pathname?.split("/"))[req.nextUrl.pathname?.split("/").length - 1] || "")
            ) {
                response = NextResponse.next({ request: { headers } });
            } else {
                const axiosResponse = await axiosAuthClient.get('/auth/profile');
                if (req.nextUrl.pathname === "/" && axiosResponse.status === 200) {
                    response = NextResponse.redirect(new URL('/booklets', req.url), { headers });
                } else {
                    response = NextResponse.next({ request: { headers } });
                }
            }
        }
    } catch (error: any) {
        console.log(error?.response?.data?.message || error?.message);
        if (error?.response?.status === 401) {
            cookieStore.delete('token');
            req.cookies.delete('token');
            response = NextResponse.next({ request: { headers } });
        } else if (req.nextUrl.pathname === "/") {
            response = NextResponse.next({ request: { headers } });
        } else {
            response = NextResponse.redirect(new URL('/', req.url));
        }
    }

    // Invalidate caching by setting cache-control header
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    return response;
}


export const config = {
    matcher: [
        {
            // This pattern now also skips requests ending with .png, .jpg, .jpeg, .gif, or .pdf.
            source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public).*)',
        },
        {
            source: '/booklets/:path*'
        },
    ]
};
