import type { Benefit, ModuleItem, ResponsiveAsset, ResultItem, ReviewItem, VideoReviewItem } from "./types";

export const navigation = [
  { label: "Для кого", href: "#for-who" },
  { label: "Результат", href: "#results" },
  { label: "Програма", href: "#program" },
  { label: "Про мене", href: "#about" },
];

export const images = {
  heroBackground: {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/218529501d4e51999f841a81128f7a3338715ed5?width=2880",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/e5b7aaab8aabdf7901467cd8159660a2cbc64eb0?width=720",
    alt: "Фонове зображення секції героя",
  },
  heroFigure: {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/7ac9301ea6700c89c3cd6532a704d4223bdac9af?width=1490",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/7d2af9dda695b5ecc3e43013f87a9ee84e710099?width=624",
    alt: "Головне зображення проєкту",
  },
  projectImage: {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/6c8a27c95439c0ed0d47d88b0ce9073e6543e045?width=1280",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/583034bebdc70a6986b558a38d05014b2ef39534?width=624",
    alt: "Зображення для блоку про проєкт",
  },
  resultsBackground: {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/0bb5c97483567bd0f9caf8a94148acef3bd28352?width=2880",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/69d5b97b4741c2fdc456d07151b9ddc5346e1834?width=720",
    alt: "Фонове зображення секції результатів",
  },
  resultsImage: {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/cc903ccc2b5cfbd02fd08da8a3b817f2c8b7ac48?width=1280",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/4c02cfa060ca94fb30322b32bd6110bd02a6d717?width=624",
    alt: "Зображення для блоку результатів",
  },
  aboutImage: {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/8182c92288e9fc4607120691093eb37048c8bd01?width=1500",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/83fa51842eef61fc8f11cd08fae7891173cc8f20?width=624",
    alt: "Фото Лєни Романюк",
  },
  ctaBackground: {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/d752fc62e77cbf0c76ce9de6793aab6ffdd94bdc?width=2880",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/0d701db5ca0bdd20fc785b19965888bafacc9331?width=720",
    alt: "Фонове зображення заклику до дії",
  },
  contactImage: {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/32829c771622b7a062ab18eefd9d27c198665988?width=1380",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/ec12cb60772d61b8dfb365914859993b5c43b7e7?width=624",
    alt: "Зображення для контактної секції",
  },
};

