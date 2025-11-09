import 'koa'
import Permissions from '../constants/permissions.ts'

interface UserPayload {
  iss: string
  sub: string
  aud: Array<string>
  iat: number
  exp: number
  scope: string
  azp: string
  permissions: Array<Permissions>
}

declare module 'koa' {
  interface DefaultState {
    user?: UserPayload
  }
}
