import Router from '@koa/router'
import authMiddleware from '../../middlewares/authMiddleware.js'

const privateRouter = new Router()
privateRouter.use(authMiddleware)

export default privateRouter