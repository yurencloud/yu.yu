
#### 快速翻译及智能搜索和生成变量名
支持英文单词，英文句子，中文词语，中文句子之间的相互转换

#### 安装
```
npm install -g yu.yu
```

#### 使用
使用谷歌翻译
```
yu t hello // 你好
yu t 世界 // world
```
使用有道翻译
```
yu y hello 
// 你好
// [ '你好', '您好', '哈啰' ]

yu t 世界
// The world
// [ 'World', 'minecraft', 'globe' ]
```
智能搜索和生成变量名
> 搜索来源全球github,gitlab等开源项目的代码
```
yu c 余额
```
输出
```
[ 'balance', 'remaining', 'residual' ]
BalanceAmount  balance  Remaining  ResidualAmount  residual  MortgageBalance  remaining  balanced
```

#### 帮助文档
```
Usage: yu [options] [command]

Options:
  -v, --version                 output the version number
  -h, --help                    output usage information

Commands:
  translate|t [options] <text>  谷歌翻译，示例：yu c hello | yu c 你好
      -f, --from [value] from language
      -t, --to [value] to language default zh-cn
      
  youdao|y <text>               有道翻译， 示例：yu y hello | yu y 你好
  codeif|c <text>               智能搜索变量名，示例：yu c 账户
```

#### 接口来源
codeif: https://unbug.github.io/codelf/
有道翻译：https://fanyi.youdao.com
谷歌翻译：https://translate.google.cn/