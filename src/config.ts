import dotenv from "dotenv";
import { production, staging } from "./constants";
dotenv.config();

export const dbUrl = process.env.DB_URL as string;
export const env = process.env.ENVIRONMENT as string;
export const PORT = process.env.PORT as string;
export const mailUsername = process.env.MAIL_USERNAME as string;
export const mailPassword = process.env.MAIL_PASSWORD as string;
export const mailService = process.env.MAIL_SERVICE as string;
export const stagingUrl = process.env.STAGING_URL as string;
export const productionUrl = process.env.PRODUCTION_URL as string;
export const localUrl = process.env.LOCAL_URL as string;
export const adminEmail = process.env.ADMIN_EMAIL as string
export const saleSummaryMailTime = process.env.SALE_SUMMARY_TIME as string

export const BASE_URL = () =>
  env === production.toString() ? productionUrl : env == staging.toString() ? stagingUrl : localUrl;
