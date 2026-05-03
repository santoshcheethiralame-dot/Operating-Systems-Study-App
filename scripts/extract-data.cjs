// This script extracts the data (GROUPS/TOPIC_GROUPS and T/TOPICS) from JSX files
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', '..');
const dataDir = path.join(__dirname, '..', 'src', 'data');

const files = [
  { src: 'unit1.jsx', groupVar: 'GROUPS', topicVar: 'T', out: 'unit1.js' },
  { src: 'unit2.jsx', groupVar: 'GROUPS', topicVar: 'T', out: 'unit2.js' },
  { src: 'unit3.jsx', groupVar: 'TOPIC_GROUPS', topicVar: 'TOPICS', out: 'unit3.js' },
  { src: 'unit4.jsx', groupVar: 'TOPIC_GROUPS', topicVar: 'TOPICS', out: 'unit4.js' },
];

for (const f of files) {
  const content = fs.readFileSync(path.join(srcDir, f.src), 'utf8');
  
  // Find the groups array
  const groupsRegex = new RegExp('const ' + f.groupVar + ' = (\\[[\\s\\S]*?\\]);');
  const groupsMatch = content.match(groupsRegex);
  
  // Find the topics object
  const topicsStart = content.indexOf('const ' + f.topicVar + ' = {');
  
  let braceCount = 0;
  let topicsEnd = -1;
  let i = topicsStart + ('const ' + f.topicVar + ' = ').length;
  let inStr = false;
  let strCh = '';
  let esc = false;
  let inTemplate = 0;
  
  for (; i < content.length; i++) {
    const ch = content[i];
    
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    
    if (inStr) {
      if (ch === strCh && strCh !== '`') { inStr = false; }
      else if (ch === '`' && strCh === '`') { inStr = false; }
      continue;
    }
    
    if (ch === '"' || ch === "'" || ch === '`') {
      inStr = true; strCh = ch; continue;
    }
    
    if (ch === '{') braceCount++;
    if (ch === '}') {
      braceCount--;
      if (braceCount === 0) { topicsEnd = i + 1; break; }
    }
  }
  
  const topicsStr = content.substring(topicsStart + ('const ' + f.topicVar + ' = ').length, topicsEnd);
  const groupsStr = groupsMatch ? groupsMatch[1] : '[]';
  
  const output = '// Auto-extracted from ' + f.src + '\nexport const groups = ' + groupsStr + ';\n\nexport const topics = ' + topicsStr + ';\n';
  
  fs.writeFileSync(path.join(dataDir, f.out), output, 'utf8');
  console.log('OK ' + f.out);
}

console.log('Done!');
