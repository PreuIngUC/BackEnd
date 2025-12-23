import createApp from '../dist/appFactory.js'

let cachedCallback

async function handler(req, res) {
    try {
        if (!cachedCallback) {
            console.log('Initializing app...')
            const app = await createApp()
            cachedCallback = app.callback()
            console.log('App initialized successfully')
        }
        return cachedCallback(req, res)
    } catch (error) {
        console.error('Function error:', error)
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        })
    }
}

export default handler