import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { motion } from 'framer-motion';

export const AnimatedCounter = ({ value, className }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  // useSpring adds a nice "bouncy" effect to the count-up
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => 
    springValue.on("change", (latest) => {
      if (ref.current) {
        // We use toFixed to handle decimals for the rating
        ref.current.textContent = Number.isInteger(latest) ? Math.round(latest) : latest.toFixed(1);
      }
    }),
  [springValue]);

  return <motion.span className={className} ref={ref} />;
};