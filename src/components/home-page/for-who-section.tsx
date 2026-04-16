import { benefitIcons } from './data'
import { SvgIcon } from './shared'
import { Reveal } from './shared-client'

import type { LandingPageContent } from './types'

function BenefitItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 text-center lg:w-[190px] lg:gap-[30px]">
      <SvgIcon icon={icon} />
      <p className="w-full whitespace-pre-line font-['Google_Sans','Product_Sans','Poppins',sans-serif] text-base leading-[1.45] text-[#1F445A]">
        {label}
      </p>
    </div>
  );
}

export function ForWhoSection({ forWho }: { forWho: LandingPageContent['forWho'] }) {
  const firstRow = forWho.primaryItems.map((item) => ({ icon: benefitIcons[item.icon], label: item.label }));
  const secondRow = forWho.secondaryItems.map((item) => ({ icon: benefitIcons[item.icon], label: item.label }));

  return (
    <section id="for-who" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-9 lg:px-[120px] lg:pb-[130px] lg:pt-0">
        <div className="flex flex-col items-center gap-6 lg:gap-[77px]">
          <Reveal>
            <h2 className="text-center text-[#1F445A]">
              <span className="font-display block text-[32px] uppercase leading-[1.1] lg:text-[64px] lg:leading-none">
                {forWho.title}
              </span>
              <span className="font-script block text-[36px] leading-[1.1] normal-case lg:text-[64px] lg:leading-none lg:mt-3">
                {forWho.scriptTitle}
              </span>
            </h2>
          </Reveal>

          <div className="flex w-full flex-col gap-6 lg:gap-[48px]">
            <Reveal>
              <div className="flex flex-col gap-6 lg:hidden">
                {firstRow.map((item, index) => (
                  <div key={item.label} className="flex flex-col items-center gap-6">
                    <BenefitItem icon={item.icon} label={item.label} />
                    {index < firstRow.length - 1 ? (
                      <div className="h-px w-full bg-[#8FAFC2]/30" aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="hidden items-center justify-between lg:flex">
                {firstRow.map((item, index) => (
                  <div key={item.label} className="contents">
                    <BenefitItem icon={item.icon} label={item.label} />
                    {index < firstRow.length - 1 ? (
                      <div className="h-[114px] w-px bg-[#8FAFC2]/30" aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="flex flex-col gap-6 lg:hidden">
                {secondRow.map((item, index) => (
                  <div key={item.label} className="flex flex-col items-center gap-6">
                    <BenefitItem icon={item.icon} label={item.label} />
                    {index < secondRow.length - 1 ? (
                      <div className="h-px w-full bg-[#8FAFC2]/30" aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="hidden items-center justify-center gap-[74px] lg:flex">
                {secondRow.map((item, index) => (
                  <div key={item.label} className="contents">
                    <BenefitItem icon={item.icon} label={item.label} />
                    {index < secondRow.length - 1 ? (
                      <div className="h-[114px] w-px bg-[#8FAFC2]/30" aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
