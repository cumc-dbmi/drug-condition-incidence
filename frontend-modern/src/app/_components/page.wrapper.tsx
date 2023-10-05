'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
// @ts-ignore
export const PageWrapper = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
