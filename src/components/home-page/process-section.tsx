import { Reveal } from "./shared";

const processSteps: {
  title: string;
  description: string;
  widthClassName: string;
  raised?: boolean;
}[] = [
  {
    title: "Нервова система",
    description: "Зниження напруги і стресу,\nвідновлення відчуття безпеки\nв тілі",
    widthClassName: "lg:w-[340px]",
  },
  {
    title: "ТІЛО",
    description: "Звільнення від зажимів і блоків,\nповернення чутливості\nтіла",
    widthClassName: "lg:w-[360px]",
    raised: true,
  },
  {
    title: "СТАН",
    description: "Відновлення ресурсу, енергії\nі легкості, глибокий контакт\nіз собою",
    widthClassName: "lg:w-[340px]",
  },
] as const;

export function ProcessSection() {
  return (
    <section
      id="about"
      className="bg-[linear-gradient(0deg,rgba(143,175,194,0.5)_0%,#FFFFFF_100%)]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-6 py-10 lg:gap-[75px] lg:px-[130px] lg:py-[130px]">
        <Reveal className="flex flex-col items-center gap-[6px] text-center lg:gap-[10px]">
          <h2 className="bg-[linear-gradient(180deg,rgba(31,68,90,0.6)_50%,rgba(31,68,90,0)_100%)] bg-clip-text font-display text-[72px] uppercase leading-[1.1] text-transparent sm:text-[96px] lg:text-[144px]">
            Дотик
          </h2>
          <p className="font-script text-[40px] leading-none text-[#1F445A] sm:text-[52px] lg:text-[64px]">
            як працює проєкт
          </p>
        </Reveal>

        <div className="grid w-full gap-6 md:grid-cols-2 lg:flex lg:items-start lg:justify-center lg:gap-[71px]">
          {processSteps.map((item, index) => (
            <Reveal
              key={item.title}
              delay={0.06 + index * 0.05}
              className={`${item.widthClassName} ${item.raised ? "lg:pt-10" : ""}`}
            >
              <article className="bg-white px-7 py-8 sm:px-9 sm:py-9 lg:px-[36px] lg:py-[30px] lg:pb-[40px]">
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
  );
}
