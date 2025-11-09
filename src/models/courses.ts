import { ObjectId } from 'mongodb'
import CollectionsNames from '../constants/collections.js'
import MongoApi from '../services/mongoApi.js'

interface Course {
  _id?: ObjectId
  coordinators: Array<ObjectId>
  title: string
}

const courses = MongoApi.getInstance().collection<Course>(CollectionsNames.courses)
