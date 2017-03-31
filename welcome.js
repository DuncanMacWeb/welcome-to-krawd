import { pause } from './utils';

const welcome = async function() {
    const el = document.querySelector('.message');
    const originalText = el.innerText;
    let timeLeft = 3;
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