import DocumentedRouter from '../../infrastructure/openapi/documentedRouter.js'
import authMiddleware from '../../middlewares/authMiddleware.js'

const privateRouter = new DocumentedRouter('', { prefix: '/api/private' })
privateRouter.use(authMiddleware)

export default privateRouter
