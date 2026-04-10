import { FooterLinkGroup, Reveal, StaggerItem, StaggerReveal } from "./shared";

export function FooterSection() {
  return (
    <footer className="bg-white">
            <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-[30px] lg:py-[70px]">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                <Reveal className="justify-self-start" x={-20}>
                  <FooterLinkGroup className="lg:w-[314px] lg:justify-between lg:gap-0">
                  <a href="#for-who" className="text-base leading-6 text-[#1F445A]">Для кого</a>
                  <a href="#results" className="text-base leading-6 text-[#1F445A]">Результат</a>
                  </FooterLinkGroup>
                </Reveal>
    
                <Reveal delay={0.08} className="flex flex-col items-center gap-4 lg:gap-6">
                  <a href="#" className="font-logo text-5xl uppercase leading-none text-[#1F445A] lg:text-[68px]">lea21</a>
                  <div className="flex items-center gap-6 text-base font-medium uppercase text-[#8FAFC2]">
                    <a href="https://t.me/username" target="_blank" rel="noreferrer">TG</a>
                    <a href="https://instagram.com/username" target="_blank" rel="noreferrer">IN</a>
                  </div>
                </Reveal>
    
                <Reveal className="justify-self-start lg:justify-self-end" x={20}>
                  <FooterLinkGroup className="lg:w-[313px] lg:justify-between lg:gap-0">
                  <a href="#program" className="text-base leading-6 text-[#1F445A]">Програма</a>
                  <a href="#about" className="text-base leading-6 text-[#1F445A]">Про мене</a>
                  </FooterLinkGroup>
                </Reveal>
              </div>
    
              <div className="mt-8 border-t border-[#1F445A33] pt-8 lg:mt-[60px] lg:pt-[30px]">
                <StaggerReveal className="grid gap-6 text-center lg:grid-cols-3 lg:items-start lg:gap-[150px]" stagger={0.12}>
                  <StaggerItem className="space-y-3">
                    <p className="text-base uppercase leading-[1.45] text-[#1F445A]">Контакт для зв’язку</p>
                    <a href="https://t.me/username" target="_blank" rel="noreferrer" className="text-base font-medium leading-[1.45] text-[#8FAFC2]">
                      Telegram: @username
                    </a>
                  </StaggerItem>
    
                  <StaggerItem className="space-y-3 border-y border-[#8FAFC280] py-6 lg:border-x lg:border-y-0 lg:py-0">
                    <p className="text-base uppercase leading-[1.45] text-[#1F445A]">Написати мені</p>
                    <a href="https://instagram.com/username" target="_blank" rel="noreferrer" className="text-base font-medium leading-[1.45] text-[#8FAFC2]">
                      Instagram: @username
                    </a>
                  </StaggerItem>
    
                  <StaggerItem className="space-y-3">
                    <p className="text-base uppercase leading-[1.45] text-[#1F445A]">Соціальні мережі</p>
                    <div className="flex items-center justify-center gap-6 text-base font-medium uppercase text-[#8FAFC2]">
                      <a href="https://t.me/username" target="_blank" rel="noreferrer">TG</a>
                      <a href="https://instagram.com/username" target="_blank" rel="noreferrer">IN</a>
                    </div>
                  </StaggerItem>
                </StaggerReveal>
              </div>
            </div>
          </footer>
  );
}
