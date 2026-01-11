import AuthApi from '../services/authApi.js'
import DbApi from '../services/dbApi.js'

async function initServices(): Promise<void> {
  console.log("Iniciando API's...")
  try {
    await AuthApi.init()
    console.log('\tConexión con Auth0 establecida')
    await DbApi.init()
    console.log('\tConexión con Prisma establecida')
  } catch (error) {
    console.error('\tError conectando con alguna de las APIs:', error)
    // Don't throw - let the app start even if Auth0 fails
    // Auth0 will retry on first request
  }
  console.log('Conexiones establecidas')
}

export default initServices
