import { useState } from "react";
import { navigation } from "./data";

export function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ctaLabel = "Записатись";
  const openMenuLabel = "Відкрити меню";
  const closeMenuLabel = "Закрити меню";

  return (
    <header className="relative z-40 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-[30px] py-5">
        <a href="#home" className="font-logo text-[24px] leading-[1.45] uppercase text-[#1F445A] transition-opacity hover:opacity-75">
          lea21
        </a>

        <div className="hidden items-center gap-[30px] lg:flex">
          <a
            href="#contact"
            className="font-['Poppins'] text-[16px] leading-6 text-[#1F445A] underline underline-offset-[3px] transition-opacity hover:opacity-70"
          >
            {ctaLabel}
          </a>

          <nav className="flex items-center gap-[30px]">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-['Poppins'] text-[16px] leading-6 text-[#1F445A] transition-opacity hover:opacity-70"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center bg-[#1F445A] text-white"
            aria-label={mobileMenuOpen ? closeMenuLabel : openMenuLabel}
            onClick={() => setMobileMenuOpen((value) => !value)}
          >
            <span className="relative block h-3 w-[18px]">
              <span className="absolute left-0 top-0 h-[2px] w-full bg-current" />
              <span className="absolute left-0 top-[5px] h-[2px] w-full bg-current" />
              <span className="absolute left-0 top-[10px] h-[2px] w-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[#D5E0E8] bg-white lg:hidden">
          <nav className="mx-auto flex max-w-[360px] flex-col px-6 py-5">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-['Poppins'] border-b border-[#D5E0E8] py-4 text-base text-[#1F445A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-['Poppins'] mt-4 bg-[#8FAFC2] px-5 py-3 text-center text-base text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
