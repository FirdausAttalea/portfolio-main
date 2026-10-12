const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUTPUT_DIR = path.resolve(__dirname, '../public/img');

function renderHtmlToImage(htmlContent, outputPath, width = 1280, height = 720) {
  const tempHtmlPath = path.resolve(__dirname, `temp_${Date.now()}_${Math.random().toString(36).substring(7)}.html`);
  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf-8');

  try {
    const cmd = `"${EDGE_PATH}" --headless=new --disable-gpu --force-device-scale-factor=1 --window-size=${width},${height} --screenshot="${outputPath}" "file:///${tempHtmlPath.replace(/\\/g, '/')}"`;
    execSync(cmd, { stdio: 'pipe' });
    console.log(`Generated: ${outputPath} (${width}x${height})`);
  } catch (err) {
    console.error(`Failed to generate ${outputPath}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }
  }
}

// 1. Magna Partners Logo (clean corporate logo)
const magnaLogoHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f172a;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .emblem {
    width: 140px;
    height: 140px;
    background: linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #818cf8 100%);
    border-radius: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 20px 40px rgba(56, 189, 248, 0.35);
    margin-bottom: 24px;
    position: relative;
  }
  .emblem-inner {
    width: 120px;
    height: 120px;
    border-radius: 28px;
    background: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .m-shape {
    font-size: 72px;
    font-weight: 900;
    background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -2px;
  }
  .title {
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .subtitle {
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 5px;
    text-transform: uppercase;
    margin-top: 6px;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="emblem">
      <div class="emblem-inner">
        <div class="m-shape">M</div>
      </div>
    </div>
    <div class="title">Magna</div>
    <div class="subtitle">Partners</div>
  </div>
</body>
</html>
`;

// 2. Project Banner: Appnea (FindIT UGM 2025)
const appneaBannerHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    width: 1280px;
    height: 720px;
    background: radial-gradient(circle at 80% 30%, #311b92 0%, #150050 40%, #000222 100%);
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 90px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }
  .bg-glow {
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, transparent 70%);
    right: 100px;
    top: 50px;
    pointer-events: none;
  }
  .left {
    max-width: 580px;
    z-index: 2;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(168, 85, 247, 0.2);
    border: 1px solid rgba(168, 85, 247, 0.5);
    color: #c084fc;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 24px;
    letter-spacing: 0.5px;
  }
  h1 {
    font-size: 64px;
    font-weight: 800;
    margin: 0 0 12px 0;
    background: linear-gradient(135deg, #ffffff 0%, #e9d5ff 70%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1.5px;
    line-height: 1.1;
  }
  .tagline {
    font-size: 24px;
    font-weight: 600;
    color: #c084fc;
    margin-bottom: 18px;
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #cbd5e1;
    margin-bottom: 32px;
  }
  .award-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 12px 24px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 600;
    color: #f1f5f9;
  }
  .award-pill span {
    color: #fbbf24;
  }
  .right {
    z-index: 2;
    position: relative;
  }
  .phone-card {
    width: 380px;
    background: rgba(23, 15, 54, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(168, 85, 247, 0.4);
    border-radius: 36px;
    padding: 28px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(168, 85, 247, 0.25);
  }
  .phone-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .brand-chip {
    font-weight: 700;
    font-size: 18px;
    color: #e9d5ff;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .live-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 10px #10b981;
  }
  .score-box {
    background: linear-gradient(135deg, rgba(88, 28, 135, 0.6) 0%, rgba(126, 34, 206, 0.3) 100%);
    border: 1px solid rgba(192, 132, 252, 0.3);
    border-radius: 24px;
    padding: 24px;
    text-align: center;
    margin-bottom: 20px;
  }
  .score-num {
    font-size: 54px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1;
  }
  .score-label {
    font-size: 13px;
    color: #d8b4fe;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 6px;
  }
  .waveform {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    margin-bottom: 20px;
    padding: 0 10px;
  }
  .bar {
    width: 6px;
    border-radius: 99px;
    background: linear-gradient(to top, #7e22ce, #c084fc);
  }
  .metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .metric-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .metric-val {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
  }
  .metric-title {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="left">
    <div class="badge">🌙 AI Digital Health Innovation • SDG 3</div>
    <h1>Appnea</h1>
    <div class="tagline">Breathe Better, Sleep Smarter</div>
    <p>AI-powered mobile sleep monitoring application that analyzes acoustic breathing patterns and micro-apnea events without cumbersome external hardware.</p>
    <div class="award-pill">
      <span>🏆</span> 3rd Place UX Competition — FindIT UGM 2025
    </div>
  </div>
  <div class="right">
    <div class="phone-card">
      <div class="phone-top">
        <div class="brand-chip">🌙 Appnea Monitor</div>
        <div class="live-dot"></div>
      </div>
      <div class="score-box">
        <div class="score-num">88<span style="font-size: 24px; color: #a855f7;">/100</span></div>
        <div class="score-label">Optimal Sleep Health Score</div>
      </div>
      <div class="waveform">
        <div class="bar" style="height: 20px;"></div>
        <div class="bar" style="height: 35px;"></div>
        <div class="bar" style="height: 55px;"></div>
        <div class="bar" style="height: 40px;"></div>
        <div class="bar" style="height: 25px;"></div>
        <div class="bar" style="height: 50px;"></div>
        <div class="bar" style="height: 60px;"></div>
        <div class="bar" style="height: 45px;"></div>
        <div class="bar" style="height: 30px;"></div>
        <div class="bar" style="height: 52px;"></div>
        <div class="bar" style="height: 38px;"></div>
        <div class="bar" style="height: 22px;"></div>
      </div>
      <div class="metrics">
        <div class="metric-item">
          <div class="metric-val">97.8%</div>
          <div class="metric-title">Blood SpO2 Est.</div>
        </div>
        <div class="metric-item">
          <div class="metric-val">0.4 / hr</div>
          <div class="metric-title">AHI Index (Normal)</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

// 3. Project Banner: LiboorIn (ITFEST Micro IPB 2023)
const liboorinBannerHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    width: 1280px;
    height: 720px;
    background: radial-gradient(circle at 80% 30%, #0369a1 0%, #075985 30%, #082f49 70%, #03131f 100%);
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Nunito Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 90px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }
  .bg-glow {
    position: absolute;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%);
    right: 120px;
    top: 60px;
  }
  .left {
    max-width: 580px;
    z-index: 2;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(14, 165, 233, 0.2);
    border: 1px solid rgba(14, 165, 233, 0.5);
    color: #38bdf8;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  h1 {
    font-size: 64px;
    font-weight: 800;
    margin: 0 0 12px 0;
    background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 70%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1.5px;
    line-height: 1.1;
  }
  .tagline {
    font-size: 22px;
    font-weight: 600;
    color: #38bdf8;
    margin-bottom: 18px;
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #cbd5e1;
    margin-bottom: 32px;
  }
  .award-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 12px 24px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 600;
    color: #f1f5f9;
  }
  .award-pill span {
    color: #f59e0b;
  }
  .right {
    z-index: 2;
  }
  .travel-card {
    width: 390px;
    background: rgba(8, 47, 73, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(56, 189, 248, 0.4);
    border-radius: 32px;
    padding: 26px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(14, 165, 233, 0.25);
  }
  .travel-hero {
    height: 140px;
    border-radius: 20px;
    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 18px;
    box-sizing: border-box;
    margin-bottom: 18px;
    position: relative;
    overflow: hidden;
  }
  .destination-tag {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    padding: 4px 12px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 700;
    color: #fef08a;
  }
  .destination-name {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
  }
  .destination-sub {
    font-size: 13px;
    color: #bae6fd;
  }
  .features {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .feat-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.05);
    padding: 12px 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .feat-left {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
  }
  .feat-icon {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: rgba(14, 165, 233, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  .status-tag {
    font-size: 12px;
    font-weight: 700;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.15);
    padding: 4px 10px;
    border-radius: 8px;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="left">
    <div class="badge">🏝️ Smart Local Tourism & Guide Ecosystem</div>
    <h1>LiboorIn</h1>
    <div class="tagline">Enhance the Safety of Your Travel Experience</div>
    <p>Comprehensive travel platform connecting adventurers with certified local Indonesian community guides, authentic hidden gems, and 100% transparent pricing.</p>
    <div class="award-pill">
      <span>🥇</span> 1st Place UI/UX Competition — ITFEST Micro IPB 2023
    </div>
  </div>
  <div class="right">
    <div class="travel-card">
      <div class="travel-hero">
        <div class="destination-tag">★ 4.9 Verified</div>
        <div class="destination-name">Bromo National Park</div>
        <div class="destination-sub">East Java • Local Community Guided</div>
      </div>
      <div class="features">
        <div class="feat-row">
          <div class="feat-left">
            <div class="feat-icon">🧭</div>
            <div>Certified Local Guide</div>
          </div>
          <div class="status-tag">Included</div>
        </div>
        <div class="feat-row">
          <div class="feat-left">
            <div class="feat-icon">🛡️</div>
            <div>Transparent Safety Plan</div>
          </div>
          <div class="status-tag">Active</div>
        </div>
        <div class="feat-row">
          <div class="feat-left">
            <div class="feat-icon">🎫</div>
            <div>Direct Ticket Booking</div>
          </div>
          <div class="status-tag">Instant</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

// 4. Project Banner: InCareer (Self Project)
const incareerBannerHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    width: 1280px;
    height: 720px;
    background: radial-gradient(circle at 80% 30%, #1e3a8a 0%, #172554 40%, #030712 100%);
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 90px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }
  .bg-glow {
    position: absolute;
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
    right: 110px;
    top: 60px;
  }
  .left {
    max-width: 580px;
    z-index: 2;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.5);
    color: #60a5fa;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  h1 {
    font-size: 64px;
    font-weight: 800;
    margin: 0 0 12px 0;
    background: linear-gradient(135deg, #ffffff 0%, #dbeafe 70%, #60a5fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1.5px;
    line-height: 1.1;
  }
  .tagline {
    font-size: 22px;
    font-weight: 600;
    color: #60a5fa;
    margin-bottom: 18px;
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #cbd5e1;
    margin-bottom: 32px;
  }
  .steps-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .step-chip {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 10px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    color: #e2e8f0;
  }
  .step-arrow {
    color: #60a5fa;
    font-weight: 900;
  }
  .right {
    z-index: 2;
  }
  .job-card {
    width: 390px;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: 32px;
    padding: 26px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.25);
  }
  .job-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  .company-avatar {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 800;
  }
  .job-title {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
  }
  .job-company {
    font-size: 13px;
    color: #94a3b8;
  }
  .inclusive-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #4ade80;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  .match-box {
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%);
    border: 1px solid rgba(96, 165, 250, 0.25);
    border-radius: 18px;
    padding: 16px;
    margin-bottom: 16px;
  }
  .match-header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
    margin-bottom: 8px;
  }
  .match-bar-bg {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 99px;
    overflow: hidden;
  }
  .match-bar-fill {
    width: 94%;
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
    border-radius: 99px;
  }
  .access-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .a-tag {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    color: #94a3b8;
    font-weight: 600;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="left">
    <div class="badge">♿ Disability-Inclusive Employment Ecosystem</div>
    <h1>InCareer</h1>
    <div class="tagline">Empowering Equal Professional Careers</div>
    <p>Bridging people with physical disabilities and forward-thinking companies through skill-verified matchmaking, accessibility-first workflows, and simplified onboarding.</p>
    <div class="steps-row">
      <div class="step-chip">1. Choose</div>
      <div class="step-arrow">→</div>
      <div class="step-chip">2. Apply</div>
      <div class="step-arrow">→</div>
      <div class="step-chip">3. Match</div>
    </div>
  </div>
  <div class="right">
    <div class="job-card">
      <div class="job-header">
        <div class="company-avatar">IC</div>
        <div>
          <div class="job-title">Digital Product Analyst</div>
          <div class="job-company">Inclusive Enterprise • Remote</div>
        </div>
      </div>
      <div class="inclusive-badge">
        ✓ Disability-Verified Employer
      </div>
      <div class="match-box">
        <div class="match-header">
          <span>Skill Fit Match</span>
          <span style="color: #60a5fa; font-weight: 800;">94%</span>
        </div>
        <div class="match-bar-bg">
          <div class="match-bar-fill"></div>
        </div>
      </div>
      <div class="access-tags">
        <div class="a-tag">Ergonomic Tools</div>
        <div class="a-tag">Flexible Hours</div>
        <div class="a-tag">Screen-Reader Ready</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

// 5. Project Banner: EcoWardrobe (The Ace Undip 2024)
const ecowardrobeBannerHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    width: 1280px;
    height: 720px;
    background: radial-gradient(circle at 80% 30%, #78350f 0%, #451a03 40%, #1c0a00 100%);
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 90px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }
  .bg-glow {
    position: absolute;
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, rgba(217, 119, 6, 0.3) 0%, transparent 70%);
    right: 110px;
    top: 60px;
  }
  .left {
    max-width: 580px;
    z-index: 2;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(217, 119, 6, 0.2);
    border: 1px solid rgba(217, 119, 6, 0.5);
    color: #fbbf24;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  h1 {
    font-size: 64px;
    font-weight: 800;
    margin: 0 0 12px 0;
    background: linear-gradient(135deg, #ffffff 0%, #fef3c7 70%, #f59e0b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1.5px;
    line-height: 1.1;
  }
  .tagline {
    font-size: 22px;
    font-weight: 600;
    color: #fbbf24;
    margin-bottom: 18px;
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #e2e8f0;
    margin-bottom: 32px;
  }
  .award-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 12px 24px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 600;
    color: #f1f5f9;
  }
  .award-pill span {
    color: #f59e0b;
  }
  .right {
    z-index: 2;
  }
  .eco-card {
    width: 390px;
    background: rgba(41, 20, 10, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(217, 119, 6, 0.4);
    border-radius: 32px;
    padding: 26px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(217, 119, 6, 0.25);
  }
  .eco-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .eco-title {
    font-size: 18px;
    font-weight: 800;
    color: #fef3c7;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .impact-chip {
    background: linear-gradient(135deg, rgba(217, 119, 6, 0.3) 0%, rgba(180, 83, 9, 0.2) 100%);
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    margin-bottom: 18px;
  }
  .impact-num {
    font-size: 42px;
    font-weight: 800;
    color: #ffffff;
  }
  .impact-sub {
    font-size: 13px;
    color: #fde68a;
    font-weight: 600;
    margin-top: 4px;
  }
  .pillars {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .pillar-item {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 700;
    color: #f1f5f9;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="left">
    <div class="badge">🌱 Circular Economy • Sustainable Fashion • SDG 12</div>
    <h1>EcoWardrobe</h1>
    <div class="tagline">Build a Better Environment</div>
    <p>Empowering conscious consumers to reduce garment waste through an integrated circular ecosystem: resale marketplace, verified textile donation, and AI textile scanner.</p>
    <div class="award-pill">
      <span>🥉</span> 2nd Runner Up — The Ace Undip 2024
    </div>
  </div>
  <div class="right">
    <div class="eco-card">
      <div class="eco-header">
        <div class="eco-title">♻️ Circular Ecosystem</div>
        <span style="font-size: 12px; color: #f59e0b; font-weight: 700;">AAA Contrast Check</span>
      </div>
      <div class="impact-chip">
        <div class="impact-num">1,420 kg</div>
        <div class="impact-sub">Textile Waste Diverted from Landfills</div>
      </div>
      <div class="pillars">
        <div class="pillar-item">
          <span>🛍️</span> EcoMarket
        </div>
        <div class="pillar-item">
          <span>🎁</span> EcoDonate
        </div>
        <div class="pillar-item">
          <span>🔍</span> EcoScan AI
        </div>
        <div class="pillar-item">
          <span>📚</span> EcoLearn
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Helper for Certificate HTML templates
function makeCertHtml(title, issuer, date, credId, accentColor, badgeIcon) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    width: 1200px;
    height: 850px;
    background: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Outfit', sans-serif;
  }
  .cert-container {
    width: 1080px;
    height: 740px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
    position: relative;
    box-sizing: border-box;
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 14px solid #f1f5f9;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 12px;
    background: ${accentColor};
    border-radius: 8px 8px 0 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .issuer-badge {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .issuer-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: ${accentColor};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: 900;
  }
  .issuer-text {
    font-size: 22px;
    font-weight: 800;
    color: #1e293b;
    letter-spacing: -0.5px;
  }
  .issuer-sub {
    font-size: 13px;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .cert-badge {
    text-align: right;
  }
  .cert-badge-text {
    font-size: 13px;
    font-weight: 800;
    color: ${accentColor};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .body {
    text-align: center;
    margin: 20px 0;
  }
  .presents-to {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: #94a3b8;
    font-weight: 700;
    margin-bottom: 12px;
  }
  .recipient {
    font-size: 40px;
    font-weight: 900;
    color: #0f172a;
    letter-spacing: -1px;
    margin-bottom: 14px;
  }
  .completion-text {
    font-size: 16px;
    color: #64748b;
    margin-bottom: 24px;
  }
  .course-title {
    font-size: 32px;
    font-weight: 800;
    color: ${accentColor};
    letter-spacing: -0.5px;
    margin-bottom: 16px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 2px dashed #e2e8f0;
    padding-top: 24px;
  }
  .foot-item {
    font-size: 13px;
    color: #64748b;
  }
  .foot-val {
    font-size: 15px;
    font-weight: 700;
    color: #1e293b;
    margin-top: 4px;
  }
  .verified-stamp {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
  }
</style>
</head>
<body>
  <div class="cert-container">
    <div class="accent-bar"></div>
    <div class="header">
      <div class="issuer-badge">
        <div class="issuer-icon">${badgeIcon}</div>
        <div>
          <div class="issuer-text">${issuer}</div>
          <div class="issuer-sub">Certificate of Completion</div>
        </div>
      </div>
      <div class="cert-badge">
        <div class="cert-badge-text">Verified Credential</div>
      </div>
    </div>
    
    <div class="body">
      <div class="presents-to">This is proudly presented to</div>
      <div class="recipient">Achmad Firdaus Attalea Yessa</div>
      <div class="completion-text">for successfully completing the curriculum and demonstrating professional proficiency in</div>
      <div class="course-title">${title}</div>
    </div>
    
    <div class="footer">
      <div class="foot-item">
        <div>Issued By</div>
        <div class="foot-val">${issuer}</div>
      </div>
      <div class="foot-item">
        <div>Issue Date</div>
        <div class="foot-val">${date}</div>
      </div>
      <div class="foot-item">
        <div>Credential ID</div>
        <div class="foot-val">${credId}</div>
      </div>
      <div class="verified-stamp">
        ✓ Officially Verified
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// Generate all assets
console.log('--- Generating All Assets ---');

// 1. Magna Logo
renderHtmlToImage(magnaLogoHtml, path.join(OUTPUT_DIR, 'company/magna-logo.png'), 400, 400);

// 2. Banners
renderHtmlToImage(appneaBannerHtml, path.join(OUTPUT_DIR, 'banner/appnea-banner.png'), 1280, 720);
renderHtmlToImage(liboorinBannerHtml, path.join(OUTPUT_DIR, 'banner/liboorin-banner.png'), 1280, 720);
renderHtmlToImage(incareerBannerHtml, path.join(OUTPUT_DIR, 'banner/incareer-banner.png'), 1280, 720);
renderHtmlToImage(ecowardrobeBannerHtml, path.join(OUTPUT_DIR, 'banner/ecowardrobe-banner.png'), 1280, 720);

// 3. Certificates
const certDir = path.join(OUTPUT_DIR, 'certificattion');
renderHtmlToImage(
  makeCertHtml('Working in a Digital World', 'IBM SkillsBuild', '2025', 'IBM-WDW-2025-0982', '#0f62fe', 'IBM'),
  path.join(certDir, 'ibm-digital-world.jpg'),
  1200, 850
);
renderHtmlToImage(
  makeCertHtml('Project Management Fundamentals', 'IBM SkillsBuild', '2025', 'IBM-PMF-2025-4127', '#0043ce', 'PM'),
  path.join(certDir, 'ibm-pm.jpg'),
  1200, 850
);
renderHtmlToImage(
  makeCertHtml('Microsoft Skill Assessment: Productivity & Tools', 'Microsoft', '2025', 'MSFT-PROD-2025-8819', '#00a4ef', 'MS'),
  path.join(certDir, 'microsoft-office.jpg'),
  1200, 850
);
renderHtmlToImage(
  makeCertHtml('R Fundamental for Data Science', 'DQLabs', '2026', 'DQL-R-DATA-2026-3041', '#e11d48', 'DQ'),
  path.join(certDir, 'dqlabs-r.jpg'),
  1200, 850
);

console.log('--- Asset Generation Complete ---');
