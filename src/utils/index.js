import crypto from 'crypto';

export const generateSalt = () => crypto.randomBytes(16).toString('hex'); // eslint-disable-line import/prefer-default-export
