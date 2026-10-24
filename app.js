/**
 * CloudSRMS - Cloud-Based Student Result Management System
 * Core Client-side Engine & Cloud Synchronization Adapter
 */

// -----------------------------------------------------------------------------
// 1. Initial State & Realistic Seed Dataset
// -----------------------------------------------------------------------------
const STORAGE_KEY = 'cloud_srms_database_v1';
let isBackendAvailable = false;
let currentResults = [];
let studentRadarChart = null;
let adminGradeChart = null;
let adminPassChart = null;

const DEFAULT_DATA = [
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
      { code: 'ME403', name: 'Kinematics of Machines', maxMarks: 100, marksObtained: 34, credits: 4 }, // Backlog
      { code: 'ME404', name: 'Manufacturing Processes', maxMarks: 100, marksObtained: 58, credits: 3 },
      { code: 'ME405', name: 'Applied Finite Element Analysis', maxMarks: 100, marksObtained: 60, credits: 3 },
      { code: 'ME406', name: 'Thermal Systems Lab', maxMarks: 50, marksObtained: 38, credits: 2 }
    ]
  }
];

// -----------------------------------------------------------------------------
// 2. Academic Grading System Standards (10-Point UGC / AICTE Scale)
// -----------------------------------------------------------------------------
function calculateGrade(percentage) {
  if (percentage >= 90) return { grade: 'O', points: 10, remark: 'Outstanding' };
  if (percentage >= 80) return { grade: 'A+', points: 9, remark: 'Excellent' };
  if (percentage >= 70) return { grade: 'A', points: 8, remark: 'Very Good' };
  if (percentage >= 60) return { grade: 'B+', points: 7, remark: 'Good' };
  if (percentage >= 50) return { grade: 'B', points: 6, remark: 'Above Average' };
  if (percentage >= 40) return { grade: 'C', points: 5, remark: 'Pass' };
  return { grade: 'F', points: 0, remark: 'Fail / Arrear' };
}

function computeStudentStats(student) {
  let totalCredits = 0;
  let totalCreditPoints = 0;
  let totalMaxMarks = 0;
  let totalMarksObtained = 0;
  let hasFailedSubject = false;

  const subjectsWithGrades = student.subjects.map(sub => {
    const max = Number(sub.maxMarks) || 100;
    const scored = Number(sub.marksObtained) || 0;
    const credits = Number(sub.credits) || 3;
    const percentage = (scored / max) * 100;
    const gradeObj = calculateGrade(percentage);

    if (gradeObj.grade === 'F') {
      hasFailedSubject = true;
    }

    const creditPoints = credits * gradeObj.points;
    totalCredits += credits;
    totalCreditPoints += creditPoints;
    totalMaxMarks += max;
    totalMarksObtained += scored;

    return {
      ...sub,
      grade: gradeObj.grade,
      gradePoints: gradeObj.points,
      creditPoints: creditPoints,
      percentage: percentage.toFixed(1),
      status: gradeObj.grade === 'F' ? 'FAIL' : 'PASS'
    };
  });

  const sgpa = totalCredits > 0 ? (totalCreditPoints / totalCredits).toFixed(2) : '0.00';
  const overallPercentage = totalMaxMarks > 0 ? ((totalMarksObtained / totalMaxMarks) * 100).toFixed(1) : '0.0';

  let division = 'PASS CLASS';
  if (hasFailedSubject) {
    division = 'REAPPEAR / ARREARS';
  } else if (parseFloat(sgpa) >= 8.5) {
    division = 'FIRST CLASS WITH DISTINCTION';
  } else if (parseFloat(sgpa) >= 6.5) {
    division = 'FIRST CLASS';
  } else if (parseFloat(sgpa) >= 5.0) {
    division = 'SECOND CLASS';
  }

  return {
    ...student,
    subjects: subjectsWithGrades,
    totalCredits,
    totalCreditPoints,
    totalMaxMarks,
    totalMarksObtained,
    sgpa,
    cgpa: sgpa, // Simulated CGPA matching SGPA
    overallPercentage,
    hasFailedSubject,
    division,
    status: hasFailedSubject ? 'FAIL' : 'PASS'
  };
}

