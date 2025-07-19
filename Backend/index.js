const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const claimRoutes = require('./routes/claimRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const historyRoutes = require('./routes/historyRoutes');
const User = require('./models/User');

dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

// Improved pre-populate users function
const prePopulateUsers = async () => {
    try {
        const users = [
            'Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit',
            'Swati', 'Vikram', 'Neha', 'Rajesh', 'Deepa'
        ];

        const operations = users.map(name => ({
            updateOne: {
                filter: { name },
                update: { $setOnInsert: { name, totalPoints: 0 } },
                upsert: true
            }
        }));

        const result = await User.bulkWrite(operations);
        console.log(`Users pre-populated: ${result.upsertedCount} created`);
    } catch (error) {
        console.error('Error pre-populating users:', error.message);
    }
};

app.use('/api/users', userRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/rankings', rankingRoutes);
app.use('/api/history', historyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await prePopulateUsers(); 
});