'use client'

import { Children, cloneElement, isValidElement, startTransition, useEffect, useRef, useState, type ReactNode } from 'react'

import { useReducedMotion } from 'motion/react'

import { SocialBadge } from './shared'
import { SmoothImage } from './smooth-image'
import type { ModuleItem, VideoReviewItem } from './types'

export function ReviewArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right'
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Попередній слайд' : 'Наступний слайд'}
      className="flex h-10 w-10 items-center justify-center text-[#1F445A] transition-opacity duration-300 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F445A]/20"
    >
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={direction === 'right' ? 'scale-x-[-1]' : ''}
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
  )
}

function useRevealInView(amount: number, disabled: boolean) {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(disabled)

  useEffect(() => {
    if (disabled) {
      setInView(true)
      return
    }

    const node = targetRef.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: amount,
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [amount, disabled])

  return { inView, targetRef }
}

function getRevealStyle(args: {
  delay: number
  disabled: boolean
  inView: boolean
  x: number
  y: number
}) {
  if (args.disabled) {
    return undefined
  }

  return {
    opacity: args.inView ? 1 : 0,
    transform: args.inView ? 'translate3d(0px, 0px, 0px)' : `translate3d(${args.x}px, ${args.y}px, 0px)`,
    transitionDelay: `${args.delay}s`,
    transitionDuration: '0.92s',
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    willChange: 'opacity, transform',
  } as const
}

export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 56,
  amount = 0.18,
}: {
  children: ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
  amount?: number
}) {
  const shouldReduceMotion = Boolean(useReducedMotion())
  const { inView, targetRef } = useRevealInView(amount, shouldReduceMotion)

  return (
    <div
      ref={targetRef}
      style={getRevealStyle({
        delay,
        disabled: shouldReduceMotion,
        inView,
        x,
        y,
      })}
      className={className}
    >
      {children}
    </div>
  )
}

type StaggerChildProps = {
  __revealDelayChildren?: number
  __revealIndex?: number
  __revealStagger?: number
  __revealVisible?: boolean
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0.04,
  amount = 0.16,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  amount?: number
}) {
  const shouldReduceMotion = Boolean(useReducedMotion())
  const { inView, targetRef } = useRevealInView(amount, shouldReduceMotion)

  return (
    <div ref={targetRef} className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child
        }

        return cloneElement(child, {
          __revealDelayChildren: delayChildren,
          __revealIndex: index,
          __revealStagger: stagger,
          __revealVisible: shouldReduceMotion || inView,
        } as StaggerChildProps)
      })}
    </div>
  )
}

export function StaggerItem({
  children,
  className,
  x = 0,
  y = 56,
  __revealDelayChildren = 0,
  __revealIndex = 0,
  __revealStagger = 0.1,
  __revealVisible = false,
}: {
  children: ReactNode
  className?: string
  x?: number
  y?: number
} & StaggerChildProps) {
  const shouldReduceMotion = Boolean(useReducedMotion())
  const delay = __revealDelayChildren + __revealIndex * __revealStagger

  return (
    <div
      style={getRevealStyle({
        delay,
        disabled: shouldReduceMotion,
        inView: shouldReduceMotion || __revealVisible,
        x,
        y,
      })}
      className={className}
    >
      {children}
    </div>
  )
}

function VideoReviewPlayBadge() {
  return (
    <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white/28 shadow-[0_22px_42px_rgba(31,68,90,0.18)] backdrop-blur-[3px] lg:h-[84px] lg:w-[84px]">
      <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/92 lg:h-[62px] lg:w-[62px]">
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="translate-x-[1px]"
        >
          <path d="M16.5 8.26795C17.8333 9.03775 17.8333 10.9623 16.5 11.7321L3 19.5263C1.66667 20.2961 0 19.3339 0 17.7942L0 2.20577C0 0.666172 1.66667 -0.296076 3 0.473724L16.5 8.26795Z" fill="#8FAFC2" />
        </svg>
      </span>
    </span>
  )
}

export function VideoReviewCard({ item }: { item: VideoReviewItem }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const videoUrl = item.video
  const canPlayVideo = Boolean(videoUrl)

  useEffect(() => {
    if (!isPlaying || !videoRef.current) {
      return
    }

    void videoRef.current.play().catch(() => {})
  }, [isPlaying])

  return (
    <article className="relative h-[292px] w-[312px] shrink-0 lg:h-[347px] lg:w-[433px]">
      <div className="absolute inset-x-0 top-[154px] h-[138px] bg-white shadow-[0_20px_50px_rgba(31,68,90,0.12)] lg:top-[185px] lg:h-[162px]" />

      <div className="absolute inset-x-[18px] top-0 z-10 overflow-hidden shadow-[0_22px_54px_rgba(31,68,90,0.2)] lg:inset-x-[40px]">
        {isPlaying && videoUrl ? (
          <video
            ref={videoRef}
            className="h-[186px] w-full object-cover lg:h-[222px]"
            controls
            playsInline
            poster={item.image}
            preload="metadata"
            autoPlay
          >
            <source src={videoUrl} />
          </video>
        ) : (
          <div className="relative">
            <SmoothImage
              src={item.image}
              alt={`Відеовідгук ${item.name}`}
              className="h-[186px] w-full object-cover lg:h-[222px]"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,68,90,0.12)_0%,rgba(31,68,90,0.02)_42%,rgba(31,68,90,0.32)_100%)]" />

            {canPlayVideo ? (
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center"
                aria-label={`Відтворити відеовідгук ${item.name}`}
                onClick={() => {
                  startTransition(() => {
                    setIsPlaying(true)
                  })
                }}
              >
                <span className="transition-transform duration-300 hover:scale-[1.03]">
                  <VideoReviewPlayBadge />
                </span>
              </button>
            ) : (
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                <VideoReviewPlayBadge />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex h-[138px] items-end justify-center px-4 pb-6 lg:h-[162px] lg:px-[38px] lg:pb-[38px]">
        <SocialBadge avatar={item.avatar} name={item.name} />
      </div>
    </article>
  )
}

export function ModuleRow({
  module,
  index,
  open,
  onToggle,
}: {
  module: ModuleItem
  index: number
  open: boolean
  onToggle: (index: number) => void
}) {
  const expandable = Boolean(module.description)

  return (
    <div className="border-b border-[#8FAFC2] bg-white">
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left lg:px-5 lg:py-[18px] ${expandable ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={() => {
          if (expandable) {
            onToggle(index)
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
        </div>
      ) : null}
    </div>
  )
}
