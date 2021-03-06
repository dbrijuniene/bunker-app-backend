import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const {
  DB_CONNECTION_URL, TOKEN_SECRET, SERVER_DOMAIN, SERVER_PORT,
} = process.env;

if (
  DB_CONNECTION_URL === undefined
  || TOKEN_SECRET === undefined
  || SERVER_DOMAIN === undefined
  || SERVER_PORT === undefined
  ) {
  throw new Error('Please set up variables in src/config/.env file');
}

const config = {
  token: {
    secret: TOKEN_SECRET,
  },
  db: {
    connectionUrl: DB_CONNECTION_URL,
  },
  server: {
    domain: SERVER_DOMAIN,
    port: SERVER_PORT,
  },
};

export default config;
