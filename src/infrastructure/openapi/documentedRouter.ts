import { z, ZodObject, ZodType } from 'zod'
import { ValidatedContext } from '../../types/context.js'
import Router from '@koa/router'
import validateThenHandle from '../../middlewares/validateThenHandle.js'
import { registry } from './openapi.js'
import { Middleware } from 'koa'

type InferOrUnknown<S> = S extends ZodType ? z.infer<S> : unknown
type InferOrVoid<S> = S extends ZodType ? z.infer<S> : void

class DocumentedRouter {
  private router
  private prefix
  private basePath
  constructor(basePath: string, params?: { prefix?: string }) {
    this.router = new Router(params)
    this.prefix = params?.prefix ?? ''
    this.basePath = basePath
  }
  routes(): Router.Middleware {
    return this.router.routes()
  }
  allowedMethods(): Router.Middleware {
    return this.router.allowedMethods()
  }
  use(middleware: Router.Middleware) {
    this.router.use(middleware)
  }
  private documentedRoute<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
    ResponseSchema extends ZodType | undefined,
  >(
    schemas: {
      body?: BodySchema
      query?: QuerySchema
      params?: ParamsSchema
    },
    handler: (
      ctx: ValidatedContext<
        InferOrUnknown<BodySchema>,
        InferOrUnknown<QuerySchema>,
        InferOrUnknown<ParamsSchema>
      >,
    ) => Promise<InferOrVoid<ResponseSchema>>,
    params: {
      method: 'get' | 'post' | 'put' | 'patch' | 'delete'
      particularPath: string
    },
    response?: {
      status: number
      schema: ResponseSchema
      description?: string
    },
    optionals?: {
      summary?: string
      tags?: string[]
    },
    authorizationMiddleware?: Middleware,
  ) {
    const { method, particularPath } = params
    const { summary, tags } = optionals ?? {}
    registry.registerPath({
      method,
      path: this.basePath + this.prefix + particularPath,
      summary,
      tags,
      request: {
        params: schemas?.params as ZodObject,
        query: schemas?.query as ZodObject,
        body: schemas?.body
          ? {
              required: true,
              content: {
                'application/json': {
                  schema: schemas.body,
                },
              },
            }
          : undefined,
      },
      responses: response?.schema
        ? {
            [response.status]: {
              description: response.description ?? 'OK',
              content: {
                'application/json': {
                  schema: response.schema,
                },
              },
            },
          }
        : {
            204: {
              description: 'No Content',
            },
          },
    })

    const wrappedHandler = async (
      ctx: ValidatedContext<
        InferOrUnknown<BodySchema>,
        InferOrUnknown<QuerySchema>,
        InferOrUnknown<ParamsSchema>
      >,
    ): Promise<void> => {
      const result = await handler(ctx)

      if (!response?.schema) {
        ctx.status = 204
        return
      }

      const parsed = response.schema.parse(result)

      ctx.status = response.status
      ctx.body = parsed
    }

    const koaHandler = validateThenHandle(schemas, wrappedHandler)

    if (!authorizationMiddleware) this.router[method](particularPath, koaHandler)
    else this.router[method](particularPath, authorizationMiddleware, koaHandler)
  }
  post<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
    ResponseSchema extends ZodType | undefined,
  >(
    particularPath: string,
    schemas: {
      body?: BodySchema
      query?: QuerySchema
      params?: ParamsSchema
    },
    handler: (
      ctx: ValidatedContext<
        InferOrUnknown<BodySchema>,
        InferOrUnknown<QuerySchema>,
        InferOrUnknown<ParamsSchema>
      >,
    ) => Promise<InferOrVoid<ResponseSchema>>,
    response?: {
      status: number
      schema: ResponseSchema
      description?: string
    },
    optionals?: {
      summary?: string
      tags?: string[]
    },
    authorizationMiddleware?: Middleware,
  ) {
    this.documentedRoute(
      schemas,
      handler,
      {
        method: 'post',
        particularPath,
      },
      response,
      optionals,
      authorizationMiddleware,
    )
  }
  get<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
    ResponseSchema extends ZodType | undefined,
  >(
    particularPath: string,
    schemas: {
      body?: BodySchema
      query?: QuerySchema
      params?: ParamsSchema
    },
    handler: (
      ctx: ValidatedContext<
        InferOrUnknown<BodySchema>,
        InferOrUnknown<QuerySchema>,
        InferOrUnknown<ParamsSchema>
      >,
    ) => Promise<InferOrVoid<ResponseSchema>>,
    response?: {
      status: number
      schema: ResponseSchema
      description: string
    },
    optionals?: {
      summary?: string
      tags?: string[]
    },
    authorizationMiddleware?: Middleware,
  ) {
    this.documentedRoute(
      schemas,
      handler,
      {
        method: 'get',
        particularPath,
      },
      response,
      optionals,
      authorizationMiddleware,
    )
  }
  patch<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
    ResponseSchema extends ZodType | undefined,
  >(
    particularPath: string,
    schemas: {
      body?: BodySchema
      query?: QuerySchema
      params?: ParamsSchema
    },
    handler: (
      ctx: ValidatedContext<
        InferOrUnknown<BodySchema>,
        InferOrUnknown<QuerySchema>,
        InferOrUnknown<ParamsSchema>
      >,
    ) => Promise<InferOrVoid<ResponseSchema>>,
    response?: {
      status: number
      schema: ResponseSchema
    },
    optionals?: {
      summary?: string
      tags?: string[]
    },
    authorizationMiddleware?: Middleware,
  ) {
    this.documentedRoute(
      schemas,
      handler,
      {
        method: 'patch',
        particularPath,
      },
      response,
      optionals,
      authorizationMiddleware,
    )
  }
  put<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
    ResponseSchema extends ZodType | undefined,
  >(
    particularPath: string,
    schemas: {
      body?: BodySchema
      query?: QuerySchema
      params?: ParamsSchema
    },
    handler: (
      ctx: ValidatedContext<
        InferOrUnknown<BodySchema>,
        InferOrUnknown<QuerySchema>,
        InferOrUnknown<ParamsSchema>
      >,
    ) => Promise<InferOrVoid<ResponseSchema>>,
    response?: {
      status: number
      schema: ResponseSchema
    },
    optionals?: {
      summary?: string
      tags?: string[]
    },
    authorizationMiddleware?: Middleware,
  ) {
    this.documentedRoute(
      schemas,
      handler,
      {
        method: 'put',
        particularPath,
      },
      response,
      optionals,
      authorizationMiddleware,
    )
  }
  delete<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
    ResponseSchema extends ZodType | undefined,
  >(
    particularPath: string,
    schemas: {
      body?: BodySchema
      query?: QuerySchema
      params?: ParamsSchema
    },
    handler: (
      ctx: ValidatedContext<
        InferOrUnknown<BodySchema>,
        InferOrUnknown<QuerySchema>,
        InferOrUnknown<ParamsSchema>
      >,
    ) => Promise<InferOrVoid<ResponseSchema>>,
    response?: {
      status: number
      schema: ResponseSchema
    },
    optionals?: {
      summary?: string
      tags?: string[]
    },
    authorizationMiddleware?: Middleware,
  ) {
    this.documentedRoute(
      schemas,
      handler,
      {
        method: 'delete',
        particularPath,
      },
      response,
      optionals,
      authorizationMiddleware,
    )
  }
}

export default DocumentedRouter
