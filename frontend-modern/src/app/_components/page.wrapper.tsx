"use client";

import {motion, AnimatePresence} from "framer-motion";

// @ts-ignore
export const PageWrapper = ({ children })  => {
    return (
            <AnimatePresence>
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{duration: 0.50}}
                >{children}</motion.div>
            </AnimatePresence>
    );
};