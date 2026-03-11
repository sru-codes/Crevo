// ============================================
// GOLDEN RATIO DESIGN SYSTEM
// Based on Fibonacci sequence and Golden Ratio (φ = 1.618033988749895)
// ============================================

export const PHI = 1.618033988749895
export const PHI_INVERSE = 0.618033988749895

// Golden Ratio Scale - Based on Fibonacci for harmonious proportions
// Each value is ~1.618x the previous
export const goldenScale = {
  xs: 0.382,      // φ^-2
  sm: 0.618,      // φ^-1 (inverse of golden ratio)
  base: 1,        // 1
  md: 1.618,      // φ
  lg: 2.618,      // φ^2
  xl: 4.236,      // φ^3
  '2xl': 6.854,   // φ^4
  '3xl': 11.09,   // φ^5
} as const

// Spacing scale based on Golden Ratio (base unit: 8px)
export const spacing = {
  0: '0px',
  1: '5px',       // 8 / φ
  2: '8px',       // base
  3: '13px',      // 8 × φ^0.5
  4: '21px',      // Fibonacci
  5: '34px',      // Fibonacci
  6: '55px',      // Fibonacci
  7: '89px',      // Fibonacci
  8: '144px',     // Fibonacci
  9: '233px',     // Fibonacci
  10: '377px',    // Fibonacci
} as const

// Typography scale using Perfect Fourth (1.333) combined with Golden Ratio
// This creates visual harmony based on musical intervals
export const fontSize = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px - 16 × 1.5
  '3xl': '1.875rem',// 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px - 16 × 3
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem',  // 72px
  '8xl': '6rem',    // 96px - 16 × 6
  '9xl': '8rem',    // 128px
} as const

// Line height based on Golden Ratio
export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.618',     // Golden Ratio!
  loose: '2',
} as const

// Animation timing based on Golden Ratio
// Creates natural-feeling, mathematically harmonious durations
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.382,        // φ^-1 seconds
  smooth: 0.618,        // φ^-1 seconds
  slow: 1,
  slower: 1.618,        // φ seconds
  slowest: 2.618,       // φ^2 seconds
} as const

// Easing curves based on bezier approximation of Golden Spiral
export const easing = {
  // Golden ease - based on golden spiral curve
  golden: [0.618, 0, 0.382, 1],
  // Smooth ease out
  smoothOut: [0.25, 0.46, 0.45, 0.94],
  // Bounce with golden timing
  goldenBounce: [0.68, -0.55, 0.265, 1.55],
  // Natural spring-like
  spring: [0.175, 0.885, 0.32, 1.275],
} as const

// Rule of Thirds grid positions
export const thirds = {
  first: '33.33%',
  second: '66.67%',
  intersection1: { x: '33.33%', y: '33.33%' },
  intersection2: { x: '66.67%', y: '33.33%' },
  intersection3: { x: '33.33%', y: '66.67%' },
  intersection4: { x: '66.67%', y: '66.67%' },
} as const

// Golden Rectangle aspect ratios
export const aspectRatio = {
  golden: '1.618',
  goldenVertical: '0.618',
  square: '1',
  wide: '1.778',      // 16:9
  ultrawide: '2.35',  // Cinema
} as const

// Breakpoints based on Golden Ratio scaling from base 320px
export const breakpoints = {
  xs: 320,                    // base mobile
  sm: Math.round(320 * PHI),  // 518px → 640px (adjusted for practical use)
  md: Math.round(518 * PHI),  // 838px → 768px
  lg: Math.round(838 * PHI),  // 1355px → 1024px
  xl: Math.round(1024 * PHI), // 1656px → 1280px
  '2xl': 1536,                // standard
} as const

// Responsive scaling functions
export function clampSize(min: number, preferred: number, max: number): string {
  return `clamp(${min}px, ${preferred}vw, ${max}px)`
}

// Fluid typography using Golden Ratio
export function fluidType(minSize: number, maxSize: number, minVw = 320, maxVw = 1536): string {
  const slope = (maxSize - minSize) / (maxVw - minVw)
  const intercept = minSize - slope * minVw
  return `clamp(${minSize}px, ${intercept.toFixed(4)}px + ${(slope * 100).toFixed(4)}vw, ${maxSize}px)`
}

// Calculate golden ratio subdivision
export function goldenSplit(total: number): { major: number; minor: number } {
  const major = total * PHI_INVERSE * PHI_INVERSE + total * PHI_INVERSE
  return {
    major: total / PHI,
    minor: total - total / PHI,
  }
}

// Fibonacci sequence generator
export function fibonacci(n: number): number[] {
  const seq = [0, 1]
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2])
  }
  return seq
}

// Spacing multiplier for responsive design
export function responsiveSpacing(base: number, viewport: number): number {
  // Scale down proportionally on smaller screens
  const scaleFactor = Math.min(1, viewport / 1280)
  return Math.round(base * scaleFactor * PHI_INVERSE + base * (1 - scaleFactor))
}
