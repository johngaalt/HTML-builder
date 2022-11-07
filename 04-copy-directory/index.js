const fs = require("fs");
const { mkdir, copyFile } = require("node:fs/promises");
const { join } = require("node:path");

async function copyDirectory() {
  const source = join(__dirname, "files");
  const destination = join(__dirname, "files-copy");
  const destinationPath = await mkdir(destination, { recursive: true });

  if (!destinationPath) {
    fs.readdir(source, { encoding: "utf-8" }, async (err, data) => {
      if (err) throw err;

      for (const file of data) {
        console.log("PATH", destination + "\\" + file);
        await copyFile(source, destination + "\\" + file);
      }
    });
  }
}

copyDirectory().catch(console.error);
