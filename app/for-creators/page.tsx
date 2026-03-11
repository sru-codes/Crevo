"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WaitlistButton } from "@/components/navbar"
import { 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem,
  TextGenerateEffect, 
  TiltCard, 
  BorderBeam,
  ScrollProgress,
  CustomCursor,
  MagneticButton,
  Particles,
} from "@/components/animations"
import { 
  Youtube, 
  Instagram, 
  Mic, 
  Radio
} from "lucide-react"

const creatorTypes = [
  {
    title: "YouTubers",
    description: "Manage your channel, schedule uploads, and track video performance across all your content.",
    icon: Youtube,
  },
  {
    title: "Instagrammers",
    description: "Schedule posts, stories, and reels. Engage with your community from one unified inbox.",
    icon: Instagram,
  },
  {
    title: "Podcasters",
    description: "Promote episodes across platforms, manage show notes, and grow your listener base.",
    icon: Mic,
  },
  {
    title: "Streamers",
    description: "Coordinate stream schedules, clips, and highlights across Twitch, YouTube, and more.",
    icon: Radio,
  },
]

export default function ForCreatorsPage() {
  return (
    <main className="bg-black min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-[120px] overflow-hidden">
        {/* Wavy background effect */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <motion.path
              fill="rgba(255,255,255,0.03)"
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,186.7C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
        
        <motion.div 
          className="text-center max-w-[800px] mx-auto relative z-10"
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
            <span className="text-[13px] font-medium text-white/60">Coming Soon</span>
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
            <TextGenerateEffect words="Built for Every Creator." delay={0.3} />
          </h1>
          <motion.p 
            className="text-white/70 text-[17px] max-w-[600px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Whether you make videos, post photos, record podcasts, or stream live — Crevo adapts to your workflow.
          </motion.p>
        </motion.div>
      </section>

      {/* Creator Type Cards */}
      <section className="pb-20 px-6 md:px-[120px]">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.1}>
          {creatorTypes.map((creator, index) => (
            <StaggerItem key={creator.title}>
              <TiltCard tiltAmount={6}>
                <motion.div 
                  className="relative p-8 rounded-2xl bg-black h-full overflow-hidden group"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
                  whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  {/* Border beam on hover */}
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
                  
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 relative z-10"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <creator.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-white text-2xl font-medium mb-3 relative z-10">{creator.title}</h3>
                  <p className="text-white/60 text-[15px] leading-relaxed relative z-10">{creator.description}</p>
                </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="pb-32 px-6 md:px-[120px]">
        <ScrollReveal>
          <motion.div 
            className="relative max-w-[600px] mx-auto text-center p-12 rounded-2xl bg-black overflow-hidden"
            style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
            whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
          >
            {/* Subtle glow */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05), transparent 70%)",
              }}
            />
            
            <h2 
              className="text-[28px] md:text-[36px] font-medium mb-4 relative z-10"
              style={{
                background: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <TextGenerateEffect words="Be the First to Use Crevo" />
            </h2>
            <p className="text-white/70 text-[15px] mb-8 relative z-10">
              Join the waitlist and get early access when we launch.
            </p>
            <div className="relative z-10">
              <MagneticButton strength={0.15}>
                <WaitlistButton variant="light" />
              </MagneticButton>
            </div>
          </motion.div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}
