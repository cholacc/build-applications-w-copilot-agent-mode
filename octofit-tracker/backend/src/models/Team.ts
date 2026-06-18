import { Schema, model, Document, Types } from 'mongoose'
import { IUser } from './User'

export interface ITeam extends Document {
  name: string
  members: Types.ObjectId[]
  createdAt: Date
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
})

export default model<ITeam>('Team', teamSchema)
