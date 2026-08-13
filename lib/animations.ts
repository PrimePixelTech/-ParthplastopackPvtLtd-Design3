import { Variants } from 'framer-motion';

/* ═══════════════════════════════════════════
   FRAMER MOTION ANIMATION VARIANTS
   Centralized animation system for consistency
   ═══════════════════════════════════════════ */

// ---- Fade Variants ----
export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ---- Slide Variants ----
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -80, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 80, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// ---- Scale Variants ----
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ---- Stagger Container ----
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ---- Card Hover ----
export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.06)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// ---- Image Zoom ----
export const imageZoom = {
  rest: { scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.08, transition: { duration: 0.5 } },
};

// ---- Button Glow ----
export const buttonGlow = {
  rest: {
    boxShadow: '0 0 0px rgba(11, 94, 215, 0)',
    transition: { duration: 0.3 },
  },
  hover: {
    boxShadow: '0 0 30px rgba(11, 94, 215, 0.35)',
    transition: { duration: 0.3 },
  },
};

// ---- Text Split Animation ----
export const letterAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// ---- Page Transition ----
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

// ---- Parallax helpers ----
export const parallaxY = (offset: number = 50) => ({
  initial: { y: offset },
  whileInView: { y: 0 },
  viewport: { once: false, margin: '-100px' },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
});

// ---- Reveal from direction ----
export const revealFromLeft: Variants = {
  hidden: { opacity: 0, x: -80, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const revealFromRight: Variants = {
  hidden: { opacity: 0, x: 80, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const revealFromBottom: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ---- Rotate In ----
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ---- Counter animation helper ----
export const counterSpring = {
  type: 'spring' as const,
  stiffness: 50,
  damping: 20,
  duration: 2,
};

// ---- Floating animation ----
export const floating = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatingSlow = {
  animate: {
    y: [-5, 15, -5],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ---- Navbar shrink ----
export const navbarVariants = {
  expanded: {
    height: 80,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  shrunk: {
    height: 64,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// ---- Arrow animation ----
export const arrowSlide = {
  rest: { x: 0, transition: { duration: 0.3 } },
  hover: { x: 5, transition: { duration: 0.3 } },
};

// ---- Icon rotation ----
export const iconRotate = {
  rest: { rotate: 0, transition: { duration: 0.4 } },
  hover: { rotate: 360, transition: { duration: 0.6 } },
};
