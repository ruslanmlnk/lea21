import { BackgroundPicture } from './shared'
import { Reveal } from './shared-client'

import type { LandingPageContent } from './types'

export function CtaSection({ cta }: { cta: LandingPageContent['cta'] }) {

  return (
    <section className="relative overflow-hidden">
      <BackgroundPicture asset={cta.backgroundImage} />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.15)_0%,rgba(16,36,63,0.6)_100%)]" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-9 text-center lg:gap-8 lg:px-[230px] lg:py-[130px]">
        <Reveal>
          <h2 className="max-w-[820px] font-display text-[24px] uppercase leading-[1.45] text-white lg:text-[44px]">
            {cta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-[650px] text-base leading-[1.45] text-[#C3C7C8]">{cta.description}</p>
        </Reveal>
        <Reveal delay={0.14} y={18}>
          <a
            href={cta.buttonHref}
            className="inline-flex w-full items-center justify-center bg-[#8FAFC2] px-5 py-[13px] text-base leading-[1.45] text-white sm:w-auto sm:min-w-[160px]"
          >
            {cta.buttonLabel}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
