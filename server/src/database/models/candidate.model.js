import mongoose from 'mongoose'
import { registerSchema } from 'swaggiffy';

const Schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gender: {
        type: String,
        require: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    missionStatement: {
        type: String,
        require: true
    },
    votes: {
        type: Number,
        default: 0
    }
})

registerSchema('Candidate', Schema, {orm: 'mongoose'});
const Candidate = mongoose.model('Candidate', Schema)
export default Candidate;