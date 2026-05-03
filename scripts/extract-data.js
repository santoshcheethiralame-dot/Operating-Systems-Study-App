// This script extracts the data (GROUPS/TOPIC_GROUPS and T/TOPICS) from JSX files
// and creates clean JS data modules

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..');
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
  const groupsMatch = content.match(new RegExp(`const ${f.groupVar} = (\\[\\s*\\{[\\s\\S]*?\\}\\s*\\]);`));
  // Find the topics object - it ends right before 'export default' or the component function
  const topicsStart = content.indexOf(`const ${f.topicVar} = {`);
  
  // Find the end of the topics object by looking for the pattern "};\n\n" followed by something other than a quote
  let braceCount = 0;
  let topicsEnd = -1;
  let insideString = false;
  let stringChar = '';
  let escaped = false;
  
  for (let i = topicsStart + `const ${f.topicVar} = `.length; i < content.length; i++) {
    const ch = content[i];
    
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    
    if (insideString) {
      if (ch === stringChar) {
        insideString = false;
      }
      continue;
    }
    
    if (ch === '"' || ch === "'" || ch === '`') {
      insideString = true;
      stringChar = ch;
      continue;
    }
    
    if (ch === '{') braceCount++;
    if (ch === '}') {
      braceCount--;
      if (braceCount === 0) {
        topicsEnd = i + 1;
        break;
      }
    }
  }
  
  const topicsStr = content.substring(topicsStart + `const ${f.topicVar} = `.length, topicsEnd);
  const groupsStr = groupsMatch ? groupsMatch[1] : '[]';
  
  const output = `// Auto-extracted from ${f.src}
export const groups = ${groupsStr};

export const topics = ${topicsStr};
`;
  
  fs.writeFileSync(path.join(dataDir, f.out), output, 'utf8');
  console.log(`✓ ${f.out} written`);
}

console.log('Done!');
