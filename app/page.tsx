import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PlatformsMarquee, HowItWorks, FeaturesBento, ComingSoon } from "@/components/home-sections"
import { Footer } from "@/components/footer"
import { ScrollProgress, CustomCursor } from "@/components/animations"

export default function Home() {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      {/* Custom Cursor - Hidden on touch devices */}
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Hero Section - Full viewport height */}
      <HeroSection />

      {/* Sections Below Hero - All with consistent golden ratio spacing */}
      <PlatformsMarquee />
      <HowItWorks />
      <FeaturesBento />
      <ComingSoon />
      <Footer />
    </main>
  )
}
