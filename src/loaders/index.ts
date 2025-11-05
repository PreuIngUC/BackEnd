import AuthApi from '../services/authApi.js'
import MongoApi from '../services/mongoApi.js'

async function initServices(): Promise<void> {
  console.log("Iniciando API's...")
  await AuthApi.init()
  console.log('\tConexión con Auth0 completada')
  await MongoApi.init()
  console.log('\tConexión con MongoDB completada')
  console.log('Conexiones establecidas')
}

export default initServices
