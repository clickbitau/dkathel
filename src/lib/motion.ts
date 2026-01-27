'use client';

import { motion as motionOriginal } from 'framer-motion';
import { ComponentProps } from 'react';

export const motion = {
  div: motionOriginal.div,
  span: motionOriginal.span,
  button: motionOriginal.button,
  // Add other HTML elements as needed
};

export type MotionProps = ComponentProps<typeof motionOriginal.div>;

export default motion;
