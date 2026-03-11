"use client"

import { motion } from "framer-motion"
import { WaitlistButton } from "./navbar"
import { SplitText, BlurIn, MagneticButton, Aurora, Meteors } from "./animations"

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center pt-[200px] md:pt-[280px] pb-[102px] px-6">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center gap-2 rounded-[20px] px-4 py-2"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <motion.span
          className="w-1 h-1 rounded-full bg-white"
          aria-hidden="true"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="text-[13px] font-medium">
          <span className="text-white/60">Creator OS now available from</span>
          <span className="text-white"> May 1, 2026</span>
        </span>
      </motion.div>

      {/* Heading with Split Text Animation */}
      <h1
        className="mt-10 max-w-[613px] text-[36px] md:text-[56px] font-medium leading-[1.28] text-balance"
        style={{
          background: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        <SplitText delay={0.4}>
          Manage Every Platform. From One Place.
        </SplitText>
      </h1>

      {/* Subtitle with Blur In */}
      <BlurIn delay={0.8} className="mt-6 max-w-[680px]">
        <p className="text-[15px] font-normal text-white/70 text-pretty">
          Crevo is the Creator Operating System that replaces every tool you juggle — one dashboard to schedule, publish, analyze, automate, and monetize your entire social media presence across every platform.
        </p>
      </BlurIn>

      {/* CTA Button */}
      <motion.div 
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <MagneticButton strength={0.15}>
          <WaitlistButton variant="light" />
        </MagneticButton>
      </motion.div>
    </div>
  )
}

// Enhanced Hero Section Background
export function HeroBackground() {
  return (
    <>
      {/* Aurora effect */}
      <Aurora />
      
      {/* Meteors effect */}
      <Meteors number={8} />
      
      {/* Spotlight gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.08), transparent)",
        }}
      />
    </>
  )
}
