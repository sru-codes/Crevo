"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { WaitlistButton } from "./navbar"
import { 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem, 
  TiltCard, 
  TextReveal,
  InfiniteMarquee,
  BorderBeam,
  MagneticButton,
} from "./animations"
import { 
  Instagram, 
  Youtube, 
  MessageCircle,
  Send,
  Pen,
  Calendar,
  Upload,
  BarChart3,
  Bot,
  Users,
  DollarSign,
  Zap
} from "lucide-react"

// Golden ratio constants
const GOLDEN_EASE = [0.618, 0, 0.382, 1] as const

// Platform icons for marquee
const platforms = [
  { name: "Instagram", icon: Instagram },
  { name: "YouTube", icon: Youtube },
  { name: "TikTok", icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  )},
  { name: "X", icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[clamp(20px,2vw,24px)] h-[clamp(20px,2vw,24px)]">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )},
  { name: "Discord", icon: MessageCircle },
  { name: "Telegram", icon: Send },
]

// How it works steps
const steps = [
  { 
    title: "Create", 
    description: "Craft engaging content with AI-powered tools",
    icon: Pen 
  },
  { 
    title: "Schedule", 
    description: "Plan your posts across all platforms",
    icon: Calendar 
  },
  { 
    title: "Publish", 
    description: "Go live everywhere with one click",
    icon: Upload 
  },
]

