const fs = require('fs');
const fsPromise = fs.promises;
const path = require('path');
const stat = fs.stat;

const copy = async (src, dst) => {
  //读取目录
  fs.readdir(src, (err, paths) => {
    if (err) {
      throw err;
    }
    paths.forEach((path) => {
      let _src = src + '/' + path;
      let _dst = dst + '/' + path;
      let readable;
      let writable;
      stat(_src, (err, st) => {
        if (err) {
          throw err;
        }
        if (st.isFile()) {
          readable = fs.createReadStream(_src); //创建读取流
          writable = fs.createWriteStream(_dst); //创建写入流
          readable.pipe(writable);
        } else if (st.isDirectory()) {
          copy(_src, _dst);
        }
      });
    });
  });
};

// 删除文件夹
const remove = async (filePath) => {
  let stat = await fsPromise.stat(filePath);
  if (stat.isFile()) {
    await fsPromise.unlink(filePath);
  } else {
    let dirs = await fsPromise.readdir(filePath);
    dirs = dirs.map((dir) => remove(path.join(filePath, dir)));
    await Promise.all(dirs);
    await fsPromise.rmdir(filePath);
  }
};

// 是否存在某个目录
const exists = (dir) => {
  return fs.existsSync(dir);
};

module.exports = { copy, remove, exists };
