"use client"

import { useEffect, useRef, useState, useCallback, type ReactNode, type CSSProperties } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence, MotionValue } from "framer-motion"

// ============================================
// GOLDEN RATIO CONSTANTS
// ============================================
const PHI = 1.618033988749895
const PHI_INV = 0.618033988749895

// Golden easing curve
const GOLDEN_EASE = [0.618, 0, 0.382, 1] as const
const SMOOTH_EASE = [0.25, 0.46, 0.45, 0.94] as const

// Fibonacci-based durations (in seconds)
const DURATION = {
  fast: 0.21,
  normal: 0.34,
  smooth: 0.55,
  slow: 0.89,
  slower: 1.44,
} as const

// ============================================
// SPLIT TEXT - React Bits Style
// Characters animate in with perspective rotation
// ============================================
export function SplitText({ 
  children, 
  className = "",
  delay = 0,
  staggerDelay = 0.021, // Fibonacci: 21ms
}: { 
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
}) {
  const words = children.split(" ")
  
  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex mr-[0.25em]">
          {word.split("").map((char, charIndex) => {
            const totalIndex = words.slice(0, wordIndex).join("").length + charIndex + wordIndex
            return (
              <motion.span
                key={charIndex}
                className="inline-block"
                initial={{ 
                  opacity: 0, 
                  y: 34, // Fibonacci
                  rotateX: -55, // Fibonacci
                  filter: "blur(8px)",
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: DURATION.smooth,
                  delay: delay + totalIndex * staggerDelay,
                  ease: GOLDEN_EASE,
                }}
                style={{ 
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </motion.span>
  )
}

// ============================================
// BLUR TEXT - React Bits Style  
// Text blurs in from invisible
// ============================================
export function BlurText({ 
  children, 
  className = "",
  delay = 0,
  direction = "up",
}: { 
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}) {
  const offsets = {
    up: { y: 21, x: 0 },
    down: { y: -21, x: 0 },
    left: { x: 21, y: 0 },
    right: { x: -21, y: 0 },
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        filter: "blur(13px)", // Fibonacci
        ...offsets[direction],
      }}
      animate={{ 
        opacity: 1, 
        filter: "blur(0px)",
        x: 0,
        y: 0,
      }}
      transition={{ 
        duration: DURATION.slow, 
        delay, 
        ease: SMOOTH_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// GRADIENT TEXT - Animated gradient fill
// ============================================
export function GradientText({
  children,
  className = "",
  colors = ["#ffffff", "rgba(255,255,255,0.3)"],
  animationSpeed = 8,
}: {
  children: ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
}) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(144.5deg, ${colors.join(", ")})`,
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{
        duration: animationSpeed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  )
}

// ============================================
// TEXT REVEAL - Words appear one by one
// ============================================
export function TextReveal({
  children,
  className = "",
  delay = 0,
  wordDelay = 0.055, // Fibonacci
}: {
  children: string
  className?: string
  delay?: number
  wordDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-89px" }) // Fibonacci
  const words = children.split(" ")

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block mr-[0.25em] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.01, delay: delay + idx * wordDelay }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: DURATION.smooth,
              delay: delay + idx * wordDelay,
              ease: GOLDEN_EASE,
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </div>
  )
}

// ============================================
// MAGNETIC BUTTON - React Bits Style
// Button follows cursor with magnetic pull
// ============================================
export function MagneticButton({ 
  children, 
  className = "",
  strength = PHI_INV * 0.5,
  radius = 144, // Fibonacci
}: { 
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 21, stiffness: 233 } // Fibonacci
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    )
    
    if (distance < radius) {
      const pullStrength = (1 - distance / radius) * strength
      x.set((e.clientX - centerX) * pullStrength)
      y.set((e.clientY - centerY) * pullStrength)
    }
  }, [strength, radius, x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// TILT CARD - React Bits Style
// 3D tilt effect following cursor
// ============================================
export function TiltCard({
  children,
  className = "",
  tiltAmount = 13, // Fibonacci
  glareEnable = true,
  scale = 1.02,
}: {
  children: ReactNode
  className?: string
  tiltAmount?: number
  glareEnable?: boolean
  scale?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springConfig = { damping: 21, stiffness: 377 } // Fibonacci
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    rotateX.set((y - 0.5) * -tiltAmount * 2)
    rotateY.set((x - 0.5) * tiltAmount * 2)
    setGlarePosition({ x: x * 100, y: y * 100 })
  }, [tiltAmount, rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale }}
      transition={{ duration: DURATION.fast }}
      className={`relative ${className}`}
    >
      {children}
      {glareEnable && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15), transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  )
}

// ============================================
// SCROLL REVEAL - Intersection Observer based
// ============================================
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 34, // Fibonacci
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-55px" }) // Fibonacci

  const offsets = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ 
        duration: DURATION.slow, 
        delay,
        ease: SMOOTH_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// STAGGER CONTAINER + ITEM
// ============================================
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.089, // Fibonacci
  delayStart = 0,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayStart?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-55px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayStart,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 34, filter: "blur(5px)" },
        visible: { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: DURATION.slow,
            ease: SMOOTH_EASE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// AURORA BACKGROUND - React Bits Style
// ============================================
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary aurora blob */}
      <motion.div
        className="absolute w-[610px] h-[610px] rounded-full opacity-[0.13]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
          filter: "blur(89px)", // Fibonacci
          left: "10%",
          top: "-20%",
        }}
        animate={{
          x: [0, 89, -55, 0],
          y: [0, -89, 55, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 21, // Fibonacci
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Secondary aurora blob */}
      <motion.div
        className="absolute w-[377px] h-[377px] rounded-full opacity-[0.1]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          filter: "blur(55px)", // Fibonacci
          right: "5%",
          bottom: "10%",
        }}
        animate={{
          x: [0, -55, 34, 0],
          y: [0, 55, -34, 0],
          scale: [1, 0.92, 1.05, 1],
        }}
        transition={{
          duration: 13, // Fibonacci
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}

// ============================================
// PARTICLES - React Bits Style
// Floating particles with golden ratio distribution
// ============================================
export function Particles({ 
  quantity = 34, // Fibonacci
  className = "",
}: { 
  quantity?: number
  className?: string
}) {
  const particles = Array.from({ length: quantity }, (_, i) => {
    // Golden angle distribution for more pleasing particle placement
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    const angle = i * goldenAngle
    const radius = Math.sqrt(i / quantity)
    return {
      id: i,
      x: 50 + radius * Math.cos(angle) * 50,
      y: 50 + radius * Math.sin(angle) * 50,
      size: 1 + (i % 3),
      duration: 13 + (i % 8) * PHI,
      delay: (i % 5) * PHI_INV,
    }
  })

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -21, 0],
            opacity: [0.13, 0.34, 0.13],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// METEORS - Diagonal streak lines
// ============================================
export function Meteors({ number = 13 }: { number?: number }) {
  const meteors = Array.from({ length: number }, (_, i) => ({
    id: i,
    left: 5 + (i * PHI * 7) % 90,
    delay: (i * PHI_INV) % 8,
    duration: 0.5 + (i % 3) * 0.3,
    width: 55 + (i % 3) * 21,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((meteor) => (
        <motion.span
          key={meteor.id}
          className="absolute top-0 h-[1px] rotate-[215deg]"
          style={{
            left: `${meteor.left}%`,
            width: meteor.width,
            background: "linear-gradient(90deg, rgba(255,255,255,0.55), transparent)",
          }}
          initial={{ top: "-5%", opacity: 0 }}
          animate={{ top: "105%", opacity: [0, 0.8, 0] }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            repeatDelay: 8 + meteor.delay,
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// BORDER BEAM - Rotating beam around border
// ============================================
export function BorderBeam({
  className = "",
  duration = 8,
  size = 144, // Fibonacci
}: {
  className?: string
  duration?: number
  size?: number
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none ${className}`}>
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.5) 21deg, transparent 55deg)",
          left: "50%",
          top: "50%",
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Mask to show only border area */}
      <div className="absolute inset-[1px] bg-black rounded-[inherit]" />
    </div>
  )
}

// ============================================
// SHIMMER BUTTON - Sweeping light effect
// ============================================
export function ShimmerButton({
  children,
  className = "",
  shimmerWidth = 89, // Fibonacci
}: {
  children: ReactNode
  className?: string
  shimmerWidth?: number
}) {
  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: DURATION.fast }}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          width: shimmerWidth,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.21), transparent)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 2.1,
          repeat: Infinity,
          repeatDelay: 1.3,
          ease: "linear",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// ============================================
