#!/usr/bin/env node

const program = require('commander');

const pkg = require('../package.json');
const googleTranslate = require('./google');
const youdaoTranslate = require('./youdao');
const codeif = require('./codeif');


/*
* 命令版本
* */
program
    .version(pkg.version, '-v, --version');

/*
* 谷歌翻译，中译英，英译中，以及其他国家语言翻译
* 示例：
* yu t hello // 你好
* yu t 你好 // hello
* */
program
    .command('translate <text>')
    .alias('t')
    .option('-f, --from [value]')// 从什么语言而来的不管
    .option('-t, --to [value]', '', 'zh-cn')// 默认翻译目标是中文
    .description(`谷歌翻译，示例：yu c hello | yu c 你好
    -f, --from [value] from language
    -t, --to [value] to language default zh-cn
    `)
    .action((text, options) => {
        googleTranslate(text, options)
    });

/*
* 有道翻译，中译英，英译中
* 示例：
* yu y hello // 你好
* yu y 你好 // hello
* */
program
    .command('youdao <text>')
    .alias('y')
    .description('有道翻译， 示例：yu y hello | yu y 你好')
    .action((text, options) => {
        youdaoTranslate(text, options)
    });

/*
* 智能搜索变量名
* 示例：
* */
program
    .command('codeif <text>')
    .alias('c')
    .description('智能搜索变量名，示例：yu c 账户')
    .action((text, options) => {
        codeif(text, options)
    });


// 执行命令
program.parse(process.argv);