export function PlatformsMarquee() {
  return (
    <section className="py-[clamp(55px,10vh,89px)] bg-black overflow-hidden">
      <ScrollReveal className="px-[clamp(21px,5vw,89px)] mb-[clamp(21px,4vw,34px)]">
        <h2 className="text-center text-white/60 text-[clamp(11px,1.2vw,13px)] font-medium uppercase tracking-[0.15em]">
          Platforms We Connect
        </h2>
      </ScrollReveal>
      
      {/* Marquee container */}
      <div className="relative">
        {/* Gradient masks - responsive width */}
        <div className="absolute left-0 top-0 bottom-0 w-[clamp(34px,10vw,89px)] bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-[clamp(34px,10vw,89px)] bg-gradient-to-l from-black to-transparent z-10" />
        
        {/* Animated Marquee */}
        <InfiniteMarquee speed={34} pauseOnHover>
          {platforms.map((platform, i) => (
            <motion.div
              key={`${platform.name}-${i}`}
              className="flex items-center gap-[clamp(8px,1vw,13px)] mx-[clamp(21px,4vw,55px)] text-white/40"
              whileHover={{ scale: 1.1, color: "rgba(255,255,255,0.8)" }}
              transition={{ duration: 0.233, ease: GOLDEN_EASE }}
            >
              <platform.icon />
              <span className="text-[clamp(14px,1.5vw,18px)] font-medium whitespace-nowrap">{platform.name}</span>
            </motion.div>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  )
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-89px" })

  return (
    <section ref={ref} className="py-[clamp(55px,10vh,89px)] bg-black px-[clamp(21px,5vw,89px)]">
      <ScrollReveal>
        <h2 className="text-center text-[clamp(28px,5vw,48px)] font-medium mb-[clamp(8px,1.5vw,13px)] leading-[1.1]">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
            }}
          >
            <TextReveal>How It Works</TextReveal>
          </span>
        </h2>
        <p className="text-center text-white/70 text-[clamp(13px,1.3vw,15px)] mb-[clamp(34px,6vw,55px)] max-w-[min(90vw,500px)] mx-auto leading-[1.618]">
          Three simple steps to transform your content workflow
        </p>
      </ScrollReveal>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(13px,2vw,21px)] max-w-[1200px] mx-auto" staggerDelay={0.144}>
        {steps.map((step, i) => (
          <StaggerItem key={step.title}>
            <TiltCard tiltAmount={8}>
              <motion.div 
                className="relative p-[clamp(21px,3vw,34px)] rounded-[clamp(13px,1.5vw,21px)] bg-black transition-all duration-[377ms] overflow-hidden group h-full"
                style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
                whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
              >
                {/* Border beam on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <BorderBeam duration={4} />
                </div>
                
                <motion.div 
                  className="w-[clamp(40px,5vw,55px)] h-[clamp(40px,5vw,55px)] rounded-[clamp(8px,1vw,13px)] bg-white/10 flex items-center justify-center mb-[clamp(13px,2vw,21px)] relative z-10"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                  transition={{ duration: 0.233 }}
                >
                  <step.icon className="w-[clamp(20px,2.5vw,28px)] h-[clamp(20px,2.5vw,28px)] text-white" />
                </motion.div>
                <h3 className="text-white text-[clamp(18px,2vw,21px)] font-medium mb-[clamp(5px,0.8vw,8px)] relative z-10">{step.title}</h3>
                <p className="text-white/60 text-[clamp(13px,1.2vw,15px)] relative z-10 leading-[1.618]">{step.description}</p>
              </motion.div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}

export function FeaturesBento() {
  return (
    <section className="py-[clamp(55px,10vh,89px)] bg-black px-[clamp(21px,5vw,89px)]">
      <ScrollReveal>
        <h2 className="text-center text-[clamp(28px,5vw,48px)] font-medium mb-[clamp(8px,1.5vw,13px)] leading-[1.1]">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
            }}
          >
            <TextReveal>Features</TextReveal>
          </span>
        </h2>
        <p className="text-center text-white/70 text-[clamp(13px,1.3vw,15px)] mb-[clamp(34px,6vw,55px)] max-w-[min(90vw,500px)] mx-auto leading-[1.618]">
          Everything you need to grow your creator business
        </p>
      </ScrollReveal>

      {/* Bento Grid with Tilt Cards - Golden ratio grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(13px,2vw,21px)] max-w-[1200px] mx-auto">
        {/* Row 1 */}
        <ScrollReveal delay={0} className="sm:col-span-2">
          <TiltCard className="h-full">
            <FeatureCard 
              icon={Upload}
              title="Multi-Platform Publishing"
              description="Post to all your social channels simultaneously"
            />
          </TiltCard>
        </ScrollReveal>
        <ScrollReveal delay={0.089}>
          <TiltCard className="h-full">
            <FeatureCard 
              icon={BarChart3}
              title="Analytics"
              description="Track performance across every platform"
            />
          </TiltCard>
        </ScrollReveal>
        <ScrollReveal delay={0.144}>
          <TiltCard className="h-full">
            <FeatureCard 
              icon={Bot}
              title="AI Assistant"
              description="Generate captions, hashtags, and ideas"
            />
          </TiltCard>
        </ScrollReveal>
        
        {/* Row 2 */}
        <ScrollReveal delay={0.233}>
          <TiltCard className="h-full">
            <FeatureCard 
              icon={Users}
              title="Community"
              description="Engage with your audience in one inbox"
            />
          </TiltCard>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <TiltCard className="h-full">
            <FeatureCard 
              icon={DollarSign}
              title="Monetization"
              description="Track earnings and manage sponsorships"
            />
          </TiltCard>
        </ScrollReveal>
        <ScrollReveal delay={0.377} className="sm:col-span-2">
          <TiltCard className="h-full">
            <FeatureCard 
              icon={Zap}
              title="Automation System"
              description="Set up workflows that run on autopilot"
            />
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>
  )
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <motion.div 
      className="relative p-[clamp(21px,3vw,34px)] rounded-[clamp(13px,1.5vw,21px)] bg-black h-full overflow-hidden group"
      style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
      whileHover={{ borderColor: "rgba(255, 255, 255, 0.3)" }}
    >
      {/* Spotlight effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)",
        }}
      />
      
      {/* Border beam on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <BorderBeam duration={5} />
      </div>
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.233, ease: GOLDEN_EASE }}
        className="mb-[clamp(13px,2vw,21px)]"
      >
        <Icon className="w-[clamp(24px,3vw,34px)] h-[clamp(24px,3vw,34px)] text-white relative z-10" />
      </motion.div>
      <h3 className="text-white text-[clamp(16px,1.5vw,18px)] font-medium mb-[clamp(5px,0.8vw,8px)] relative z-10">{title}</h3>
      <p className="text-white/60 text-[clamp(12px,1.1vw,14px)] relative z-10 leading-[1.618]">{description}</p>
    </motion.div>
  )
}

export function ComingSoon() {
  return (
    <section className="py-[clamp(55px,10vh,89px)] bg-black px-[clamp(21px,5vw,89px)]">
      <ScrollReveal>
        <motion.div 
          className="relative max-w-[min(90vw,600px)] mx-auto text-center p-[clamp(34px,6vw,55px)] rounded-[clamp(13px,2vw,21px)] bg-black overflow-hidden"
          style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
          whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        >
          {/* Subtle glow effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05), transparent 70%)",
            }}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: GOLDEN_EASE }}
            className="inline-flex items-center gap-[clamp(5px,0.8vw,8px)] rounded-full px-[clamp(13px,2vw,21px)] py-[clamp(5px,0.8vw,8px)] mb-[clamp(21px,4vw,34px)] relative z-10"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <motion.span 
              className="w-[clamp(4px,0.5vw,6px)] h-[clamp(4px,0.5vw,6px)] rounded-full bg-white"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{ 
                duration: 2.1, 
                repeat: Infinity,
              }}
            />
            <span className="text-[clamp(11px,1.1vw,13px)] font-medium text-white/60">Pricing</span>
          </motion.div>
          
          <h2 className="text-[clamp(24px,4vw,36px)] font-medium mb-[clamp(8px,1.5vw,13px)] relative z-10 leading-[1.1]">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
              }}
            >
              <TextReveal>Pricing Plans Coming Soon</TextReveal>
            </span>
          </h2>
          <p className="text-white/70 text-[clamp(13px,1.3vw,15px)] mb-[clamp(21px,4vw,34px)] relative z-10 leading-[1.618]">
            Be the first to know when we launch. Join the waitlist for early access and exclusive pricing.
          </p>
          <div className="relative z-10">
            <MagneticButton strength={0.15}>
              <WaitlistButton variant="light" />
            </MagneticButton>
          </div>
        </motion.div>
      </ScrollReveal>
    </section>
  )
}
