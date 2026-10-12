const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const TOOLS_DIR = path.resolve(__dirname, '../public/img/tools');

function renderSvgHtml(svgSnippet, outputPath, bg = 'transparent') {
  const tempHtmlPath = path.resolve(__dirname, `temp_tool_${Date.now()}_${Math.random().toString(36).substring(7)}.html`);
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    width: 128px;
    height: 128px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${bg};
  }
  svg {
    width: 100px;
    height: 100px;
  }
</style>
</head>
<body>
  ${svgSnippet}
</body>
</html>
  `;
  fs.writeFileSync(tempHtmlPath, html, 'utf-8');
  try {
    const cmd = `"${EDGE_PATH}" --headless=new --disable-gpu --default-background-color=00000000 --window-size=128,128 --screenshot="${outputPath}" "file:///${tempHtmlPath.replace(/\\/g, '/')}"`;
    execSync(cmd, { stdio: 'pipe' });
    console.log(`Rendered tool PNG: ${outputPath}`);
  } catch (err) {
    console.error(`Error rendering ${outputPath}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
  }
}

// 1. FigJam SVG
const figjamSvg = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="28" fill="#9747FF"/>
  <path d="M28 32H72M28 50H58M28 68H44" stroke="white" stroke-width="9" stroke-linecap="round"/>
  <circle cx="68" cy="62" r="10" fill="#FFC700"/>
</svg>
`;
fs.writeFileSync(path.join(TOOLS_DIR, 'figjam-logo.svg'), figjamSvg, 'utf-8');
renderSvgHtml(figjamSvg, path.join(TOOLS_DIR, 'figjam-logo.png'));

// Render existing SVGs to PNGs
const tools = ['figma', 'python', 'r', 'notion', 'trello', 'tableau', 'looker', 'powerbi'];
for (const tool of tools) {
  const svgFile = path.join(TOOLS_DIR, `${tool}-logo.svg`);
  if (fs.existsSync(svgFile)) {
    const content = fs.readFileSync(svgFile, 'utf-8');
    renderSvgHtml(content, path.join(TOOLS_DIR, `${tool}-logo.png`));
  }
}

console.log('Tool icons rendered successfully!');
