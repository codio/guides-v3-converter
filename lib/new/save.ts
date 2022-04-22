import fs from 'fs';

const write = (file, data) => {
  console.log(`Writing ${file}...`);
  return fs.promises.writeFile(file, data);
};

export const createFolder = (path) => fs.promises.stat(path)
  .catch(() => {
    console.log(`Creating "${path}" Folder...`);
    return fs.promises.mkdir(path);
  });

export default (path, fileName, content) => createFolder(path).then(() => write(`${path}/${fileName}`, content));
