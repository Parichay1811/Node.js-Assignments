const express = require("express");
const path = require("path");
const { scrapeBooks } = require("./productScraper");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/scrape", async (req, res) => {
  try {
    const data = await scrapeBooks();
    res.json({
      success: true,
      message: "Scraping done. Data saved in products.xlsx",
      totalProducts: data.length,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "products.xlsx");
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
