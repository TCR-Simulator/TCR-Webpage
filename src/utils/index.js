import crypto from 'crypto';

export const generateSalt = () => Buffer.from(crypto.randomBytes(16)).readUInt32BE(0);

export const bigNumber2Date = bigNum => new Date(bigNum.toNumber() * 1000);

window.cryptoo = crypto;