// SPOTLIGHT - Cursor following spotlight
// ============================================
export function Spotlight({ 
  className = "",
  size = 377, // Fibonacci
}: { 
  className?: string
  size?: number
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${className}`}
      style={{
        background: isActive
          ? `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.05), transparent 55%)`
          : "transparent",
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    />
  )
}

// ============================================
// INFINITE MARQUEE - React Bits Style
// ============================================
export function InfiniteMarquee({
  children,
  speed = 34, // Fibonacci
  pauseOnHover = true,
  direction = "left",
  className = "",
}: {
  children: ReactNode
  speed?: number
  pauseOnHover?: boolean
  direction?: "left" | "right"
  className?: string
}) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className={`flex overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex shrink-0 gap-8"
        animate={{ x: direction === "left" ? "-50%" : "50%" }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
export function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 144, damping: 21 })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-[2px] bg-white/89 origin-left z-[100] ${className}`}
      style={{ scaleX }}
    />
  )
}

// ============================================
// CUSTOM CURSOR
// ============================================
export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 34, stiffness: 377 } // Fibonacci
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8)
      cursorY.set(e.clientY - 8)
    }

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, textarea")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart)
      el.addEventListener("mouseleave", handleHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart)
        el.removeEventListener("mouseleave", handleHoverEnd)
      })
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 2.618 : 1, // Golden ratio scale
        opacity: isHovering ? 0.89 : 0.55,
      }}
      transition={{ duration: DURATION.fast }}
    />
  )
}

// ============================================
// NAVBAR SCROLL HOOK
// ============================================
export function useNavbarScroll() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 55) // Fibonacci
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return isScrolled
}

// ============================================
// PARALLAX WRAPPER
// ============================================
export function Parallax({
  children,
  speed = 0.5,
  className = "",
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

// ============================================
// COUNTER ANIMATION
// ============================================
export function CountUp({
  from = 0,
  to,
  duration = 2,
  className = "",
}: {
  from?: number
  to: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(from)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [displayValue, setDisplayValue] = useState(from)

  useEffect(() => {
    if (isInView) {
      const animation = count.set(from)
      const controls = count.set(to)
    }
  }, [isInView, from, to, count])

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v))
    return () => unsubscribe()
  }, [rounded])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {displayValue}
    </motion.span>
  )
}

// ============================================
// WAVY TEXT
// ============================================
export function WavyText({
  children,
  className = "",
  delay = 0,
}: {
  children: string
  className?: string
  delay?: number
}) {
  const letters = children.split("")

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.034,
            repeat: Infinity,
            repeatDelay: 2.1,
            ease: "easeInOut",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  )
}

// ============================================
// REVEAL ON SCROLL
// ============================================
export function RevealOnScroll({
  children,
  className = "",
  width = "100%",
}: {
  children: ReactNode
  className?: string
  width?: string | number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-89px" })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ width }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.34 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-white z-10"
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : {}}
        transition={{ duration: DURATION.slow, ease: GOLDEN_EASE }}
        style={{ originX: 1 }}
      />
    </div>
  )
}

// ============================================
// TEXT GENERATE EFFECT - Characters appear with typewriter effect
// ============================================
export function TextGenerateEffect({
  words,
  className = "",
  delay = 0,
}: {
  words: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-55px" })
  const characters = words.split("")

  return (
    <div ref={ref} className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{
            duration: DURATION.fast,
            delay: delay + i * 0.013,
            ease: GOLDEN_EASE,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}

