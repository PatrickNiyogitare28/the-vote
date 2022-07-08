import Candidate from "../database/models/candidate.model";
import User  from "../database/models/user.model";
import statusCodes from "../helpers/status-codes";
import EUserType from "../enums/user-type";
import { _userExists } from "./auth.controller";

const {BAD_REQUEST, OK, CREATED, INTERNAL_SERVER_ERROR} = statusCodes;
export const register = async (req, res) => {
    const { name, email, phone, profilePicture, gender, missionStatement, address,nationalId } = req.body;
    
    const userExists = await _userExists(email);
    if(userExists) return res.json({success: false, message:'User with the same email exists'}).status(BAD_REQUEST)
    
   let user;
   try{
        user = new User({ name, email, phone, address, user_type: EUserType.CANDIDATE, nationalId });
        await user.save()
   }
   catch(e){
    return res.json({success: false, message: "Error creating user", error: e}).status(INTERNAL_SERVER_ERROR)
   }

    const candidate = new Candidate({
        user: user?._id,
        gender,
        profilePicture,
        missionStatement
    })

    try{
        await candidate.save();
    }
    catch(e){
        console.log(e)
        return res.json({success: false, message: "Error creating candidate" }).status(INTERNAL_SERVER_ERROR)
    }

    return res.json({success: true, data: {
        user,
        candidate
    }})
    .status(CREATED)
}

export const getAllCandidates = async (req, res) => {
    const data = await Candidate.find().populate('user');
    return res.json({success: true, data}).status(OK);
}


const _candidateExists = async (email) => {
    try{
        const candidate = await Candidate.findOne({email})
        if(candidate) return candidate;
        return false;
    }
    catch(e){   
        return false;
    }
}   