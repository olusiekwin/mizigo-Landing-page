const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies

// Ensure the database directory exists
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'mizigo.db');

// Initialize the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    throw err;
  } 
  console.log('Connected to the SQLite database.');
  
  // Initialize all tables
  initializeTables();
});

// Function to initialize all database tables
function initializeTables() {
  const tables = [
    {
      name: 'waitlist',
      schema: `
        CREATE TABLE IF NOT EXISTS waitlist (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE,
          phone TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
    },
    {
      name: 'driver_registrations',
      schema: `
        CREATE TABLE IF NOT EXISTS driver_registrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT,
          lastName TEXT,
          email TEXT,
          phone TEXT,
          dateOfBirth TEXT,
          nationalId TEXT,
          vehicleType TEXT,
          licensePlate TEXT,
          make TEXT,
          model TEXT,
          year TEXT,
          capacity TEXT,
          driverLicense BOOLEAN,
          vehicleRegistration BOOLEAN,
          insurance BOOLEAN,
          taxCompliance BOOLEAN,
          backgroundCheck BOOLEAN,
          yearsOfExperience TEXT,
          previousCompany TEXT,
          serviceAreas TEXT,
          availabilityType TEXT,
          additionalInfo TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
    },
    {
      name: 'contacts',
      schema: `
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
    }
  ];

  // Create tables sequentially
  tables.forEach(table => {
    db.run(table.schema, (err) => {
      if (err) {
        console.error(`Error creating ${table.name} table:`, err.message);
      } else {
        console.log(`${table.name} table created or already exists.`);
      }
    });
  });
}

// Utility function for input validation
function validateFields(requiredFields, data) {
  const errors = [];
  
  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push(`${field} is required`);
    }
  });
  
  return errors;
}

// API Routes
app.post('/api/waitlist', (req, res) => {
  const { email, phone } = req.body;
  
  // Validate input
  const errors = validateFields(['email'], { email, phone });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  const sql = `INSERT INTO waitlist (email, phone) VALUES (?, ?)`;

  db.run(sql, [email, phone], function(err) {
    if (err) {
      console.error('Waitlist insert error:', err.message);
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Email already exists on waitlist' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Added to waitlist', id: this.lastID });
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Validate input
  const errors = validateFields(['name', 'email', 'message'], { name, email, message });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
  
  db.run(sql, [name, email, message], function(err) {
    if (err) {
      console.error('Contact insert error:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Contact message received', id: this.lastID });
  });
});

app.post('/api/driver-registration', (req, res) => {
  const driverData = req.body;
  
  // Validate the data structure
  if (!driverData.personalInfo || !driverData.vehicleInfo || 
      !driverData.documentInfo || !driverData.experienceInfo) {
    return res.status(400).json({ 
      error: "Invalid request structure. Missing required sections." 
    });
  }
  
  // Validate required personal fields
  const personalFieldErrors = validateFields(
    ['firstName', 'lastName', 'email', 'phone'], 
    driverData.personalInfo
  );
  
  // Validate required vehicle fields
  const vehicleFieldErrors = validateFields(
    ['vehicleType', 'licensePlate', 'make', 'model'], 
    driverData.vehicleInfo
  );
  
  const allErrors = [...personalFieldErrors, ...vehicleFieldErrors];
  if (allErrors.length > 0) {
    return res.status(400).json({ errors: allErrors });
  }

  const sql = `
    INSERT INTO driver_registrations (
      firstName, lastName, email, phone, dateOfBirth, nationalId,
      vehicleType, licensePlate, make, model, year, capacity,
      driverLicense, vehicleRegistration, insurance, taxCompliance, backgroundCheck,
      yearsOfExperience, previousCompany, serviceAreas, availabilityType, additionalInfo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    driverData.personalInfo.firstName,
    driverData.personalInfo.lastName,
    driverData.personalInfo.email,
    driverData.personalInfo.phone,
    driverData.personalInfo.dateOfBirth,
    driverData.personalInfo.nationalId,
    driverData.vehicleInfo.vehicleType,
    driverData.vehicleInfo.licensePlate,
    driverData.vehicleInfo.make,
    driverData.vehicleInfo.model,
    driverData.vehicleInfo.year,
    driverData.vehicleInfo.capacity,
    driverData.documentInfo.driverLicense,
    driverData.documentInfo.vehicleRegistration,
    driverData.documentInfo.insurance,
    driverData.documentInfo.taxCompliance,
    driverData.documentInfo.backgroundCheck,
    driverData.experienceInfo.yearsOfExperience,
    driverData.experienceInfo.previousCompany,
    driverData.experienceInfo.serviceAreas,
    driverData.experienceInfo.availabilityType,
    driverData.experienceInfo.additionalInfo
  ];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Driver registration error:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Driver registration submitted', id: this.lastID });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});