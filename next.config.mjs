/** @type {import('next').NextConfig} */
import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    SQL_USERNAME: process.env.SQL_USERNAME,
    SQL_PASSWORD: process.env.SQL_PASSWORD,
    SQL_HOST: process.env.SQL_HOST,
    SQL_DBNAME: process.env.SQL_DBNAME,
  },
};

export default nextConfig;
