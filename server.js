import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));


// Initialize PostgreSQL connection pool using Neon DB URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Helper function to create the dropy_candidates table if it doesn't exist
const initDB = async () => {
  try {
    // Initialize Dropy Hub technical candidates table
    const queryDropy = `
      CREATE TABLE IF NOT EXISTS dropy_candidates (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          mobile_number TEXT UNIQUE NOT NULL,
          linkedin_url TEXT,
          skills JSONB DEFAULT '[]'::jsonb,
          projects JSONB DEFAULT '[]'::jsonb,
          github_repos JSONB DEFAULT '[]'::jsonb,
          resume_filename TEXT,
          resume_data TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `;
    await pool.query(queryDropy);

    // Safely add new columns for dropy_candidates
    await pool.query("ALTER TABLE dropy_candidates ADD COLUMN IF NOT EXISTS gender TEXT;");
    await pool.query("ALTER TABLE dropy_candidates ADD COLUMN IF NOT EXISTS address TEXT;");
    await pool.query("ALTER TABLE dropy_candidates ADD COLUMN IF NOT EXISTS year_of_passing TEXT;");
    await pool.query("ALTER TABLE dropy_candidates ADD COLUMN IF NOT EXISTS degree TEXT;");
    await pool.query("ALTER TABLE dropy_candidates ADD COLUMN IF NOT EXISTS college_name TEXT;");

    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

initDB();

// API endpoint to submit a new Dropy Candidate application
app.post("/api/dropy-candidates", async (req, res) => {
  try {
    const { 
      full_name, email, mobile_number, linkedin_url,
      gender, address, year_of_passing, degree, college_name,
      skills, projects, github_repos,
      resume_filename, resume_data
    } = req.body;

    if (!full_name || !email || !mobile_number) {
      return res.status(400).json({ error: "Full Name, Email, and Mobile Number are required." });
    }

    const insertQuery = `
      INSERT INTO dropy_candidates (
        full_name, email, mobile_number, linkedin_url,
        gender, address, year_of_passing, degree, college_name,
        skills, projects, github_repos,
        resume_filename, resume_data
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
      RETURNING id, full_name, email, mobile_number, linkedin_url, gender, address, year_of_passing, degree, college_name, skills, projects, github_repos, resume_filename, created_at;
    `;
    
    const values = [
      full_name,
      email,
      mobile_number,
      linkedin_url || null,
      gender || null,
      address || null,
      year_of_passing || null,
      degree || null,
      college_name || null,
      JSON.stringify(skills || []),
      JSON.stringify(projects || []),
      JSON.stringify(github_repos || []),
      resume_filename || null,
      resume_data || null
    ];

    const { rows } = await pool.query(insertQuery, values);
    res.status(201).json(rows[0]);

  } catch (error) {
    console.error("Error inserting Dropy candidate:", error);
    if (error.code === '23505') { // unique violation
      return res.status(409).json({ error: "Application with this email or mobile number already exists." });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to fetch all Dropy candidates (for admin panel)
app.get("/api/dropy-candidates", async (req, res) => {
  try {
    // Automatically delete Dropy candidates older than 2 months
    await pool.query("DELETE FROM dropy_candidates WHERE created_at < NOW() - INTERVAL '2 months';");

    // Fetch the remaining data (including resume for viewing/download)
    const { rows } = await pool.query("SELECT * FROM dropy_candidates ORDER BY created_at DESC;");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching Dropy candidates:", error);
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
