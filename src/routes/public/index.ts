import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import healthRouter from './health.js'
import usersRouter from './users.js'

const publicRouter = new DocumentedRouter('', { prefix: '/api' })

publicRouter.use(healthRouter.routes())
publicRouter.use(healthRouter.allowedMethods())
publicRouter.use(usersRouter.routes())
publicRouter.use(usersRouter.allowedMethods())

export default publicRouter
