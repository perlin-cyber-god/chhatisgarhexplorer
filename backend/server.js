// server.js
require('dotenv').config(); // This line loads the .env file
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = 3001;

// --- IMPORTANT ---
// Securely get secrets from environment variables
const mongoUri = process.env.MONGO_URI;
const apiKey = process.env.API_KEY;

if (!mongoUri || !apiKey) {
  console.error("FATAL ERROR: MONGO_URI and API_KEY environment variables are required.");
  process.exit(1);
}

const client = new MongoClient(mongoUri);
const ai = new GoogleGenAI({ apiKey });

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow large image uploads

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db('chhattisgarh_tourism');
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

// --- API Endpoints ---

// GET all hidden gems, sorted by newest first
app.get('/api/gems', async (req, res) => {
  try {
    const gems = await db.collection('gems').find({}).sort({ _id: -1 }).toArray();
    res.json(gems);
  } catch (error) {
    console.error("Failed to fetch gems:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

// POST a new hidden gem with AI enrichment
app.post('/api/gems', async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.name || !userData.description) {
      return res.status(400).json({ message: "Name and description are required." });
    }

    // --- AI CO-PILOT LOGIC ---
    const prompt = `You are a travel content enrichment AI for a Chhattisgarh tourism app.
    Given the following user submission for a "Hidden Gem":
    - Name: "${userData.name}"
    - Description: "${userData.description}"

    Your tasks are:
    1.  Generate an array of 5 or fewer highly relevant, clean, single-word or two-word tags (e.g., "Waterfall", "Trekking", "Ancient Temple").
    2.  Write a single, concise "AI Insight" sentence (max 25 words) that adds a helpful tip, a fascinating fact, or historical context about the place.

    Respond ONLY with a valid JSON object in the following format, with no other text or markdown:
    {
      "aiTags": ["tag1", "tag2"],
      "aiInsight": "This is the insightful sentence."
    }`;

    let enrichedData = {};
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
      
      enrichedData = JSON.parse(response.text);

    } catch (aiError) {
      console.error("AI enrichment failed:", aiError);
    }
    
    const finalGemData = {
      ...userData,
      ...enrichedData,
      createdAt: new Date(),
    };
    
    const result = await db.collection('gems').insertOne(finalGemData);
    const newGem = await db.collection('gems').findOne({ _id: result.insertedId });
    
    res.status(201).json(newGem);

  } catch (error) {
    console.error("Failed to submit gem:", error);
    res.status(500).json({ message: "Error submitting data" });
  }
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
  });
});