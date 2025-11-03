import app from './app.js'
import { ENVIRONMENT, PORT } from './config/env.js'

app.listen(PORT, () => {
  const env = ENVIRONMENT
  if (env === 'development') console.log(`Escuchando en http://localhost:${PORT}`)
  else console.log(`LoContaPixelBackend escuchando en el puerto ${PORT}`)
})
