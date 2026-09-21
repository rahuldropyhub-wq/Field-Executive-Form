const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

app.post('/api/submit', upload.single('resume'), (req, res) => {
    try {
        const formData = {
            ...req.body,
            resumePath: req.file ? req.file.path : null,
            submittedAt: new Date().toISOString()
        };

        const jsonFilePath = path.join(__dirname, 'candidates.json');
        
        let candidates = [];
        if (fs.existsSync(jsonFilePath)) {
            const fileData = fs.readFileSync(jsonFilePath, 'utf8');
            candidates = JSON.parse(fileData || '[]');
        }

        candidates.push(formData);

        fs.writeFileSync(jsonFilePath, JSON.stringify(candidates, null, 2));

        res.status(200).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Error processing application' });
    }
});

// Handle Multer Errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size exceeds 5MB limit.' });
        }
        return res.status(400).json({ error: err.message });
    } else if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
