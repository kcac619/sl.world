/** @type {import('next').NextConfig} */
import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    SQL_USERNAME: process.env.SQL_USERNAME,
    SQL_PASSWORD: process.env.SQL_PASSWORD,
    SQL_HOST: process.env.SQL_HOST,
    SQL_DBNAME: process.env.SQL_DBNAME,
    MY_AWS_BUCKET_NAME: process.env.MY_AWS_BUCKET_NAME,
    MY_AWS_BUCKET_REGION: process.env.MY_AWS_BUCKET_REGION,
    MY_AWS_ACCESS_KEY: process.env.MY_AWS_ACCESS_KEY,
    MY_AWS_SECRET_ACCESS_KEY: process.env.MY_AWS_SECRET_ACCESS_KEY,
  },
};

export default nextConfig;
