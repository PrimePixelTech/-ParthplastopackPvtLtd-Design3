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
      if (file.endsWith('.tsx')) {
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
  
  // Replace text-dark with text-dark dark:text-white
  content = content.replace(/\btext-dark\b/g, 'text-dark dark:text-white');
  
  // Fix duplicates
  content = content.replace(/text-dark dark:text-white(\s+)dark:text-white/g, 'text-dark dark:text-white');
  content = content.replace(/text-dark dark:text-white(\s+)dark:text-slate-50/g, 'text-dark dark:text-slate-50');
  content = content.replace(/text-dark dark:text-white(\s+)dark:text-slate-200/g, 'text-dark dark:text-slate-200');
  content = content.replace(/text-dark dark:text-white(\s+)dark:text-slate-300/g, 'text-dark dark:text-slate-300');
  content = content.replace(/text-dark dark:text-white(\s+)dark:text-slate-400/g, 'text-dark dark:text-slate-400');
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    changedFiles++;
  }
});

console.log(`Updated ${changedFiles} files with dark mode text colors.`);
