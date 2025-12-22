import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import env from '../config/env.js'

class DbApi {
    private prisma: PrismaClient
    private static instance: DbApi
    private constructor() {
        let connectionString
        if (env.ITS_PROD || env.ITS_PREV) {
            connectionString = env.DATABASE_URL
        }
        else {
            connectionString = env.DATABASE_URL_UNPOOLED
        }
        const adapter = new PrismaPg({connectionString})
        this.prisma = new PrismaClient({adapter})
    }
    static getInstance(): DbApi {
        if (DbApi.instance) return DbApi.instance
        DbApi.instance = new DbApi()
        return DbApi.instance
    }
    user() {
        return this.prisma.user
    }
}

export default DbApi