import { Schema, model, Document, Types } from 'mongoose'

export interface IActivity extends Document {
  user: Types.ObjectId
  type: string
  durationMinutes: number
  distanceKm?: number
  performedAt: Date
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  performedAt: { type: Date, default: Date.now }
})

export default model<IActivity>('Activity', activitySchema)
