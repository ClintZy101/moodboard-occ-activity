const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); 


// MongoDB Connection
mongoose
  .connect(process.env.DATABASE_URL,)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Moodboard Model
const MoodboardSchema = new mongoose.Schema({
  photoUrl: { type: String, required: true },
  caption: { type: String, required: true },
});

const Moodboard = mongoose.model("Moodboard", MoodboardSchema);

// Routes
app.get("/api/moodboard", async (req, res) => {
  try {
    const items = await Moodboard.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch moodboard items", error: err });
  }
});

app.post("/api/moodboard", async (req, res) => {
  const { photoUrl, caption } = req.body;
  try {
    const newItem = new Moodboard({ photoUrl, caption });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Failed to create moodboard item", error: err });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
