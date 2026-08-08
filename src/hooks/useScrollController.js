import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollController(sections) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const isAnimating = useRef(false);

    const navigateTo = useCallback((newIndex, newDirection) => {
        if (isAnimating.current || newIndex === currentIndex) return;
        if (newIndex < 0 || newIndex >= sections.length) return;
        isAnimating.current = true;
        setDirection(newDirection);
        setCurrentIndex(newIndex);
        setTimeout(() => { isAnimating.current = false; }, 1400);
    }, [currentIndex, sections.length]);

    useEffect(() => {
        // Wheel handler at window level with capture phase to ensure it fires
        // BEFORE any stopPropagation in child components
        const handleWheel = (e) => {
            if (isAnimating.current) return;
            if (Math.abs(e.deltaY) < 30) return;

            const newDirection = e.deltaY > 0 ? 1 : -1;
            const newIndex = currentIndex + newDirection;

            // Check if the current section has scrollable content
            const sectionId = sections[currentIndex]?.id;
            const sectionEl = document.getElementById(sectionId);
            if (sectionEl && sectionEl.scrollHeight > sectionEl.clientHeight + 10) {
                const atTop = sectionEl.scrollTop <= 5;
                const atBottom = sectionEl.scrollTop + sectionEl.clientHeight >= sectionEl.scrollHeight - 5;
                // Scrolling down (go next) — only if at bottom of scroll
                if (newDirection > 0 && !atBottom) return;
                // Scrolling up (go prev) — only if at top of scroll
                if (newDirection < 0 && !atTop) return;
            }

            if (newIndex >= 0 && newIndex < sections.length) {
                isAnimating.current = true;
                setDirection(newDirection);
                setCurrentIndex(newIndex);
                setTimeout(() => { isAnimating.current = false; }, 1400);
            }
        };

        // Soporte Toque para Móviles — with scroll-aware navigation
        let touchStart = 0;
        let touchStartX = 0;
        const handleTouchStart = (e) => {
            touchStart = e.changedTouches[0].screenY;
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e) => {
            if (isAnimating.current) return;
            const touchEnd = e.changedTouches[0].screenY;
            const touchEndX = e.changedTouches[0].screenX;
            const deltaY = touchStart - touchEnd;
            const deltaX = touchStartX - touchEndX;

            // Only trigger vertical navigation if vertical swipe is dominant
            if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
                // Check if the current section has scrollable content
                const sectionId = sections[currentIndex]?.id;
                const sectionEl = document.getElementById(sectionId);
                if (sectionEl && sectionEl.scrollHeight > sectionEl.clientHeight + 10) {
                    const atTop = sectionEl.scrollTop <= 5;
                    const atBottom = sectionEl.scrollTop + sectionEl.clientHeight >= sectionEl.scrollHeight - 5;
                    // Swiping up (go next) — only if at bottom of scroll
                    if (deltaY > 0 && !atBottom) return;
                    // Swiping down (go prev) — only if at top of scroll
                    if (deltaY < 0 && !atTop) return;
                }

                const newDirection = deltaY > 0 ? 1 : -1;
                const newIndex = currentIndex + newDirection;
                if (newIndex >= 0 && newIndex < sections.length) {
                    isAnimating.current = true;
                    setDirection(newDirection);
                    setCurrentIndex(newIndex);
                    setTimeout(() => isAnimating.current = false, 1400);
                }
            }
        };

        // Use capture: true to intercept wheel events BEFORE children can stopPropagation
        window.addEventListener('wheel', handleWheel, { capture: true, passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        document.body.setAttribute('data-active-section', currentIndex);

        return () => {
            window.removeEventListener('wheel', handleWheel, { capture: true });
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentIndex, sections.length, sections]);

    return { currentIndex, direction, navigateTo };
}
