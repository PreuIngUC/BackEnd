import app from './app.js'
import initServices from './loaders/index.js'

let inited = false

async function createApp() {
    if (!inited) {
        await initServices()
        inited = true
    }
    return app
}

export default createApp