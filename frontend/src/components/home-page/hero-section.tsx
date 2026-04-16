import { BackgroundPicture, HeroDuration, ScrollIndicator } from './shared'
import { SmoothImage } from './smooth-image'

import type { LandingPageContent } from './types'

export function HeroSection({ hero }: { hero: LandingPageContent['hero'] }) {
  const mobileTitle = `${hero.titleLineOne} ${hero.titleLineTwo}`.toLocaleUpperCase("uk-UA");

  return (
    <section id="home" className="relative overflow-hidden bg-[#232A31]">
      <BackgroundPicture asset={hero.backgroundImage} eager reveal="none" />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto max-w-[1440px] lg:h-[clamp(680px,64.6vw,930px)] min-[1440px]:h-[930px]">
        <div className="relative flex flex-col gap-6 px-6 py-9 md:px-8 lg:hidden">
          <div className="flex max-w-[360px] flex-col gap-4">
            <h1 className="hero-rise hero-delay-1 max-w-[312px] uppercase leading-[1.1] text-white">
              <span className="font-display text-[24px] leading-[1.45]">
                {mobileTitle}{" "}
              </span>
              <span className="font-script text-[42px] leading-[1.1] normal-case">
                {hero.script}
              </span>
            </h1>
            <p className="hero-rise hero-delay-2 text-base leading-[1.45] text-white">{hero.subtitle}</p>
            <p className="hero-rise hero-delay-3 text-base uppercase leading-[1.45] text-white">{hero.description}</p>
          </div>

          <div className="hero-rise hero-delay-4 flex items-start text-white">
            <HeroDuration value={hero.durationValue} label={hero.durationLabel} />
          </div>

          <p className="hero-rise hero-delay-5 max-w-[247px] whitespace-pre-line text-base uppercase leading-[1.45] text-white">
            {hero.availability}
          </p>
        </div>

        <div className="relative hidden h-full px-[30px] pb-[clamp(72px,6.95vw,100px)] pt-[clamp(48px,4.72vw,68px)] lg:block min-[1440px]:pb-[100px] min-[1440px]:pt-[68px]">
          <div className="relative z-10 flex h-full flex-col gap-[clamp(76px,9.58vw,138px)] min-[1440px]:gap-[138px]">
            <div className="flex flex-col items-start">
              <div className="relative w-[min(970px,72vw)] min-[1440px]:w-[970px]">
                <h1 className="hero-rise hero-delay-1 font-script text-[clamp(82px,8.75vw,126px)] uppercase leading-[clamp(82px,8.68vw,125px)] text-[#1F445A] min-[1440px]:text-[126px] min-[1440px]:leading-[125px]">
                  <span className="font-display text-[clamp(42px,4.45vw,64px)] text-white min-[1440px]:text-[64px]">
                    {hero.titleLineOne}
                    <br />
                    {hero.titleLineTwo}{" "}
                  </span>
                  <span className="normal-case">{hero.script}</span>
                </h1>
              </div>

              <p className="hero-rise hero-delay-3 mt-[2px] text-[16px] leading-[1.45] text-white">{hero.subtitle}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="hero-rise hero-delay-4">
                <ScrollIndicator />
              </div>
              <div className="hero-rise hero-delay-5 flex w-[112px] flex-col items-end gap-[14px] text-right text-white">
                <HeroDuration desktop value={hero.durationValue} label={hero.durationLabel} />
              </div>
            </div>

            <div className="mt-auto flex items-end justify-between">
              <p className="hero-rise hero-delay-6 w-[598px] whitespace-pre-line text-[18px] uppercase leading-[1.45] text-white">
                {hero.desktopDescription}
              </p>

              <p className="hero-rise hero-delay-7 w-[247px] whitespace-pre-line text-right text-[18px] uppercase leading-[1.45] text-white">
                {hero.availability}
              </p>
            </div>
          </div>
        </div>

        <SmoothImage
          src={hero.figureImage.url}
          alt={hero.figureImage.alt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          draggable={false}
          reveal="none"
          className="hero-image-in h-[412px] w-full object-cover object-top lg:absolute lg:left-[clamp(318px,30.8vw,444px)] lg:top-0 lg:h-[clamp(680px,64.5vw,929px)] lg:w-[clamp(530px,51.7vw,745px)] lg:object-cover min-[1440px]:left-[444px] min-[1440px]:h-[929px] min-[1440px]:w-[745px]"
        />
      </div>
    </section>
  )
}
