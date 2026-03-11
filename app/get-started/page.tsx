"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  TextGenerateEffect,
  Particles,
  ScrollProgress,
  CustomCursor,
  MagneticButton,
} from "@/components/animations"

const benefits = [
  "Free Forever Tier",
  "Early Access",
  "No Credit Card",
]

export default function GetStartedPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <main className="bg-black min-h-screen relative overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      
      {/* Particles Background */}
      <Particles quantity={40} />
      
      {/* Background Beams Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: "50%",
              width: "200%",
              transform: "translateX(-50%)",
              rotate: `${-30 + i * 10}deg`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </div>
      
      <Navbar />
      
      {/* Main Content */}
      <section className="min-h-[calc(100vh-200px)] flex items-center justify-center px-6 md:px-[120px] py-32 relative z-10">
        <motion.div 
          className="text-center max-w-[600px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h1 
            className="text-[40px] md:text-[64px] font-medium leading-[1.1] mb-6"
            style={{
              background: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <TextGenerateEffect words="Your Creator OS. Starts Here." delay={0.2} />
          </h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-white/70 text-[17px] mb-12 max-w-[450px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Join the waitlist and be the first to experience the future of content creation.
          </motion.p>

          {/* Email Form */}
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                onSubmit={handleSubmit} 
                className="mb-8"
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 1 }}
              >
                <div className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto">
                  {/* Email Input */}
                  <motion.div 
                    className="flex-1 relative rounded-full group"
                    style={{ border: "0.6px solid rgba(255, 255, 255, 1)" }}
                    whileHover={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-black text-white rounded-full px-6 py-[14px] text-[15px] placeholder:text-white/40 focus:outline-none"
                      required
                    />
                    {/* Focus glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                      initial={{ opacity: 0 }}
                      whileFocus={{ opacity: 1 }}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <MagneticButton strength={0.1}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative rounded-full shrink-0 overflow-hidden"
                      style={{ border: "0.6px solid rgba(255, 255, 255, 1)" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 -translate-x-full"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
                        }}
                        animate={{ translateX: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                      
                      {/* Glow effect */}
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[6px] rounded-full blur-sm"
                        style={{
                          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, transparent 100%)",
                        }}
                      />
                      <div className="relative bg-white text-black rounded-full px-8 py-[14px] text-[15px] font-medium">
                        {isSubmitting ? (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            Joining...
                          </motion.span>
                        ) : (
                          "Join Waitlist"
                        )}
                      </div>
                    </motion.button>
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                className="mb-8 p-6 rounded-2xl max-w-[480px] mx-auto"
                style={{ border: "1px solid rgba(255, 255, 255, 0.2)", background: "rgba(255, 255, 255, 0.05)" }}
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <svg className="w-12 h-12 mx-auto mb-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </svg>
                </motion.div>
                <p className="text-white font-medium">You&apos;re on the list!</p>
                <p className="text-white/60 text-[14px] mt-1">We&apos;ll notify you when Crevo launches.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Benefit Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit}
                className="rounded-full px-4 py-2"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                }}
              >
                <span className="text-[13px] font-medium text-white/80">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
