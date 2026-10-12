import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint untuk mengetes status koneksi PostgreSQL
app.get('/api/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as current_time, current_database() as db_name');
        res.json({
            status: 'CONNECTED',
            message: 'Berhasil terhubung ke PostgreSQL!',
            database: result.rows[0].db_name,
            serverTime: result.rows[0].current_time
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: 'Gagal terhubung ke PostgreSQL',
            error: err.message
        });
    }
});

// Endpoint untuk mengambil data projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error (projects):', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengambil data articles
app.get('/api/articles', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM articles');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error (articles):', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengambil data certifications
app.get('/api/certifications', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM certifications');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error (certifications):', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengambil data deliverables
app.get('/api/deliverables', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM deliverables');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error (deliverables):', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengambil data education
app.get('/api/educations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM educations');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error (educations):', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengambil data endorsements
app.get('/api/endorsements', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM endorsements');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error (endorsements):', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengambil data experience
app.get('/api/work_experiences', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM work_experiences');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error (work_experiences):', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengambil data organization
app.get('/api/organization', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM organization');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error (organization):', err.message);
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// ENDPOINT POST (MENAMBAH DATA BARU)
// ==========================================

// 1. POST Project Baru
app.post('/api/projects', async (req, res) => {
    try {
        const { id, title, type, description, image, icon, link, tools } = req.body;
        const result = await pool.query(
            `INSERT INTO projects (id, title, type, description, image, icon, link, tools) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [id, title, type, description, image, icon, link, JSON.stringify(tools || [])]
        );
        res.status(201).json({ message: 'Project berhasil ditambahkan!', data: result.rows[0] });
    } catch (err) {
        console.error('Error insert project:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 2. POST Article Baru
app.post('/api/articles', async (req, res) => {
    try {
        const { title, url } = req.body;
        const result = await pool.query(
            `INSERT INTO articles (title, url) VALUES ($1, $2) RETURNING *`,
            [title, url]
        );
        res.status(201).json({ message: 'Article berhasil ditambahkan!', data: result.rows[0] });
    } catch (err) {
        console.error('Error insert article:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 3. POST Certification Baru
app.post('/api/certifications', async (req, res) => {
    try {
        const { title, issuer, year, image, link } = req.body;
        const result = await pool.query(
            `INSERT INTO certifications (title, issuer, year, image, link) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, issuer, year, image, link]
        );
        res.status(201).json({ message: 'Certification berhasil ditambahkan!', data: result.rows[0] });
    } catch (err) {
        console.error('Error insert certification:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// 4. POST Organization Baru
app.post('/api/organization', async (req, res) => {
    try {
        const { company, role, period, type, location, logo, description } = req.body;
        const result = await pool.query(
            `INSERT INTO organization (company, role, period, type, location, logo, description) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [company, role, period, type, location, logo, description || []]
        );
        res.status(201).json({ message: 'Organization berhasil ditambahkan!', data: result.rows[0] });
    } catch (err) {
        console.error('Error insert organization:', err.message);
        res.status(500).json({ error: err.message });
    }
});

//Endpoint untuk mengambil data project
app.listen(5000, async () => {
    console.log('🚀 Server Express berjalan di http://localhost:5000');
    try {
        const res = await pool.query('SELECT current_database()');
        console.log(`✅ TERHUBUNG ke PostgreSQL database: "${res.rows[0].current_database}"`);
    } catch (err) {
        console.log('⚠️  GAGAL terhubung ke PostgreSQL:', err.message);
        console.log('👉 Pastikan file server/.env sudah diisi dengan parameter koneksi DBeaver!');
    }
});


