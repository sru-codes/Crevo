"use client"

import { motion } from "framer-motion"
import { Navbar } from "./navbar"
import { 
  SplitText, 
  BlurText, 
  Aurora, 
  Meteors, 
  MagneticButton,
  ShimmerButton 
} from "./animations"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
          type="video/mp4"
        />
      </video>

      {/* Video Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      
      {/* Aurora Background Effect */}
      <Aurora className="z-[1]" />
      
      {/* Meteors */}
      <Meteors number={8} />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Content - Vertically centered with golden ratio spacing */}
        <div className="flex-1 flex items-center justify-center px-[clamp(21px,5vw,89px)]">
          <div className="text-center max-w-[min(90vw,1100px)]">
            
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -21, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.618, 0, 0.382, 1] }}
              className="inline-flex items-center mb-[clamp(21px,3vw,34px)]"
            >
              <div className="relative flex items-center gap-[clamp(8px,1vw,13px)] px-[clamp(13px,2vw,21px)] py-[clamp(5px,0.8vw,8px)] rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
                {/* Pulsing indicator */}
                <span className="relative flex h-[clamp(5px,0.6vw,8px)] w-[clamp(5px,0.6vw,8px)]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-white" />
                </span>
                <span className="text-[clamp(11px,1.2vw,14px)] font-medium text-white/80">
                  Creator OS now available from March 2026
                </span>
              </div>
            </motion.div>

            {/* Main Heading with Split Text Animation */}
            <h1 className="text-[clamp(2rem,7vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-balance">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(144.5deg, #ffffff 28%, rgba(255,255,255,0.15) 115%)",
                }}
              >
                <SplitText delay={0.2}>
                  Manage Every Platform.
                </SplitText>
              </span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(144.5deg, #ffffff 28%, rgba(255,255,255,0.15) 115%)",
                }}
              >
                <SplitText delay={0.6}>
                  From One Place.
                </SplitText>
              </span>
            </h1>

            {/* Subtitle with Blur In Animation */}
            <BlurText 
              delay={1.2}
              className="mt-[clamp(21px,3vw,34px)] max-w-[min(85vw,680px)] mx-auto"
            >
              <p className="text-[clamp(13px,1.5vw,16px)] font-normal text-white/70 leading-[1.618] text-pretty">
                Crevo is the Creator Operating System that replaces every tool you juggle — one dashboard to schedule, publish, analyze, automate, and monetize your entire social media presence across every platform.
              </p>
            </BlurText>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 21 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.6, ease: [0.618, 0, 0.382, 1] }}
              className="mt-[clamp(34px,5vw,55px)]"
            >
              <MagneticButton strength={0.2}>
                <ShimmerButton className="group inline-flex items-center gap-[clamp(8px,1vw,13px)] px-[clamp(21px,3vw,34px)] py-[clamp(13px,1.5vw,18px)] bg-white text-black rounded-full font-medium text-[clamp(13px,1.2vw,15px)] hover:bg-white/95 transition-colors">
                  <span>Start Creating</span>
                  <ArrowRight className="w-[clamp(14px,1.2vw,18px)] h-[clamp(14px,1.2vw,18px)] group-hover:translate-x-1 transition-transform" />
                </ShimmerButton>
              </MagneticButton>
            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.55 }}
          className="absolute bottom-[clamp(21px,4vh,55px)] left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[clamp(20px,2vw,28px)] h-[clamp(32px,3vw,44px)] rounded-full border-2 border-white/30 flex items-start justify-center p-[6px]"
          >
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[3px] h-[8px] bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
