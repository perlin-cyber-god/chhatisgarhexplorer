const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3001;

// --- IMPORTANT ---
// Replace the placeholder below with your actual MongoDB Connection URI.
// Make sure your password's special characters (like '@') are URL-encoded.
const mongoUri = "mongodb+srv://perlinrhooney:10%40January13@chhattisgarh-tourism.laftggo.mongodb.net/?appName=chhattisgarh-tourism";

// Create a new MongoClient instance with the connection URI.
const client = new MongoClient(mongoUri);

// A variable to hold the reference to our database once connected.
let db;

/**
 * Connects to the MongoDB database.
 * This function is called once when the server starts.
 */
async function connectToDatabase() {
  try {
    // Await the connection to the MongoDB server.
    await client.connect();
    // Set the 'db' variable to our 'chhattisgarh_tourism' database.
    db = client.db('chhattisgarh_tourism');
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    // If the connection fails, log the error and exit the process.
    console.error("Could not connect to MongoDB", error);
    process.exit(1); // Exit the application if the database connection fails.
  }
}

// Allow Cross-Origin Resource Sharing (CORS) so your frontend can make requests.
app.use(cors());

// Define the API endpoint that your website will call to get the hidden gems.
app.get('/api/gems', async (req, res) => {
  // Check if the database connection has been established.
  if (!db) {
    res.status(500).json({ message: "Database connection has not been established." });
    return;
  }

  try {
    // Get a reference to the 'gems' collection in our database.
    const gemsCollection = db.collection('gems');
    // Find all documents in the collection and convert them to an array.
    const gems = await gemsCollection.find({}).toArray();
    // Send the array of gems back to the client as a JSON response.
    res.json(gems);
  } catch (error) {
    console.error("Failed to fetch gems:", error);
    res.status(500).json({ message: "Error fetching data from the database." });
  }
});

// Start the server only after the database connection is successful.
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
  });
});
