// Fix: Implemented a mock backend server to provide data for the Hidden Gems feature.
// This file sets up a simple Express server to provide mock data for the "Hidden Gems" feature.
// In a real application, this would connect to a database like MongoDB.
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Mock data for hidden gems, matching the 'HiddenGem' type in the frontend.
const hiddenGems = [
  {
    _id: "1",
    name: "Tirathgarh Falls",
    description: "A stunning multi-tiered waterfall nestled deep in the Kanger Valley. Less crowded than Chitrakote, it offers a serene experience and a chance to swim in the lower pools.",
    imageUrl: "https://picsum.photos/seed/tirathgarh/800/600",
    submittedBy: "AdventurousSoul",
    tags: ["nature", "waterfall", "adventure"],
  },
  {
    _id: "2",
    name: "Kotumsar Cave",
    description: "One of the longest natural caves in the world, known for its stalactite and stalagmite formations. It's an underground wonder that feels like another world.",
    imageUrl: "https://picsum.photos/seed/kotumsar/800/600",
    submittedBy: "CaveExplorer",
    tags: ["adventure", "caves", "geology"],
  },
  {
    _id: "3",
    name: "Achanakmar Tiger Reserve",
    description: "A lesser-known tiger reserve that's part of the larger Achanakmar-Amarkantak Biosphere Reserve. A great place for wildlife enthusiasts looking for an off-the-beaten-path safari.",
    imageUrl: "https://picsum.photos/seed/achanakmar/800/600",
    submittedBy: "WildLifeLover",
    tags: ["wildlife", "nature", "safari"],
  },
  {
    _id: "4",
    name: "Gadiya Mountain (Kanker)",
    description: "A historical fort on a mountain with a natural lake at the top that never dries. Offers panoramic views and a bit of a trek to reach the summit.",
    imageUrl: "https://picsum.photos/seed/gadiya/800/600",
    submittedBy: "HistoryBuff",
    tags: ["history", "trekking", "viewpoint"],
  },
  {
    _id: "5",
    name: "Bhoramdeo Temple",
    description: "Often called the 'Khajuraho of Chhattisgarh', this 11th-century temple complex is known for its intricate erotic sculptures and beautiful architecture amidst the Maikal mountains.",
    imageUrl: "https://picsum.photos/seed/bhoramdeo/800/600",
    submittedBy: "ArchaeoFan",
    tags: ["history", "temple", "architecture"],
  },
];

// Define the API route to serve the hidden gems data
app.get('/api/gems', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/gems - Responding with ${hiddenGems.length} gems.`);
  res.json(hiddenGems);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Backend server for Chhattisgarh Tourism is listening at http://localhost:${port}`);
  console.log(`Visit http://localhost:${port}/api/gems to see the hidden gems data.`);
});
