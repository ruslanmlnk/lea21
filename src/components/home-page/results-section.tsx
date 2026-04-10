import { images } from "./data";
import { BackgroundPicture, Reveal, ResponsivePicture } from "./shared";

const results = [
  {
    title: "Більше енергії",
    description: "З’являється ресурс\nі бажання жити",
  },
  {
    title: "Внутрішній спокій",
    description: "Зникає тривога, з’являється\nвідчуття “мені добре”",
  },
  {
    title: "Легкість у тілі",
    description: "Менше напруги, болю\nі дискомфорту",
  },
  {
    title: "Менше контролю",
    description: "Ти вмієш розслаблятися\nі відпускати",
  },
  {
    title: "Контакт із тілом",
    description: "Ти відчуваєш себе\nі свої потреби",
  },
  {
    title: "Жіночність і прояв",
    description: "З’являється м’якість\nі природний прояв",
  },
];

const resultRows = [results.slice(0, 2), results.slice(2, 4), results.slice(4, 6)];

export function ResultsSection() {
  return (
    <section id="results" className="relative overflow-hidden">
      <BackgroundPicture asset={images.resultsBackground} />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,36,63,0.6)_50%,rgba(255,255,255,0.6)_100%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-10 text-white lg:px-[30px] lg:py-[130px]">
        <Reveal>
          <h2 className="font-display text-[24px] uppercase leading-[1.45] text-white lg:text-[64px]">
            Що зміниться після проєкту
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-col gap-8 lg:mt-[70px] lg:flex-row lg:items-start lg:gap-[100px]">
          <Reveal delay={0.08} className="shrink-0">
            <ResponsivePicture asset={images.resultsImage} imgClassName="h-[412px] w-full object-cover lg:h-[510px] lg:w-[640px]" />
          </Reveal>

          <div className="flex flex-col gap-8 lg:h-[510px] lg:w-[597px] lg:justify-between lg:gap-0">
            <Reveal x={28}>
              <p className="max-w-[597px] text-base uppercase leading-[1.45] text-white lg:text-[27px]">
                Результат, який ти відчуєш на рівні тіла, стану і життя
              </p>
            </Reveal>

            <div className="flex flex-col gap-6 lg:gap-8">
              {resultRows.map((row, rowIndex) => (
                <Reveal key={rowIndex} delay={0.12 + rowIndex * 0.05}>
                  <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-[83px] lg:gap-y-0">
                    {row.map((item) => (
                      <article key={item.title} className="flex w-full flex-col gap-[10px] lg:w-[257px]">
                        <div className="flex items-center gap-[10px]">
                          <span className="mt-px h-2 w-2 shrink-0 rounded-full bg-[#8FAFC2]" />
                          <h3 className="text-lg uppercase leading-[1.45] text-white lg:max-w-[217px] lg:text-[20px]">
                            {item.title}
                          </h3>
                        </div>
                        <p className="whitespace-pre-line pl-[18px] text-base leading-[1.45] text-white">
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
  );
}
