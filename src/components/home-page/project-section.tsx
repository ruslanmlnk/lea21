import { images } from "./data";
import { Reveal, ResponsivePicture } from "./shared";

export function ProjectSection() {
  return (
    <section id="project" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-[30px] lg:py-[130px]">
        <div className="flex flex-col gap-10 lg:gap-[70px]">
          <Reveal>
            <h2 className="text-[#1F445A]">
              <span className="font-display block text-[24px] uppercase leading-[1.02] sm:text-[32px] lg:text-[64px] lg:leading-none">
                Проєкт “Дотик” —
              </span>
              <span className="font-script mt-1 block text-[36px] leading-[1] normal-case sm:text-[48px] lg:mt-0 lg:text-[64px] lg:leading-none">
                авторський метод Лєни Романюк
              </span>
            </h2>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[640px_640px] lg:items-center lg:gap-[100px]">
            <Reveal className="order-2 lg:order-1 lg:w-[640px]" x={-28}>
              <div className="flex h-full min-h-0 flex-col gap-8 lg:min-h-[511px] lg:justify-between">
                <div className="flex flex-col gap-6 lg:gap-[38px]">
                  <p className="text-base uppercase leading-[1.45] text-[#1F445A] lg:text-[20px]">
                    Метод поєднує соматичні практики, роботу з нервовою системою та тілесно-орієнтовані підходи
                  </p>

                  <p className="text-base leading-[1.45] text-[#1F445A]">
                    Проєкт “Дотик” заснований на авторському методі Лєни Романюк, який поєднує соматичні практики, роботу з
                    нервовою системою та тілесно-орієнтовані підходи для відновлення фізичного і психоемоційного стану.
                    <br />
                    Метод спрямований на зниження хронічного стресу, відновлення тілесної чутливості та покращення емоційного і
                    фізичного стану, допомагаючи сформувати глибший контакт із собою і власним тілом.
                  </p>
                </div>

                <a
                  href="#program"
                  className="inline-flex w-full items-center justify-center bg-[#8FAFC2] px-5 py-[13px] text-base leading-[1.45] text-white"
                >
                  Дивитись програму
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="order-1 lg:order-2 lg:w-[640px]">
              <ResponsivePicture
                asset={images.projectImage}
                imgClassName="h-[250px] w-full object-cover lg:h-[510.7px]"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