// -----------------------------------------------------------------------------
// 3. Cloud Database Sync & Fallback Storage Adapter
// -----------------------------------------------------------------------------
async function initDatabase() {
  const statusIndicator = document.getElementById('cloud-status-text');
  try {
    const res = await fetch('/api/results', { method: 'GET', headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      currentResults = data;
      isBackendAvailable = true;
      if (statusIndicator) statusIndicator.textContent = 'Cloud Engine: Connected';
      showToast('Cloud database synchronized', 'info');
      syncLocalStorage(currentResults);
      return;
    }
  } catch (err) {
    // Backend server not currently running or static file host (e.g. GitHub Pages)
  }

  // Fallback to LocalStorage
  isBackendAvailable = false;
  if (statusIndicator) statusIndicator.textContent = 'Cloud Engine: Local Active';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      currentResults = JSON.parse(stored);
    } catch (e) {
      currentResults = [...DEFAULT_DATA];
      syncLocalStorage(currentResults);
    }
  } else {
    currentResults = [...DEFAULT_DATA];
    syncLocalStorage(currentResults);
  }
}

function syncLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

async function persistRecord(record, isEdit = false) {
  if (isBackendAvailable) {
    try {
      const url = isEdit ? `/api/results/${encodeURIComponent(record.id)}` : '/api/results';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      });
      if (!res.ok) throw new Error('Cloud API request failed');
      const saved = await res.json();
      return saved;
    } catch (e) {
      console.warn('Backend sync failed, falling back to local storage', e);
    }
  }

  // Local storage save
  if (isEdit) {
    const idx = currentResults.findIndex(r => r.id === record.id);
    if (idx !== -1) currentResults[idx] = record;
  } else {
    currentResults.unshift(record);
  }
  syncLocalStorage(currentResults);
  return record;
}

