const fs = require('fs').promises;
const path = require('path');


async function buildBundle() {
  try {
    // Определяем пути
    const inputPath = path.join(__dirname, 'styles');
    const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');

    // Находим и читаем все файлы заканчиваюшиеся на .css
    const files = await fs.readdir(inputPath);
    const cssFiles = files.filter(file => file.endsWith('.css'));

    // Соединяем контент файлов
    let contents = '';
    for (const file of cssFiles) {
      const filePath = path.join(inputPath, file);
      const fileContents = await fs.readFile(filePath, 'utf8');
      contents += fileContents;
    }

    // Записываем в конечный файл
    await fs.writeFile(outputPath, contents);

    console.log('Сборка файлов прошла успешно');
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

buildBundle().catch(console.error);
