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

const mappings = {
  // Text Colors
  'text-dark': 'text-dark dark:text-white',
  'text-gray-900': 'text-gray-900 dark:text-gray-100',
  'text-gray-800': 'text-gray-800 dark:text-gray-200',
  'text-gray-700': 'text-gray-700 dark:text-gray-300',
  'text-gray-600': 'text-gray-600 dark:text-gray-400',
  'text-gray-500': 'text-gray-500 dark:text-gray-400',
  'text-slate-900': 'text-slate-900 dark:text-white',
  'text-slate-800': 'text-slate-800 dark:text-slate-200',
  'text-slate-700': 'text-slate-700 dark:text-slate-300',
  'text-slate-600': 'text-slate-600 dark:text-slate-400',
  'text-slate-500': 'text-slate-500 dark:text-slate-400',
  
  // Backgrounds
  'bg-white': 'bg-white dark:bg-slate-900',
  'bg-light': 'bg-light dark:bg-slate-900/50',
  'bg-gray-50': 'bg-gray-50 dark:bg-slate-800',
  'bg-gray-100': 'bg-gray-100 dark:bg-slate-800',
  
  // Borders
  'border-gray-100': 'border-gray-100 dark:border-slate-800',
  'border-gray-200': 'border-gray-200 dark:border-slate-700'
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // Step 1: Strip out existing common dark mode counterparts to prevent duplicates.
  // This is a little messy, but it's safe if we replace known bad patterns.
  
  // Alternatively, just do intelligent replacement
  for (const [lightClass, replacement] of Object.entries(mappings)) {
    // Only replace if it doesn't already contain dark:
    // Regex: look for lightClass with word boundaries. 
    // This is hard to do perfectly with regex without a full parser, 
    // so we'll do it naively and then clean up duplicates.
    
    const regex = new RegExp(`\\b${lightClass}\\b`, 'g');
    content = content.replace(regex, replacement);
  }
  
  // Step 2: Clean up duplicate dark classes
  // A pattern like: text-dark dark:text-white dark:text-white -> text-dark dark:text-white
  // We'll run a few cleanup passes
  const cleanupPatterns = [
    // If we added dark:bg-slate-900 but there was already dark:bg-slate-950
    /dark:bg-slate-900\s+dark:bg-slate-([0-9]+(\/[0-9]+)?)/g,
    /dark:bg-slate-900\/50\s+dark:bg-slate-([0-9]+(\/[0-9]+)?)/g,
    /dark:bg-slate-800\s+dark:bg-slate-([0-9]+(\/[0-9]+)?)/g,
    // Deduplicate
    /dark:text-white\s+dark:text-white/g,
    /dark:text-slate-([0-9]+)\s+dark:text-slate-\1/g,
    /dark:text-gray-([0-9]+)\s+dark:text-gray-\1/g,
    /dark:bg-slate-([0-9]+(\/[0-9]+)?)\s+dark:bg-slate-\1/g,
    /dark:border-slate-([0-9]+(\/[0-9]+)?)\s+dark:border-slate-\1/g,
    
    // Resolve conflicts (if old one was there, prioritize the old one by replacing our injected new one + old one with just old one, or just clean it)
    /dark:text-white\s+(dark:text-[a-z]+-[0-9]+)/g, // e.g. dark:text-white dark:text-slate-300 -> dark:text-slate-300
    /dark:text-gray-[0-9]+\s+(dark:text-[a-z]+-[0-9]+)/g,
    /dark:text-slate-[0-9]+\s+(dark:text-[a-z]+-[0-9]+)/g
  ];
  
  // Run cleanup loops
  for (let i = 0; i < 3; i++) {
    content = content.replace(/dark:text-white\s+dark:text-white/g, 'dark:text-white');
    content = content.replace(/dark:text-white\s+dark:text-slate-([0-9]+)/g, 'dark:text-slate-$1');
    content = content.replace(/dark:text-white\s+dark:text-gray-([0-9]+)/g, 'dark:text-gray-$1');
    
    content = content.replace(/dark:text-gray-([0-9]+)\s+dark:text-slate-([0-9]+)/g, 'dark:text-slate-$2');
    content = content.replace(/dark:text-gray-([0-9]+)\s+dark:text-gray-([0-9]+)/g, 'dark:text-gray-$2');
    content = content.replace(/dark:text-slate-([0-9]+)\s+dark:text-slate-([0-9]+)/g, 'dark:text-slate-$2');
    content = content.replace(/dark:text-slate-([0-9]+)\s+dark:text-white/g, 'dark:text-white');
    content = content.replace(/dark:text-gray-([0-9]+)\s+dark:text-white/g, 'dark:text-white');
    
    content = content.replace(/dark:bg-slate-([0-9]+)\s+dark:bg-slate-([0-9]+)/g, 'dark:bg-slate-$2');
    content = content.replace(/dark:bg-slate-([0-9]+)\/([0-9]+)\s+dark:bg-slate-([0-9]+)\/([0-9]+)/g, 'dark:bg-slate-$3/$4');
    
    content = content.replace(/dark:border-slate-([0-9]+)\s+dark:border-slate-([0-9]+)/g, 'dark:border-slate-$2');
  }
  
  // Fix weird cases
  content = content.replace(/text-dark dark:text-white dark:text-white/g, 'text-dark dark:text-white');
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    changedFiles++;
  }
});

console.log(`Updated ${changedFiles} files with comprehensive dark mode text and backgrounds.`);
