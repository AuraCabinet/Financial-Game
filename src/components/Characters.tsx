/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export const AuraIcon = ({ className }: { className?: string }) => (
  <motion.svg 
    viewBox="0 0 100 100" 
    className={className}
    animate={{ rotate: [0, 360] }}
    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
  >
    <defs>
      <linearGradient id="auraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7000FF" />
        <stop offset="100%" stopColor="#00FFCC" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#auraGrad)" strokeWidth="0.5" strokeDasharray="5,5" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="url(#auraGrad)" strokeWidth="2" />
    <motion.circle 
      cx="50" cy="50" r="10" 
      fill="url(#auraGrad)"
      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
    {/* Concentric rings */}
    <circle cx="50" cy="50" r="20" fill="none" stroke="url(#auraGrad)" strokeWidth="1" opacity="0.3" />
  </motion.svg>
);

export const LeonIcon = ({ className }: { className?: string }) => (
  <motion.div 
    className={className}
    animate={{ y: [0, -5, 0] }}
    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 100 100">
      <path d="M50 10 L80 40 L70 80 L30 80 L20 40 Z" fill="#FFD700" opacity="0.8" />
      <circle cx="50" cy="45" r="25" fill="#FFD700" />
      <path d="M40 40 Q50 30 60 40" stroke="black" fill="none" strokeWidth="2" />
      <motion.circle 
        cx="40" cy="45" r="3" fill="black" 
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, times: [0, 0.95, 1] }}
      />
      <motion.circle 
        cx="60" cy="45" r="3" fill="black" 
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, times: [0, 0.95, 1] }}
      />
      <path d="M45 55 Q50 60 55 55" stroke="black" fill="none" strokeWidth="2" />
      <path d="M20 30 L50 5 L80 30 L90 60 L50 95 L10 60 Z" fill="none" stroke="#FFD700" strokeWidth="2" strokeDasharray="2,2" />
    </svg>
  </motion.div>
);

export const BankerIcon = ({ className }: { className?: string }) => (
  <motion.div 
    className={className}
    animate={{ scale: [1, 1.02, 1] }}
    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 100 100">
      <rect x="30" y="20" width="40" height="60" fill="#2D3436" rx="5" />
      <rect x="25" y="15" width="50" height="10" fill="#2D3436" rx="2" />
      <rect x="35" y="30" width="30" height="40" fill="white" />
      <rect x="40" y="35" width="20" height="5" fill="#00FFCC" />
      <motion.circle 
        cx="40" cy="42" r="2" fill="black" 
        animate={{ scaleY: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 1] }}
      />
      <motion.circle 
        cx="60" cy="42" r="2" fill="black" 
        animate={{ scaleY: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 1] }}
      />
      <path d="M50 30 L45 50 L50 60 L55 50 Z" fill="#7000FF" />
    </svg>
  </motion.div>
);

export const MonsterIcon = ({ className }: { className?: string }) => (
  <motion.div 
    className={className}
    animate={{ x: [-2, 2, -2], y: [-2, 2, -2] }}
    transition={{ repeat: Infinity, duration: 0.2 }}
  >
    <svg viewBox="0 0 100 100">
      <path d="M20 80 Q10 50 20 20 Q50 10 80 20 Q90 50 80 80 Q50 90 20 80" fill="#FF4D4D" />
      <circle cx="35" cy="40" r="10" fill="white" />
      <circle cx="65" cy="40" r="10" fill="white" />
      <circle cx="35" cy="40" r="4" fill="black" />
      <circle cx="65" cy="40" r="4" fill="black" />
      <path d="M30 65 Q50 75 70 65" stroke="white" fill="none" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 65 L40 60 M50 71 L50 64 M60 60 L70 65" stroke="black" strokeWidth="1" />
    </svg>
  </motion.div>
);

export const CriticIcon = ({ className }: { className?: string }) => (
  <motion.div 
    className={className}
    animate={{ 
      x: [0, 50, -50, 0],
      y: [0, -40, -40, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ repeat: Infinity, duration: 5 }}
  >
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#6C5CE7" />
      <path d="M35 45 Q50 35 65 45" stroke="white" strokeWidth="4" fill="none" />
      <circle cx="40" cy="50" r="5" fill="white" />
      <circle cx="60" cy="50" r="5" fill="white" />
      <path d="M40 70 Q50 65 60 70" stroke="white" strokeWidth="3" fill="none" />
      <text x="70" y="30" fontSize="12" fill="white" fontWeight="bold">!?</text>
    </svg>
  </motion.div>
);

export const MusaIcon = ({ className }: { className?: string }) => (
  <motion.div 
    className={className}
    animate={{ 
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, 360],
      x: [0, 10, -10, 0]
    }}
    transition={{ repeat: Infinity, duration: 10 }}
  >
    <svg viewBox="0 0 100 100">
      <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="#00FFCC" opacity="0.6" />
      <circle cx="50" cy="50" r="25" fill="#00FFCC" />
      <path d="M40 45 L45 50 L60 40" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#00FFCC" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  </motion.div>
);

export const GuardianIcon = ({ className }: { className?: string }) => (
  <motion.div 
    className={className}
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <svg viewBox="0 0 100 100">
      <path d="M20 30 L50 10 L80 30 L80 70 L50 90 L20 70 Z" fill="#2D3436" stroke="#DAA520" strokeWidth="2" />
      <rect x="40" y="40" width="20" height="20" fill="#DAA520" />
      <circle cx="50" cy="50" r="5" fill="white" />
      <path d="M30 30 L40 20 M70 30 L60 20" stroke="#DAA520" strokeWidth="2" />
    </svg>
  </motion.div>
);

export const OracleIcon = ({ className }: { className?: string }) => (
  <motion.div 
    className={className}
    animate={{ 
      rotateY: [0, 180, 360],
      filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
    }}
    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
  >
    <svg viewBox="0 0 100 100">
      <defs>
        <radialGradient id="oracleGrad">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#7000FF" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#oracleGrad)" opacity="0.8" />
      <path d="M30 50 Q50 20 70 50 Q50 80 30 50" fill="white" opacity="0.3" />
      <circle cx="50" cy="50" r="5" fill="#00FFCC" />
      <motion.circle 
        cx="50" cy="50" r="45" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="4,4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />
    </svg>
  </motion.div>
);
