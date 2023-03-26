const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const companiesDir = path.join(process.cwd(), "companies");
const buildDir = path.join(process.cwd(), "build");

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

const files = fs.readdirSync(companiesDir);
const listPath = path.join(buildDir, "list.json");
const list = [];

files.forEach((fileName, index) => {
  const filePath = path.join(companiesDir, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const jsonFileName = `${path.parse(fileName).name}.json`;
  const jsonFilePath = path.join(buildDir, jsonFileName);

  fs.writeFileSync(jsonFilePath, JSON.stringify({ ...data, content }));
  list.push({ id: index + 1, ...data });
});
fs.writeFileSync(listPath, JSON.stringify(list));
