"use client";

import { motion, useReducedMotion } from "framer-motion";

export const easePremium = [0.22, 1, 0.36, 1];

const heroParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.085, delayChildren: 0.1 }
  }
};

const heroChild = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: easePremium }
  }
};

export function Reveal({ children, className, delay = 0, y = 30 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -44px 0px" }}
      transition={{ duration: 0.56, delay, ease: easePremium }}
    >
      {children}
    </motion.div>
  );
}

export function HeroSequence({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <motion.div initial="hidden" animate="visible" variants={heroParent}>
      {children}
    </motion.div>
  );
}

export function HeroBlock({ children, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={heroChild}>
      {children}
    </motion.div>
  );
}

export function ChipRail({ chips, label }) {
  const reduce = useReducedMotion();
  const baseDelay = 0.52;
  if (reduce) {
    return (
      <div className="heroTrustChips" aria-label={label}>
        {chips.map((chip) => (
          <span key={chip}>{chip}</span>
        ))}
      </div>
    );
  }
  return (
    <div className="heroTrustChips" aria-label={label}>
      {chips.map((chip, i) => (
        <motion.span
          key={chip}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: baseDelay + i * 0.045,
            duration: 0.38,
            ease: easePremium
          }}
        >
          {chip}
        </motion.span>
      ))}
    </div>
  );
}

export function LiftArticle({ children, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <article className={className}>{children}</article>;
  return (
    <motion.article
      className={className}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: easePremium } }}
      whileTap={{ scale: 0.995 }}
    >
      {children}
    </motion.article>
  );
}

export function LiftLi({ children, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <li className={className}>{children}</li>;
  return (
    <motion.li
      className={className}
      variants={{
        hidden: { opacity: 0, x: -14 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.42, ease: easePremium } }
      }}
    >
      {children}
    </motion.li>
  );
}

const benefitList = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 }
  }
};

export function BenefitMotionList({ children, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <ul className={className}>{children}</ul>;
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={benefitList}
    >
      {children}
    </motion.ul>
  );
}

const fiscalStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 }
  }
};

const fiscalItem = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.46, ease: easePremium }
  }
};

export function FiscalMotionUl({ children, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <ul className={className}>{children}</ul>;
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fiscalStagger}
    >
      {children}
    </motion.ul>
  );
}

export function FiscalMotionLi({ children, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <li className={className}>{children}</li>;
  return (
    <motion.li className={className} variants={fiscalItem}>
      {children}
    </motion.li>
  );
}
