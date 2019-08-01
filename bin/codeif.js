const got = require('got');
const colors = require('colors');
const validation = require('yu.validation');

const loading = require('./loading');
const YOUDAO_API = 'https://fanyi.youdao.com/openapi.do?callback=youdaoFanyiRequestCallback&keyfrom=Codelf&key=2023743559&type=data&doctype=jsonp&version=1.1&q='
const CODEIF_API = 'https://searchcode.com/api/codesearch_I/?callback=searchcodeRequestVariableCallback&p=0&per_page=42&q='

function getWords(result) {
    let list = []
    result.forEach((word) => {
        words = word.toUpperCase().trim().split(/\s+/)
        list = list.concat(words)
    })
    filterWords = ['AT', 'THE', 'OF', 'AT', 'A', 'AN', 'IS', 'NOT', 'NO','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    list = list.filter(item=>!filterWords.includes(item))
    return [...new Set(list)]
}


function youdaoTranslate (text, options) {
    loading.text = '搜索中...'
    loading.start()
    return got(YOUDAO_API + encodeURIComponent(text)).then(res => {
        let result = []
        var data = JSON.parse(res.body.substring(27, res.body.length - 2))
        result.push(data.translation[0])
        if(data.web) {
            result = result.concat(data.web[0].value);
        }
        return getWords(result)
    }).catch(err => {
        loading.end()
        console.log(err)
    });
}

function codeJs(words){
    got(CODEIF_API+words.join('+')).then(res => {
        var data = JSON.parse(res.body)
        let results = []
        data.results.forEach(item=>{
            const result = []
            Object.keys(item.lines).forEach(key=>{
                words.forEach((word)=>{
                    const wordList = item.lines[key].replace(/[^a-zA-Z_\-]+/gi,' ').trim().split(/\s+/)
                    wordList.forEach(each=>{
                        if(each.toUpperCase().indexOf(word.toUpperCase()) > -1){
                            result.push(each)
                        }
                    })
                })
            })
            results = results.concat(result)
        })
        results = [...new Set(results)]
        loading.end()
        console.log(words.map(item=>item.toLowerCase()))
        console.log(colors.green(results.join('  ')));
    }).catch(err => {
        loading.end()
        console.log(err);
    });
}

module.exports = function (text, option) {

    if(validation.isChinese(text[0])){
        youdaoTranslate(text, option).then(res=>{
            codeJs(res)
        })
    } else {
        codeJs([text.toUpperCase()])
    }
}