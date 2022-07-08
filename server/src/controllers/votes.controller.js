import Votes from '../database/models/votes.model';
import Candidate from '../database/models/candidate.model';
import statusCodes from '../helpers/status-codes';

const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = statusCodes;

export const vote = async (req, res) => {
    const { id } = req.params;
    const candidateExists = await _candidateExists(id);

    const alreadyVoted = await Votes.findOne({ voter: user._id });

    if(alreadyVoted) return res.json({ success: false, message: 'You have already voted' }).status(BAD_REQUEST);

    if (!candidateExists) return res.json({ success: false, message: 'Candidate does not exist' }).status(BAD_REQUEST);
    const vote = new Votes({
        voter: user._id,
        candidate: id
    });
    try {
        await vote.save();
    }
    catch (e) {
        return res.json({ success: false, message: 'Error voting' }).status(INTERNAL_SERVER_ERROR);
    }

    const newCandidate = await Candidate.findOneAndUpdate({ _id: id }, { $inc: { votes: 1 } }, { new: true });
    return res.json({
        success: true, message: 'Voted successfully',
        data: {
            candidate: newCandidate
        }
    }).status(OK);
}

export const getVotesByCandidate = async (req, res) => {
    const { id } = req.params;
    const candidate = await _candidateExists(id);
    if (!candidate) return res.json({ success: false, message: 'Candidate does not exist' }).status(BAD_REQUEST);
    const votes = await Votes.find({ candidate: id }).populate('voter').populate('candidate');
    return res.json({ success: true, data: { totalVotes: candidate.votes, votes } }).status(OK);
}

export const getAll = async (req, res) => {
    const votes = await Votes.find().populate('voter').populate('candidate');
    return res.json({ success: true, data: votes }).status(OK);
}

const _candidateExists = async (_id) => {
    try {
        const candidate = await Candidate.findById(_id);
        return candidate;
    }
    catch (e) {
        return false;
    }
}

export const deleteOne = async (req, res) => {
    const user = req.user;

    const votesExists = await Votes.find({voter: user._id});

    if(votesExists.length == 0) return res.json({success: false, message: 'You have not voted'}).status(BAD_REQUEST);

    await Votes.findOneAndDelete({ voter: user._id });
    return res.json({ success: true, message: 'Votes deleted' }).status(OK);
}