import jwt from 'jsonwebtoken';
import statusCodes from "../helpers/status-codes";
const { OK, BAD_REQUEST, UNAUTHORIZED } = statusCodes;
import EUserType from '../enums/user-type';

export const VoterMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) return res.json({ success: false, message: 'Token required' }).status(UNAUTHORIZED);
    const [, token] = authorization.split(' ');
    if(!token) return res.json({ success: false, message: 'Token required' }).status(UNAUTHORIZED);
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded?.user_type != EUserType.VOTER) return res.json({success: false, message: 'Voter access denied'}).status(UNAUTHORIZED);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.json({ success: false, message: 'Invalid token' }).status(UNAUTHORIZED);
    }
}