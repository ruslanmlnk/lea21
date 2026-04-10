import { useRef } from "react";

import { Reveal, ReviewArrowButton, TextReviewCard, VideoReviewCard } from "./shared";

const videoReviews = [
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b8731d7a33a4d849f18f70692262d8f0fd76ef36?width=707",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b8731d7a33a4d849f18f70692262d8f0fd76ef36?width=707",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
  {
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b8731d7a33a4d849f18f70692262d8f0fd76ef36?width=707",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/d3af01aff7ed2e177972508de07647e68e3bea2c?width=96",
    name: "Олена Мельник",
  },
];

const textReviews = [
  {
    text: "Я одразу відчула довіру до тебе… я так втомилась «ламати себе і збирати заново». Я вже пробувала різні способи: таблетки, марафони, контроль — але це не давало результату і дуже дратувало. А тут я вперше зрозуміла, що можу справлятись зі своїм станом сама. Зрозуміла, що більшість проблем не зовні, а всередині, які я тримала дуже довго…",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/d3af01aff7ed2e177972508de07647e68e3bea2c?width=96",
    name: "Олена Мельник",
  },
  {
    text: "Інформація подається легко, але дуже точно. З точки зору тіла, психіки і стану. Мені як психологу це дуже важливо... Практики прості, але глибокі. І є відчуття, що ти не одна — завжди є підтримка.",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/d3af01aff7ed2e177972508de07647e68e3bea2c?width=96",
    name: "Олена Мельник",
  },
  {
    text: "Я прийшла в цей проєкт у стані, коли зовні ніби все ок, але всередині — постійна напруга, тривога і втома. І найгірше — ти вже звикаєш так жити… Завдяки проєкту я навчилась жити по-іншому. Я кайфую від свого стану і від себе.",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
  {
    text: "Після «Дотику» почала якось з любов’ю ставитись до себе... Знизила рівень самокритики і постійного внутрішнього тиску. З’явилось відчуття безпеки в тілі. Стало менше тривоги, більше спокою. Навчилась обирати себе, а не жити через страх і очікування інших. З’явилась жіночність, м’якість і легкість у стані. Стала більш відкритою і впевненою в собі.",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
  {
    text: "Я вийшла з постійної тривоги і гіперконтролю та відчула спокій у тілі. Тіло перестало бути в напрузі, з’явились енергія і легкість, я позбулась зайвої ваги без жорсткого контролю. Повернулось бажання жити, з’явились впевненість у собі та довіра до життя, зникла дратівливість. Я перестала жити в режимі «виживання» і почала реально жити. Проєкт «Дотик» змінив моє життя.",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
  {
    text: "Я вийшла з хронічного стресу і постійної тривоги, дозволила собі відпочивати без почуття провини та зрозуміла, що це необхідність. Почала працювати через задоволення, з’явилась радість від життя. Навчилась відчувати себе і обирати себе, а не жити через страх і контроль. Зменшилась внутрішня напруга, з’явились м’якість, спокій і більше енергії. Почала дозволяти собі жити.",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
];

export function ReviewsSection() {
  const reviewsRef = useRef<HTMLDivElement | null>(null);

  const scrollReviews = (direction: "left" | "right") => {
    const reviews = reviewsRef.current;

    if (!reviews) {
      return;
    }

    const distance = window.innerWidth >= 1024 ? 473 : 336;
    const offset = direction === "left" ? -distance : distance;
    reviews.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="bg-[linear-gradient(0deg,rgba(143,175,194,0.5)_0%,#FFFFFF_100%)]">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-0 lg:px-[30px] lg:pb-[130px]">
        <div className="flex flex-col gap-8 lg:gap-[70px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <div className="text-[#1F445A]">
                <h2>
                  <span className="block font-display text-[36px] uppercase leading-[1.08] sm:text-[48px] lg:text-[64px]">
                    Те, що відбувається
                  </span>
                  <span className="block font-script text-[36px] leading-[1.08] sm:text-[48px] lg:text-[64px]">
                    після проєкту
                  </span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.08} x={20} className="flex w-[140px] items-center justify-between">
              <ReviewArrowButton direction="left" onClick={() => scrollReviews("left")} />
              <ReviewArrowButton direction="right" onClick={() => scrollReviews("right")} />
            </Reveal>
          </div>

          <div ref={reviewsRef} className="flex items-center gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory lg:gap-10">
            {videoReviews.map((item, index) => (
              <Reveal key={`video-${index}`} className="snap-start shrink-0" y={24} delay={index * 0.04}>
                <VideoReviewCard item={item} />
              </Reveal>
            ))}
            {textReviews.map((item, index) => (
              <Reveal key={`text-${index}`} className="snap-start shrink-0" y={24} delay={0.12 + index * 0.04}>
                <TextReviewCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
