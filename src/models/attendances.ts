import { ObjectId } from 'mongodb'
import CollectionsNames from '../constants/collections.js'
import MongoApi from '../services/mongoApi.js'

interface Attendance {
  _id?: ObjectId
  studentId: ObjectId
  eventId: ObjectId
  studentNames: string
  studentLastNames: string
}

const attendances = MongoApi.getInstance().collection<Attendance>(CollectionsNames.attendances)
