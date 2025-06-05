import { Elysia } from 'elysia'
import { authRouter } from './app/auth/auth.routes';
import { bookletRouter } from './app/booklets/booklet.routes';
import { configureDb } from './config';
import { uploadRouter } from './app/uploads/upload.routes';
import cors from '@elysiajs/cors';

configureDb();
export const app = new Elysia({ prefix: '/api' })
    .onError(({ code, error, set }) => {
        if (code === 'VALIDATION') {
            set.status = 400;
            return {
                message: 'Incorrect data',
                errors: error.all,
            };
        }
    })
    .use(cors())
    .use(authRouter)
    .use(bookletRouter)
    .use(uploadRouter)
    .listen(process.env.PORT || 8080);

export type App = typeof app 