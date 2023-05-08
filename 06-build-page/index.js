const fs = require('fs/promises');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, 'components');
const STYLES_DIR = path.join(__dirname, 'styles');
const ASSETS_DIR = path.join(__dirname, 'assets');
const TEMPLATE_FILE = path.join(__dirname, 'template.html');
const INDEX_FILE = path.join(__dirname, 'project-dist', 'index.html');
const STYLE_FILE = path.join(__dirname, 'project-dist', 'style.css');

async function buildPage() {
  // Создание парки project-dist
  await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

  // Копирование assets в project-dist
  await copyDirectory(ASSETS_DIR, path.join(__dirname, 'project-dist', 'assets'));

  // Чтение template
  const template = await fs.readFile(TEMPLATE_FILE, 'utf-8');

  // Поиск всех тегов-шаблонов в template
  const regex = /{{(.+?)}}/g;
  const tags = template.match(regex);

  // Загрузка и объединение всех компонентов
  const components = await Promise.all(
    tags.map(tag => {
      const componentName = tag.replace(/[{}]/g, '');
      const componentPath = path.join(COMPONENTS_DIR, `${componentName}.html`);
      return fs.readFile(componentPath, 'utf-8');
    })
  );

  // Объединение HTML компонентов с файлом-шаблоном
  let index = template;
  components.forEach((component, i) => {
    index = index.replace(tags[i], component);
  });

  // Запись файла index.html
  await fs.writeFile(INDEX_FILE, index);

  // Загрузка и объединение всех файлов стилей
  const styleFiles = await fs.readdir(STYLES_DIR);
  const styles = await Promise.all(
    styleFiles.map(file => fs.readFile(path.join(STYLES_DIR, file), 'utf-8'))
  );

  // Запись файла style.css
  await fs.writeFile(STYLE_FILE, styles.join('\n'));
}

// Рекурсивная функция для копирования папок
async function copyDirectory(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  await fs.mkdir(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}


buildPage()
  .then(() => console.log('Страница успешно собрана!'))
  .catch(error => console.error(`Выявлена ошибка:${error}`));
