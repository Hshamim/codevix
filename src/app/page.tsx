import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { About } from "@/components/home/About";
import { WhyUs } from "@/components/home/WhyUs";
import { CounterBand } from "@/components/home/CounterBand";
import { Showcase } from "@/components/home/Showcase";
import { HowWeWork } from "@/components/home/HowWeWork";
import { Faq } from "@/components/home/Faq";
import { TechStrip } from "@/components/home/TechStrip";
import { ContactSection } from "@/components/home/ContactSection";

// Title, description and social preview come from the root layout; only the canonical URL is page-specific.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <CounterBand />
      <Showcase />
      <HowWeWork />
      <Faq />
      <TechStrip />
      <Testimonials />
      <ContactSection />
      <CtaBand />
    </>
  );
}
