import jwt from 'jsonwebtoken';

import User from '../database/models/user.model';
import status  from '../helpers/status-codes'
import { hashPassword, verifyPassword } from '../helpers/hash-password'
import EUserType from '../enums/user-type';
const { CREATED, OK, BAD_REQUEST, UNAUTHORIZED } = status;

export const adminSignup = async (req, res) => {
    const { name, email, password, nationalId, phone, address  } = req.body;
    
    const userExists = await _userExists(email);
    if(userExists) return res.json({ success: false, message: 'User already exists' }).status(BAD_REQUEST);
   
    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword, nationalId, phone, address });
    try{
        const savedUser = await user.save();
        return res.json({ success: true, message: 'User created successfully', data: savedUser }).status(CREATED);
    }
    catch(err){
        return res.json({ success: false, message: 'Error creating user', error: err }).status(BAD_REQUEST);
    }
}

export const voterSignup = async (req, res) => {
    const { name, email, password, nationalId, phone, address  } = req.body;
    
    const userExists = await _userExists(email);
    if(userExists) return res.json({ success: false, message: 'User already exists' }).status(BAD_REQUEST);
   
    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword, nationalId, phone, address, user_type: EUserType.VOTER });
    try{
        const savedUser = await user.save();
        const token = _jwtSigner({ id: savedUser._id, email: savedUser.email, user_type: user?.user_type });
        return res.json({ success: true, message: 'User created successfully', data: { token, user: savedUser } }).status(CREATED);
    }
    catch(err){
        return res.json({ success: false, message: 'Error creating user', error: err }).status(BAD_REQUEST);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await _getUser(email);
    if(!user) return res.json({ success: false, message: 'Invalid credentials' }).status(UNAUTHORIZED);
    
    const isValidPassword = await verifyPassword(password, user?.password)
    if(!isValidPassword) return res.json({ success: false, message: 'Invalid credentials' }).status(UNAUTHORIZED);
    
    const {name, _id } = user;
    const token = _jwtSigner({ _id, email, name, phone: user?.phone, nationalId: user?.nationalId, user_type: user?.user_type, address: user?.address });
    return res.json({ success: true, message: 'User logged in successfully', data: { token } }).status(OK);
}

export const getProfile = async (req, res) => {
    return res.json({ success: true, data: { user: req.user } }).status(OK);
}

export const _userExists = async (email) => {
    let user;
    try{
        user = await User.findOne({ email });
    }
    catch(err){
        return false;
    }
   if(user) return true;
   return false;
}

const _getUser = async (email) => {
    let user;
    try{
        user = await User.findOne({ email });
    }
    catch(err){
        return false;
    }
   if(user) return user;
   return false;
}

const _jwtSigner = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
}