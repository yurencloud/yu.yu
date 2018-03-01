# yu.yuren
命令行工具 yuren

## 命令
一级命令 yu --help
二级命令 yu new --help
必选参数 new <name>
可选参数 new [name]

## 执行命令
program.parse(process.argv);

## 约定
二级命令中，都定义一个alias, 为命令的首个字母，若有重复，则前两个字母