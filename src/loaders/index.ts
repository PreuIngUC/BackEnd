import AuthApi from '../services/authApi.js'

async function initServices(): Promise<void> {
  console.log("Iniciando API's...")
  const authInstance = AuthApi.getInstance()
  await authInstance.init()
  console.log('\tConexión con Auth0 iniciada')
}

export default initServices
