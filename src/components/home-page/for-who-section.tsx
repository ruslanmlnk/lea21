import { benefitIcons } from "./data";
import { Reveal, SvgIcon } from "./shared";

const firstRow = [
  { icon: benefitIcons.battery, label: "Постійна втома\nі відсутність енергії" },
  { icon: benefitIcons.heart, label: "Внутрішня тривога без причини" },
  { icon: benefitIcons.mind, label: "Живеш в голові,\nне відчуваєш тіло" },
  { icon: benefitIcons.shield, label: "Постійно контролюєш\nі не можеш розслабитися" },
];

const secondRow = [
  { icon: benefitIcons.smile, label: "Немає задоволення\nвід життя" },
  { icon: benefitIcons.apple, label: "Заїдаєш стрес\nі емоції" },
  { icon: benefitIcons.flower, label: "Не відчуваєш жіночність\nі сексуальність" },
];

function BenefitItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-5 text-center lg:w-[190px] lg:gap-[30px]">
      <SvgIcon icon={icon} />
      <p className="w-full whitespace-pre-line font-['Google_Sans','Product_Sans','Poppins',sans-serif] text-base leading-[1.45] text-[#1F445A]">
        {label}
      </p>
    </div>
  );
}

export function ForWhoSection() {
  return (
    <section id="for-who" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 lg:px-[120px] lg:pb-[130px]">
        <div className="flex flex-col items-center gap-10 lg:gap-[77px]">
          <Reveal>
            <h2 className="text-center text-[#1F445A]">
              <span className="font-display block text-[24px] uppercase leading-[1.02] sm:text-[32px] lg:text-[64px] lg:leading-none">
                Цей проєкт
              </span>
              <span className="font-script mt-1 block text-[36px] leading-[1] normal-case sm:text-[48px] lg:mt-0 lg:text-[64px] lg:leading-none">
                для тебе, якщо ти:
              </span>
            </h2>
          </Reveal>

          <div className="flex w-full flex-col gap-8 lg:gap-[48px]">
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
  );
}
