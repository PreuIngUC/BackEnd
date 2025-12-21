import Permissions from "../constants/permissions"
import { Next, Context } from "koa"
import { UnauthorizedError } from "../utils/errors/auth0"

function authorize(required: Permissions) {
    return async (ctx: Context, next: Next ) => {
        if (!ctx?.state?.user?.permissions.includes(required)) {
            throw new UnauthorizedError()
        }
        await next()
    }
}

export default authorize