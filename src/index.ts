import app from './app.js'
import env from './config/env.js'
import initServices from './loaders/index.js'

//Caso LOCAL
if (!env.ITS_PROD && !env.ITS_PREV) {
  await initServices()
  app.listen(env.PORT, () => {
  console.log(`Escuchando en http://localhost:${env.PORT}`)
})
}