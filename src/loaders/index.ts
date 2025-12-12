import AuthApi from '../services/authApi.js'

async function initServices(): Promise<void> {
  console.log("Iniciando API's...")
  await AuthApi.init()
  console.log('\tConexión con Auth0 completada')
  console.log('Conexiones establecidas')
}

export default initServices
