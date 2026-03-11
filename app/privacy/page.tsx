"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const sections = [
  {
    id: "information-collect",
    title: "Information We Collect",
    content: `We collect information you provide directly to us, including your name, email address, and account credentials. We also collect information about your use of the service, including the content you create, schedule, and publish. Additionally, we may collect technical information such as your IP address, browser type, and device information to improve our services.`
  },
  {
    id: "how-we-use",
    title: "How We Use Your Data",
    content: `We use the information we collect to provide, maintain, and improve our services. This includes processing your content for scheduling and publishing, analyzing usage patterns to enhance features, and communicating with you about your account and updates. We may also use your information to personalize your experience and provide customer support.`
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third Parties",
    content: `We share your data with third-party platforms only when necessary to provide our services, such as publishing content to your connected social media accounts. We may also share information with service providers who assist us in operating the service, subject to confidentiality agreements. We do not sell your personal information to third parties.`
  },
  {
    id: "platform-api",
    title: "Platform API Data",
    content: `When you connect your social media accounts to Crevo, we access certain data through platform APIs as authorized by you. This data is used solely to provide our services and is handled in accordance with each platform's API terms of use. We only request the minimum permissions necessary to deliver the features you use.`
  },
  {
    id: "cookies-tracking",
    title: "Cookies & Tracking",
    content: `We use cookies and similar tracking technologies to remember your preferences, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences. Some features of the service may not function properly if you disable cookies.`
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide you with services. We may retain certain information for longer periods as required by law or for legitimate business purposes. When you delete your account, we will delete or anonymize your personal information within a reasonable timeframe.`
  },
  {
    id: "your-rights",
    title: "Your Rights (GDPR/CCPA)",
    content: `Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or port your data. You may also have the right to opt out of certain data processing activities. To exercise these rights, please contact us at privacy@crevo.app.`
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: `Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child under 13, we will take steps to delete that information promptly.`
  },
  {
    id: "security",
    title: "Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.`
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@crevo.app. We are committed to resolving any concerns you may have about your privacy.`
  },
]

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <div 
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <span className="text-[13px] font-medium text-white/60">Effective May 1, 2026</span>
          </div>
        </div>
      </section>

      {/* Callout Card */}
      <section className="px-6 md:px-[120px] mb-12">
        <div 
          className="inline-flex items-center gap-3 rounded-full px-6 py-3"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          <span className="text-white font-medium text-[15px]">Crevo never sells your data.</span>
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
