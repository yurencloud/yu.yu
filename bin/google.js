const colors = require('colors');
const translate = require('google-translate-api-cn');
const validation = require('yu.validation');
const loading = require('./loading');

function startTranslate(text, options) {
    loading.text = '翻译中...'
    loading.start()
    translate(text, {from: options.from, to: options.to}).then(res => {
        loading.end()
        console.log(colors.green(res.text));
    }).catch(err => {
        loading.end()
    });
}

module.exports = function (text, options) {
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
            startTranslate(segment, options)
        }
    } else {
        startTranslate(text, options)
    }
}