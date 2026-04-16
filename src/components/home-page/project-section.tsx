import { LandingImage } from './shared'
import { Reveal } from './shared-client'

import type { LandingPageContent } from './types'

export function ProjectSection({ project }: { project: LandingPageContent['project'] }) {

  return (
    <section id="project" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-9 lg:px-[30px] lg:pb-[130px] lg:pt-[150px]">
        <div className="flex flex-col gap-6 lg:gap-[70px]">
          <Reveal>
            <h2 className="text-[#1F445A]">
              <span className="font-display block text-[32px] uppercase leading-[1.1] lg:text-[64px] lg:leading-none">
                {project.title}
              </span>
              <span className="font-script block text-[36px] leading-[1.1] normal-case lg:text-[64px] lg:mt-[12px] lg:leading-none">
                {project.scriptTitle}
              </span>
            </h2>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[640px_640px] lg:items-center lg:gap-[100px]">
            <Reveal className="order-2 min-w-0 lg:order-1 min-[1440px]:w-[640px]" x={-28}>
              <div className="flex h-full min-h-0 flex-col gap-6 lg:min-h-[clamp(360px,35.5vw,511px)] lg:justify-between min-[1440px]:min-h-[511px]">
                <div className="flex flex-col gap-6 min-[1440px]:gap-[38px]">
                  <p className="text-base uppercase leading-[1.45] text-[#1F445A] lg:text-[20px]">{project.intro}</p>

                  <p className="whitespace-pre-line text-base leading-[1.45] text-[#1F445A]">{project.body}</p>
                </div>

                <a
                  href={project.ctaHref}
                  className="inline-flex w-full items-center justify-center bg-[#8FAFC2] px-5 py-[13px] text-base leading-[1.45] text-white"
                >
                  {project.ctaLabel}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="order-1 lg:order-2 lg:w-[640px]">
              <LandingImage asset={project.image} imgClassName="h-[250px] w-full object-cover lg:h-[clamp(360px,35.5vw,510.7px)] min-[1440px]:h-[510.7px]" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
