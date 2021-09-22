#!/usr/bin/env node

const { version } = require('../package.json');
const { program } = require('commander');
const { add } = require('./create');

program
  .version(version, '-v, --version')
  .name('wblock')
  .alias('wb')
  .usage('command [options]')
  .on('--help', () => {
    console.log('');
    console.log('使用示例:');
    console.log('  $ wblock add src/pages/xxx');
    console.log('  $ wblock add src/pages/xxx --type xxx');
    console.log('  $ wblock add src/pages/xxx -t xxx');
  });

program
  .command('add <src>')
  .alias('c')
  .option('-t, --type <type>', '模板类型')
  .usage('<src>')
  .description('创建模板')
  .action(async (src, { type }) => {
    await add(src, type);
  });

program.parse(process.argv);
