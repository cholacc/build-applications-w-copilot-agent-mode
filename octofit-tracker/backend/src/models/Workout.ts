import { Schema, model, Document } from 'mongoose'

export interface IWorkout extends Document {
  name: string
  description?: string
  durationMinutes: number
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number, required: true }
})

export default model<IWorkout>('Workout', workoutSchema)
