import Votes from '../database/models/votes.model';
import Candidate from '../database/models/candidate.model';
import statusCodes from '../helpers/status-codes';

const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = statusCodes;

export const vote = async (req, res) => {
    const user = req.user;
    console.log(req.user)
    const { id } = req.params;
    const candidateExists = await _candidateExists(id);
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

    const alreadyVoted = await Votes.findOne({ voter: user._id });
    if(alreadyVoted) return res.json({ success: true, message: 'You have already voted' }).status(BAD_REQUEST);

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
    const votes = await Votes.find({ candidate: id }).populate('voter');
    return res.json({ success: true, data: { totalVotes: candidate.votes, votes } }).status(OK);
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

