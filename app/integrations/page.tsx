"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem,
  TextGenerateEffect, 
  TiltCard, 
  BorderBeam,
  ScrollProgress,
  CustomCursor,
} from "@/components/animations"
import { 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Send,
  BarChart3,
  CreditCard,
  FileText,
  Palette
} from "lucide-react"

const integrations = [
  { 
    name: "Instagram", 
    icon: Instagram,
    description: "Schedule posts, stories, and reels"
  },
  { 
    name: "YouTube", 
    icon: Youtube,
    description: "Manage videos and community posts"
  },
  { 
    name: "TikTok", 
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ),
    description: "Post short-form video content"
  },
  { 
    name: "X (Twitter)", 
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    description: "Share tweets and threads"
  },
  { 
    name: "Discord", 
    icon: MessageCircle,
    description: "Manage community servers"
  },
  { 
    name: "Telegram", 
    icon: Send,
    description: "Broadcast to channels and groups"
  },
  { 
    name: "Notion", 
    icon: FileText,
    description: "Sync content calendars"
  },
  { 
    name: "Canva", 
    icon: Palette,
    description: "Import designs directly"
  },
  { 
    name: "Google Analytics", 
    icon: BarChart3,
    description: "Track website traffic"
  },
  { 
    name: "Stripe", 
    icon: CreditCard,
    description: "Manage payments and subscriptions"
  },
]

export default function IntegrationsPage() {
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
            <span className="text-[13px] font-medium text-white/60">10+ Integrations</span>
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
            <TextGenerateEffect words="Every Platform. One System." delay={0.3} />
          </h1>
          <motion.p 
            className="text-white/70 text-[17px] max-w-[600px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Connect all your favorite platforms and tools. Crevo brings everything together so you can focus on creating.
          </motion.p>
        </motion.div>
      </section>

      {/* Integrations Grid */}
      <section className="pb-32 px-6 md:px-[120px]">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
          {integrations.map((integration, index) => (
            <StaggerItem key={integration.name}>
              <TiltCard tiltAmount={6}>
                <motion.div 
                  className="relative p-6 rounded-xl bg-black h-full overflow-hidden group"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
                  whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  {/* Shine border effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <BorderBeam duration={3} />
                  </div>
                  
                  {/* Spotlight effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 50%)",
                    }}
                  />
                  
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <integration.icon />
                    </motion.div>
                    <motion.span 
                      className="text-[11px] font-medium px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "rgba(255, 255, 255, 0.6)",
                      }}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      Coming Soon
                    </motion.span>
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2 relative z-10">{integration.name}</h3>
                  <p className="text-white/60 text-[14px] relative z-10">{integration.description}</p>
                </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <Footer />
    </main>
  )
}
