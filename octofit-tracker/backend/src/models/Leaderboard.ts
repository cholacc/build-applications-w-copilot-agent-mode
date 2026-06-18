import { Schema, model, Document, Types } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId
  score: number
  rank: number
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true }
})

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema)
