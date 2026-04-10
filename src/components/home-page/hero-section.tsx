import { heroTexts, images } from "./data";
import { BackgroundPicture, HeroDuration, ScrollIndicator } from "./shared";

export function HeroSection() {
  const [desktopTitleLineOne, desktopTitleLineTwo] = heroTexts.desktopTitle.split("\n");

  return (
    <section id="home" className="relative overflow-hidden bg-[#232A31]">
      <BackgroundPicture asset={images.heroBackground} />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto max-w-[1440px] xl:h-[930px]">
        <div className="relative px-6 pb-10 pt-12 md:px-8 md:pb-12 lg:px-10 xl:hidden">
          <div className="max-w-[360px]">
            <h1 className="uppercase text-white">
              <span className="font-display text-[36px] leading-[0.96] sm:text-[46px]">{heroTexts.title}</span>
              <span className="mt-2 block font-script text-[70px] leading-[0.82] normal-case text-[#1F445A] sm:text-[88px]">
                {heroTexts.script}
              </span>
            </h1>
            <p className="mt-5 text-[14px] leading-[1.45] text-white sm:text-base">{heroTexts.subtitle}</p>
          </div>

          <div className="mt-8">
            <img
              src={images.heroFigure.mobile}
              alt={images.heroFigure.alt}
              loading="eager"
              className="h-[420px] w-full object-cover object-top sm:h-[520px]"
            />
          </div>

          <div className="mt-8 flex items-end justify-between gap-6">
            <ScrollIndicator />
            <div className="flex max-w-[120px] flex-col items-end text-right text-white">
              <HeroDuration desktop />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 text-white">
            <p className="max-w-[680px] text-[14px] uppercase leading-[1.45] sm:text-base">{heroTexts.description}</p>
            <p className="max-w-[247px] whitespace-pre-line text-[14px] uppercase leading-[1.45] sm:text-base">
              {heroTexts.availability}
            </p>
          </div>
        </div>

        <div className="relative hidden h-[930px] px-[30px] py-[86px] xl:block">
          <div className="absolute left-[444px] top-0 h-[929px] w-[745px] overflow-hidden">
            <img
              src={images.heroFigure.desktop}
              alt={images.heroFigure.alt}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative z-10 flex h-full flex-col gap-[138px]">
            <div className="flex flex-col items-start">
              <div className="relative h-[234px] w-[970px]">
                <p className="font-display text-[64px] uppercase leading-[1] text-white">
                  {desktopTitleLineOne}
                </p>

                <div className="relative mt-[42px] h-[112px]">
                  <p className="absolute left-0 top-0 font-display text-[64px] uppercase leading-[1] text-white">
                    {desktopTitleLineTwo}
                  </p>
                  <p className="absolute left-[574px] top-[-44px] font-script text-[126px] leading-none text-[#1F445A]">
                    {heroTexts.script}
                  </p>
                </div>
              </div>

              <p className="mt-[2px] text-[16px] leading-[1.45] text-white">{heroTexts.subtitle}</p>
            </div>

            <div className="flex items-center justify-between">
              <ScrollIndicator />
              <div className="flex w-[112px] flex-col items-end gap-[14px] text-right text-white">
                <HeroDuration desktop />
              </div>
            </div>

            <div className="mt-auto flex items-end justify-between">
              <p className="w-[598px] whitespace-pre-line text-[18px] uppercase leading-[1.45] text-white">
                {heroTexts.desktopDescription}
              </p>

              <p className="w-[247px] whitespace-pre-line text-right text-[18px] uppercase leading-[1.45] text-white">
                {heroTexts.availability}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
