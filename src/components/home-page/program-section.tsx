import { useState } from "react";

import { modules } from "./data";
import { Reveal } from "./shared";

export function ProgramSection() {
  const [openModuleIndex, setOpenModuleIndex] = useState(0);

  return (
    <section id="program" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-[250px] lg:py-[130px]">
        <div className="bg-[linear-gradient(0deg,rgba(143,175,194,0.5)_0%,#FFFFFF_100%)] px-5 py-10 lg:px-[50px] lg:py-[70px]">
          <Reveal>
            <h2 className="text-center font-display text-[28px] uppercase leading-[1.45] text-[#1F445A] sm:text-[40px] lg:text-[63px]">
              Програма проєкту
            </h2>
          </Reveal>

          <div className="mx-auto mt-8 flex w-full max-w-[840px] flex-col gap-6 lg:mt-[70px] lg:gap-[50px]">
            {modules.map((module, index) => {
              const expandable = Boolean(module.description);
              const open = expandable && openModuleIndex === index;

              return (
                <Reveal key={module.title} delay={index * 0.05}>
                  <article className="w-full bg-white">
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left ${
                        open ? "border-b border-[#8FAFC2]" : ""
                      } ${expandable ? "cursor-pointer" : "cursor-default"}`}
                      onClick={() => {
                        if (expandable) {
                          setOpenModuleIndex((current) => (current === index ? -1 : index));
                        }
                      }}
                      aria-expanded={open}
                    >
                      <span className="text-[18px] uppercase leading-[1.45] text-[#1F445A] lg:text-[20px]">
                        {module.title}
                      </span>

                      <span className="relative block h-4 w-4 shrink-0">
                        <span className="absolute left-0 top-[7px] h-[2px] w-4 bg-[#1F445A]" />
                        {!open ? <span className="absolute left-[7px] top-0 h-4 w-[2px] bg-[#1F445A]" /> : null}
                      </span>
                    </button>

                    {open && module.description ? (
                      <div className="px-5 py-[18px]">
                        <div className="max-w-[700px] whitespace-pre-line text-base leading-[1.45] text-[#1F445A]">
                          <p>{module.description}</p>
                          {module.accent ? <p className="mt-6">{module.accent}</p> : null}
                        </div>
                      </div>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
