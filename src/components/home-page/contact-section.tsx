import { type FormEvent } from "react";
import { images } from "./data";
import { Reveal, ResponsivePicture, SectionTitle } from "./shared";

export function ContactSection() {
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <section id="contact" className="bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(143,175,194,0.5)_100%)]">
            <div className="mx-auto max-w-[1440px] px-6 py-9 lg:px-[30px] lg:py-[130px]">
              <div className="space-y-6 lg:space-y-[70px]">
                <Reveal>
                  <SectionTitle eyebrow="Почни зміни вже зараз" title="Зроби перший крок" script="до нового стану" />
                </Reveal>
    
                <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-0">
                  <Reveal>
                    <ResponsivePicture asset={images.contactImage} imgClassName="h-[412px] w-full object-cover lg:h-[765px]" />
                  </Reveal>
    
                  <Reveal
                    x={30}
                    className="bg-[linear-gradient(180deg,rgba(143,175,194,0.5)_0%,#FFFFFF_100%)] p-5 lg:justify-self-end lg:-ml-[90px] lg:w-[min(780px,calc(100%+90px))] lg:-translate-y-[81px] lg:p-[50px]"
                  >
                    <div className="bg-white p-4 lg:p-10">
                      <form className="space-y-4 lg:space-y-[22px]" onSubmit={handleContactSubmit}>
                        <div className="grid gap-4 lg:grid-cols-2 lg:gap-[22px]">
                          <input type="text" placeholder="Ім’я" className="w-full border border-[#8FAFC280] px-4 py-4 text-base text-[#1F445A] outline-none placeholder:text-[#8FAFC2] lg:px-[21px] lg:py-3" />
                          <input type="text" placeholder="Прізвище" className="w-full border border-[#8FAFC280] px-4 py-4 text-base text-[#1F445A] outline-none placeholder:text-[#8FAFC2] lg:px-[21px] lg:py-3" />
                        </div>
    
                        <div className="grid gap-4 lg:grid-cols-2 lg:gap-[22px]">
                          <input type="email" placeholder="Email" className="w-full border border-[#8FAFC280] px-4 py-4 text-base text-[#1F445A] outline-none placeholder:text-[#8FAFC2] lg:px-[21px] lg:py-3" />
                          <input type="tel" placeholder="Телефон" className="w-full border border-[#8FAFC280] px-4 py-4 text-base text-[#1F445A] outline-none placeholder:text-[#8FAFC2] lg:px-[21px] lg:py-3" />
                        </div>
    
                        <textarea rows={5} placeholder="Повідомлення" className="min-h-[120px] w-full resize-none border border-[#8FAFC280] px-4 py-4 text-base text-[#1F445A] outline-none placeholder:text-[#8FAFC2] lg:min-h-[212px] lg:px-[21px] lg:py-3" />
                        <button type="submit" className="flex w-full items-center justify-center bg-[#8FAFC2] px-5 py-[13px] text-base text-white">
                          Надіслати
                        </button>
                      </form>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
  );
}
