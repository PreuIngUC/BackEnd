import { ObjectId } from 'mongodb'
import CollectionsNames from '../constants/collections.js'
import MongoApi from '../services/mongoApi.js'

interface Schedule {
  day: number
  startTime: number
  endTIme: number
}

interface Section {
  _id?: ObjectId
  courseId: ObjectId
  schedules: Array<Schedule>
  teachers: Array<ObjectId>
  students: Array<ObjectId>
}

const sections = MongoApi.getInstance().collection<Section>(CollectionsNames.sections)
