"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./AnimatedHeroImage.module.css";

export function AnimatedHeroImage() {
  return (
    <motion.div
      className={styles.container}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className={styles.imageWrapper}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: [1.05, 1.12, 1.05],
          filter: [
            "brightness(1) contrast(1)",
            "brightness(0.8) contrast(1.2)",
            "brightness(1) contrast(1)",
          ],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="/bloom.jpeg"
          alt="hero image"
          width={800}
          height={500}
          className={styles.image}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
