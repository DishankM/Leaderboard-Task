const ClaimHistory = require('../models/ClaimHistory')
const User = require('../models/User');


//Get all User 

const getUsers = async (req, res) => {
    try{
        const users = await User.find({}).sort({totalPoints: -1});
        res.json(users);
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

//Add a new User 
const addUser = async (req, res) => {
    const {name} = req.body;

    if(!name){
        return res.status(400).json({
            success: false,
            message: 'User name is required'
        });
    }

    try {
        const userExists = await User.findOne({name});

        if(userExists){
            return res.status(400).json({
                success: false,
                message: 'User with this name already exists'
            });
        }

        const user = new User({
            name,
            totalPoints: 0
        });

        const createdUser = await user.save();
        res.status(201).json(createdUser);
    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}


//Claim random points for the user

const claimPoints = async (req, res) => {
    const { userId } = req.params;  

    
    
    try {
        
        // Generate random points between 1 to 10
        const points = Math.floor(Math.random() * 10) + 1;

        // Update user's total points
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { totalPoints: points } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Create Claim History record
        const claimHistory = new ClaimHistory({
            userId,
            points,
            claimedAt: new Date()
        });

        await claimHistory.save();

        res.json({
            success: true,
            user: updatedUser,
            pointsAwarded: points
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get rankings of all users
const getRankings = async (req, res) => {
    try {
        
        const users = await User.find({})
            .sort({ totalPoints: -1 })
            .select('name totalPoints');

        // Add rank to each user
        const rankedUsers = users.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            totalPoints: user.totalPoints,
            _id: user._id
        }));

        res.json(rankedUsers);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Get claim history for a user
const getClaimHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const history = await ClaimHistory.find({ userId })
            .populate('userId', 'name')
            .sort({ claimedAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getUsers,
    addUser,
    claimPoints,
    getRankings,
    getClaimHistory
};

