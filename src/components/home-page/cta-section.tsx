import { images } from "./data";
import { BackgroundPicture, Reveal } from "./shared";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden">
            <BackgroundPicture asset={images.ctaBackground} />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.15)_0%,rgba(16,36,63,0.6)_100%)]" />
    
            <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-6 py-9 text-center lg:gap-8 lg:px-[230px] lg:py-[130px]">
              <Reveal>
                <h2 className="max-w-[820px] font-display text-[24px] uppercase leading-[1.45] text-white lg:text-[44px]">Готова почати зміни вже зараз?</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="max-w-[650px] text-base leading-[1.45] text-[#C3C7C8]">
                  Залиш заявку, і ми підберемо для тебе формат роботи, який найкраще відповідає твоєму стану та запиту
                </p>
              </Reveal>
              <Reveal delay={0.14} y={18}>
                <a href="#contact" className="inline-flex w-full items-center justify-center bg-[#8FAFC2] px-5 py-[13px] text-base text-white sm:w-auto sm:min-w-[160px]">
                  Записатись
                </a>
              </Reveal>
            </div>
          </section>
  );
}
