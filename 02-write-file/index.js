const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit } = require("process");

stdout.write("Введите текст:\n");

stdin.on("data", (data) => {
  if (data.toString("utf-8").trim() === "exit") {
    exit();
  }

  stdout.write(data);

  fs.appendFile(path.resolve(__dirname, "text.txt"), data, (err) => {
    if (err) throw err;
    console.log("Файл добавлен");
  });
});

process.on("SIGINT", () => {
  exit();
});

process.on("exit", () => {
  console.log("Пока!");
});
