import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import authMiddleware from '../../middlewares/authMiddleware.js'
import usersRouter from './users.js'
import jobsRouter from './creationJobs.js'

const privateRouter = new DocumentedRouter('', { prefix: '/api/private' })
privateRouter.use(authMiddleware)
privateRouter.use(usersRouter.routes())
privateRouter.use(usersRouter.allowedMethods())
privateRouter.use(jobsRouter.routes())
privateRouter.use(jobsRouter.allowedMethods())

export default privateRouter
