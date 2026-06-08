const description = "• Task 1 • Task 2 •    • Task 3";

console.time('original');
for (let i = 0; i < 1000000; i++) {
    description.split('•').map(p => p.trim()).filter(Boolean).map((part, index) => ({ id: index, part }));
}
console.timeEnd('original');

console.time('optimized');
for (let i = 0; i < 1000000; i++) {
    description.split('•').reduce((acc, p) => {
        const trimmed = p.trim();
        if (trimmed) {
            acc.push({ id: acc.length, part: trimmed });
        }
        return acc;
    }, []);
}
console.timeEnd('optimized');
