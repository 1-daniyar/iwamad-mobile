// Runs after `expo export`: GitHub Pages setup + keep icons out of a "node_modules" folder
// (.gitignore would otherwise skip docs/assets/node_modules, and the Back arrow would 404).
const fs = require('fs');
const path = require('path');

fs.writeFileSync('docs/.nojekyll', '');
fs.copyFileSync('docs/index.html', 'docs/404.html');

const from = path.join('docs', 'assets', 'node_modules');
const to = path.join('docs', 'assets', 'vendor');
if (fs.existsSync(from)) {
  fs.rmSync(to, { recursive: true, force: true });
  fs.renameSync(from, to);
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(js|html|json)$/.test(name)) {
      const s = fs.readFileSync(p, 'utf8');
      if (s.includes('assets/node_modules')) {
        fs.writeFileSync(p, s.split('assets/node_modules').join('assets/vendor'));
      }
    }
  }
}
walk('docs');
