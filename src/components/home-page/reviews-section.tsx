'use client'

import { useRef } from 'react'

import { TextReviewCard } from './shared'
import { Reveal, ReviewArrowButton, VideoReviewCard } from './shared-client'

import type { LandingPageContent } from './types'

export function ReviewsSection({ reviews }: { reviews: LandingPageContent['reviews'] }) {
  const reviewsRef = useRef<HTMLDivElement | null>(null);

  const scrollReviews = (direction: "left" | "right") => {
    const reviewsNode = reviewsRef.current;

    if (!reviewsNode) {
      return;
    }

    const firstReview = reviewsNode.firstElementChild;
    const gap = Number.parseFloat(window.getComputedStyle(reviewsNode).gap || '0');
    const distance =
      firstReview instanceof HTMLElement
        ? firstReview.getBoundingClientRect().width + gap
        : window.innerWidth >= 1024
          ? 473
          : 336;
    const offset = direction === "left" ? -distance : distance;
    reviewsNode.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="bg-[linear-gradient(0deg,rgba(143,175,194,0.5)_0%,#FFFFFF_100%)]">
      <div className="mx-auto max-w-[1440px] px-6 py-9 lg:px-[30px] lg:pb-[130px] lg:pt-0">
        <div className="flex flex-col gap-6 lg:gap-[70px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <div className="text-[#1F445A]">
                <h2>
                  <span className="block font-display text-[24px] uppercase leading-[1.45] lg:text-[64px] lg:leading-[1.08]">
                    {reviews.title}
                  </span>
                  <span className="block font-script text-[36px] leading-[1.08] sm:text-[48px] lg:text-[64px]">
                    {reviews.scriptTitle}
                  </span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.08} x={20} className="hidden w-[140px] items-center justify-between lg:flex">
              <ReviewArrowButton direction="left" onClick={() => scrollReviews("left")} />
              <ReviewArrowButton direction="right" onClick={() => scrollReviews("right")} />
            </Reveal>
          </div>

          <div
            ref={reviewsRef}
            className="no-scrollbar -my-4 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overflow-y-hidden py-4 lg:-my-[80px] lg:gap-10 lg:py-[80px]"
          >
            {reviews.items.map((item, index) => (
              <Reveal
                key={`${item.blockType}-${index}`}
                className="flex w-[336px] max-w-[calc(100vw-3rem)] shrink-0 snap-start items-stretch lg:w-auto lg:max-w-none lg:self-stretch"
                y={24}
                delay={index * 0.04}
              >
                {item.blockType === 'videoReview' ? <VideoReviewCard item={item} /> : <TextReviewCard item={item} />}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
