import { ObjectId } from 'mongodb'
import CollectionsNames from '../constants/collections.js'
import MongoApi from '../services/mongoApi.js'

interface User {
  _id?: ObjectId
  auth0Id?: string
  rut: string
  names: string
  lastNames: string
}

const users = MongoApi.getInstance().collection<User>(CollectionsNames.users)
