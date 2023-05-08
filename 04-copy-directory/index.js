const { mkdir, copyFile, readdir, unlink } = require("fs/promises");
const { join } = require("path");

async function copyDirectory() {
  const source = join(__dirname, "files");
  const destination = join(__dirname, "files-copy");

  // Проверяем создана ли папка для копирования файлов
  try {
    // eslint-disable-next-line no-undef
    await access(destination);
  } catch (error) {
    // Создаем, если ее нет
    await mkdir(destination, { recursive: true });
  }

  // Удаляем старые файлы
  const files = await readdir(destination);
  for (const file of files) {
    const filePath = join(destination, file);
    await unlink(filePath);
  }

  // Копируем файлы из корневой папки в назначенную папку
  const sourceFiles = await readdir(source);
  for (const file of sourceFiles) {
    const sourcePath = join(source, file);
    const destinationPath = join(destination, file);
    await copyFile(sourcePath, destinationPath);
  }
  console.log('Файлы скопированы');
}






copyDirectory().catch(console.error);



