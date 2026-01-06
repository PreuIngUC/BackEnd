import { z, ZodObject, ZodType } from 'zod'
import { ValidatedContext } from '../../types/context.js'
import Router from '@koa/router'
import validateThenHandle from '../../middlewares/validateThenHandle.js'
import { registry } from './openapi.js'
import { Middleware } from 'koa'

type InferOrUnknown<S> = S extends ZodType ? z.infer<S> : unknown

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
    ) => Promise<unknown>,
    params: {
      method: 'get' | 'post' | 'put' | 'patch' | 'delete'
      particularPath: string
    },
    optionals: {
      response?: {
        status: number
        schema: ZodType
      }
      summary?: string
      tags?: string[]
    },
    authorizationMiddleware?: Middleware,
  ) {
    const { method, particularPath } = params
    const { response, summary, tags } = optionals
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
      responses: response
        ? {
            [response.status]: {
              description: 'OK',
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
    if (!authorizationMiddleware)
      this.router[method](particularPath, validateThenHandle(schemas, handler))
    else
      this.router[method](
        particularPath,
        authorizationMiddleware,
        validateThenHandle(schemas, handler),
      )
  }
  post<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
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
    ) => Promise<unknown>,
    optionals?: {
      response?: {
        status: number
        schema: ZodType
      }
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
      optionals ?? {},
      authorizationMiddleware,
    )
  }
  get<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
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
    ) => Promise<unknown>,
    optionals?: {
      response?: {
        status: number
        schema: ZodType
      }
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
      optionals ?? {},
      authorizationMiddleware,
    )
  }
  patch<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
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
    ) => Promise<unknown>,
    optionals?: {
      response?: {
        status: number
        schema: ZodType
      }
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
      optionals ?? {},
      authorizationMiddleware,
    )
  }
  put<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
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
    ) => Promise<unknown>,
    optionals?: {
      response?: {
        status: number
        schema: ZodType
      }
      summary?: string
      tags?: string[]
    },
  ) {
    this.documentedRoute(
      schemas,
      handler,
      {
        method: 'put',
        particularPath,
      },
      optionals ?? {},
    )
  }
  delete<
    BodySchema extends ZodType | undefined,
    QuerySchema extends ZodType | undefined,
    ParamsSchema extends ZodType | undefined,
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
    ) => Promise<unknown>,
    optionals?: {
      response?: {
        status: number
        schema: ZodType
      }
      summary?: string
      tags?: string[]
    },
  ) {
    this.documentedRoute(
      schemas,
      handler,
      {
        method: 'delete',
        particularPath,
      },
      optionals ?? {},
    )
  }
}

export default DocumentedRouter
