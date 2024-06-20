const mongoose = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    seedData(); // Call the seed function
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define your seed data
const users = [
  {
    username: "user1",
    email: "user1@example.com",
    thoughts: [], // Will be filled after thoughts are created
    friends: [], // Will be filled after users are created
  },
  {
    username: "user2",
    email: "user2@example.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "user3",
    email: "user3@example.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "user4",
    email: "user4@example.com",
    thoughts: [],
    friends: [],
  },
];

const thoughts = [
  {
    thoughtText: "This is a thought by user1",
    username: "user1",
    reactions: [],
  },
  {
    thoughtText: "This is another thought by user1",
    username: "user1",
    reactions: [],
  },
  {
    thoughtText: "This is a thought by user2",
    username: "user2",
    reactions: [],
  },
];

const reactions = [
  {
    reactionBody: "Great thought!",
    username: "user2",
    createdAt: new Date(),
  },
  {
    reactionBody: "I agree!",
    username: "user1",
    createdAt: new Date(),
  },
];

// Function to seed the data
async function seedData() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded:", createdUsers);

    // Create thoughts and associate them with users
    const createdThoughts = [];
    for (const thoughtData of thoughts) {
      const thought = await Thought.create(thoughtData);
      createdThoughts.push(thought);
      const user = await User.findOne({ username: thought.username });
      user.thoughts.push(thought._id);
      await user.save();
      console.log("Thought seeded:", thought);
    }

    // Create reactions and associate them with thoughts
    for (let i = 0; i < reactions.length; i++) {
      const reactionData = reactions[i];
      const thought = createdThoughts[i % createdThoughts.length]; // Distribute reactions among thoughts
      thought.reactions.push(reactionData);
      await thought.save();
      console.log("Reaction seeded:", reactionData);
    }

    // Add friends
    const user1 = await User.findOne({ username: "user1" });
    const user2 = await User.findOne({ username: "user2" });
    const user3 = await User.findOne({ username: "user3" });
    const user4 = await User.findOne({ username: "user4" });

    user1.friends.push(user2._id); // user1 has 1 friend (user2)
    user2.friends.push(user1._id, user3._id, user4._id); // user2 has 3 friends (user1, user3, user4)

    await user1.save();
    await user2.save();

    console.log("Friends added:");
    console.log("User1 friends:", user1.friends);
    console.log("User2 friends:", user2.friends);

    console.log("Database seeding completed!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
}
