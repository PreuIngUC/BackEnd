import { JwtHeader, JwtPayload } from 'jsonwebtoken'
import jwksRsa from 'jwks-rsa'
import koaJwt from 'koa-jwt'
import env from '../config/env.js'
import { UnauthorizedError } from '../utils/errors/auth0.js'

//Buscador de Claves
const jwksClient = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: env.AUTH0_JWKS_URI,
})
//Buscador de la Clave correcta
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function secretProvider(header: JwtHeader, payload: JwtPayload | string): Promise<string> {
  if (!header || !header.kid) {
    throw new UnauthorizedError('Token malformado, falta "kid" en el header')
  }
  return new Promise((resolve, reject) => {
    jwksClient.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return reject(err)
      }
      const signingKey = key?.getPublicKey()
      resolve(signingKey as string)
    })
  })
}
//Middleware configurado
const authMiddleware = koaJwt({
  secret: secretProvider,
  audience: env.AUTH0_ADSUM_AUDIENCE,
  issuer: `${env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
  passthrough: false,
})

export default authMiddleware
