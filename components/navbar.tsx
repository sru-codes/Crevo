"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { MagneticButton, useNavbarScroll, ShimmerButton } from "./animations"

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "For Creators", href: "/for-creators" },
  { label: "Features", href: "/features" },
  { label: "Integrations", href: "/integrations" },
]

// Golden ratio timing
const GOLDEN_EASE = [0.618, 0, 0.382, 1] as const

export function Navbar() {
  const isScrolled = useNavbarScroll()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -21 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: GOLDEN_EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[377ms] ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.05]" 
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-[clamp(21px,5vw,89px)] py-[clamp(13px,2vw,21px)]">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -21 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: GOLDEN_EASE }}
          >
            <MagneticButton strength={0.15}>
              <Link
                href="/"
                className="text-white font-medium text-[clamp(18px,2vw,22px)] tracking-tight hover:opacity-80 transition-opacity"
              >
                Crevo
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-[clamp(21px,3vw,34px)]">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -13 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.55, 
                  delay: 0.15 + index * 0.055,
                  ease: GOLDEN_EASE 
                }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center gap-[clamp(5px,0.5vw,8px)] text-white/80 text-[clamp(13px,1vw,14px)] font-medium hover:text-white transition-colors"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                  </span>
                  <ChevronDown className="w-[clamp(12px,1vw,14px)] h-[clamp(12px,1vw,14px)] opacity-60 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 21 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: GOLDEN_EASE }}
            className="hidden lg:block"
          >
            <MagneticButton strength={0.15}>
              <Link href="/dashboard">
                <WaitlistButton variant="dark" />
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-[clamp(20px,5vw,24px)] h-[clamp(20px,5vw,24px)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-[clamp(20px,5vw,24px)] h-[clamp(20px,5vw,24px)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 21 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 21 }}
              transition={{ duration: 0.377, ease: GOLDEN_EASE }}
              className="relative h-full flex flex-col items-center justify-center px-[21px] gap-[clamp(21px,5vh,34px)]"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 21 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 21 }}
                  transition={{ 
                    duration: 0.377, 
                    delay: index * 0.055,
                    ease: GOLDEN_EASE 
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-[clamp(24px,6vw,32px)] font-medium hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 21 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 21 }}
                transition={{ 
                  duration: 0.377, 
                  delay: navLinks.length * 0.055,
                  ease: GOLDEN_EASE 
                }}
                className="mt-[21px]"
              >
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center px-[clamp(24px,6vw,34px)] py-[clamp(12px,3vw,16px)] bg-white text-black rounded-full font-medium text-[clamp(14px,4vw,16px)]"
                >
                  Open Dashboard
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function WaitlistButton({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isDark = variant === "dark"

  return (
    <motion.button
      className="relative rounded-full overflow-hidden"
      style={{
        border: "0.6px solid rgba(255, 255, 255, 1)",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: isDark 
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)"
            : "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
        }}
        animate={{ translateX: ["-100%", "100%"] }}
        transition={{
          duration: 2.1,
          repeat: Infinity,
          repeatDelay: 2.1,
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[6px] rounded-full blur-sm"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, transparent 100%)",
        }}
      />

      {/* Inner button */}
      <div
        className={`relative rounded-full px-[clamp(18px,2vw,29px)] py-[clamp(8px,1vw,11px)] text-[clamp(12px,1vw,14px)] font-medium ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        Open Dashboard
      </div>
    </motion.button>
  )
}
