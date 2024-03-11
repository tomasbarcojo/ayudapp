import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    app: {
      port: parseInt(process.env.PORT, 10) || 8080,
      baseUrl: process.env.BASE_URL || 'http://localhost:8080',
    },
    database: {
      client: process.env.DATABASE_CLIENT,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      log: process.env.DATABASE_LOG || 'yes',
    },
    telemetry: {
      activateSDK: process.env.OTL_ACTIVATE_SDK_AUTO_INSTRUMENTATION,
      radioBaseSampler: process.env.RADIO_BASE_SAMPLER,
    }
  };
});
