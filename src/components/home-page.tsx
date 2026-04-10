"use client";

import { CertificatesSection } from "./home-page/certificates-section";
import { ContactSection } from "./home-page/contact-section";
import { CtaSection } from "./home-page/cta-section";
import { ExpertiseSection } from "./home-page/expertise-section";
import { FooterSection } from "./home-page/footer-section";
import { ForWhoSection } from "./home-page/for-who-section";
import { HeaderSection } from "./home-page/header-section";
import { HeroSection } from "./home-page/hero-section";
import { ProcessSection } from "./home-page/process-section";
import { ProgramSection } from "./home-page/program-section";
import { ProjectSection } from "./home-page/project-section";
import { ResultsSection } from "./home-page/results-section";
import { ReviewsSection } from "./home-page/reviews-section";

export function HomePage() {
  return (
    <main className="bg-white text-[#1F445A]">
      <HeaderSection />
      <HeroSection />
      <ProjectSection />
      <ForWhoSection />
      <ResultsSection />
      <ProcessSection />
      <ProgramSection />
      <ExpertiseSection />
      <CertificatesSection />
      <ReviewsSection />
      <CtaSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
