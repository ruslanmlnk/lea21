import { LandingImage } from './shared'
import { Reveal } from './shared-client'

import type { LandingPageContent } from './types'

export function ExpertiseSection({ expertise }: { expertise: LandingPageContent['expertise'] }) {

  return (
    <section className="bg-[linear-gradient(0deg,rgba(143,175,194,0.5)_0%,#FFFFFF_100%)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-9 lg:gap-[70px] lg:px-[30px] lg:pb-[130px] lg:pt-0">
        <div className="flex flex-col gap-6 lg:gap-[50px]">
          <div className="flex flex-col gap-6 lg:gap-[70px]">
            <Reveal>
              <div className="w-full lg:max-w-[643px]">
                <h2 className="text-[#1F445A]">
                  <span className="font-display text-[24px] uppercase leading-[1.45] lg:block lg:text-[64px] lg:leading-none">
                    {expertise.title}
                  </span>
                  <span className="font-script text-[36px] leading-[1.1] lg:block lg:text-[64px] lg:leading-none">
                    {expertise.scriptTitle}
                  </span>
                </h2>
              </div>
            </Reveal>

            <div className="flex flex-col gap-4 lg:gap-[50px]">
              <Reveal className="lg:ml-auto lg:max-w-[491px]" x={30}>
                <p className="text-base leading-[1.45] text-[#1F445A]">{expertise.description}</p>
              </Reveal>

              <Reveal className="lg:max-w-[598px]" delay={0.08}>
                <p className="text-base uppercase leading-[1.45] text-[#1F445A] lg:text-[18px]">
                  {expertise.intro}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)] lg:items-center lg:justify-between lg:gap-[95px] min-[1440px]:grid-cols-[750px_531px]">
            <Reveal className="min-w-0">
              <LandingImage
                asset={expertise.image}
                imgClassName="h-[412px] w-full object-cover lg:h-[clamp(430px,39vw,562px)] min-[1440px]:h-[562px] min-[1440px]:w-[750px]"
              />
            </Reveal>

            <div className="flex min-w-0 flex-col gap-6 lg:gap-[clamp(24px,3.5vw,50px)] min-[1440px]:w-[531px] min-[1440px]:gap-[50px]">
              {expertise.stats.map((item, index) => (
                <Reveal key={`${item.title}-${index}`} delay={0.08 + index * 0.05}>
                  <div
                    className={`flex flex-col gap-[10px] ${
                      item.align === "end" ? "items-end text-right" : "items-start text-left"
                    }`}
                  >
                    <h3 className="text-[30px] uppercase leading-[1.45] text-[#1F445A] sm:text-[38px] lg:text-[clamp(32px,3.3vw,48px)] min-[1440px]:text-[48px]">
                      {item.title}
                    </h3>
                    <p className="text-base leading-[1.45] text-[#1F445A]">{item.description}</p>
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
