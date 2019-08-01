const colors = require('colors');
const got = require('got');
const loading = require('./loading');

const YOUDAO_API = 'https://fanyi.youdao.com/openapi.do?callback=youdaoFanyiRequestCallback&keyfrom=Codelf&key=2023743559&type=data&doctype=jsonp&version=1.1&q='

module.exports = function (text, options) {
    loading.text = '翻译中...'
    loading.start()
    got(YOUDAO_API + encodeURIComponent(text)).then(res => {
        var data = JSON.parse(res.body.substring(27, res.body.length - 2))
        loading.end()
        console.log(colors.green(data.translation[0]));
        if(data.web){
            console.log(colors.blue(data.web[0].value));
        }
    }).catch(err => {
        loading.end()
        console.log(err)
    });
}