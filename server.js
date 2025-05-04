import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Simple proxy endpoint
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(url);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Failed to fetch URL");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
