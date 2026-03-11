"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  ScrollReveal, 
  TextGenerateEffect, 
  TiltCard, 
  BorderBeam,
  ScrollProgress,
  CustomCursor,
  MagneticButton,
} from "@/components/animations"
import { 
  Upload, 
  Calendar, 
  BarChart3, 
  Bot, 
  Users, 
  DollarSign, 
  Zap 
} from "lucide-react"

const features = [
  {
    title: "Multi-Platform Post Manager",
    tagline: "One dashboard. Every platform.",
    description: "Create, edit, and publish content to Instagram, YouTube, TikTok, X, Discord, and Telegram from a single unified interface. No more switching between apps or browser tabs.",
    icon: Upload,
  },
  {
    title: "Content Scheduler",
    tagline: "Plan ahead. Post on time.",
    description: "Schedule your content weeks in advance with our intelligent calendar. Set optimal posting times, manage queues, and never miss your content schedule again.",
    icon: Calendar,
  },
  {
    title: "Analytics Dashboard",
    tagline: "Data that drives decisions.",
    description: "Track engagement, growth, and performance metrics across all your platforms in one comprehensive dashboard. Understand what works and optimize your strategy.",
    icon: BarChart3,
  },
  {
    title: "AI Content Assistant",
    tagline: "Create smarter. Not harder.",
    description: "Generate captions, hashtags, video scripts, and content ideas powered by AI. Get suggestions tailored to your niche, audience, and platform best practices.",
    icon: Bot,
  },
  {
    title: "Community Manager",
    tagline: "Every message. One inbox.",
    description: "Respond to comments, DMs, and mentions from all platforms in a unified inbox. Build relationships with your community without the chaos of multiple apps.",
    icon: Users,
  },
  {
    title: "Monetization Tools",
    tagline: "Turn content into income.",
    description: "Track sponsorship deals, manage brand partnerships, monitor revenue streams, and organize your creator business finances all in one place.",
    icon: DollarSign,
  },
  {
    title: "Automation System",
    tagline: "Set it. Forget it. Grow.",
    description: "Create powerful workflows that automate repetitive tasks. Auto-reply to new followers, cross-post content, generate reports, and more — all running on autopilot.",
    icon: Zap,
  },
]

export default function FeaturesPage() {
  return (
    <main className="bg-black min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-[120px]">
        <motion.div 
          className="text-center max-w-[800px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span 
              className="w-1 h-1 rounded-full bg-white"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[13px] font-medium text-white/60">7 Powerful Features</span>
          </motion.div>
          
          <h1 
            className="text-[40px] md:text-[64px] font-medium leading-[1.1] mb-6"
            style={{
              background: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <TextGenerateEffect words="Everything You Need to Create" delay={0.3} />
          </h1>
          <motion.p 
            className="text-white/70 text-[17px] max-w-[600px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Crevo combines the tools you need into one powerful platform designed specifically for modern content creators.
          </motion.p>
        </motion.div>
      </section>

      {/* Tracing Beam Line */}
      <div className="absolute left-6 md:left-[60px] top-[400px] bottom-[400px] w-[1px] hidden lg:block">
        <motion.div 
          className="h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ originY: 0 }}
        />
      </div>

      {/* Features Sections */}
      <section className="pb-32 px-6 md:px-[120px]">
        {features.map((feature, index) => (
          <ScrollReveal 
            key={feature.title}
            delay={index * 0.05}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <div className="py-20 border-t border-white/10 first:border-t-0">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}>
                {/* Text Content */}
                <motion.div 
                  className="flex-1"
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div 
                    className="mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className="w-10 h-10 text-white/80" />
                  </motion.div>
                  <h2 
                    className="text-[28px] md:text-[36px] font-medium mb-3"
                    style={{
                      background: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {feature.title}
                  </h2>
                  <p className="text-white text-[18px] font-medium mb-4">
                    {feature.tagline}
                  </p>
                  <p className="text-white/70 text-[15px] leading-relaxed max-w-[500px]">
                    {feature.description}
                  </p>
                </motion.div>

                {/* Placeholder Card with Tilt */}
                <div className="flex-1 w-full">
                  <TiltCard tiltAmount={6}>
                    <motion.div 
                      className="relative w-full aspect-[4/3] rounded-2xl bg-black overflow-hidden group"
                      style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
                      whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
                    >
                      {/* Border beam effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <BorderBeam duration={4} />
                      </div>
                      
                      {/* Spotlight effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 50%)",
                        }}
                      />
                    </motion.div>
                  </TiltCard>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <Footer />
    </main>
  )
}
