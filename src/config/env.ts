import "dotenv/config"

export const ENVIRONMENT = process.env.ENVIRONMENT || "development"
export const PORT = process.env.PORT || 3000
export const FRONTEND_URL = process.env.FRONTEND_URL || ''