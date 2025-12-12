import axios, { AxiosError, AxiosPromise } from 'axios'
import env from '../config/env.js'

interface Auth0TokenData {
  access_token: string
  expires_in: number
  token_type: string
}

class AuthApi {
  private api
  private static instance: AuthApi
  private auth0Token: string
  private expiresAt: number
  private constructor() {
    this.api = axios.create({ baseURL: env.AUTH0_API_URL })
    this.auth0Token = ''
    this.expiresAt = 0
  }
  private logAxiosError(error: AxiosError | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Error de Auth0: ${error.response.status}`)
      console.error('Detalles:', error.response.data)
    } else {
      console.error('Error desconocido buscando el Auth0 token:', error)
    }
  }
  private async fetchToken(): AxiosPromise<Auth0TokenData> {
    try {
      return this.api.post<Auth0TokenData>(
        '/',
        {
          client_id: env.AUTH0_CLIENT_ID,
          client_secret: env.AUTH0_CLIENT_SECRET,
          audience: env.AUTH0_AUDIENCE,
          grant_type: 'client_credentials',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    } catch (err) {
      this.logAxiosError(err)
      throw err
    }
  }
  private async getToken(): Promise<string> {
    if (this.auth0Token && Date.now() < this.expiresAt) return this.auth0Token
    const data: Auth0TokenData = (await this.fetchToken()).data
    this.auth0Token = data.access_token
    this.expiresAt = Date.now() + data.expires_in * 1000
    return this.auth0Token
  }
  private async getCurrentHeader() {
    return {
      Authorization: `Bearer ${await this.getToken()}`,
    }
  }
  static getInstance(): AuthApi {
    if (AuthApi.instance) return AuthApi.instance
    AuthApi.instance = new AuthApi()
    return AuthApi.instance
  }
  static async init(): Promise<void> {
    const inst = AuthApi.getInstance()
    await inst.getToken()
  }
  private async post<T, R = unknown>(route: string, data: T): AxiosPromise<R> {
    try {
      return await this.api.post<R>(route, data, { headers: await this.getCurrentHeader() })
    } catch (err) {
      this.logAxiosError(err)
      throw err
    }
  }
}

export default AuthApi
