const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Function to convert Excel date to readable date format
function excelDateToJSDate(excelDate) {
  // Excel's epoch starts from 1/1/1900
  // JavaScript's epoch starts from 1/1/1970
  // Need to account for Excel's leap year bug
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
}

// Read the Excel file
const workbook = XLSX.readFile('./BattedBallData.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawData = XLSX.utils.sheet_to_json(sheet);

// Reformat the data
const data = rawData.map(row => {
  let [batterLastName, batterFirstName] = row.BATTER.split(', ');
  let [pitcherLastName, pitcherFirstName] = row.PITCHER.split(', ');
  return {
    ...row,
    BATTER: `${batterFirstName} ${batterLastName}`,
    PITCHER: `${pitcherFirstName} ${pitcherLastName}`,
    GAME_DATE: excelDateToJSDate(row.GAME_DATE)
  };
});

// Get unique batters
const batters = [...new Set(data.map(row => row.BATTER))].sort();

app.get('/api/batters', (req, res) => {
  res.json(batters);
});

app.get('/api/search', (req, res) => {
  const { batter } = req.query;
  if (!batter) {
    return res.status(400).json({ error: 'Batter name is required' });
  }

  const results = data.filter(row => 
    row.BATTER.toLowerCase() === batter.toLowerCase()
  );

  res.json(results);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});