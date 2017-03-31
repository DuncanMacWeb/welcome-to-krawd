import pause from './utils';

const randomInt = (int) => Math.ceil(Math.random() * int);

const logWaiting = (name, time) => {
    console.log(`${name}: waited for ${time}s`);
}

const randomTimeAwaiter = (name) => async function () {
    const time = randomInt(3);
    await pause(time * 1000);
    logWaiting(name, time);
}

const fns = [];
for (let i = 1; i <= 3; i++) {
    fns.push(randomTimeAwaiter(`fn${i}`));
}

/* f1()
.then(f2)
.then(f3)
.catch((err) => {
    console.error(err);
}) */

async function step(fns) {
    for (let fn of [...fns]) {
        await fn();
    }
    console.log('step: Done!');
}

step(fns)
.catch((err) => {
    console.error(err);
});

const parallel = (fns) => {
    const fnsExec = [];
    for (let fn of [...fns]) {
        fnsExec.push(fn());
    }
    return Promise.all(fnsExec);
}

parallel(fns).then(() => {
    console.log('parallel: Done!')    
}).catch((err) => {
    console.error(err);
});
