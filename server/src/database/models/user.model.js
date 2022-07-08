import mongoose from 'mongoose';
import { registerSchema } from 'swaggiffy';
import EUserType from '../../enums/user-type';

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    user_type: {
        type: String,
        require: true,
        default: EUserType.NEC_ADMIN
    },
    
})

registerSchema('Auth', Schema, {orm: 'mongoose'});
const User = mongoose.model('User', Schema);
export default User;