export const mechanicalSpring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 1.5
};

export const slowMechanicalSpring = {
  type: "spring",
  stiffness: 200,
  damping: 35,
  mass: 2
};

export const quickSnapSpring = {
  type: "spring",
  stiffness: 600,
  damping: 30,
  mass: 1
};

export const getReducedMotionTransition = (prefersReducedMotion, defaultTransition) => {
  return prefersReducedMotion ? { duration: 0.01 } : defaultTransition;
};

// Scroll Reveal Animations
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...mechanicalSpring, damping: 20 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};
