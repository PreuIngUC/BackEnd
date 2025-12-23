import createApp from '../dist/appFactory.js'

let cachedCallback

async function handler(req, res) {
    if (!cachedCallback) {
        const app = await createApp()
        cachedCallback = app.callback()
    }
    return cachedCallback(req, res)
}

export default handler