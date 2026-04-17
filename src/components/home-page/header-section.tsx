'use client'

import { useState } from 'react'

import type { LandingPageContent } from './types'

export function HeaderSection({ header }: { header: LandingPageContent['header'] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { ctaLabel, logoText, navItems } = header;
  const openMenuLabel = "Відкрити меню";
  const closeMenuLabel = "Закрити меню";

  return (
    <header className="relative z-40 bg-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-6 py-6 lg:h-[75px] lg:px-[30px] lg:py-0">
        <a
          href="#home"
          aria-label={logoText}
          className="justify-self-start text-[#1F445A] transition-opacity hover:opacity-75"
        >
          <img src="/logo.svg" alt={logoText} className="h-[28px] w-auto lg:h-[34px]" />
        </a>

        <nav className="font-nav hidden translate-y-px items-center gap-[30px] justify-self-center text-[16px] font-normal leading-6 tracking-[0.7px] text-[#1F445A] lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-opacity hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="font-nav relative hidden translate-y-px justify-self-end pb-[5px] text-[16px] font-normal leading-6 tracking-[0.7px] text-[#1F445A] transition-opacity hover:opacity-70 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current lg:block"
        >
          {ctaLabel}
        </a>

        <div className="col-start-3 flex justify-self-end lg:hidden">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center bg-[#1F445A] text-white lg:h-9 lg:w-9"
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
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-nav border-b border-[#D5E0E8] py-4 text-base text-[#1F445A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-nav mt-4 bg-[#8FAFC2] px-5 py-3 text-center text-base text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
