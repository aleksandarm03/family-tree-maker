const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const dataFilePath = path.join(__dirname, 'data.json');

// Ruta za osnovni URL
app.get('/', (req, res) => {
  res.send('Server je pokrenut!');
});

// Endpoint za dobijanje podataka
app.get('/api/family', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Greška pri čitanju fajla' });
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint za dodavanje novog člana
app.post('/api/family', (req, res) => {
  const newMember = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Greška pri čitanju fajla' });
    }

    const familyData = JSON.parse(data);
    familyData.push(newMember);

    fs.writeFile(dataFilePath, JSON.stringify(familyData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Greška pri upisu u fajl' });
      }
      res.json({ message: 'Član uspešno dodat', newMember });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`);
});