async function deleteRecord(id) {
  if (isBackendAvailable) {
    try {
      await fetch(`/api/results/${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Backend delete failed', e);
    }
  }
  currentResults = currentResults.filter(r => r.id !== id);
  syncLocalStorage(currentResults);
}

// -----------------------------------------------------------------------------
// 4. Portal Navigation & View Switcher
// -----------------------------------------------------------------------------
function switchPortal(portal) {
  const studentSection = document.getElementById('student-section');
  const adminSection = document.getElementById('admin-section');
  const tabStudent = document.getElementById('tab-student');
  const tabAdmin = document.getElementById('tab-admin');

  if (portal === 'student') {
    studentSection.style.display = 'block';
    adminSection.style.display = 'none';
    tabStudent.classList.add('active');
    tabAdmin.classList.remove('active');
  } else {
    studentSection.style.display = 'none';
    adminSection.style.display = 'block';
    tabStudent.classList.remove('active');
    tabAdmin.classList.add('active');
    refreshAdminDashboard();
  }
}

// -----------------------------------------------------------------------------
// 5. Student Portal Search & Dynamic Marksheet Display
// -----------------------------------------------------------------------------
function handleStudentSearch(e) {
  if (e) e.preventDefault();
  const rollInput = document.getElementById('search-roll').value.trim().toUpperCase();
  const semInput = document.getElementById('search-semester').value;

  if (!rollInput) {
    showToast('Please enter a valid Roll Number', 'error');
    return;
  }

  // Find matching student
  const student = currentResults.find(r => {
    const matchRoll = r.rollNo.toUpperCase() === rollInput;
    const matchSem = semInput === 'All' || r.semester.toString() === semInput.toString();
    return matchRoll && matchSem;
  });

  if (!student) {
    showToast(`No examination record found for Roll No: ${rollInput}`, 'error');
    return;
  }

  renderMarksheet(computeStudentStats(student));
  showToast(`Record retrieved for ${student.name}`, 'success');
}

function quickFill(rollNo) {
  document.getElementById('search-roll').value = rollNo;
  handleStudentSearch();
}

function renderMarksheet(student) {
  const container = document.getElementById('marksheet-container');
  const isPass = student.status === 'PASS';

  let subjectRows = student.subjects.map(sub => `
    <tr>
      <td style="font-family: var(--font-mono); font-weight: 600; color: #60a5fa;">${escapeHTML(sub.code)}</td>
      <td style="font-weight: 500;">${escapeHTML(sub.name)}</td>
      <td>${sub.credits}</td>
      <td>${sub.maxMarks}</td>
      <td style="font-weight: 700;">${sub.marksObtained}</td>
      <td><span class="badge ${sub.grade === 'F' ? 'badge-danger' : 'badge-info'}">${sub.grade}</span></td>
      <td>${sub.gradePoints}</td>
      <td style="font-weight: 600;">${sub.creditPoints}</td>
      <td><span class="badge ${sub.status === 'PASS' ? 'badge-success' : 'badge-danger'}">${sub.status}</span></td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="glass-card marksheet-wrapper" id="printable-marksheet">
      <!-- Header Banner -->
      <div class="marksheet-header-banner">
        <div class="uni-info">
          <div class="uni-crest">🏛️</div>
          <div>
            <h2 class="uni-name">NATIONAL INSTITUTE OF ADVANCED TECHNOLOGY</h2>
            <p class="uni-tagline">Autonomous Examination & Cloud Grading Authority &bull; Session ${escapeHTML(student.academicYear || '2024-2025')}</p>
          </div>
        </div>
        <div class="marksheet-actions">
          <button class="btn btn-secondary btn-sm" onclick="printMarksheet()">
            <span>🖨️</span> Print / Save PDF
          </button>
          <button class="btn btn-primary btn-sm" onclick="shareResult('${student.rollNo}')">
            <span>🔗</span> Verify Cloud Token
          </button>
        </div>
      </div>

      <!-- Student Bio Details -->
      <div class="student-bio-grid">
        <div class="bio-item">
          <span class="bio-title">Candidate Full Name</span>
          <span class="bio-value">${escapeHTML(student.name)}</span>
        </div>
        <div class="bio-item">
          <span class="bio-title">Roll / Registration No.</span>
          <span class="bio-value mono">${escapeHTML(student.rollNo)}</span>
        </div>
        <div class="bio-item">
          <span class="bio-title">Program / Department</span>
          <span class="bio-value">${escapeHTML(student.department)}</span>
        </div>
        <div class="bio-item">
          <span class="bio-title">Semester</span>
          <span class="bio-value">Semester ${escapeHTML(student.semester)}</span>
        </div>
      </div>

      <!-- Course Subjects Table -->
      <div class="results-table-container">
        <table class="results-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Credits</th>
              <th>Max Marks</th>
              <th>Marks Scored</th>
              <th>Letter Grade</th>
              <th>Grade Pts</th>
              <th>Credit Pts</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${subjectRows}
          </tbody>
        </table>
      </div>

      <!-- Scorecard Summary Banner -->
      <div class="scorecard-summary">
        <div class="scorecard-item">
          <div class="scorecard-number">${student.totalMarksObtained} / ${student.totalMaxMarks}</div>
          <div class="scorecard-label">Aggregate Marks</div>
        </div>
        <div class="scorecard-item">
          <div class="scorecard-number">${student.overallPercentage}%</div>
          <div class="scorecard-label">Percentage Score</div>
        </div>
        <div class="scorecard-item">
          <div class="scorecard-number">${student.sgpa}</div>
          <div class="scorecard-label">Semester SGPA</div>
        </div>
        <div class="scorecard-item">
          <div class="scorecard-number" style="color: ${isPass ? 'var(--success)' : 'var(--danger)'}">
            ${student.status}
          </div>
          <div class="scorecard-label">${student.division}</div>
        </div>
      </div>
    </div>

    <!-- Student Visual Analytics -->
    <div class="glass-card analytics-grid" style="margin-top: 1.5rem;">
      <div>
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🎯 Subject Mastery & Score Distribution</h3>
        <div class="chart-box">
          <canvas id="studentBarChart"></canvas>
        </div>
      </div>
      <div>
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🕸️ Skill Competency Radar</h3>
        <div class="chart-box">
          <canvas id="studentRadarCanvas"></canvas>
        </div>
      </div>
    </div>
  `;

  // Render Charts
  renderStudentVisuals(student);

  // Scroll gently to marksheet
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderStudentVisuals(student) {
  const labels = student.subjects.map(s => s.code);
  const scores = student.subjects.map(s => s.marksObtained);
  const maxScores = student.subjects.map(s => s.maxMarks);

  // Bar Chart
  const barCtx = document.getElementById('studentBarChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Marks Scored',
          data: scores,
          backgroundColor: 'rgba(59, 130, 246, 0.75)',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255, 255, 255, 0.06)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Radar Chart
  const radarCtx = document.getElementById('studentRadarCanvas');
  if (radarCtx) {
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: student.subjects.map(s => s.name.length > 18 ? s.name.substring(0, 15) + '...' : s.name),
        datasets: [{
          label: 'Performance Metric %',
          data: student.subjects.map(s => s.percentage),
          backgroundColor: 'rgba(139, 92, 246, 0.25)',
          borderColor: '#8b5cf6',
          pointBackgroundColor: '#ec4899',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            suggestedMin: 30,
            suggestedMax: 100,
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            pointLabels: { font: { size: 10 } }
          }
        }
      }
    });
  }
}

function printMarksheet() {
  window.print();
}

function shareResult(rollNo) {
  const token = 'SRMS-HASH-' + btoa(rollNo + '-' + Date.now()).substring(0, 12).toUpperCase();
  navigator.clipboard?.writeText(window.location.href);
  showToast(`Cloud Verification Hash: ${token} (Link copied)`, 'success');
}

// -----------------------------------------------------------------------------
// 6. Faculty / Admin Management Controller
// -----------------------------------------------------------------------------
function refreshAdminDashboard() {
  renderAdminTable();
  updateAdminStats();
  renderAdminCharts();
}

function updateAdminStats() {
  const evaluated = currentResults.map(r => computeStudentStats(r));
  const total = evaluated.length;
  const passCount = evaluated.filter(s => s.status === 'PASS').length;
  const passPct = total > 0 ? ((passCount / total) * 100).toFixed(0) + '%' : '0%';

  const sumSGPA = evaluated.reduce((acc, curr) => acc + parseFloat(curr.sgpa), 0);
  const avgSGPA = total > 0 ? (sumSGPA / total).toFixed(2) : '0.00';

  const depts = new Set(currentResults.map(r => r.department));

  document.getElementById('stat-total-students').textContent = total;
  document.getElementById('stat-pass-percentage').textContent = passPct;
  document.getElementById('stat-avg-cgpa').textContent = avgSGPA;
  document.getElementById('stat-departments').textContent = depts.size;
}

function renderAdminTable() {
  const search = document.getElementById('admin-search-input').value.toLowerCase();
  const deptFilter = document.getElementById('admin-dept-filter').value;
  const semFilter = document.getElementById('admin-sem-filter').value;
  const tbody = document.getElementById('admin-records-body');

  const filtered = currentResults.filter(student => {
    const matchSearch = student.rollNo.toLowerCase().includes(search) || 
                        student.name.toLowerCase().includes(search) ||
                        student.department.toLowerCase().includes(search);
    const matchDept = deptFilter === 'All' || student.department === deptFilter;
    const matchSem = semFilter === 'All' || student.semester.toString() === semFilter;
    return matchSearch && matchDept && matchSem;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          No student records found matching the filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const computed = computeStudentStats(item);
    const isPass = computed.status === 'PASS';
    return `
      <tr>
        <td style="font-family: var(--font-mono); font-weight: 700; color: #60a5fa;">${escapeHTML(item.rollNo)}</td>
        <td style="font-weight: 600;">${escapeHTML(item.name)}</td>
        <td style="color: var(--text-secondary);">${escapeHTML(item.department)}</td>
        <td>Sem ${escapeHTML(item.semester)}</td>
        <td>${computed.totalMarksObtained}/${computed.totalMaxMarks}</td>
        <td style="font-family: var(--font-mono); font-weight: 700;">${computed.sgpa}</td>
        <td>
          <span class="badge ${isPass ? 'badge-success' : 'badge-danger'}">
            ${computed.status}
          </span>
        </td>
        <td style="text-align: right; white-space: nowrap;">
          <button class="btn btn-secondary btn-sm" onclick="viewDirectResult('${item.rollNo}')" title="View Grade Card">
            👁️ View
          </button>
          <button class="btn btn-secondary btn-sm" onclick="openEditModal('${item.id}')" title="Edit Result">
            ✏️
          </button>
          <button class="btn btn-danger btn-sm" onclick="handleDeleteRecord('${item.id}')" title="Delete Result">
            🗑️
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminCharts() {
  const evaluated = currentResults.map(r => computeStudentStats(r));
  
  // Grade tallies
  let grades = { 'O': 0, 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C': 0, 'F': 0 };
  let passed = 0;
  let failed = 0;

  evaluated.forEach(s => {
    if (s.status === 'PASS') passed++;
    else failed++;

    s.subjects.forEach(sub => {
      if (grades[sub.grade] !== undefined) grades[sub.grade]++;
    });
  });

  // Admin Grade Bar Chart
  const gradeCtx = document.getElementById('adminGradeChart');
  if (gradeCtx) {
    if (adminGradeChart) adminGradeChart.destroy();
    adminGradeChart = new Chart(gradeCtx, {
      type: 'bar',
      data: {
        labels: ['O (10)', 'A+ (9)', 'A (8)', 'B+ (7)', 'B (6)', 'C (5)', 'F (Fail)'],
        datasets: [{
          label: 'Total Subject Letter Grades Awarded',
          data: [grades['O'], grades['A+'], grades['A'], grades['B+'], grades['B'], grades['C'], grades['F']],
          backgroundColor: [
            '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#f59e0b', '#06b6d4', '#ef4444'
          ],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.06)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Admin Pass/Fail Doughnut
  const passCtx = document.getElementById('adminPassChart');
  if (passCtx) {
    if (adminPassChart) adminPassChart.destroy();
    adminPassChart = new Chart(passCtx, {
      type: 'doughnut',
      data: {
        labels: ['Promoted / Cleared', 'Arrear / Backlog'],
        datasets: [{
          data: [passed, failed],
          backgroundColor: ['#10b981', '#ef4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8' } }
        }
      }
    });
  }
}

function viewDirectResult(rollNo) {
  switchPortal('student');
  document.getElementById('search-roll').value = rollNo;
  document.getElementById('search-semester').value = 'All';
  handleStudentSearch();
}

async function handleDeleteRecord(id) {
  if (!confirm('Are you sure you want to permanently remove this student result record?')) {
    return;
  }
  await deleteRecord(id);
  refreshAdminDashboard();
  showToast('Record removed successfully', 'info');
}

// -----------------------------------------------------------------------------
// 7. Add / Edit Record Modal Controller
// -----------------------------------------------------------------------------
function openAddModal() {
  document.getElementById('modal-result-title').textContent = 'Publish Academic Result';
  document.getElementById('edit-record-id').value = '';
  document.getElementById('form-roll').value = '';
  document.getElementById('form-name').value = '';
  document.getElementById('form-dept').selectedIndex = 0;
  document.getElementById('form-sem').value = '4';
  document.getElementById('form-year').value = '2024-2025';

  const container = document.getElementById('subject-rows-container');
  container.innerHTML = '';
  
  // Add 4 default starter subject rows
  addSubjectRow('CS401', 'Cloud Architecture', 100, 85, 4);
  addSubjectRow('CS402', 'Database Systems', 100, 90, 4);
  addSubjectRow('CS403', 'Algorithms Analysis', 100, 80, 4);
  addSubjectRow('CS404', 'Operating Systems', 100, 88, 3);

  openModal('modal-result');
}

function openEditModal(id) {
  const record = currentResults.find(r => r.id === id);
  if (!record) return;

  document.getElementById('modal-result-title').textContent = 'Edit Student Result';
  document.getElementById('edit-record-id').value = record.id;
  document.getElementById('form-roll').value = record.rollNo;
  document.getElementById('form-name').value = record.name;
  document.getElementById('form-dept').value = record.department;
  document.getElementById('form-sem').value = record.semester;
  document.getElementById('form-year').value = record.academicYear || '2024-2025';

  const container = document.getElementById('subject-rows-container');
  container.innerHTML = '';
  
  record.subjects.forEach(sub => {
    addSubjectRow(sub.code, sub.name, sub.maxMarks, sub.marksObtained, sub.credits);
  });

  openModal('modal-result');
}

function addSubjectRow(code = '', name = '', max = 100, scored = '', credits = 3) {
  const container = document.getElementById('subject-rows-container');
  const row = document.createElement('div');
  row.className = 'subject-entry-row';
  row.innerHTML = `
    <input type="text" class="form-control sub-title" placeholder="Course Title" value="${escapeHTML(name)}" required>
    <input type="text" class="form-control sub-code" placeholder="Code (e.g. CS401)" value="${escapeHTML(code)}" required>
    <input type="number" class="form-control sub-scored" placeholder="Score" value="${scored}" min="0" max="100" required>
    <input type="number" class="form-control sub-credits" placeholder="Credits" value="${credits}" min="1" max="6" required>
    <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()" title="Remove Subject">&times;</button>
  `;
  container.appendChild(row);
}

async function saveStudentResult(e) {
  e.preventDefault();
  const editId = document.getElementById('edit-record-id').value;
  const rollNo = document.getElementById('form-roll').value.trim().toUpperCase();
  const name = document.getElementById('form-name').value.trim();
  const department = document.getElementById('form-dept').value;
  const semester = document.getElementById('form-sem').value;
  const academicYear = document.getElementById('form-year').value.trim();

  const rows = document.querySelectorAll('.subject-entry-row');
  if (rows.length === 0) {
    showToast('Please add at least one subject', 'error');
    return;
  }

  const subjects = [];
  rows.forEach(r => {
    const title = r.querySelector('.sub-title').value.trim();
    const code = r.querySelector('.sub-code').value.trim().toUpperCase();
    const scored = parseFloat(r.querySelector('.sub-scored').value) || 0;
    const credits = parseFloat(r.querySelector('.sub-credits').value) || 3;
    subjects.push({
      code: code || 'SUB-101',
      name: title || 'Course Unit',
      maxMarks: 100,
      marksObtained: scored,
      credits: credits
    });
  });

  const record = {
    id: editId || 'rec-' + Date.now(),
    rollNo,
    name,
    department,
    semester,
    academicYear,
    subjects
  };

  await persistRecord(record, Boolean(editId));
  closeModal('modal-result');
  refreshAdminDashboard();
  showToast(`Result successfully published for ${rollNo}`, 'success');
}

// -----------------------------------------------------------------------------
// 8. CSV Export & Bulk Import Controller
// -----------------------------------------------------------------------------
function exportCSV() {
  if (currentResults.length === 0) {
    showToast('No records available to export', 'error');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'RollNo,Name,Department,Semester,AcademicYear,SGPA,Status,Subjects\n';

  currentResults.forEach(r => {
    const computed = computeStudentStats(r);
    const serializedSubjects = r.subjects.map(s => `${s.code}:${s.name}:${s.marksObtained}:${s.maxMarks}:${s.credits}`).join(';');
    const line = `"${r.rollNo}","${r.name}","${r.department}","${r.semester}","${r.academicYear || ''}","${computed.sgpa}","${computed.status}","${serializedSubjects}"`;
    csvContent += line + '\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `CloudSRMS_Results_Export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Results exported to CSV successfully', 'success');
}

function openImportModal() {
  document.getElementById('csv-file-input').value = '';
  document.getElementById('csv-text-input').value = '';
  openModal('modal-import');
}

function handleCSVImport() {
  const fileInput = document.getElementById('csv-file-input');
  const textInput = document.getElementById('csv-text-input').value.trim();

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      parseAndSaveCSV(e.target.result);
    };
    reader.readAsText(file);
  } else if (textInput) {
    parseAndSaveCSV(textInput);
  } else {
    showToast('Please upload a file or paste CSV text', 'error');
  }
}

function parseAndSaveCSV(rawText) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  let importedCount = 0;

  lines.forEach((line, index) => {
    // Skip potential header row
    if (index === 0 && (line.toLowerCase().includes('rollno') || line.toLowerCase().includes('roll number'))) {
      return;
    }

    const parts = line.split(',').map(p => p.replace(/^"|"$/g, '').trim());
    if (parts.length >= 4) {
      const rollNo = parts[0].toUpperCase();
      const name = parts[1];
      const department = parts[2];
      const semester = parts[3];
      const subString = parts[7] || parts[4] || '';

      const subjects = [];
      if (subString.includes(';')) {
        subString.split(';').forEach(s => {
          const sParts = s.split(':');
          if (sParts.length >= 3) {
            subjects.push({
              code: sParts[0],
              name: sParts[1],
              marksObtained: parseFloat(sParts[2]) || 0,
              maxMarks: parseFloat(sParts[3]) || 100,
              credits: parseFloat(sParts[4]) || 3
            });
          }
        });
      }

      if (subjects.length === 0) {
        subjects.push(
          { code: 'GEN101', name: 'General Engineering Module', maxMarks: 100, marksObtained: 75, credits: 4 },
          { code: 'GEN102', name: 'Applied Computing', maxMarks: 100, marksObtained: 80, credits: 4 }
        );
      }

      const newRecord = {
        id: 'rec-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        rollNo,
        name,
        department,
        semester,
        academicYear: '2024-2025',
        subjects
      };

      currentResults.unshift(newRecord);
      importedCount++;
    }
  });

  if (importedCount > 0) {
    syncLocalStorage(currentResults);
    closeModal('modal-import');
    refreshAdminDashboard();
    showToast(`Successfully imported ${importedCount} student records`, 'success');
  } else {
    showToast('Could not parse any valid records from CSV', 'error');
  }
}

function resetToDefaultData() {
  if (confirm('Reset database to realistic factory sample dataset?')) {
    currentResults = JSON.parse(JSON.stringify(DEFAULT_DATA));
    syncLocalStorage(currentResults);
    refreshAdminDashboard();
    showToast('Reset to demo dataset successfully', 'success');
  }
}

// -----------------------------------------------------------------------------
// 9. Utility Helpers: Modals, Toasts, Escaping & Theme
// -----------------------------------------------------------------------------
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  document.getElementById('theme-icon').textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('cloud_srms_theme', next);
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Close modals when clicking backdrop
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Initialize on Document Ready
document.addEventListener('DOMContentLoaded', async () => {
  // Restore saved theme
  const savedTheme = localStorage.getItem('cloud_srms_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const iconElem = document.getElementById('theme-icon');
  if (iconElem) iconElem.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  // Initialize DB
  await initDatabase();
});
