import { performance } from 'perf_hooks';

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

function baseline() {
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

// In React, we can't do things exactly like standard JS outside the render cycle,
// but we can prepare the map once and use it.
const linkMap = new Map();
for (const link of links) {
    linkMap.set(link.index.toString(), link.id);
}

function optimized() {
    let activeSection;

    // Instead of querying document body on every mutation iteration,
    // let's just find if the attribute changed, then query once at the end
    // or just use target from the last mutation

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

const ITERATIONS = 1000000;

const startBaseline = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    baseline();
}
const endBaseline = performance.now();
const baselineTime = endBaseline - startBaseline;

const startOptimized = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    optimized();
}
const endOptimized = performance.now();
const optimizedTime = endOptimized - startOptimized;

console.log(`Baseline Time: ${baselineTime.toFixed(2)} ms`);
console.log(`Optimized Time: ${optimizedTime.toFixed(2)} ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}% faster`);
