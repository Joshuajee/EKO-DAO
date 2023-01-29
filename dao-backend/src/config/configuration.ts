export default () => ({
  app: {
    name: process.env.APP_NAME,
    host: process.env.APP_HOST,
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    version: process.env.APP_VERSION,
  },

  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
});
