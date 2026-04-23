'use client'

import { useRef } from 'react'

import { CertificateCard } from './shared'
import { Reveal, ReviewArrowButton } from './shared-client'

import type { LandingPageContent } from './types'

export function CertificatesSection({ certificates }: { certificates: LandingPageContent['certificates'] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const scrollCertificates = (direction: 'left' | 'right') => {
    const scroller = scrollerRef.current

    if (!scroller) {
      return
    }

    const slides = Array.from(scroller.querySelectorAll<HTMLElement>('[data-certificate-slide]'))
    const scrollerLeft = scroller.getBoundingClientRect().left
    const currentScrollLeft = scroller.scrollLeft
    const slidePositions = slides.map(
      (slide) => slide.getBoundingClientRect().left - scrollerLeft + currentScrollLeft,
    )
    let targetPosition: number | undefined

    if (direction === 'right') {
      targetPosition = slidePositions.find((position) => position > currentScrollLeft + 8)
    } else {
      for (let index = slidePositions.length - 1; index >= 0; index -= 1) {
        if (slidePositions[index] < currentScrollLeft - 8) {
          targetPosition = slidePositions[index]
          break
        }
      }
    }

    if (targetPosition != null) {
      scroller.scrollTo({
        behavior: 'smooth',
        left: targetPosition,
      })
      return
    }

    scroller.scrollBy({
      behavior: 'smooth',
      left: direction === 'left' ? -scroller.clientWidth * 0.75 : scroller.clientWidth * 0.75,
    })
  }

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
              className="no-scrollbar w-full snap-x snap-mandatory overflow-x-auto"
            >
              <div className="mx-auto flex w-max items-center gap-5 lg:gap-10">
                {certificates.items.map((item, index) => (
                  <div key={`${item.label}-${index}`} data-certificate-slide="" className="shrink-0 snap-start">
                    <Reveal delay={index * 0.05}>
                      <CertificateCard asset={item.image} />
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-[140px] items-center justify-between">
              <ReviewArrowButton direction="left" onClick={() => scrollCertificates('left')} />
              <ReviewArrowButton direction="right" onClick={() => scrollCertificates('right')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
