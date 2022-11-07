const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { encoding: "utf-8", withFileTypes: true },
  (err, data) => {
    if (err) throw err;

    for (const item of data) {
      if (!item.isDirectory()) {
        const [name, extension] = item.name.split(".");
        const pathToItem = path.join(__dirname, "secret-folder", item.name);
        fs.stat(pathToItem, (err, { size }) => {
          console.log(`${name} - ${extension} - ${size}b`);
        });
      }
    }
  }
);
