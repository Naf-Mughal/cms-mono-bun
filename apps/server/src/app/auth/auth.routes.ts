import type { LoginData, UserData } from "@schemas/index";
import Elysia, { type Context } from "elysia";
import { login, register } from "./auth";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import { makeApiResponse } from "@/utils/response";

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
        return { };
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
    });