import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 5174;
const DATA_DIR = path.join(__dirname, 'saved-data');
const ANATOMY_DATA_FILE = path.join(__dirname, 'src', 'data', 'anatomyData.ts');

// Create data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Helper function to update anatomyData.ts
function updateAnatomyDataFile(anatomyId, labels) {
  try {
    let fileContent = fs.readFileSync(ANATOMY_DATA_FILE, 'utf-8');
    
    // Format labels for the source code
    const labelsCode = labels
      .map(l => `      { id: '${l.id}', text: '${l.text.replace(/'/g, "\\'")}', x: ${l.x}, y: ${l.y} }`)
      .join(',\n');

    // Find the item block and replace labels more carefully
    // Match the entire item object from id: 'anatomyId' to the closing of labels array
    const startMarker = `id: '${anatomyId}'`;
    const startIdx = fileContent.indexOf(startMarker);
    
    if (startIdx === -1) {
      console.error(`Could not find anatomy item with id: ${anatomyId}`);
      return false;
    }

    // Find the labels: [ opening
    const labelsMarker = 'labels: [';
    const labelsStartIdx = fileContent.indexOf(labelsMarker, startIdx);
    
    if (labelsStartIdx === -1) {
      console.error(`Could not find labels array for ${anatomyId}`);
      return false;
    }

    // Find the closing ] of the labels array
    let bracketCount = 0;
    let labelsEndIdx = labelsStartIdx + labelsMarker.length;
    let inString = false;
    let escapeNext = false;
    
    for (let i = labelsStartIdx + labelsMarker.length; i < fileContent.length; i++) {
      const char = fileContent[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"' || char === "'") {
        inString = !inString;
        continue;
      }
      
      if (!inString) {
        if (char === '[') {
          bracketCount++;
        } else if (char === ']') {
          if (bracketCount === 0) {
            labelsEndIdx = i;
            break;
          }
          bracketCount--;
        }
      }
    }

    // Replace the content between labels: [ and ]
    const beforeLabels = fileContent.substring(0, labelsStartIdx + labelsMarker.length);
    const afterLabels = fileContent.substring(labelsEndIdx);
    
    const newContent = beforeLabels + '\n' + labelsCode + '\n    ' + afterLabels;
    
    fs.writeFileSync(ANATOMY_DATA_FILE, newContent, 'utf-8');
    console.log(`✓ Updated anatomyData.ts for ${anatomyId}`);
    return true;
  } catch (error) {
    console.error('Error updating anatomyData.ts:', error);
    return false;
  }
}

// Save labels
app.post('/api/save/:anatomyId', (req, res) => {
  const { anatomyId } = req.params;
  const labels = req.body;

  try {
    // Save to backup file
    const filePath = path.join(DATA_DIR, `${anatomyId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(labels, null, 2));

    // Update anatomyData.ts
    const updated = updateAnatomyDataFile(anatomyId, labels);

    res.json({ 
      success: true, 
      message: 'Data saved successfully',
      fileUpdated: updated 
    });
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
