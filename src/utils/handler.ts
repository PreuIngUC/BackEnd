import { Middleware, Context } from 'koa';

/**
 * Wrapper para engañar a TypeScript de forma segura.
 * Convierte un controlador fuertemente tipado en un Middleware genérico.
 */
const handle = (fn: (ctx: Context, next: () => Promise<unknown>) => Promise<unknown>): Middleware => {
  return fn as unknown as Middleware;
};

export default handle