import jwt from 'jsonwebtoken';
import { devConfig } from '@/config';

export const getJWTToken = async <T extends object>(payload: T): Promise<string> => {
    if (!payload || typeof payload !== 'object') {
        throw new Error('Invalid payload object');
    }

    const token: string = jwt.sign(payload, devConfig.secret, {
        expiresIn: '1d',
    });

    return token;
};
