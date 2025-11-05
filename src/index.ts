import app from './app.js'
import env from './config/env.js'
import initServices from './loaders/index.js'

await initServices()
app.listen(env.PORT, () => {
  if (!env.ITS_PROD) console.log(`Escuchando en http://localhost:${env.PORT}`)
  else console.log(`AdsumBack escuchando en el puerto ${env.PORT}`)
})
