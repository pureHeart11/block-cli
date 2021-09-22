#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const error = chalk.bold.red;
const PRINT = `${path.resolve('./')}${path.sep}`;
const block = path.resolve('./wblock');
const localModule = fs.readdirSync(path.resolve(__dirname, '../base_package'));
const { copy, remove, exists } = require('../utils');
let packages = `../base_package/`;
let externalModule = [];

const createFilePromise = (file_name, type) =>
  new Promise((resolve) => {
    const _file_path = `${PRINT}${file_name}`;
    const _file_template_path = path.resolve(
      __dirname,
      `${packages}${type}${path.sep}template`,
    );
    try {
      copy(_file_template_path, _file_path);
    } catch (e) {
      if (_file_template_path) {
        console.log(error(`未找到渲染模板：${_file_template_path}`));
      }
    } finally {
      resolve();
    }
  });

const createDirPromise = (dir = '') =>
  new Promise((resolve) => {
    const _path = `${PRINT}${dir}`;
    if (!fs.existsSync(_path)) {
      fs.mkdir(_path, (err) => {
        if (err) throw err;
        console.log(`完成创建${_path}`);
        resolve();
      });
      return;
    }
    resolve();
  });

const action = async (file_name, type) => {
  if (!localModule.includes(type)) {
    packages = `${block}${path.sep}`;
  }
  let _path = file_name.split('/');
  for (let i = 0; i < _path.length; i++) {
    await createDirPromise(_path.slice(0, i + 1).join('/'));
  }
  await createFilePromise(file_name, type);
  console.log(chalk.rgb(15, 100, 204).inverse(`全部完成！`));
};

const checkDir = async (file_name, type) => {
  const path = `${PRINT}${file_name}`;
  // 判断目录是否存在
  if (exists(path)) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'cover',
          message: '当前目录已存在模板，是否覆盖:',
        },
      ])
      .then(async ({ cover }) => {
        if (cover) {
          await remove(path); //先清空后创建
          action(file_name, type);
        }
      })
      .catch((error) => console.log(error));
  } else {
    action(file_name, type);
  }
};

const add = async (file_name, type) => {
  if (exists(block)) externalModule = fs.readdirSync(block); //检查本地模板是否存在
  if (!type) {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Please pick a module:',
          choices: Array.from(new Set([...localModule, ...externalModule])),
        },
      ])
      .then((answers) => {
        type = answers.type;
        checkDir(file_name, type);
      })
      .catch((error) => console.log(error));
  } else {
    checkDir(file_name, type);
  }
};

module.exports = { add };
