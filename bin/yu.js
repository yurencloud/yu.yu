#!/usr/bin/env node

const program = require('commander');
const childProcess = require('child_process');
const colors = require('colors');
const loading = require('./loading');
const pkg = require('../package.json');
const fs = require('fs');
const root = __dirname + '/..';

// 命令版本
program
    .version(pkg.version, '-v, --version');


// 创建新项目命令
program
    .command('new <name>')
    .alias('n')
    .description('build new vue|react project.')
    .option('-t, --type [value]', /^(vue|react)$/i, 'vue')
    .action((name, options) => {
        console.log('building...'.green);
        loading.start();
        switch (options.type){
            case 'vue':
                childProcess.exec(
                    'git clone https://github.com/yurencloud/yu.vue.git && ' +
                    'rm -rf yu.vue/.git &&' +
                    'mv yu.vue ' + name,
                    '',
                    () => {
                        loading.end();
                        console.log(colors.green('%s %s project ' + 'built successfully！'), name, options.type);
                    }
                );
                break;
            case 'react':
                childProcess.exec(
                    'git clone https://github.com/yurencloud/yu.react.git && ' +
                    'rm -rf yu.react/.git &&' +
                    'mv yu.react ' + name,
                    '',
                    () => {
                        loading.end();
                        console.log(colors.green('%s %s project ' + 'built successfully！'), name, options.type);
                    }
                );
                break;
            default:
                break;
        }
    });

// 创建通用的模板文件
program
    .command('create <name>')
    .alias('c')
    .description('create some template file')
    .action((name) => {
        console.log('creating...'.green);
        loading.start();
        switch (name){
            case 'g':
            case '.gitignore':
                childProcess.exec(
                    `cp ${root}/res/.gitignore .gitignore`,
                    '',
                    () => {
                        loading.end();
                        console.log('.gitignore created successfully!'.green);
                    }
                );
                break;
            case 'p':
            case 'package.json':
                childProcess.exec(
                    `cp ${root}/res/package.json package.json`,
                    '',
                    () => {
                        loading.end();
                        console.log('package.json created successfully!'.green);
                    }
                );
                break;
            default:
                loading.end();
                console.log('This type file is not supported!'.red);
                break;
        }

    });

// 执行命令
program.parse(process.argv);