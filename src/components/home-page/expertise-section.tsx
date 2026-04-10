import { images } from "./data";
import { Reveal, ResponsivePicture } from "./shared";

const stats = [
  {
    title: "СОТНІ КОНСУЛЬТАЦІЙ",
    description: "глибока робота з жінками та успішні кейси",
    align: "end",
  },
  {
    title: "ПСИХОСОМАТИКА",
    description: "і тілесно-орієнтована терапія",
    align: "start",
  },
  {
    title: "ЖІНОЧЕ ЗДОРОВ’Я",
    description: "та практична психологія",
    align: "end",
  },
  {
    title: "ВЛАСНИЙ ШЛЯХ",
    description: "досвід через апатію, виснаження і відновлення",
    align: "start",
  },
] as const;

export function ExpertiseSection() {
  return (
    <section className="bg-[linear-gradient(0deg,rgba(143,175,194,0.5)_0%,#FFFFFF_100%)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 pb-10 pt-0 lg:gap-[70px] lg:px-[30px] lg:pb-[130px]">
        <div className="flex flex-col gap-10 lg:gap-[50px]">
          <div className="flex flex-col gap-10 lg:gap-[70px]">
            <Reveal>
              <div className="w-full lg:max-w-[643px]">
                <h2 className="text-[#1F445A]">
                  <span className="font-display text-[34px] uppercase leading-[1.08] sm:text-[46px] lg:block lg:text-[64px] lg:leading-none">
                    мій досвід і підхід
                  </span>
                  <span className="font-script text-[34px] leading-[1.08] sm:text-[46px] lg:block lg:text-[64px] lg:leading-none">
                    у роботі з жінками
                  </span>
                </h2>
              </div>
            </Reveal>

            <div className="flex flex-col gap-6 lg:gap-[50px]">
              <Reveal className="lg:ml-auto lg:max-w-[491px]" x={30}>
                <p className="text-base leading-[1.45] text-[#1F445A]">
                  Мене звати Лєна, я тілесний терапевт, жіночий ментор і автор методу «Дотик». За моїми плечима — сотні
                  консультацій, глибока робота з жінками та сотні успішних кейсів.
                </p>
              </Reveal>

              <Reveal className="lg:max-w-[598px]" delay={0.08}>
                <p className="text-base uppercase leading-[1.45] text-[#1F445A] lg:text-[18px]">
                  Я маю підтверджені знання у сфері психосоматики, тілесно-орієнтованої терапії, жіночого здоров’я та
                  практичної психології. Але найцінніше — це мій власний шлях.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[750px_531px] lg:items-center lg:justify-between">
            <Reveal>
              <ResponsivePicture
                asset={images.aboutImage}
                imgClassName="h-[412px] w-full object-cover lg:h-[562px] lg:w-[750px]"
              />
            </Reveal>

            <div className="flex flex-col gap-8 lg:w-[531px] lg:gap-[50px]">
              {stats.map((item, index) => (
                <Reveal key={item.title} delay={0.08 + index * 0.05}>
                  <div
                    className={`flex flex-col gap-[10px] ${
                      item.align === "end" ? "items-end text-right" : "items-start text-left"
                    }`}
                  >
                    <h3 className="text-[30px] uppercase leading-[1.45] text-[#1F445A] sm:text-[38px] lg:text-[48px]">
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
  );
}
