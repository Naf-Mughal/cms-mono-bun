import { t } from 'elysia';
import type { LoginData, UserData } from "@schemas/index";
import Elysia, { type Context } from "elysia";
import { login, register, update, updatePassword } from "./auth";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { makeApiResponse } from "@/utils/response";

// Extend the JWT payload type to include our custom fields
interface UserJwtPayload extends JwtPayload {
    email: string;
    id: string;
    name: string;
    lang: string;
}

const passwordUpdateSchema = t.Object({
    currentPassword: t.String({ minLength: 6, error: 'Current password is required and must be at least 6 characters' }),
    newPassword: t.String({
        minLength: 6,
        error: 'New password must be at least 6 characters long',
    }),
    confirmNewPassword: t.String()
}, {
    error: 'Invalid password update data'
});

type PasswordUpdateData = typeof passwordUpdateSchema.static;

export const authRouter = new Elysia({ prefix: '/auth' })
    .onError(({ error }) => {
        return makeApiResponse(error.toString(), (error as any).cause, error);
    })
    .post('/login', async ({ body, set }: Context & { body: LoginData }) => {
        const { data, status } = await login({ ...body });
        set.status = status;
        return data;
    })
    .post('/register', async ({ body, set }: Context & { body: UserData }) => {
        const { data, status } = await register({ ...body });
        set.status = status;
        return data;
    })
    .post('/lang', async ({ body }: Context & { body: { email: string } }) => {
        return {};
    })
    .derive(async ({ headers, set }) => {
        const token = headers.authorization?.split(' ')[1];
        if (!token) {
            set.status = StatusCodes.FORBIDDEN;
            throw new Error('No token provided', { cause: StatusCodes.FORBIDDEN });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!);
            return { user: decoded, token: token };
        } catch (err: any) {
            set.status = StatusCodes.UNAUTHORIZED;
            throw new Error('Invalid or expired token', { cause: StatusCodes.UNAUTHORIZED });
        }
    })
    .get('/profile', async ({ user, token }: Context & { user: any, token: any }) => {
        return { ...user, token };
    })
    .post('/profile', async ({ body, set }: Context & { body: UserData }) => {
        const { data, status } = await update({ ...body });
        set.status = status;
        return data;
    })
    .post(
        '/updatePassword',
        async ({ body, user, set }) => {
            const { currentPassword, newPassword, confirmNewPassword } = body;

            // Type guard to check if user is our extended JWT payload
            const userPayload = user as UserJwtPayload;

            if (!userPayload?.email) {
                set.status = StatusCodes.UNAUTHORIZED;
                return {
                    success: false,
                    message: 'User not authenticated'
                };
            }

            // Validate that new password and confirmation match
            if (newPassword !== confirmNewPassword) {
                set.status = StatusCodes.BAD_REQUEST;
                return {
                    success: false,
                    message: 'New password and confirmation do not match'
                };
            }

            const result = await updatePassword(userPayload.email, currentPassword, newPassword);
            set.status = result.status;

            // Ensure the response matches the expected format
            if (result.data && typeof result.data === 'object' && 'success' in result.data) {
                return result.data;
            }

            return {
                success: true,
                message: 'Password updated successfully',
                data: result.data || {}
            };
        },
        {
            body: passwordUpdateSchema,
            response: {
                200: t.Object({
                    success: t.Boolean(),
                    message: t.String(),
                    data: t.Optional(t.Any())
                }),
                400: t.Object({
                    success: t.Boolean(),
                    message: t.String(),
                    error: t.Optional(t.Any())
                }),
                401: t.Object({
                    success: t.Boolean(),
                    message: t.String()
                })
            },
            detail: {
                summary: 'Update user password',
                description: 'Updates the authenticated user\'s password after verifying the current password',
                tags: ['Authentication'],
                security: [{ bearerAuth: [] }]
            }
        }
    )

