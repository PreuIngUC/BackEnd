import app from './app.js'
import env from './config/env.js'
import initServices from './loaders/index.js'

await initServices()

//Caso LOCAL
if (!env.ITS_PROD && !env.ITS_PREV) {
  app.listen(env.PORT, () => {
  console.log(`Escuchando en http://localhost:${env.PORT}`)
})
}
//Caso Vercel SERVERLESS
const callback = app.callback()
export default callback

