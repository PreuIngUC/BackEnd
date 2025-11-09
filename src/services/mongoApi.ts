import { Collection, Db, Document, MongoClient, ServerApiVersion } from 'mongodb'
import env from '../config/env.js'
import { NoDBError } from '../utils/errors/mongo.js'

class MongoApi {
  private static instance: MongoApi
  private mongoClient: MongoClient
  private dbName: string
  private db: Db | null
  private constructor() {
    this.mongoClient = new MongoClient(env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    this.dbName = env.MONGODB_NAME
    this.db = null
  }
  private async connect() {
    if (!this.db) {
      await this.mongoClient.connect()
      await this.mongoClient.db('admin').command({ ping: 1 })
      this.db = this.mongoClient.db(this.dbName)
    }
  }
  static getInstance(): MongoApi {
    if (MongoApi.instance) return MongoApi.instance
    MongoApi.instance = new MongoApi()
    return MongoApi.instance
  }
  static async init(): Promise<void> {
    const inst = MongoApi.getInstance()
    await inst.connect()
  }
  collection<R extends Document>(name: string): Collection<R> {
    if (!this.db) {
      throw new NoDBError()
    }
    return this.db.collection<R>(name)
  }
}

export default MongoApi
