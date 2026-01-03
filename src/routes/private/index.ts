import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import authMiddleware from '../../middlewares/authMiddleware.js'
import usersRouter from './users.js'

const privateRouter = new DocumentedRouter('', { prefix: '/api/private' })
privateRouter.use(authMiddleware)
privateRouter.use(usersRouter.routes())
privateRouter.use(usersRouter.allowedMethods())

export default privateRouter
