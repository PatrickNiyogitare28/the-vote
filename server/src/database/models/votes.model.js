import mongoose from 'mongoose'
import { registerSchema } from 'swaggiffy';

const Schema = mongoose.Schema({
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

registerSchema('Votes', Schema, {orm: 'mongoose'});
const Vote = mongoose.model('Vote', Schema)
export default Vote;