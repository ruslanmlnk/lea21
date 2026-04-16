import { FooterLinkGroup } from './shared'
import { Reveal, StaggerItem, StaggerReveal } from './shared-client'

import type { LandingPageContent } from './types'

export function FooterSection({ footer }: { footer: LandingPageContent['footer'] }) {

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-[30px] lg:py-[70px]">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Reveal className="order-2 justify-self-center text-center lg:order-none lg:justify-self-start lg:text-left" x={-20}>
            <FooterLinkGroup className="lg:w-[314px] lg:justify-between lg:gap-0">
              {footer.leftLinks.map((item) => (
                <a key={item.href} href={item.href} className="text-base leading-6 text-[#1F445A]">
                  {item.label}
                </a>
              ))}
            </FooterLinkGroup>
          </Reveal>

          <Reveal delay={0.08} className="order-1 flex flex-col items-center gap-4 lg:order-none lg:gap-6">
            <a href="#home" className="font-logo text-5xl uppercase leading-none text-[#1F445A] lg:text-[68px]">
              {footer.logoText}
            </a>
            <div className="flex items-center gap-6 text-base font-medium uppercase text-[#8FAFC2]">
              {footer.socialLinks.map((item) => (
                <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="order-3 justify-self-center text-center lg:order-none lg:justify-self-end lg:text-left" x={20}>
            <FooterLinkGroup className="lg:w-[313px] lg:justify-between lg:gap-0">
              {footer.rightLinks.map((item) => (
                <a key={item.href} href={item.href} className="text-base leading-6 text-[#1F445A]">
                  {item.label}
                </a>
              ))}
            </FooterLinkGroup>
          </Reveal>
        </div>

        <div className="mt-8 border-t border-[#1F445A33] pt-8 lg:mt-[60px] lg:pt-[30px]">
          <StaggerReveal className="grid gap-6 text-center lg:grid-cols-3 lg:items-start lg:gap-[150px]" stagger={0.12}>
            <StaggerItem className="space-y-3">
              <p className="text-base uppercase leading-[1.45] text-[#1F445A]">{footer.contact.title}</p>
              <a href={footer.contact.href} target="_blank" rel="noreferrer" className="text-base font-medium leading-[1.45] text-[#8FAFC2]">
                {footer.contact.label}
              </a>
            </StaggerItem>

            <StaggerItem className="space-y-3 border-y border-[#8FAFC280] py-6 lg:border-x lg:border-y-0 lg:py-0">
              <p className="text-base uppercase leading-[1.45] text-[#1F445A]">{footer.write.title}</p>
              <a href={footer.write.href} target="_blank" rel="noreferrer" className="text-base font-medium leading-[1.45] text-[#8FAFC2]">
                {footer.write.label}
              </a>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <p className="text-base uppercase leading-[1.45] text-[#1F445A]">{footer.socialsTitle}</p>
              <div className="flex items-center justify-center gap-6 text-base font-medium uppercase text-[#8FAFC2]">
                {footer.socialLinks.map((item) => (
                  <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                ))}
              </div>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </div>
    </footer>
  )
}
