const loading = (function () {
    let point = 0;
    let interval;
    const loadingList = ['-', '\\', '|', '/'];

    return {
        start() {
            process.stdout.write(loadingList[0]);
            interval = setInterval(() => {
                point++;
                point %= loadingList.length;
                try {
                    process.stdout.cursorTo(0);
                } catch (err) {
                    // ignore
                }
                process.stdout.write(loadingList[point]);
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