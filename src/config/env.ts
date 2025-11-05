import 'dotenv/config'

function get(key: string): string {
  const val = process.env[key]
  if (val === undefined || val === null) {
    throw new Error(`La variable ${key} no está en .env!!!`)
  }
  return val
}

const env = {
  //numbers:
  PORT: parseInt(get('PORT')),
  //strings
  FRONTEND_URL: get('FRONTEND_URL'),
  AUTH0_DOMAIN: get('AUTH0_DOMAIN'),
  AUTH0_CLIENT_ID: get('AUTH0_CLIENT_ID'),
  AUTH0_CLIENT_SECRET: get('AUTH0_CLIENT_SECRET'),
  AUTH0_AUDIENCE: `${get('AUTH0_DOMAIN')}/api/v2/`,
  AUTH0_API_URL: `${get('AUTH0_DOMAIN')}/oauth/token`,
  //booleans
  ITS_PROD: get('NODE_ENV') === 'production',
}

export default env
