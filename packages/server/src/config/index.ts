import dotenv from 'dotenv';

dotenv.config();

export const APP_PORT = process.env.APP_PORT || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const MYSQL_HOST = process.env.MYSQL_HOST || '';
export const MYSQL_PORT = process.env.MYSQL_PORT || '';
export const MYSQL_USER = process.env.MYSQL_USER || '';
export const MYSQL_PWD = process.env.MYSQL_PWD || '';
export const MYSQL_DB = process.env.MYSQL_DB || '';
