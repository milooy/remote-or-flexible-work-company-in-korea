const fs = require("fs");
const jsObject = require("./db.js");

// 객체를 JSON 문자열로 변환
const jsonStr = JSON.stringify(jsObject);

// JSON 파일로 저장
fs.writeFileSync("db.json", jsonStr);
