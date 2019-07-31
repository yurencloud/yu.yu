#!/usr/bin/env node

const program = require('commander');
const childProcess = require('child_process');
const validation = require('yu.validation');
const colors = require('colors');
const translate = require('google-translate-api-cn');
const loading = require('./loading');
const pkg = require('../package.json');
const path = require('path');
const root = path.join(__dirname, '..');
const res = path.join(root, '/res');
const got = require('got');

// 命令版本
program
    .version(pkg.version, '-v, --version');


// 创建新项目命令
program
    .command('new <name>')
    .alias('n')
    .description('build new vue|react|webpack project.')
    .option('-t, --type [value]', /^(vue|react|webpack)$/i, 'vue')
    .action((name, options) => {
        console.log('building...'.green);
        loading.start();
        switch (options.type) {
            case 'vue':
                childProcess.exec(
                    'git clone https://github.com/yurencloud/yu.vue.git && ' +
                    'rm -rf yu.vue/.git && ' +
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
                    'rm -rf yu.react/.git && ' +
                    'mv yu.react ' + name,
                    '',
                    () => {
                        loading.end();
                        console.log(colors.green('%s %s project ' + 'built successfully！'), name, options.type);
                    }
                );
                break;
            case 'webpack':
                childProcess.exec(
                    'git clone https://github.com/yurencloud/yu.webpack.git && ' +
                    'rm -rf yu.webpack/.git && ' +
                    'mv yu.webpack ' + name,
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
        switch (name) {
            case 'g':
            case '.gitignore':
                childProcess.exec(
                    `cp ${res}/gitignore .gitignore`,
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
                    `cp ${res}/package.json package.json`,
                    '',
                    () => {
                        loading.end();
                        console.log('package.json created successfully!'.green);
                    }
                );
                break;
            case 'n':
            case '.npmignore':
                childProcess.exec(
                    `cp ${res}/npmignore .npmignore`,
                    '',
                    () => {
                        loading.end();
                        console.log('.npmignore created successfully!'.green);
                    }
                );
                break;
            case 'project':
                childProcess.exec(
                    `mkdir node_modules && cp ${res}/npmignore .npmignore && cp ${res}/gitignore .gitignore && cp ${res}/package.json package.json`,
                    '',
                    () => {
                        loading.end();
                        console.log('empty project created successfully!'.green);
                    }
                );
                break;
            default:
                loading.end();
                console.log('This type file is not supported!'.red);
                break;
        }
    });

// 执行常用命令
program
    .command('exec <name>')
    .alias('e')
    .description('exec command')
    .action((name) => {
        console.log('exec...'.green);
        switch (name) {
            case 'p':
            case 'push':
                childProcess.exec(
                    `git add . && git commit -am "update" && git push`,
                    '',
                    () => {
                        console.log('git push successfully!'.green);
                    }
                );
                break;
            default:
                console.log('This command is not supported!'.red);
                break;
        }
    });

function trans(text, options) {
    translate(text, {from: options.from, to: options.to}).then(res => {
        console.log(res.text);
    }).catch(err => {
    });
}
https://searchcode.com/api/jsonp_codesearch_I/?callback=searchcodeRequestVariableCallback&q=user+center&p=0&per_page=42


// 执行常用命令
program
    .command('translate <text>')
    .alias('t')
    .description('translate text to Chinese by google translate api')
    .option('-f, --from [value]')// 从什么语言而来的不管
    .description('')
    .option('-t, --to [value]', '', 'zh-cn')// 默认翻译目标是中文
    .description(`translate text to Chinese by google translate api
    -f, --from [value] from language
    -t, --to [value] to language default zh-cn
    `)
    .action((text, options) => {
        if(options.to === 'zh-cn'){
            // 判断是否是中文开头的
            if(validation.isChinese(text[0])){
                options.to = 'en';
            }
        }
        // 因为谷歌翻译有字数限制，可以循环翻译
        if (text.length > 4000) {
            const limit = Math.ceil(text.length / 4000);
            for (let i = 0; i < limit; i++) {
                const segment = text.substr(i * 4000, (i + 1) * 4000);
                trans(segment, options)
            }
        } else {
            trans(text, options)
        }
    });



function youdaoTrans(text, options) {
    return got('https://fanyi.youdao.com/openapi.do?callback=youdaoFanyiRequestCallback&keyfrom=Codelf&key=2023743559&type=data&doctype=jsonp&version=1.1&q=' + encodeURIComponent(text)).then(res => {
        var data = JSON.parse(res.body.substring(27, res.body.length - 2))
        console.log(data.translation[0]);
        return data.translation[0];
        // console.log(data.translation[0]);
    }).catch(err => {
    });
}

// 执行常用命令
program
    .command('youdao <text>')
    .alias('y')
    .description('translate text to Chinese by youdao translate api')
    .action((text, options) => {
         youdaoTrans(text)
    });

function codeJs(text) {
    const textArr = text.split(' ')
    console.log('https://searchcode.com/api/jsonp_codesearch_I/?callback=searchcodeRequestVariableCallback&p=0&per_page=42&q=' + textArr.join('+'));
    got('https://searchcode.com/api/codesearch_I/?callback=searchcodeRequestVariableCallback&p=0&per_page=42&q='+textArr.join('+')).then(res => {
        var data = JSON.parse(res.body)
        data.results.forEach(item=>{
            Object.keys(item.lines).forEach(key=>{
                textArr.forEach((word)=>{
                    if(item.lines[key].indexOf(word)>-1){
                        console.log(item.lines[key])
                    }
                })

            })
        })
    }).catch(err => {
        console.log(err);
    });
}

// 先翻译，再搜索变量名
// https://searchcode.com/api/jsonp_codesearch_I/?callback=searchcodeRequestVariableCallback&q=user+center&p=0&per_page=42
program
    .command('codejs <text>')
    .alias('cj')
    .description('translate text to Chinese by youdao translate api')
    .action((text, options) => {
         youdaoTrans(text).then(result=>{
             codeJs(result)
         })

    });


// 执行命令
program.parse(process.argv);
