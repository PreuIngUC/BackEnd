import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import healthRouter from './health.js'
import usersRouter from './users.js'
import coursesRouter from './courses.js'

const publicRouter = new DocumentedRouter('', { prefix: '/api/public' })

publicRouter.use(healthRouter.routes())
publicRouter.use(healthRouter.allowedMethods())
publicRouter.use(usersRouter.routes())
publicRouter.use(usersRouter.allowedMethods())
publicRouter.use(coursesRouter.routes())
publicRouter.use(coursesRouter.allowedMethods())

export default publicRouter
