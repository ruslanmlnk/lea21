import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { heroEase, heroTexts } from "./data";
import type { Benefit, ModuleItem, ResponsiveAsset, ResultItem, ReviewItem, VideoReviewItem } from "./types";

export function ResponsivePicture({
  asset,
  className,
  imgClassName,
  eager = false,
}: {
  asset: ResponsiveAsset;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  return (
    <picture className={className}>
      <source media="(min-width: 1024px)" srcSet={asset.desktop} />
      <img
        className={imgClassName}
        src={asset.mobile}
        alt={asset.alt}
        loading={eager ? "eager" : "lazy"}
      />
    </picture>
  );
}

export function BackgroundPicture({ asset }: { asset: ResponsiveAsset }) {
  return (
    <div className="absolute inset-0">
      <ResponsivePicture asset={asset} eager imgClassName="h-full w-full object-cover" />
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  script,
  centered = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow ? (
        <p className={`mb-4 text-sm uppercase tracking-[0.18em] ${light ? "text-white/75" : "text-[#8FAFC2]"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`uppercase leading-[1.05] ${light ? "text-white" : "text-[#1F445A]"}`}>
        <span className="font-display text-[24px] sm:text-[32px] lg:text-[64px]">{title}</span>
        {script ? (
          <span className="mt-1 block font-script text-[36px] leading-[1.05] normal-case sm:ml-2 sm:mt-0 sm:inline sm:text-[48px] lg:text-[64px]">
            {script}
          </span>
        ) : null}
      </h2>
    </div>
  );
}

export function SvgIcon({ icon }: { icon: string }) {
  return (
    <div
      className="h-12 w-12 lg:h-[60px] lg:w-[60px]"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
}

export function ReviewArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "ĐźĐľĐżĐµŃ€ĐµĐ´Đ˝Ń–Đą ŃĐ»Đ°ĐąĐ´" : "ĐťĐ°ŃŃ‚ŃĐżĐ˝Đ¸Đą ŃĐ»Đ°ĐąĐ´"}
      className="flex h-10 w-10 items-center justify-center text-[#1F445A] transition-opacity duration-300 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F445A]/20"
    >
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={direction === "right" ? "scale-x-[-1]" : ""}
      >
        <path
          d="M23.8339 14H5.16724M5.16724 14L9.50059 10M5.16724 14L9.50059 18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function ScrollIndicator({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const scrollText = "\u0433\u043e\u0440\u0442\u0430\u0439 \u0434\u0430\u043b\u0456 \u2022 ".repeat(7);
  void reduceMotion;

  return (
    <div className="relative h-[140px] w-[120px]">
      <svg viewBox="0 0 120 140" className="h-full w-full" aria-hidden="true">
        <defs>
          <path id="scroll-indicator-circle" d="M60 75 m0 -43 a43 43 0 1 1 0 86 a43 43 0 1 1 0 -86" />
        </defs>
        <circle cx="60" cy="75" r="55" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.75" />
        <text
          fill="rgba(255,255,255,0.95)"
          fontSize="8.5"
          letterSpacing="1.18"
          fontFamily="Google Sans, Product Sans, Poppins, Arial, sans-serif"
          fontWeight="500"
        >
          <textPath href="#scroll-indicator-circle" startOffset="0%">
            {scrollText}
          </textPath>
        </text>
        <circle cx="60" cy="20" r="1.8" fill="rgba(255,255,255,0.95)" />
        <path d="M60 0V79" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M46.8 65.6L60 84.8L73.2 65.6"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function HeroDuration({ desktop = false }: { desktop?: boolean }) {
  return (
    <div className={`flex flex-col text-white ${desktop ? "items-end gap-[14px] text-right" : "items-start"}`}>
      <span
        className={
          desktop
            ? "text-[56px] leading-[1.25] xl:text-[64px]"
            : "text-[48px] leading-[1.25] sm:text-[56px] md:text-[64px]"
        }
      >
        {heroTexts.durationValue}
      </span>
      <span
        className={
          desktop
            ? "max-w-[112px] text-[16px] uppercase leading-[1.45] xl:text-[18px]"
            : "text-base uppercase leading-[1.45] sm:text-[17px]"
        }
      >
        {heroTexts.durationLabel}
      </span>
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  x: _x = 0,
  y: _y = 24,
  amount = 0.18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  amount?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  void _x;
  void _y;

  return (
    <motion.div
      initial={false}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={shouldReduceMotion ? undefined : { duration: 0.82, delay, ease: heroEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0.04,
  amount = 0.16,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount }}
      variants={
        shouldReduceMotion
          ? undefined
          : {
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: stagger,
                  delayChildren,
                },
              },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  x = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  x?: number;
  y?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={
        shouldReduceMotion
          ? undefined
          : {
              hidden: { opacity: 0, x, y },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                  duration: 0.78,
                  ease: heroEase,
                },
              },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BenefitCard({ item }: { item: Benefit }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-4 py-8 text-center lg:gap-[30px] lg:px-6 lg:py-0">
      <SvgIcon icon={item.icon} />
      <p className="max-w-[190px] text-base leading-[1.45] text-[#1F445A]">{item.title}</p>
    </div>
  );
}

export function ResultCard({ item }: { item: ResultItem }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg uppercase leading-[1.45] text-white lg:text-[20px]">{item.title}</h3>
      <p className="text-base leading-[1.45] text-white/95">{item.description}</p>
    </div>
  );
}

export function ProcessCard({
  title,
  description,
  raised = false,
}: {
  title: string;
  description: string;
  raised?: boolean;
}) {
  return (
    <article className={`bg-white px-8 py-8 text-center shadow-[0_18px_50px_rgba(31,68,90,0.08)] ${raised ? "lg:translate-y-10" : ""}`}>
      <h3 className="text-2xl uppercase leading-[1.45] text-[#1F445A]">{title}</h3>
      <p className="mx-auto mt-5 max-w-[268px] text-base leading-[1.45] text-[#1F445A]">{description}</p>
    </article>
  );
}

export function ModuleRow({
  module,
  index,
  open,
  onToggle,
}: {
  module: ModuleItem;
  index: number;
  open: boolean;
  onToggle: (index: number) => void;
}) {
  const expandable = Boolean(module.description);

  return (
    <div className="border-b border-[#8FAFC2] bg-white">
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left lg:px-5 lg:py-[18px] ${expandable ? "cursor-pointer" : "cursor-default"}`}
        onClick={() => {
          if (expandable) {
            onToggle(index);
          }
        }}
        aria-expanded={open}
      >
        <span className="text-sm uppercase leading-[1.45] text-[#1F445A] lg:text-[20px]">{module.title}</span>
        <span className="relative block h-3 w-3 shrink-0 lg:h-4 lg:w-4">
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#1F445A]" />
          {!open ? <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#1F445A]" /> : null}
        </span>
      </button>

      {open && module.description ? (
        <div className="space-y-5 px-4 pb-5 pt-1 lg:px-5 lg:pb-[18px]">
          <p className="whitespace-pre-line text-base leading-[1.45] text-[#1F445A]">{module.description}</p>
          {module.accent ? <p className="whitespace-pre-line text-base leading-[1.45] text-[#1F445A]">{module.accent}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

export function CertificateCard({ asset }: { asset: ResponsiveAsset }) {
  return (
    <div className="flex shrink-0 items-center justify-center bg-[#8FAFC2] p-5 lg:p-8">
      <ResponsivePicture asset={asset} imgClassName="h-[140px] w-[100px] border border-[#D5E0E8] object-cover lg:h-[210px] lg:w-[150px]" />
    </div>
  );
}

export function SocialBadge({ avatar, name }: { avatar: string; name: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-4 border-r border-[#D5E0E8] pr-6">
        <img src={avatar} alt={name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
        <span className="text-base uppercase leading-[1.45] text-[#8FAFC2]">{name}</span>
      </div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M16.9985 2.00098H6.99854C4.23711 2.00098 1.99854 4.23955 1.99854 7.00098V17.001C1.99854 19.7624 4.23711 22.001 6.99854 22.001H16.9985C19.76 22.001 21.9985 19.7624 21.9985 17.001V7.00098C21.9985 4.23955 19.76 2.00098 16.9985 2.00098Z"
          stroke="#8FAFC2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.0007 11.3703C16.1241 12.2025 15.9819 13.0525 15.5944 13.7993C15.2069 14.5461 14.5938 15.1517 13.8423 15.53C13.0908 15.9082 12.2391 16.0399 11.4085 15.9062C10.5778 15.7726 9.81044 15.3804 9.21552 14.7855C8.6206 14.1905 8.22842 13.4232 8.09475 12.5925C7.96109 11.7619 8.09275 10.9102 8.47101 10.1587C8.84927 9.40716 9.45487 8.79404 10.2017 8.40654C10.9485 8.01904 11.7984 7.87689 12.6307 8.0003C13.4796 8.12619 14.2655 8.52176 14.8724 9.12861C15.4792 9.73545 15.8748 10.5214 16.0007 11.3703Z"
          stroke="#8FAFC2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M17.502 6.50098H17.5124" stroke="#8FAFC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function VideoReviewCard({ item }: { item: VideoReviewItem }) {
  return (
    <article className="relative h-[347px] w-[312px] shrink-0 bg-white lg:w-[433px]">
      <img
        src={item.image}
        alt="Đ’Ń–Đ´ĐµĐľ Đ˛Ń–Đ´ĐłŃĐş"
        className="absolute left-5 top-0 h-[190px] w-[272px] object-cover lg:left-10 lg:h-[222px] lg:w-[353px]"
        loading="lazy"
      />
      <div className="absolute left-0 top-[185px] flex h-[162px] w-full items-end justify-center bg-white px-6 pb-8 pt-[76px] lg:px-[38px] lg:pb-[38px]">
        <SocialBadge avatar={item.avatar} name={item.name} />
      </div>
    </article>
  );
}

export function TextReviewCard({ item }: { item: ReviewItem }) {
  return (
    <article className="flex h-[347px] w-[312px] shrink-0 flex-col justify-between bg-white px-6 py-8 text-center lg:w-[433px] lg:px-[38px] lg:py-[38px]">
      <p className="text-sm leading-[1.45] text-[#1F445A]">{item.text}</p>
      <div className="mx-auto mt-6">
        <SocialBadge avatar={item.avatar} name={item.name} />
      </div>
    </article>
  );
}

export function FooterLinkGroup({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`flex flex-col gap-4 lg:flex-row lg:gap-10 ${className ?? ""}`}>{children}</div>;
}
