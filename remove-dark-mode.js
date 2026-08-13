const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'app')).concat(walk(path.join(__dirname, 'components')));
let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  content = content.replace(/\s+dark:[a-zA-Z0-9\-/\.]+/g, '');
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    changedFiles++;
  }
});

console.log(`Removed dark classes from ${changedFiles} files.`);