export const benefitIcons = {
  battery:
    '<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 17.5H10C7.23858 17.5 5 19.7386 5 22.5V37.5C5 40.2614 7.23858 42.5 10 42.5H40C42.7614 42.5 45 40.2614 45 37.5V22.5C45 19.7386 42.7614 17.5 40 17.5Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M55 27.5V32.5" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 27.5V32.5" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  heart:
    '<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M47.5 35C51.225 31.35 55 26.975 55 21.25C55 17.6033 53.5513 14.1059 50.9727 11.5273C48.3941 8.94866 44.8967 7.5 41.25 7.5C36.85 7.5 33.75 8.75 30 12.5C26.25 8.75 23.15 7.5 18.75 7.5C15.1033 7.5 11.6059 8.94866 9.02728 11.5273C6.44866 14.1059 5 17.6033 5 21.25C5 27 8.75 31.375 12.5 35L30 52.5L47.5 35Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mind:
    '<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.0001 12.4999C30.003 11.5 29.806 10.5095 29.4205 9.58688C29.0351 8.66422 28.4691 7.82795 27.7557 7.12725C27.0424 6.42654 26.1961 5.87556 25.2667 5.50671C24.3373 5.13785 23.3435 4.95857 22.3438 4.97941C21.3441 5.00025 20.3586 5.22079 19.4454 5.62805C18.5322 6.03531 17.7096 6.62107 17.0261 7.35089C16.3425 8.08071 15.8118 8.93984 15.4652 9.87776C15.1185 10.8157 14.963 11.8134 15.0076 12.8124C13.5381 13.1902 12.1738 13.8975 11.0181 14.8807C9.86246 15.8638 8.94566 17.0971 8.33717 18.487C7.72868 19.8769 7.44446 21.3871 7.50604 22.9032C7.56761 24.4192 7.97336 25.9014 8.69256 27.2374C7.42801 28.2647 6.43363 29.5855 5.79591 31.0847C5.15819 32.584 4.89646 34.2164 5.03347 35.8398C5.17049 37.4633 5.70211 39.0288 6.58208 40.3999C7.46205 41.7711 8.66372 42.9065 10.0826 43.7074C9.90736 45.063 10.0119 46.4401 10.3898 47.7537C10.7676 49.0673 11.4108 50.2895 12.2795 51.3448C13.1482 52.4001 14.2241 53.2661 15.4406 53.8893C16.6571 54.5125 17.9885 54.8797 19.3525 54.9682C20.7165 55.0567 22.0842 54.8647 23.371 54.4039C24.6579 53.9431 25.8366 53.2235 26.8345 52.2893C27.8323 51.3551 28.628 50.2263 29.1725 48.9725C29.7169 47.7188 29.9986 46.3667 30.0001 44.9999V12.4999Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 12.4999C29.9971 11.5 30.1941 10.5095 30.5795 9.58688C30.965 8.66422 31.531 7.82795 32.2444 7.12725C32.9577 6.42654 33.804 5.87556 34.7334 5.50671C35.6628 5.13785 36.6566 4.95857 37.6563 4.97941C38.656 5.00025 39.6415 5.22079 40.5547 5.62805C41.4679 6.03531 42.2905 6.62107 42.974 7.35089C43.6576 8.08071 44.1883 8.93984 44.5349 9.87776C44.8816 10.8157 45.0371 11.8134 44.9925 12.8124C46.462 13.1902 47.8263 13.8975 48.982 14.8807C50.1376 15.8638 51.0544 17.0971 51.6629 18.487C52.2714 19.8769 52.5556 21.3871 52.4941 22.9032C52.4325 24.4192 52.0267 25.9014 51.3075 27.2374C52.5721 28.2647 53.5665 29.5855 54.2042 31.0847C54.8419 32.584 55.1036 34.2164 54.9666 35.8398C54.8296 37.4633 54.298 39.0288 53.418 40.3999C52.538 41.7711 51.3364 42.9065 49.9175 43.7074C50.0927 45.063 49.9882 46.4401 49.6103 47.7537C49.2324 49.0673 48.5893 50.2895 47.7206 51.3448C46.8518 52.4001 45.776 53.2661 44.5595 53.8893C43.343 54.5125 42.0116 54.8797 40.6476 54.9682C39.2836 55.0567 37.9159 54.8647 36.6291 54.4039C35.3422 53.9431 34.1635 53.2235 33.1656 52.2893C32.1678 51.3551 31.3721 50.2263 30.8276 48.9725C30.2832 47.7188 30.0015 46.3667 30 44.9999V12.4999Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M37.5 32.5C35.4011 31.7616 33.5683 30.4175 32.2333 28.6375C30.8983 26.8575 30.1211 24.7217 30 22.5C29.8789 24.7217 29.1017 26.8575 27.7667 28.6375C26.4317 30.4175 24.5989 31.7616 22.5 32.5" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  shield:
    '<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 32.4999C50 44.9999 41.25 51.2499 30.85 54.8749C30.3054 55.0595 29.7138 55.0506 29.175 54.8499C18.75 51.2499 10 44.9999 10 32.4999V14.9999C10 14.3369 10.2634 13.701 10.7322 13.2321C11.2011 12.7633 11.837 12.4999 12.5 12.4999C17.5 12.4999 23.75 9.4999 28.1 5.6999C28.6296 5.2474 29.3034 4.99878 30 4.99878C30.6966 4.99878 31.3704 5.2474 31.9 5.6999C36.275 9.5249 42.5 12.4999 47.5 12.4999C48.163 12.4999 48.7989 12.7633 49.2678 13.2321C49.7366 13.701 50 14.3369 50 14.9999V32.4999Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 20V30" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 40H30.025" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  smile:
    '<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 40C40 40 36.25 35 30 35C23.75 35 20 40 20 40" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M22.5 22.5H22.525" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M37.5 22.5H37.525" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  apple:
    '<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 52.3499C33.75 52.3499 36.875 54.9999 40 54.9999C47.5 54.9999 55 34.9999 55 24.4499C54.9148 21.2118 53.5531 18.1385 51.2116 15.9001C48.8701 13.6616 45.7387 12.4394 42.5 12.4999C36.95 12.4999 32.5 16.0999 30 17.4999C27.5 16.0999 23.05 12.4999 17.5 12.4999C14.2594 12.4328 11.1242 13.6528 8.78133 15.8926C6.4384 18.1325 5.07868 21.2096 5 24.4499C5 34.9999 12.5 54.9999 20 54.9999C23.125 54.9999 26.25 52.3499 30 52.3499Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 5C27.5 6.25 30 10 30 17.5" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  flower:
    '<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 12.5C30 11.0166 30.4399 9.5666 31.264 8.33323C32.0881 7.09986 33.2594 6.13856 34.6299 5.57091C36.0003 5.00325 37.5083 4.85472 38.9632 5.14411C40.418 5.4335 41.7544 6.14781 42.8033 7.1967C43.8522 8.2456 44.5665 9.58197 44.8559 11.0368C45.1453 12.4917 44.9968 13.9997 44.4291 15.3701C43.8614 16.7406 42.9001 17.9119 41.6668 18.736C40.4334 19.5601 38.9834 20 37.5 20M30 12.5C30 11.0166 29.5601 9.5666 28.736 8.33323C27.9119 7.09986 26.7406 6.13856 25.3701 5.57091C23.9997 5.00325 22.4917 4.85472 21.0368 5.14411C19.582 5.4335 18.2456 6.14781 17.1967 7.1967C16.1478 8.2456 15.4335 9.58197 15.1441 11.0368C14.8547 12.4917 15.0032 13.9997 15.5709 15.3701C16.1386 16.7406 17.0999 17.9119 18.3332 18.736C19.5666 19.5601 21.0166 20 22.5 20M30 12.5V15M37.5 20C38.9834 20 40.4334 20.4399 41.6668 21.264C42.9001 22.0881 43.8614 23.2594 44.4291 24.6299C44.9968 26.0003 45.1453 27.5083 44.8559 28.9632C44.5665 30.418 43.8522 31.7544 42.8033 32.8033C41.7544 33.8522 40.418 34.5665 38.9632 34.8559C37.5083 35.1453 36.0003 34.9968 34.6299 34.4291C33.2594 33.8614 32.0881 32.9001 31.264 31.6668C30.4399 30.4334 30 28.9834 30 27.5M37.5 20H35M22.5 20C21.0166 20 19.5666 20.4399 18.3332 21.264C17.0999 22.0881 16.1386 23.2594 15.5709 24.6299C15.0032 26.0003 14.8547 27.5083 15.1441 28.9632C15.4335 30.418 16.1478 31.7544 17.1967 32.8033C18.2456 33.8522 19.582 34.5665 21.0368 34.8559C22.4917 35.1453 23.9997 34.9968 25.3701 34.4291C26.7406 33.8614 27.9119 32.9001 28.736 31.6668C29.5601 30.4334 30 28.9834 30 27.5M22.5 20H25M30 27.5V25" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 25C32.7614 25 35 22.7614 35 20C35 17.2386 32.7614 15 30 15C27.2386 15 25 17.2386 25 20C25 22.7614 27.2386 25 30 25Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 25V55" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 55C40.5 55 47.5 50.8325 47.5 42.5C37 42.5 30 46.6675 30 55Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 55C19.5 55 12.5 50.8325 12.5 42.5C23 42.5 30 46.6675 30 55Z" stroke="#1F445A" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

export const heroTexts = {
  title: "Новий стан і зміни в житті починаються з",
  desktopTitle: "Новий стан і зміни в житті\nпочинаються з",
  script: "досвіду",
  subtitle: "який проживається через тіло",
  desktopDescription:
    "Проєкт “Дотик” — це авторський метод,\nякий поєднує роботу з нервовою системою, тілом\nі станом для відновлення фізичного та емоційного балансу",
  description:
    "Проєкт “Дотик” — це авторський метод, який поєднує роботу з нервовою системою, тілом і станом для відновлення фізичного та емоційного балансу",
  availability: "Онлайн формат\nдоступ з будь-якої точки",
  durationValue: "6",
  durationLabel: "тижнів проєкту",
};

export const heroEase = [0.22, 1, 0.36, 1] as const;

export const benefits: Benefit[][] = [
  [
    { title: "Постійна втома і відсутність енергії", icon: benefitIcons.battery },
    { title: "Внутрішня тривога без причини", icon: benefitIcons.heart },
    { title: "Живеш в голові, не відчуваєш тіло", icon: benefitIcons.mind },
    {
      title: "Постійно контролюєш і не можеш розслабитися",
      icon: benefitIcons.shield,
    },
  ],
  [
    { title: "Немає задоволення від життя", icon: benefitIcons.smile },
    { title: "Заїдаєш стрес і емоції", icon: benefitIcons.apple },
    { title: "Не відчуваєш жіночність і сексуальність", icon: benefitIcons.flower },
  ],
];

export const results: ResultItem[] = [
  { title: "Більше енергії", description: "З’являється ресурс і бажання жити" },
  {
    title: "Внутрішній спокій",
    description: "Зникає тривога, з’являється відчуття “мені добре”",
  },
  { title: "Легкість у тілі", description: "Менше напруги, болю і дискомфорту" },
  { title: "Менше контролю", description: "Ти вмієш розслаблятися і відпускати" },
  { title: "Контакт із тілом", description: "Ти відчуваєш себе і свої потреби" },
  {
    title: "Жіночність і прояв",
    description: "З’являється м’якість і природний прояв",
  },
];

export const processSteps = [
  {
    title: "Нервова система",
    description: "Зниження напруги і стресу, відновлення відчуття безпеки в тілі",
  },
  {
    title: "Тіло",
    description: "Звільнення від зажимів і блоків, повернення чутливості тіла",
  },
  {
    title: "Стан",
    description: "Відновлення ресурсу, енергії і легкості, глибокий контакт із собою",
  },
];

export const modules: ModuleItem[] = [
  {
    title: "Модуль 1 — робота з нервовою системою",
    description:
      "Перший етап методу спрямований на зниження хронічного стресу та відновлення балансу нервової системи. Саме перевантажена нервова система лежить в основі постійної тривоги, переїдання, набряків, проблем зі сном, хронічної втоми, гормональних збоїв та відчуття внутрішнього напруження.\n\nКоли тіло не відчуває безпеки, воно постійно знаходиться в режимі напруги, і в цьому стані неможливі глибокі зміни. У цьому модулі ми не просто “заспокоюємось”, а створюємо нову базу стану, з якої починається відновлення та зміни.",
    accent:
      "Що зміниться після модуля:\n• зменшиться внутрішня тривога і напруга\n• ти відчуєш, як це бути в спокійному стані\n• тіло перестане жити в режимі «напруги 24/7»\n• стане легше розслаблятись і відпочивати, покращиться сон\n• зменшиться потреба все контролювати\n• з’явиться відчуття безпеки в тілі\n• знизиться рівень стресу і виснаження\n• ти відчуєш більше енергії\n• відчуєш заряд та ресурс змінювати життя",
  },
  { title: "Модуль 2 — робота з тілом та емоціями" },
  { title: "Модуль 3 — робота зі станом" },
  { title: "Додаткові матеріали" },
];

export const expertiseStats = [
  {
    title: "СОТНІ КОНСУЛЬТАЦІЙ",
    description: "глибока робота з жінками та успішні кейси",
  },
  { title: "ПСИХОСОМАТИКА", description: "і тілесно-орієнтована терапія" },
  { title: "ЖІНОЧЕ ЗДОРОВ’Я", description: "та практична психологія" },
  { title: "ВЛАСНИЙ ШЛЯХ", description: "досвід через апатію, виснаження і відновлення" },
];

export const certificates: ResponsiveAsset[] = [
  {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/f7f81db4a46decaebc868a8360633e3918d54ec9?width=300",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/f7f81db4a46decaebc868a8360633e3918d54ec9?width=200",
    alt: "Сертифікат 1",
  },
  {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/f7f81db4a46decaebc868a8360633e3918d54ec9?width=300",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/f7f81db4a46decaebc868a8360633e3918d54ec9?width=200",
    alt: "Сертифікат 2",
  },
  {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/f7f81db4a46decaebc868a8360633e3918d54ec9?width=300",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/f7f81db4a46decaebc868a8360633e3918d54ec9?width=200",
    alt: "Сертифікат 3",
  },
  {
    desktop:
      "https://api.builder.io/api/v1/image/assets/TEMP/f7f81db4a46decaebc868a8360633e3918d54ec9?width=300",
    mobile:
      "https://api.builder.io/api/v1/image/assets/TEMP/f7f81db4a46decaebc868a8360633e3918d54ec9?width=200",
    alt: "Сертифікат 4",
  },
];

export const videoReviews: VideoReviewItem[] = [
  {
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/0af9995b368e3b6ec5fff29e6e9840606c821425?width=707",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
  {
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/0af9995b368e3b6ec5fff29e6e9840606c821425?width=707",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
  {
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/0af9995b368e3b6ec5fff29e6e9840606c821425?width=707",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/3dd4dc9889755b00b306ee61e37f7cd0b5132847?width=96",
    name: "Олена Мельник",
  },
];

export const textReviews: ReviewItem[] = [
  {
    text: "Я одразу відчула довіру до тебе… я так втомилась «ламати себе і збирати заново». Я вже пробувала різні способи: таблетки, марафони, контроль — але це не давало результату і дуже дратувало. А тут я вперше зрозуміла, що можу справлятись зі своїм станом сама. Зрозуміла, що більшість проблем не зовні, а всередині, які я тримала дуже довго…",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/3dd4dc9889755b00b306ee61e37f7cd0b5132847?width=96",
    name: "Олена Мельник",
  },
  {
    text: "Інформація подається легко, але дуже точно. З точки зору тіла, психіки і стану. Мені як психологу це дуже важливо... Практики прості, але глибокі. І є відчуття, що ти не одна — завжди є підтримка.",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/3dd4dc9889755b00b306ee61e37f7cd0b5132847?width=96",
    name: "Олена Мельник",
  },
  {
    text: "Я прийшла в цей проєкт у стані, коли зовні ніби все ок, але всередині — постійна напруга, тривога і втома. І найгірше — ти вже звикаєш так жити… Завдяки проєкту я навчилась жити по-іншому. Я кайфую від свого стану і від себе.",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
  {
    text: "Після «Дотику» почала якось з любов’ю ставитись до себе. Знизила рівень самокритики і постійного внутрішнього тиску. З’явилось відчуття безпеки в тілі. Стало менше тривоги, більше спокою. Навчилась обирати себе, а не жити через страх і очікування інших.",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=96",
    name: "Олена Мельник",
  },
];
