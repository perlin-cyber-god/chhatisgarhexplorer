// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3001;

// --- IMPORTANT ---
// This is your complete and correctly formatted MongoDB Connection URI.
const mongoUri = "mongodb+srv://perlinrhooney:10%40January13@chhattisgarh-tourism.laftggo.mongodb.net/?appName=chhattisgarh-tourism";
const client = new MongoClient(mongoUri);

// Middleware
app.use(cors());
// Increase the body limit to accept larger payloads (for Base64 images). This is CRITICAL.
app.use(express.json({ limit: '10mb' }));

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('chhattisgarh_tourism'); // Your database name
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit if we can't connect to the DB
  }
};

// --- API Endpoints ---

// GET all hidden gems
app.get('/api/gems', async (req, res) => {
  try {
    const gemsCollection = db.collection('gems');
    // Find all documents and sort by most recent (_id is chronological)
    const gems = await gemsCollection.find({}).sort({ _id: -1 }).toArray();
    res.json(gems);
  } catch (error)    {
    console.error("Failed to fetch gems:", error);
    res.status(500).json({ message: "Error fetching data from database" });
  }
});

// POST a new hidden gem
app.post('/api/gems', async (req, res) => {
  try {
    const gemData = req.body;

    // Basic validation
    if (!gemData.name || !gemData.description || !gemData.imageUrl || !gemData.submittedBy || !gemData.tags) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const gemsCollection = db.collection('gems');
    const result = await gemsCollection.insertOne(gemData);
    
    // Fetch the newly inserted document to send back to the client
    const newGem = await gemsCollection.findOne({ _id: result.insertedId });

    res.status(201).json(newGem);
  } catch (error) {
    console.error("Failed to submit gem:", error);
    res.status(500).json({ message: "Error submitting data to the database" });
  }
});

// Start the server only after the database connection is established
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
  });
});
