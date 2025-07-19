const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    totalPoints: {
        type: Number,
        default: 0,
    }
}, {
        timestamps: true //CrateAt and UpdatedAt timeStamps
    }

)

module.exports = mongoose.model('User', UserSchema);