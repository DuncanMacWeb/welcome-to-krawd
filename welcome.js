const welcome = async function() {
    const el = document.querySelector('.message');
    const originalText = el.innerText;
    let timeLeft = 3;
    const pause = function(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    };
    do {
        el.innerText = timeLeft;
        await pause(1000);
        timeLeft--;
    } while (timeLeft);
    el.innerText = originalText;
};

welcome().catch((error) => {
    console.error(error);
});