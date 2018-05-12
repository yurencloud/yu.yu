const translate = require('google-translate-api-cn');

translate(
    `
    hello world
    -v chinese
    -c create new project
    `,
    {to: 'zh-cn'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});
