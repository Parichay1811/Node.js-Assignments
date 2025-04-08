const express = require("express");
const path = require("path");
const { scrapeJobs, exportToExcel } = require("./scraper");

const app = express();
const PORT = 3000;

// Serve frontend from /public
app.use(express.static(path.join(__dirname, "public")));

// Scraping route
app.get("/scrape", async (req, res) => {
  try {
    const jobs = await scrapeJobs();
    await exportToExcel(jobs);
    res.download("./jobs.xlsx");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to scrape jobs.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
