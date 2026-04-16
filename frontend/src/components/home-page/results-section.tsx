import { BackgroundPicture, LandingImage } from './shared'
import { Reveal } from './shared-client'

import type { LandingPageContent } from './types'

export function ResultsSection({ results }: { results: LandingPageContent['results'] }) {
  const resultRows = [
    results.items.slice(0, 2),
    results.items.slice(2, 4),
    results.items.slice(4, 6),
  ];

  return (
    <section id="results" className="relative overflow-hidden">
      <BackgroundPicture asset={results.backgroundImage} />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,36,63,0.6)_50%,rgba(255,255,255,0.6)_100%)]" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col px-6 py-9 text-white lg:block lg:px-[30px] lg:py-[130px]">
        <Reveal className="order-2 lg:order-none">
          <h2 className="font-display text-[24px] uppercase leading-[1.45] text-white lg:text-[64px]">
            {results.title}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="order-1 mb-6 shrink-0 lg:hidden">
          <LandingImage asset={results.image} imgClassName="h-[412px] w-full object-cover" />
        </Reveal>

        <div className="order-3 mt-6 flex flex-col gap-6 lg:mt-[70px] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)] lg:items-start lg:gap-15 min-[1440px]:grid-cols-[640px_597px] min-[1440px]:gap-[100px]">
          <Reveal delay={0.08} className="hidden min-w-0 lg:block">
            <LandingImage asset={results.image} imgClassName="h-[412px] w-full object-cover lg:h-[clamp(360px,35.5vw,510px)] min-[1440px]:h-[510px] min-[1440px]:w-[640px]" />
          </Reveal>

          <div className="flex min-w-0 flex-col gap-6 lg:h-[clamp(360px,35.5vw,510px)] lg:justify-between lg:gap-0 min-[1440px]:h-[510px] min-[1440px]:w-[597px]">
            <Reveal x={28}>
              <p className="max-w-[597px] text-base uppercase leading-[1.45] text-white lg:text-[27px]">
                {results.summary}
              </p>
            </Reveal>

            <div className="flex flex-col gap-4 lg:gap-8">
              {resultRows.map((row, rowIndex) => (
                <Reveal key={rowIndex} delay={0.12 + rowIndex * 0.05}>
                  <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-[85px] lg:gap-y-0 min-[1440px]:gap-x-[83px]">
                    {row.map((item) => (
                      <article key={item.title} className="flex w-full min-w-0 flex-col gap-[10px] min-[1440px]:w-[257px]">
                        <div className="flex items-center gap-[10px]">
                          <span className="mt-px h-2 w-2 shrink-0 rounded-full bg-[#8FAFC2]" />
                          <h3 className="text-lg uppercase leading-[1.45] text-white lg:text-[20px] min-[1440px]:max-w-[217px]">
                            {item.title}
                          </h3>
                        </div>
                        <p className="pl-[18px] text-base leading-[1.45] text-white min-[1440px]:whitespace-pre-line">
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
