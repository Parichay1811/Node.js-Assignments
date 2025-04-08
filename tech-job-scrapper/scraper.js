const axios = require("axios");
const cheerio = require("cheerio");
const ExcelJS = require("exceljs");

const url = "https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35";

async function scrapeJobs() {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const jobList = [];

  $(".job-bx").each((index, element) => {
    const jobTitle = $(element).find("h2 a").text().trim();
    const company = $(element).find(".companyName").text().trim();
    const location = $(element).find(".top-jd-dtl span").eq(1).text().trim();
    const jobType = $(element).find(".job-type").text().trim() || "Not mentioned";
    const postedDate = $(element).find(".sim-posted span").text().trim();
    const description = $(element).find(".job-desc").text().trim();

    if (jobTitle) {
      jobList.push({
        jobTitle,
        company,
        location,
        jobType,
        postedDate,
        description,
      });
    }
  });

  return jobList;
}

async function exportToExcel(jobs) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Tech Jobs");

  worksheet.columns = [
    { header: "Job Title", key: "jobTitle", width: 30 },
    { header: "Company Name", key: "company", width: 25 },
    { header: "Location", key: "location", width: 20 },
    { header: "Job Type", key: "jobType", width: 15 },
    { header: "Posted Date", key: "postedDate", width: 20 },
    { header: "Job Description", key: "description", width: 50 },
  ];

  jobs.forEach(job => worksheet.addRow(job));

  await workbook.xlsx.writeFile("jobs.xlsx");
  console.log("Excel file created: jobs.xlsx");
}

module.exports = { scrapeJobs, exportToExcel };
