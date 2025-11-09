import { ObjectId } from 'mongodb'
import CollectionsNames from '../constants/collections.js'
import MongoApi from '../services/mongoApi.js'

interface Event {
  _id?: ObjectId
  sectionId: ObjectId
  date: Date
  type: string
}

const events = MongoApi.getInstance().collection<Event>(CollectionsNames.events)
