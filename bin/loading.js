const colors = require('colors');

const loading = (function () {
    let point = 0;
    let interval;
    const loadingList = ['-', '\\', '|', '/'];

    return {
        text: '',
        start() {
            process.stdout.write(colors.green(loadingList[0]+ ' ' + this.text));
            interval = setInterval(() => {
                point++;
                point %= loadingList.length;
                try {
                    process.stdout.cursorTo(0);
                } catch (err) {
                    // ignore
                }
                process.stdout.write(colors.green(loadingList[point] + ' ' + this.text));
            }, 90);
        },
        end() {
            clearInterval(interval);
            point = 0;

            try {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
            } catch (err) {
                // ignore
            }
        },
    };
}());

module.exports = loading;