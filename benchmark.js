import { performance } from 'perf_hooks';

const ITERATIONS = 1000000;

// ==========================================
// Benchmark 1: Navbar Active Section Observer
// ==========================================
console.log('--- Running Navbar Active Section Observer Benchmark ---');
const links = [
    { name: 'Home', id: 'hero', index: 0 },
    { name: 'Skills', id: 'skills', index: 1 },
    { name: 'Projects', id: 'projects', index: 2 },
    { name: 'About', id: 'about', index: 3 },
    { name: 'Contact', id: 'contact', index: 4 },
];

const mockDocumentBody = {
    getAttribute: (attr) => '3'
};

const mutations = Array.from({ length: 10 }, () => ({
    attributeName: 'data-active-section',
    target: mockDocumentBody
}));

function baselineNavbar() {
    let activeSection;
    for (const mutation of mutations) {
        if (mutation.attributeName === 'data-active-section') {
            const idx = mockDocumentBody.getAttribute('data-active-section');
            if (idx !== null) {
                const currentLink = links.find(l => l.index === parseInt(idx));
                if (currentLink) activeSection = currentLink.id;
            }
        }
    }
    return activeSection;
}

const linkMap = new Map();
for (const link of links) {
    linkMap.set(link.index.toString(), link.id);
}

function optimizedNavbar() {
    let activeSection;
    let hasAttributeMutation = false;
    let target = null;

    for (const mutation of mutations) {
        if (mutation.attributeName === 'data-active-section') {
            hasAttributeMutation = true;
            target = mutation.target;
        }
    }

    if (hasAttributeMutation && target) {
        const idx = target.getAttribute('data-active-section');
        if (idx !== null) {
            const id = linkMap.get(idx);
            if (id) activeSection = id;
        }
    }

    return activeSection;
}

const startBaselineNav = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    baselineNavbar();
}
const endBaselineNav = performance.now();
const baselineNavTime = endBaselineNav - startBaselineNav;

const startOptimizedNav = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    optimizedNavbar();
}
const endOptimizedNav = performance.now();
const optimizedNavTime = endOptimizedNav - startOptimizedNav;

console.log(`Baseline Time: ${baselineNavTime.toFixed(2)} ms`);
console.log(`Optimized Time: ${optimizedNavTime.toFixed(2)} ms`);
console.log(`Improvement: ${((baselineNavTime - optimizedNavTime) / baselineNavTime * 100).toFixed(2)}% faster\n`);


// ==========================================
// Benchmark 2: Scramble Text Animation
// ==========================================
console.log('--- Running Scramble Text Animation Benchmark ---');
const CHARS = '!<>-_\\/[]{}—=+*^?#________';
const scrambleText = 'Brandon Bello';

function originalScramble(iteration) {
    return scrambleText.split('').map((letter, index) => {
        if (index < iteration) {
            return scrambleText[index];
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
}

function optimizedScramble(iteration) {
    let result = '';
    const len = scrambleText.length;
    const charsLen = CHARS.length;
    for (let i = 0; i < len; i++) {
        if (i < iteration) {
            result += scrambleText[i];
        } else {
            result += CHARS[Math.floor(Math.random() * charsLen)];
        }
    }
    return result;
}

const startOriginalScramble = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    originalScramble(i % scrambleText.length);
}
const endOriginalScramble = performance.now();
const originalScrambleTime = endOriginalScramble - startOriginalScramble;

const startOptimizedScramble = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    optimizedScramble(i % scrambleText.length);
}
const endOptimizedScramble = performance.now();
const optimizedScrambleTime = endOptimizedScramble - startOptimizedScramble;

console.log(`Original Time: ${originalScrambleTime.toFixed(2)} ms`);
console.log(`Optimized Time: ${optimizedScrambleTime.toFixed(2)} ms`);
console.log(`Improvement: ${((originalScrambleTime - optimizedScrambleTime) / originalScrambleTime * 100).toFixed(2)}% faster\n`);


// ==========================================
// Benchmark 3: Description Traversal
// ==========================================
console.log('--- Running Description Traversal Benchmark ---');
const description = "• Task 1 • Task 2 •    • Task 3";

function originalTraversal() {
    return description.split('•').map(p => p.trim()).filter(Boolean).map((part, index) => ({ id: index, part }));
}

function optimizedTraversal() {
    return description.split('•').reduce((acc, p) => {
        const trimmed = p.trim();
        if (trimmed) {
            acc.push({ id: acc.length, part: trimmed });
        }
        return acc;
    }, []);
}

const startOriginalTraversal = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    originalTraversal();
}
const endOriginalTraversal = performance.now();
const originalTraversalTime = endOriginalTraversal - startOriginalTraversal;

const startOptimizedTraversal = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    optimizedTraversal();
}
const endOptimizedTraversal = performance.now();
const optimizedTraversalTime = endOptimizedTraversal - startOptimizedTraversal;

console.log(`Original Time: ${originalTraversalTime.toFixed(2)} ms`);
console.log(`Optimized Time: ${optimizedTraversalTime.toFixed(2)} ms`);
console.log(`Improvement: ${((originalTraversalTime - optimizedTraversalTime) / originalTraversalTime * 100).toFixed(2)}% faster\n`);
