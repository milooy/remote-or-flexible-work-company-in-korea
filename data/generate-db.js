const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const companiesDir = path.join(process.cwd(), "companies");
const rootDir = path.join(process.cwd(), "..");

// if (!fs.existsSync(buildDir)) {
//   fs.mkdirSync(buildDir);
// }

const files = fs.readdirSync(companiesDir);
const listPath = path.join(rootDir, "db.json");
const list = [];

files.forEach((fileName) => {
  const filePath = path.join(companiesDir, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // const jsonFileName = `${path.parse(fileName).name}.json`;
  // const jsonFilePath = path.join(buildDir, jsonFileName);

  // fs.writeFileSync(jsonFilePath, JSON.stringify({ ...data, content }));
  list.push({ id: fileName, ...data, content });
});
fs.writeFileSync(listPath, JSON.stringify(list));
