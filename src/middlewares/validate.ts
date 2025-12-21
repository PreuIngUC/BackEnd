import { Context, Next } from 'koa'
import { ParsedUrlQuery } from 'querystring'
import { z, ZodType } from 'zod'

interface ValidationConfig {
    body?: ZodType
    params?: ZodType
    query?: ZodType
}

function validate(schemas: ValidationConfig) {
    return async (ctx: Context, next: Next) => {
        if (schemas.params) {
            const result = schemas.params.safeParse(ctx.params)
            if (!result.success) {
                ctx.status = 400
                ctx.body = {
                    type: 'params_error',
                    errors: z.flattenError(result.error)
                }
                return
            }
            ctx.params = result.data
        }
        if (schemas.body) {
            const result = schemas.body.safeParse(ctx.request.body)
            if (!result.success) {
                ctx.status = 422
                ctx.body = {
                    type: 'body_error',
                    errors: z.flattenError(result.error)
                }
                return
            }
            ctx.request.body = result.data
        }
        if (schemas.query) {
            const result = schemas.query.safeParse(ctx.query)
            if (!result.success) {
                ctx.status = 400
                ctx.body = {
                    type: 'query_error',
                    errors: z.flattenError(result.error)
                }
                return
            }
            ctx.query = result.data as unknown as ParsedUrlQuery
        }
        await next()
    }
}

export default validate