
"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
export default function PageTransition({ children }) {
  const pathname = usePathname();
  
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }} // 0.3 থেকে 0.2 করুন
    >
      {children}
    </motion.div>
  );
}