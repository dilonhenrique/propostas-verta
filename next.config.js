/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CU_KEY: process.env.CU_KEY,
    CU_URL: process.env.CU_URL,
    AS_KEY: process.env.AS_KEY,
    AS_URL: process.env.AS_URL,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    ACCESSTOKEN_SECRET: process.env.ACCESSTOKEN_SECRET,
    REFRESHTOKEN_SECRET: process.env.REFRESHTOKEN_SECRET,
    MAIL_PASS: process.env.MAIL_PASS,
  }
}

module.exports = nextConfig
