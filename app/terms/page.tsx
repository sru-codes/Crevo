"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: `By accessing or using Crevo's services, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, you may not access or use our services. We reserve the right to modify these terms at any time, and your continued use of the service constitutes acceptance of any changes.`
  },
  {
    id: "use-of-service",
    title: "Use of Service",
    content: `You agree to use Crevo only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must not use the service to violate any applicable laws, distribute malware, or engage in any activity that could harm the service or other users.`
  },
  {
    id: "creator-content",
    title: "Creator Content & Ownership",
    content: `You retain all ownership rights to the content you create and publish through Crevo. By using our service, you grant us a limited license to process, store, and display your content solely for the purpose of providing the service. We do not claim ownership of your content and will not use it for any purpose other than delivering our services to you.`
  },
  {
    id: "platform-integrations",
    title: "Platform Integrations",
    content: `Crevo integrates with third-party platforms including but not limited to Instagram, YouTube, TikTok, X, Discord, and Telegram. Your use of these integrations is subject to the terms and policies of each respective platform. We are not responsible for changes to third-party APIs or platform policies that may affect service functionality.`
  },
  {
    id: "subscription-billing",
    title: "Subscription & Billing",
    content: `Certain features of Crevo may require a paid subscription. By subscribing, you authorize us to charge your payment method on a recurring basis. You may cancel your subscription at any time, and cancellation will take effect at the end of your current billing period. Refunds are provided in accordance with our refund policy.`
  },
  {
    id: "termination",
    title: "Termination",
    content: `We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion. Upon termination, your right to use the service will immediately cease. You may also terminate your account at any time by contacting our support team.`
  },
  {
    id: "limitation-liability",
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by law, Crevo shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service. Our total liability for any claims arising from these terms shall not exceed the amount you paid us in the twelve months preceding the claim.`
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Crevo operates, without regard to conflict of law principles. Any disputes arising from these terms shall be resolved through binding arbitration in accordance with applicable arbitration rules.`
  },
  {
    id: "changes-terms",
    title: "Changes to Terms",
    content: `We may update these Terms from time to time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the service after such changes constitutes acceptance of the updated terms.`
  },
  {
    id: "contact",
    title: "Contact",
    content: `If you have any questions about these Terms and Conditions, please contact us at legal@crevo.app. We are committed to addressing your concerns and providing clarification on any aspect of these terms.`
  },
]

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -70% 0px" }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="bg-black min-h-screen page-fade-in">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-6 md:px-[120px]">
        <div className="max-w-[800px]">
          <h1 
            className="text-[40px] md:text-[56px] font-medium leading-[1.1] mb-4"
            style={{
              background: "linear-gradient(144.5deg, #FFFFFF 28%, rgba(0, 0, 0, 0) 115%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Terms & Conditions
          </h1>
          <div 
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <span className="text-[13px] font-medium text-white/60">Last updated: May 1, 2026</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32 px-6 md:px-[120px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Sticky Sidebar */}
          <aside className="hidden md:block w-[250px] shrink-0">
            <nav className="sticky top-32">
              <ul className="flex flex-col gap-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`block py-2 text-[14px] transition-colors ${
                        activeSection === section.id
                          ? "text-white font-medium"
                          : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-[700px]">
            {sections.map((section, index) => (
              <div 
                key={section.id}
                id={section.id}
                className={index > 0 ? "pt-12" : ""}
              >
                {index > 0 && (
                  <hr className="mb-12 border-white/10" />
                )}
                <h2 className="text-white text-[18px] font-medium mb-4">
                  {section.title}
                </h2>
                <p className="text-white/65 text-[15px] leading-[1.8]">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
