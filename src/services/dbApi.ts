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
    } else {
      connectionString = env.DATABASE_URL_UNPOOLED
    }
    const adapter = new PrismaPg({ connectionString })
    this.prisma = new PrismaClient({
      adapter,
      log: env.ITS_PROD || env.ITS_PREV ? ['error', 'warn'] : ['query', 'error', 'warn'],
    })
  }
  static getInstance(): DbApi {
    if (DbApi.instance) return DbApi.instance
    DbApi.instance = new DbApi()
    return DbApi.instance
  }
  user() {
    return this.prisma.user
  }
  studentProfile() {
    return this.prisma.studentProfile
  }
  staffProfile() {
    return this.prisma.staffProfile
  }
  creationJob() {
    return this.prisma.creationJob
  }
  creationJobItem() {
    return this.prisma.creationJobItem
  }
  async disconnect() {
    await this.prisma.$disconnect()
  }
  static async init(): Promise<void> {
    const inst = DbApi.getInstance()
    await inst.prisma.$connect()
  }
  getPrisma() {
    return this.prisma
  }
}

export default DbApi
