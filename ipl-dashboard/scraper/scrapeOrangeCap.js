const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const seasons = ['2023', '2022', '2021', '2020', '2019'];
const baseUrl = 'https://www.iplt20.com/stats';

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // false = you can see what's happening
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const orangeCapStats = {};

  for (const season of seasons) {
    const url = `${baseUrl}/${season}/most-runs`;
    console.log(`🔗 Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });

    // Scroll to trigger content load
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await new Promise(resolve => setTimeout(resolve, 3000)); // wait 3 seconds for content to load

    // Wait until table rows appear
    await page.waitForSelector('.stats-table tbody tr');

    const players = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('.stats-table tbody tr'));
      return rows.slice(0, 10).map(row => {
        const columns = row.querySelectorAll('td');
        return {
          name: columns[1]?.innerText.trim(),
          team: columns[2]?.innerText.trim(),
          runs: parseInt(columns[3]?.innerText.trim())
        };
      });
    });

    orangeCapStats[season] = players;
    console.log(`✅ Scraped Orange Cap data for ${season}`);
  }

  await browser.close();

  const outputPath = path.join(__dirname, '..', 'data', 'orangeCapData.json');
  fs.writeFileSync(outputPath, JSON.stringify(orangeCapStats, null, 2));
  console.log(`\n📁 Data saved to ${outputPath}`);
})();
