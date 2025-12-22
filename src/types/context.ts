import Router from "@koa/router"

/**
 * Contexto tipado para controladores validados.
 * * @template TBody   - Tipo del Body (JSON). Por defecto: unknown
 * @template TQuery  - Tipo de la Query (URL params). Por defecto: unknown
 * @template TParams - Tipo de los Route Params (/:id). Por defecto: unknown
 */
export type ValidatedContext<
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown
> = Router.RouterContext & {
  request: Router.RouterContext["request"] & { body: TBody };
  query: TQuery;
  params: TParams;
};

export type QueryContext<T> = ValidatedContext<unknown, T>

export type BodyContext<T> = ValidatedContext<T>