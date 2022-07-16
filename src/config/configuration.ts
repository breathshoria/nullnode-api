export default () => ({
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    accessJwtSecret: process.env.ACCESS_JWT_SECRET,
    accessJwtExpire: process.env.ACCESS_JWT_EXPIRE,
    refreshJwtSecret: process.env.REFRESH_JWT_SECRET,
    refreshJwtExpire: process.env.REFRESH_JWT_EXPIRE,
});