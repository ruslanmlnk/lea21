import { CertificatesSection } from './home-page/certificates-section'
import { ContactSection } from './home-page/contact-section'
import { CtaSection } from './home-page/cta-section'
import { ExpertiseSection } from './home-page/expertise-section'
import { FooterSection } from './home-page/footer-section'
import { ForWhoSection } from './home-page/for-who-section'
import { HeaderSection } from './home-page/header-section'
import { HeroSection } from './home-page/hero-section'
import { ProcessSection } from './home-page/process-section'
import { ProgramSection } from './home-page/program-section'
import { ProjectSection } from './home-page/project-section'
import { ResultsSection } from './home-page/results-section'
import { ReviewsSection } from './home-page/reviews-section'
import type { LandingPageContent } from './home-page/types'

export function HomePage({ content }: { content: LandingPageContent }) {
  return (
    <main className="bg-white text-[#1F445A]">
      <HeaderSection header={content.header} />
      <HeroSection hero={content.hero} />
      <ProjectSection project={content.project} />
      <ForWhoSection forWho={content.forWho} />
      <ResultsSection results={content.results} />
      <ProcessSection process={content.process} />
      <ProgramSection program={content.program} />
      <ExpertiseSection expertise={content.expertise} />
      <CertificatesSection certificates={content.certificates} />
      <div className="hidden lg:block">
        <ReviewsSection reviews={content.reviews} />
      </div>
      <CtaSection cta={content.cta} />
      <ContactSection contact={content.contact} />
      <FooterSection footer={content.footer} />
    </main>
  )
}
