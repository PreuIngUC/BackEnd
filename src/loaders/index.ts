import AuthApi from '../services/authApi.js'

async function initServices(): Promise<void> {
  console.log("Iniciando API's...")
  try {
    await AuthApi.init()
    console.log('\tConexión con Auth0 completada')
  } catch (error) {
    console.error('\tError conectando con Auth0:', error)
    // Don't throw - let the app start even if Auth0 fails
    // Auth0 will retry on first request
  }
  console.log('Conexiones establecidas')
}

export default initServices
