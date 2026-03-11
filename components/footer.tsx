"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./animations"

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Integrations", href: "/integrations" },
    { label: "Get Started", href: "/get-started" },
  ],
  company: [
    { label: "For Creators", href: "/for-creators" },
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
  connect: [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Discord", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="px-6 md:px-[120px] py-16">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Logo */}
          <ScrollReveal direction="left">
            <div>
              <Link href="/" className="text-white font-medium text-xl tracking-tight">
                <motion.span
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  Crevo
                </motion.span>
              </Link>
              <p className="mt-4 text-white/50 text-[14px] max-w-[250px]">
                The Creator Operating System for modern content creators.
              </p>
            </div>
          </ScrollReveal>

          {/* Link Groups */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16" staggerDelay={0.08}>
            <StaggerItem>
              <FooterColumn title="Product" links={footerLinks.product} />
            </StaggerItem>
            <StaggerItem>
              <FooterColumn title="Company" links={footerLinks.company} />
            </StaggerItem>
            <StaggerItem>
              <FooterColumn title="Legal" links={footerLinks.legal} />
            </StaggerItem>
            <StaggerItem>
              <FooterColumn title="Connect" links={footerLinks.connect} />
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Bottom Row */}
        <ScrollReveal delay={0.3}>
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-white/40 text-[13px]">
              &copy; 2026 Crevo. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <FooterBottomLink href="/privacy" label="Privacy Policy" />
              <span className="text-white/40">·</span>
              <FooterBottomLink href="/terms" label="Terms & Conditions" />
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

function FooterColumn({ 
  title, 
  links 
}: { 
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="text-white font-medium text-[13px] uppercase tracking-wider mb-4">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-white/50 text-[14px] hover:text-white transition-colors relative group inline-block"
            >
              <span>{link.label}</span>
              <motion.span
                className="absolute -bottom-0.5 left-0 h-[1px] bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0, width: "100%" }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterBottomLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href} 
      className="text-white/40 text-[13px] hover:text-white/60 transition-colors relative group"
    >
      <span>{label}</span>
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[1px] bg-white/40"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0, width: "100%" }}
      />
    </Link>
  )
}
