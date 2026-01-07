import dotenv from 'dotenv'
import 'dotenv/config'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

function get(key: string): string {
  const val = process.env[key]
  if (val === undefined || val === null) {
    console.error(`❌ Missing environment variable: ${key}`)
    console.error(
      'Available env vars:',
      Object.keys(process.env)
        .filter(k => !k.includes('SECRET'))
        .join(', '),
    )
    throw new Error(`La variable ${key} no está en .env!!!`)
  }
  return val
}

const env = {
  //numbers:
  PORT: parseInt(get('PORT')),
  //strings
  FRONTEND_URL: get('FRONTEND_URL'),
  //strings Auth0
  AUTH0_DOMAIN: get('AUTH0_DOMAIN'),
  AUTH0_CLIENT_ID: get('AUTH0_CLIENT_ID'),
  AUTH0_CLIENT_SECRET: get('AUTH0_CLIENT_SECRET'),
  AUTH0_AUDIENCE: `${get('AUTH0_DOMAIN')}/api/v2/`,
  AUTH0_MANAGEMENT_URL: `${get('AUTH0_DOMAIN')}/api/v2`,
  AUTH0_TOKEN_URL: `${get('AUTH0_DOMAIN')}/oauth/token`,
  AUTH0_DB_CONNECTIONS_URL: `${get('AUTH0_DOMAIN')}/dbconnections`,
  AUTH0_JWKS_URI: `${get('AUTH0_DOMAIN')}/.well-known/jwks.json`,
  AUTH0_ADSUM_AUDIENCE: `${get('AUTH0_ADSUM_AUDIENCE')}`,
  AUTH0_PUBLIC_CLIENT_ID: get('AUTH0_PUBLIC_CLIENT_ID'),
  //strings Neon
  DATABASE_URL: `${get('DATABASE_URL')}`,
  DATABASE_URL_UNPOOLED: `${get('DATABASE_URL_UNPOOLED')}`,
  //booleans
  ITS_PROD: get('VERCEL_ENV') === 'production',
  ITS_PREV: get('VERCEL_ENV') === 'preview',
}

export default env
