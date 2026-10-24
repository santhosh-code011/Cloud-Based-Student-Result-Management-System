/**
 * CloudSRMS - Zero-Dependency Cloud Application Server & REST API
 * Built with standard Node.js runtime modules (http, fs, path, url)
 * No npm dependencies required - perfectly lightweight for GitHub repositories!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'database.json');

// Default initial cloud dataset
const SEED_DATA = [
  {
    id: 'rec-001',
    rollNo: 'CS2024-001',
    name: 'Aarav Sharma',
    department: 'Computer Science & Engineering',
    semester: '4',
    academicYear: '2024-2025',
    subjects: [
      { code: 'CS401', name: 'Cloud Computing Architecture', maxMarks: 100, marksObtained: 94, credits: 4 },
      { code: 'CS402', name: 'Database Management Systems', maxMarks: 100, marksObtained: 88, credits: 4 },
      { code: 'CS403', name: 'Design & Analysis of Algorithms', maxMarks: 100, marksObtained: 92, credits: 4 },
      { code: 'CS404', name: 'Operating Systems & Kernels', maxMarks: 100, marksObtained: 86, credits: 3 },
      { code: 'CS405', name: 'Full-Stack Web Technologies', maxMarks: 100, marksObtained: 95, credits: 3 },
      { code: 'CS406', name: 'Cloud Systems Laboratory', maxMarks: 50, marksObtained: 49, credits: 2 }
    ]
  },
  {
    id: 'rec-002',
    rollNo: 'CS2024-002',
    name: 'Priya Patel',
    department: 'Computer Science & Engineering',
    semester: '4',
    academicYear: '2024-2025',
    subjects: [
      { code: 'CS401', name: 'Cloud Computing Architecture', maxMarks: 100, marksObtained: 82, credits: 4 },
      { code: 'CS402', name: 'Database Management Systems', maxMarks: 100, marksObtained: 79, credits: 4 },
      { code: 'CS403', name: 'Design & Analysis of Algorithms', maxMarks: 100, marksObtained: 85, credits: 4 },
      { code: 'CS404', name: 'Operating Systems & Kernels', maxMarks: 100, marksObtained: 74, credits: 3 },
      { code: 'CS405', name: 'Full-Stack Web Technologies', maxMarks: 100, marksObtained: 88, credits: 3 },
      { code: 'CS406', name: 'Cloud Systems Laboratory', maxMarks: 50, marksObtained: 44, credits: 2 }
    ]
  },
  {
    id: 'rec-003',
    rollNo: 'AI2024-015',
    name: 'Siddharth Verma',
    department: 'Artificial Intelligence & ML',
    semester: '4',
    academicYear: '2024-2025',
    subjects: [
      { code: 'AI401', name: 'Deep Learning & Neural Networks', maxMarks: 100, marksObtained: 96, credits: 4 },
      { code: 'AI402', name: 'Natural Language Processing', maxMarks: 100, marksObtained: 91, credits: 4 },
      { code: 'AI403', name: 'Probabilistic AI Models', maxMarks: 100, marksObtained: 89, credits: 4 },
      { code: 'AI404', name: 'Computer Vision Systems', maxMarks: 100, marksObtained: 94, credits: 3 },
      { code: 'AI405', name: 'MLOps & Cloud Deployment', maxMarks: 100, marksObtained: 98, credits: 3 },
      { code: 'AI406', name: 'AI Research Practicum', maxMarks: 50, marksObtained: 48, credits: 2 }
    ]
  },
  {
    id: 'rec-004',
    rollNo: 'EC2024-042',
    name: 'Ananya Rao',
    department: 'Electronics & Communication',
    semester: '4',
    academicYear: '2024-2025',
    subjects: [
      { code: 'EC401', name: 'Microprocessors & Microcontrollers', maxMarks: 100, marksObtained: 68, credits: 4 },
      { code: 'EC402', name: 'Digital Signal Processing', maxMarks: 100, marksObtained: 72, credits: 4 },
      { code: 'EC403', name: 'Electromagnetic Field Theory', maxMarks: 100, marksObtained: 65, credits: 4 },
      { code: 'EC404', name: 'Linear Integrated Circuits', maxMarks: 100, marksObtained: 70, credits: 3 },
      { code: 'EC405', name: 'Wireless Communication Systems', maxMarks: 100, marksObtained: 78, credits: 3 },
      { code: 'EC406', name: 'DSP & Circuits Lab', maxMarks: 50, marksObtained: 41, credits: 2 }
    ]
  },
  {
    id: 'rec-005',
    rollNo: 'ME2024-019',
    name: 'Rohan Mehta',
    department: 'Mechanical Engineering',
    semester: '4',
    academicYear: '2024-2025',
    subjects: [
      { code: 'ME401', name: 'Thermodynamics & Heat Transfer', maxMarks: 100, marksObtained: 55, credits: 4 },
      { code: 'ME402', name: 'Fluid Mechanics & Machinery', maxMarks: 100, marksObtained: 62, credits: 4 },
      { code: 'ME403', name: 'Kinematics of Machines', maxMarks: 100, marksObtained: 34, credits: 4 },
      { code: 'ME404', name: 'Manufacturing Processes', maxMarks: 100, marksObtained: 58, credits: 3 },
      { code: 'ME405', name: 'Applied Finite Element Analysis', maxMarks: 100, marksObtained: 60, credits: 3 },
      { code: 'ME406', name: 'Thermal Systems Lab', maxMarks: 50, marksObtained: 38, credits: 2 }
    ]
  }
];

// In-Memory Cloud Database
let memoryStore = JSON.parse(JSON.stringify(SEED_DATA));

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      memoryStore = JSON.parse(content);
      console.log(`[CloudSRMS] Database loaded from file: ${memoryStore.length} records`);
    } else {
      console.log(`[CloudSRMS] Initialized in-memory cloud database: ${memoryStore.length} records`);
    }
  } catch (err) {
    console.warn('[CloudSRMS] Could not read database file, using memory seed:', err.message);
  }
}

function saveDatabase() {
  // Only write to file if database.json already exists or is configured
  if (fs.existsSync(DB_FILE)) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(memoryStore, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[CloudSRMS] Could not persist to database file:', err.message);
    }
  }
}

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper to parse JSON body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 10 * 1024 * 1024) { // 10MB safety limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Server Request Handler
const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = reqUrl.pathname;
  const method = req.method;

  // CORS headers for flexible cloud API integration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ---------------------------------------------------------------------------
  // REST API Endpoints
  // ---------------------------------------------------------------------------
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');

    // GET /api/results - list all or filter by rollNo
    if (pathname === '/api/results' && method === 'GET') {
      const roll = reqUrl.searchParams.get('rollNo');
      if (roll) {
        const match = memoryStore.find(r => r.rollNo.toUpperCase() === roll.toUpperCase());
        if (match) {
          res.writeHead(200);
          res.end(JSON.stringify(match));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Student record not found' }));
        }
        return;
      }
      res.writeHead(200);
      res.end(JSON.stringify(memoryStore));
      return;
    }

    // POST /api/results - create a new result
    if (pathname === '/api/results' && method === 'POST') {
      try {
        const body = await parseRequestBody(req);
        if (!body.rollNo || !body.name) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Roll number and student name are required' }));
          return;
        }

        const newRecord = {
          id: body.id || 'rec-' + Date.now(),
          rollNo: body.rollNo.trim().toUpperCase(),
          name: body.name.trim(),
          department: body.department || 'Computer Science & Engineering',
          semester: body.semester || '4',
          academicYear: body.academicYear || '2024-2025',
          subjects: body.subjects || []
        };

        memoryStore.unshift(newRecord);
        saveDatabase();

        res.writeHead(201);
        res.end(JSON.stringify(newRecord));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON request payload' }));
      }
      return;
    }

    // PUT /api/results/:id - update existing result
    if (pathname.startsWith('/api/results/') && method === 'PUT') {
      const id = decodeURIComponent(pathname.replace('/api/results/', ''));
      try {
        const body = await parseRequestBody(req);
        const index = memoryStore.findIndex(r => r.id === id || r.rollNo === id.toUpperCase());
        if (index === -1) {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Record not found for update' }));
          return;
        }

        memoryStore[index] = {
          ...memoryStore[index],
          ...body,
          id: memoryStore[index].id // preserve ID
        };
        saveDatabase();

        res.writeHead(200);
        res.end(JSON.stringify(memoryStore[index]));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid update payload' }));
      }
      return;
    }

    // DELETE /api/results/:id - remove result
    if (pathname.startsWith('/api/results/') && method === 'DELETE') {
      const id = decodeURIComponent(pathname.replace('/api/results/', ''));
      const initialLen = memoryStore.length;
      memoryStore = memoryStore.filter(r => r.id !== id && r.rollNo !== id.toUpperCase());
      saveDatabase();

      if (memoryStore.length < initialLen) {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Record deleted successfully' }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Record not found to delete' }));
      }
      return;
    }

    // Unknown API route
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'API route not found' }));
    return;
  }

  // ---------------------------------------------------------------------------
  // Static File Serving
  // ---------------------------------------------------------------------------
  let safePath = pathname === '/' ? '/index.html' : pathname;
  // Security check: prevent directory traversal
  safePath = path.normalize(safePath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for single-page routing
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server File Read Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

// Start Server
loadDatabase();
server.listen(PORT, () => {
  console.log(`
  ==============================================================
   🎓 CloudSRMS - Cloud Student Result Management System
  ==============================================================
   Server URL  : http://localhost:${PORT}
   API Base    : http://localhost:${PORT}/api/results
   Mode        : Zero-Dependency Standalone Mode
   Status      : Ready & Active
  ==============================================================
  `);
});
