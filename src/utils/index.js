import crypto from 'crypto';

export const generateSalt = () => crypto.randomBytes(16).toString('hex');

export const bigNumber2Date = bigNum => new Date(bigNum.toNumber() * 1000);
