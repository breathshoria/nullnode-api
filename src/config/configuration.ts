export default () => ({
    port: process.env.PORT || 3000,
    database: {
        name: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    }
});