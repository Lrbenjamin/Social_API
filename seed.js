const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User, Thought } = require('./models');  // Adjust the path as necessary

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Seed users
    const users = await User.insertMany([
      { username: 'JohnDoe', email: 'john@example.com' },
      { username: 'JaneDoe', email: 'jane@example.com' },
    ]);

    // Seed thoughts
    const thoughts = await Thought.insertMany([
      { thoughtText: 'This is a seeded thought', username: 'JohnDoe' },
      { thoughtText: 'Another seeded thought', username: 'JaneDoe' },
    ]);

    // Assign thoughts to users
    await User.updateOne({ _id: users[0]._id }, { $push: { thoughts: thoughts[0]._id } });
    await User.updateOne({ _id: users[1]._id }, { $push: { thoughts: thoughts[1]._id } });

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
