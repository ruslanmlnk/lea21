import { Reveal } from './shared-client'

const widthClasses = ["min-[1440px]:w-[340px]", "min-[1440px]:w-[360px]", "min-[1440px]:w-[340px]"] as const;

import type { LandingPageContent } from './types'

export function ProcessSection({ process }: { process: LandingPageContent['process'] }) {

  return (
    <section id="about" className="bg-[linear-gradient(0deg,rgba(143,175,194,0.5)_0%,#FFFFFF_100%)]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-9 lg:gap-[69px] lg:px-[60px] lg:py-[130px] min-[1440px]:px-[130px]">
        <Reveal className="flex flex-col items-center gap-[6px] text-center lg:gap-[10px]">
          <h2 className="bg-[linear-gradient(180deg,rgba(31,68,90,0.6)_50%,rgba(31,68,90,0)_100%)] bg-clip-text font-display text-[90px] uppercase leading-[1.1] text-transparent lg:text-[144px]">
            {process.title}
          </h2>
          <p className="font-script text-[36px] leading-[1.1] text-[#1F445A] lg:text-[64px]">
            {process.scriptTitle}
          </p>
        </Reveal>

        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-8 min-[1440px]:flex min-[1440px]:justify-center min-[1440px]:gap-[71px]">
          {process.steps.map((item, index) => (
            <Reveal
              key={`${item.title}-${index}`}
              delay={0.06 + index * 0.05}
              className={`${widthClasses[index] ?? "min-[1440px]:w-[340px]"} ${item.raised ? "min-[1440px]:pt-10" : ""}`}
            >
              <article className="bg-white px-9 pb-10 pt-[30px] lg:px-[36px] lg:py-[30px] lg:pb-[40px]">
                <div className="flex flex-col items-center gap-4 text-center lg:gap-[21px]">
                  <h3 className="text-[22px] uppercase leading-[1.45] text-[#1F445A] lg:min-h-[24px] lg:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="max-w-[268px] whitespace-pre-line text-base leading-[1.45] text-[#1F445A]">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
