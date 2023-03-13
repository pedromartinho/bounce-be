import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  node: process.env.NODE_ENV || 'development',
  
  app: {
    name: 'bounce-api',
    host: process.env.APP_HOST || 'http://localhost',
    port: process.env.APP_PORT || '3050',
  },
};
