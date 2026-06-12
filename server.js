import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize PostgreSQL connection pool using Neon DB URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Helper function to create the candidates table if it doesn't exist
const initDB = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS candidates (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          mobile_number TEXT UNIQUE NOT NULL,
          qualification TEXT NOT NULL,
          date_of_birth DATE NOT NULL,
          work_location TEXT NOT NULL,
          notice_period TEXT NOT NULL,
          latitude DOUBLE PRECISION,
          longitude DOUBLE PRECISION,
          location_address TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;
    await pool.query(query);
    
    // Safely add new columns for state and district 
    await pool.query("ALTER TABLE candidates ADD COLUMN IF NOT EXISTS state TEXT;");
    await pool.query("ALTER TABLE candidates ADD COLUMN IF NOT EXISTS district TEXT;");
    await pool.query("ALTER TABLE candidates ADD COLUMN IF NOT EXISTS gender TEXT;");
    await pool.query("ALTER TABLE candidates ADD COLUMN IF NOT EXISTS documents_verified BOOLEAN DEFAULT false;");
    await pool.query("ALTER TABLE candidates ADD COLUMN IF NOT EXISTS previous_experience TEXT;");
    
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

initDB();

// API endpoint to submit a new application
app.post("/api/candidates", async (req, res) => {
  try {
    const { 
      full_name, email, mobile_number, qualification,
      previous_experience,
      date_of_birth, state, district,
      gender, documents_verified,
      latitude, longitude, location_address 
    } = req.body;

    const insertQuery = `
      INSERT INTO candidates (
        full_name, email, mobile_number, qualification,
        previous_experience,
        date_of_birth, state, district, work_location, notice_period,
        gender, documents_verified,
        latitude, longitude, location_address
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
      RETURNING *;
    `;
    
    const values = [
      full_name, email, mobile_number, qualification,
      previous_experience || null,
      date_of_birth, state, district, `${district}, ${state}`, 'N/A',
      gender || null, documents_verified || false,
      latitude, longitude, location_address
    ];

    const { rows } = await pool.query(insertQuery, values);
    res.status(201).json(rows[0]);

  } catch (error) {
    console.error("Error inserting candidate:", error);
    if (error.code === '23505') { // unique violation
      return res.status(409).json({ error: "Application with this email or mobile number already exists." });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to fetch all candidates (for admin panel)
app.get("/api/candidates", async (req, res) => {
  try {
    // Automatically delete candidates older than 2 months
    await pool.query("DELETE FROM candidates WHERE created_at < NOW() - INTERVAL '2 months';");

    // Fetch the remaining data
    const { rows } = await pool.query("SELECT * FROM candidates ORDER BY created_at DESC;");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Secure Admin Login Endpoint
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  
  // These should ideally be in .env, but hardcoded here for the immediate requirement while keeping them off the frontend bundle
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "Rahuldropyhub@gmail.com";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Rahullucky@1456";

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Return a simple mock token. For a real app, use JWT.
    res.status(200).json({ token: "secure_admin_token_12345" });
  } else {
    res.status(401).json({ error: "Invalid admin credentials" });
  }
});

// Export the Express API for Vercel
export default app;

// Listen to port for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
