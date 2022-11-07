const fs = require("fs");
const path = require("path");

fs.readdir(path.join(__dirname, "secret-folder"), "utf-8", (err, data) => {
  if (err) throw err;
  console.log(`В папке находятся файлы: ${data}`);
});
