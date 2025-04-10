const axios = require("axios");
const cheerio = require("cheerio");
const ExcelJS = require("exceljs");

async function scrapeBooks() {
  const url = "https://books.toscrape.com/catalogue/page-1.html";
  const products = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $(".product_pod").each((_, el) => {
      const name = $(el).find("h3 a").attr("title");
      const price = $(el).find(".price_color").text().trim();
      const availability = $(el).find(".availability").text().trim();
      const rating = $(el).find(".star-rating").attr("class").split(" ")[1];

      products.push({
        name,
        price,
        availability,
        rating,
      });
    });

    await saveToExcel(products);
    return products;
  } catch (err) {
    console.error("Scraping error:", err.message);
    return [];
  }
}

async function saveToExcel(products) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Books");

  worksheet.columns = [
    { header: "Book Name", key: "name", width: 50 },
    { header: "Price", key: "price", width: 15 },
    { header: "Availability", key: "availability", width: 25 },
    { header: "Rating", key: "rating", width: 15 },
  ];

  products.forEach((p) => worksheet.addRow(p));

  await workbook.xlsx.writeFile("products.xlsx");
  console.log("Excel saved: products.xlsx");
}

module.exports = { scrapeBooks };
