'use client'

import { useRef } from 'react'

import { CertificateCard } from './shared'
import { Reveal, ReviewArrowButton } from './shared-client'

import type { LandingPageContent } from './types'

export function CertificatesSection({ certificates }: { certificates: LandingPageContent['certificates'] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollCertificates = (direction: "left" | "right") => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction === "left" ? -230 : 230,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-9 lg:gap-[77px] lg:px-[120px] lg:py-[130px]">
        <div className="flex w-full flex-col items-center gap-6 lg:gap-[70px]">
          <Reveal>
            <div className="text-center text-[#1F445A]">
              <h2 className="text-center">
                <span className="block font-display text-[24px] uppercase leading-[1.45] lg:text-[64px] lg:leading-[1.08]">
                  {certificates.title}
                </span>
                <span className="block">
                  <span className="font-script text-[36px] leading-[1.08] sm:text-[48px] lg:text-[64px]">
                    {certificates.scriptWordOne}
                  </span>
                  <span className="ml-2 font-script text-[36px] leading-[1.08] sm:text-[48px] lg:text-[64px]">
                    {certificates.scriptWordTwo}
                  </span>
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="flex w-full flex-col items-center gap-6 lg:gap-[50px]">
            <div
              ref={scrollerRef}
              className="flex w-full snap-x snap-mandatory justify-start gap-5 overflow-x-auto no-scrollbar lg:justify-center lg:gap-10"
            >
              {certificates.items.map((item, index) => (
                <Reveal key={`${item.label}-${index}`} delay={index * 0.05} className="shrink-0 snap-start">
                  <CertificateCard asset={item.image} />
                </Reveal>
              ))}
            </div>

            <div className="flex w-[140px] items-center justify-between">
              <ReviewArrowButton direction="left" onClick={() => scrollCertificates("left")} />
              <ReviewArrowButton direction="right" onClick={() => scrollCertificates("right")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
