const http = require('http');
const fs = require('fs');
const path = require('path');

const baseDir = 'D:\\projects\\opencode\\.opencode';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

function readJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch { return null; }
}

function listJSONFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  } catch { return []; }
}

function apiMetrics(req, res) {
  const metricsDir = path.join(baseDir, 'metrics');
  const files = listJSONFiles(metricsDir);
  
  const data = {};
  for (const name of files) {
    const content = readJSON(path.join(metricsDir, name + '.json'));
    if (content) data[name] = content;
  }
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function apiSharedState(req, res) {
  const sharedDir = path.join(baseDir, 'shared-state');
  const files = listJSONFiles(sharedDir);
  
  const data = {};
  for (const name of files) {
    const content = readJSON(path.join(sharedDir, name + '.json'));
    if (content) data[name] = content;
  }
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function listMDFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));
  } catch { return []; }
}

function readAgentMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const descMatch = content.match(/^>\s*(.+)/m) || content.match(/^description:\s*(.+)/mi);
    const roleMatch = content.match(/\*\*Role\*\*:\s*(.+)/i) || content.match(/role:\s*(.+)/i);
    return {
      description: descMatch?.[1]?.trim() || '',
      role: roleMatch?.[1]?.trim() || ''
    };
  } catch { return { description: '', role: '' }; }
}

function apiAgents(req, res) {
  const agentsDir = path.join(baseDir, 'agents');
  const metricsPath = path.join(baseDir, 'metrics', 'agent-performance.json');
  
  const agentFiles = listMDFiles(agentsDir);
  const performance = readJSON(metricsPath) || { agents: {} };
  
  const agents = agentFiles.map(name => {
    const meta = readAgentMetadata(path.join(agentsDir, name + '.md'));
    const stats = performance.agents[name] || null;
    
    return {
      name,
      description: meta.description,
      role: meta.role,
      hasPerformanceData: !!stats,
      stats: stats || {
        totalTasks: 0,
        successCount: 0,
        failureCount: 0,
        lastUsed: null
      }
    };
  });
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ agents, total: agents.length }));
}

function apiAll(req, res) {
  const metricsDir = path.join(baseDir, 'metrics');
  const sharedDir = path.join(baseDir, 'shared-state');
  
  const metricFiles = listJSONFiles(metricsDir);
  const sharedFiles = listJSONFiles(sharedDir);
  
  const metrics = {};
  for (const name of metricFiles) {
    const content = readJSON(path.join(metricsDir, name + '.json'));
    if (content) metrics[name] = content;
  }
  
  const sharedState = {};
  for (const name of sharedFiles) {
    const content = readJSON(path.join(sharedDir, name + '.json'));
    if (content) sharedState[name] = content;
  }
  
  // Extract project info from README if available
  let projectInfo = { name: 'OpenCode Factory', description: 'Agent Guidance Framework' };
  try {
    const readme = fs.readFileSync(path.join(baseDir, 'README.md'), 'utf-8');
    const nameMatch = readme.match(/^# (.+?)(?:\s*—|$)/m);
    if (nameMatch) projectInfo.name = nameMatch[1].trim();
  } catch {}
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    projectInfo,
    metrics,
    sharedState,
    lastUpdated: new Date().toISOString()
  }));
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  
  // API routes
  if (url === '/api/all') return apiAll(req, res);
  if (url === '/api/metrics') return apiMetrics(req, res);
  if (url === '/api/shared-state') return apiSharedState(req, res);
  if (url === '/api/agents') return apiAgents(req, res);
  
  // Static file serving - dashboard files are in dashboard/ subdirectory
  let filePath;
  if (url === '/') {
    filePath = path.join(baseDir, 'dashboard', 'index.html');
  } else if (url.startsWith('/dashboard/')) {
    filePath = path.join(baseDir, url);
  } else {
    // For CSS, JS, and other dashboard assets, look in dashboard/ subdirectory
    filePath = path.join(baseDir, 'dashboard', url);
  }
  const ext = path.extname(filePath);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found: ' + filePath);
      return;
    }
    res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(3851, '127.0.0.1', () => {
  console.log('Dashboard server running at http://127.0.0.1:3851');
  console.log('API endpoints:');
  console.log('  /api/all           - All data (metrics + shared-state)');
  console.log('  /api/metrics       - Metrics directory contents');
  console.log('  /api/shared-state  - Shared-state directory contents');
  console.log('  /api/agents        - All agents from agents/ directory');
});
