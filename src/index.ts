import app from './app.js'
import env from './config/env.js'

app.listen(env.PORT, () => {
  if (!env.ITS_PROD) console.log(`Escuchando en http://localhost:${env.PORT}`)
  else console.log(`LoContaPixelBackend escuchando en el puerto ${env.PORT}`)
})
