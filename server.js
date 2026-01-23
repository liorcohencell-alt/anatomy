import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5174;
const DATA_DIR = path.join(__dirname, 'saved-data');

// Create data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Save labels
app.post('/api/save/:anatomyId', (req, res) => {
  const { anatomyId } = req.params;
  const labels = req.body;

  try {
    const filePath = path.join(DATA_DIR, `${anatomyId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(labels, null, 2));
    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Load labels
app.get('/api/load/:anatomyId', (req, res) => {
  const { anatomyId } = req.params;

  try {
    const filePath = path.join(DATA_DIR, `${anatomyId}.json`);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const labels = JSON.parse(data);
      res.json({ success: true, data: labels });
    } else {
      res.json({ success: true, data: null });
    }
  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
