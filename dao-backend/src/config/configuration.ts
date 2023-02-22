export default () => ({
  app: {
    name: process.env.APP_NAME,
    host: process.env.APP_HOST,
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    version: process.env.APP_VERSION,
  },

  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  bc: {
    providerUrl: process.env.PROVIDER_URL,
  },
});
