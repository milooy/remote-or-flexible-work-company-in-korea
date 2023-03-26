const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const companiesDir = path.join(process.cwd(), "companies");
const rootDir = path.join(process.cwd(), "..");

const files = fs.readdirSync(companiesDir);
const listPath = path.join(rootDir, "db.json");
const list = [];

files.forEach((fileName) => {
  const filePath = path.join(companiesDir, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const id = fileName.replace(".md", "");
  list.push({ id, ...data, content });
});
fs.writeFileSync(listPath, JSON.stringify({ companies: list }));
