const CHARS = '!<>-_\\/[]{}—=+*^?#________';
const text = 'Brandon Bello';

function originalApproach(iteration) {
    return text.split('').map((letter, index) => {
        if (index < iteration) {
            return text[index];
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
}

function optimizedApproach(iteration) {
    let result = '';
    const len = text.length;
    const charsLen = CHARS.length;
    for (let i = 0; i < len; i++) {
        if (i < iteration) {
            result += text[i];
        } else {
            result += CHARS[Math.floor(Math.random() * charsLen)];
        }
    }
    return result;
}

const ITERATIONS = 1000000;

console.time('original');
for (let i = 0; i < ITERATIONS; i++) {
    originalApproach(i % text.length);
}
console.timeEnd('original');

console.time('optimized');
for (let i = 0; i < ITERATIONS; i++) {
    optimizedApproach(i % text.length);
}
console.timeEnd('optimized');
