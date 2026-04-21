import { createForWhoIcon, defaultLandingPageContent } from './data'
import type { LandingPageContent } from './types'

export const defaultEnglishLandingPageContent = {
  ...defaultLandingPageContent,
  seo: {
    metaTitle: 'LEA21 | Touch Project',
    metaDescription:
      'Landing page for Lena Romaniuk\'s Touch project with the program, results, reviews, and application form.',
  },
  header: {
    logoText: 'lea21',
    ctaLabel: 'Apply',
    navItems: [
      { label: 'For whom', href: '#for-who' },
      { label: 'Results', href: '#results' },
      { label: 'Program', href: '#program' },
      { label: 'About me', href: '#about' },
    ],
  },
  hero: {
    ...defaultLandingPageContent.hero,
    titleLineOne: 'A new state and life changes',
    titleLineTwo: 'begin with',
    script: 'experience',
    subtitle: 'that is lived through the body',
    description:
      'The Touch project is an original method that combines work with the nervous system, body, and inner state to restore physical and emotional balance',
    desktopDescription:
      'The Touch project is an original method\nthat combines work with the nervous system, body,\nand inner state to restore physical and emotional balance',
    availability: 'Online format\naccess from anywhere',
    durationLabel: 'weeks of the project',
    backgroundImage: {
      ...defaultLandingPageContent.hero.backgroundImage,
      alt: 'Hero section background image',
    },
    figureImage: {
      ...defaultLandingPageContent.hero.figureImage,
      alt: 'Main project image',
    },
  },
  project: {
    ...defaultLandingPageContent.project,
    title: 'The Touch project -',
    scriptTitle: 'Lena Romaniuk\'s original method',
    intro:
      'The method combines somatic practices, nervous-system work, and body-oriented approaches',
    body:
      'The Touch project is based on Lena Romaniuk\'s original method, which combines somatic practices, nervous-system work, and body-oriented approaches to restore physical and psycho-emotional wellbeing.\n\nThe method is designed to reduce chronic stress, restore body sensitivity, and improve emotional and physical state, helping you build deeper contact with yourself and your body.',
    ctaLabel: 'View the program',
    image: {
      ...defaultLandingPageContent.project.image,
      alt: 'Image for the project section',
    },
  },
  forWho: {
    title: 'This project',
    scriptTitle: 'is for you if you:',
    primaryItems: [
      {
        icon: createForWhoIcon('battery', 'Battery icon'),
        label: 'Feel constant fatigue\nand lack of energy',
      },
      {
        icon: createForWhoIcon('heart', 'Heart icon'),
        label: 'Have inner anxiety without a clear reason',
      },
      {
        icon: createForWhoIcon('mind', 'Mind icon'),
        label: 'Live in your head\nand do not feel your body',
      },
      {
        icon: createForWhoIcon('shield', 'Shield icon'),
        label: 'Keep everything under control\nand cannot relax',
      },
    ],
    secondaryItems: [
      {
        icon: createForWhoIcon('smile', 'Smile icon'),
        label: 'Do not feel pleasure\nfrom life',
      },
      {
        icon: createForWhoIcon('apple', 'Apple icon'),
        label: 'Eat through stress\nand emotions',
      },
      {
        icon: createForWhoIcon('flower', 'Flower icon'),
        label: 'Do not feel femininity\nand sexuality',
      },
    ],
  },
  results: {
    ...defaultLandingPageContent.results,
    title: 'What will change after the project',
    summary: 'Results you will feel in your body, state, and life',
    backgroundImage: {
      ...defaultLandingPageContent.results.backgroundImage,
      alt: 'Results section background image',
    },
    image: {
      ...defaultLandingPageContent.results.image,
      alt: 'Image for the results section',
    },
    items: [
      { title: 'More energy', description: 'You gain resources\nand a desire to live' },
      {
        title: 'Inner calm',
        description: 'Anxiety fades, and the feeling\n"I am okay" appears',
      },
      { title: 'Ease in the body', description: 'Less tension, pain,\nand discomfort' },
      { title: 'Less control', description: 'You can relax\nand let go' },
      { title: 'Contact with the body', description: 'You feel yourself\nand your needs' },
      { title: 'Femininity and expression', description: 'Softness and natural\nself-expression appear' },
    ],
  },
  process: {
    title: 'Touch',
    scriptTitle: 'how the project works',
    steps: [
      {
        title: 'Nervous system',
        description: 'Reducing tension and stress,\nrestoring a sense of safety\nin the body',
      },
      {
        title: 'Body',
        description: 'Releasing clamps and blocks,\nreturning sensitivity\nto the body',
        raised: true,
      },
      {
        title: 'State',
        description: 'Restoring resources, energy,\nand lightness, deep contact\nwith yourself',
      },
    ],
  },
  program: {
    title: 'Project program',
    modules: [
      {
        title: 'Module 1 - working with the nervous system',
        description:
          'The first stage of the method focuses on reducing chronic stress and restoring balance in the nervous system. An overloaded nervous system is often behind constant anxiety, overeating, swelling, sleep issues, chronic fatigue, hormonal disruptions, and a feeling of inner tension.\n\nWhen the body does not feel safe, it stays in a state of tension, and deep changes are impossible from that place. In this module, we do more than "calm down": we create a new foundation of state from which recovery and change can begin.\n\nWhat will change after the module:\n- inner anxiety and tension will decrease\n- you will feel what it is like to be in a calm state\n- the body will stop living in 24/7 tension mode\n- it will become easier to relax and rest, and sleep will improve\n- the need to control everything will decrease\n- a sense of safety in the body will appear\n- stress and exhaustion will decrease\n- you will feel more energy\n- you will feel the charge and resources to change your life',
      },
      {
        title: 'Module 2 - working with the body and emotions',
        description:
          'Body clamps, blocks, unprocessed emotions, and heaviness in the body. At this stage we work with the body through somatic and body practices.\n\nThe body stores accumulated stress, emotions, and unlived experience, which over time may show up as:\n- body clamps\n- emotional blocks or muscle pain\n- heaviness in the body and swelling\n- fatigue\n- lack of lightness\n\nAs long as this remains in the body, you cannot feel differently, even if you understand what is "right" in your mind.\n\nWhat will change after the module:\n- the body will feel lighter and more relaxed\n- heaviness and tension will decrease\n- swelling will lessen and circulation in the body will improve\n- there will be less emotional eating\n- contact with sensations and needs will appear\n- you will begin to understand yourself better through the body\n- you will feel more open and sensual\n- more energy and spark will appear\n- you will feel more inner support',
      },
      {
        title: 'Module 3 - working with state',
        description:
          'Femininity, lightness, enjoyment of yourself and life, energy.\n\nWhen the nervous system has calmed down and the body has released tension, space opens for a new state.\n\nIn this module we form a new inner state: stable, light, and resourceful, from which life changes naturally.\n\nThe module includes meditations and state reprogramming practices aimed at allowing yourself to express, create, and live from within.\n\nTaoist practices support energy recovery, confidence, and inner grounding.\nAnd sacred feminine dance helps reveal femininity, sensuality, and sexuality.\n\nWhat will change after the module:\n- a feeling of lightness and "I feel good" will appear\n- you will stop living in survival mode\n- stable inner calm will appear\n- you will start feeling life and enjoying it instead of surviving\n- energy and the desire to express and create will return\n- confidence and inner support will appear\n- you will feel yourself and your desires better\n- you will feel more pleasure from life and from yourself\n- more femininity, softness, and magnetic presence will appear',
      },
      {
        title: 'Additional materials',
        description:
          'Together with the program, you also receive a body-practice course that becomes a natural continuation of the work after the project ends.\n\nThe course includes 18 specially designed body complexes for different states: nervous-system regulation, relaxation, tension release, energy recovery, and raising feminine, sexual energy and confidence.\n\nIt is like a body first-aid kit for the moments when you need to know how to bring yourself back to the state you need.',
      },
    ],
  },
  expertise: {
    ...defaultLandingPageContent.expertise,
    title: 'My experience and approach',
    scriptTitle: 'in working with women',
    description:
      'My name is Lena. I am a body therapist, women\'s mentor, and author of the Touch method. I have hundreds of consultations behind me, deep work with women, and hundreds of successful cases.',
    intro:
      'I have confirmed knowledge in psychosomatics, body-oriented therapy, women\'s health, and practical psychology. But the most valuable part is my own path.',
    image: {
      ...defaultLandingPageContent.expertise.image,
      alt: 'Photo of Lena Romaniuk',
    },
    stats: [
      {
        title: 'HUNDREDS OF CONSULTATIONS',
        description: 'deep work with women and successful cases',
        align: 'end',
      },
      {
        title: 'PSYCHOSOMATICS',
        description: 'and body-oriented therapy',
        align: 'start',
      },
      {
        title: 'WOMEN\'S HEALTH',
        description: 'and practical psychology',
        align: 'end',
      },
      {
        title: 'MY OWN PATH',
        description: 'experience through apathy, exhaustion, and recovery',
        align: 'start',
      },
    ],
  },
  certificates: {
    title: 'Confirmed',
    scriptWordOne: 'experience',
    scriptWordTwo: 'and knowledge',
    items: [
      {
        label: 'Certificate 1',
        image: {
          ...defaultLandingPageContent.certificates.items[0].image,
          alt: 'Certificate 1',
        },
      },
      {
        label: 'Certificate 2',
        image: {
          ...defaultLandingPageContent.certificates.items[1].image,
          alt: 'Certificate 2',
        },
      },
      {
        label: 'Certificate 3',
        image: {
          ...defaultLandingPageContent.certificates.items[2].image,
          alt: 'Certificate 3',
        },
      },
      {
        label: 'Certificate 4',
        image: {
          ...defaultLandingPageContent.certificates.items[3].image,
          alt: 'Certificate 4',
        },
      },
    ],
  },
  reviews: {
    title: 'What happens',
    scriptTitle: 'after the project',
    items: [
      {
        blockType: 'videoReview',
        video: null,
        image: '/landing/reviews-videoItems-0-image.webp',
        avatar: '/landing/reviews-videoItems-0-avatar.webp',
        name: 'Olena Melnyk',
      },
      {
        blockType: 'videoReview',
        video: null,
        image: '/landing/reviews-videoItems-0-image.webp',
        avatar: '/landing/reviews-videoItems-0-avatar.webp',
        name: 'Olena Melnyk',
      },
      {
        blockType: 'videoReview',
        video: null,
        image: '/landing/reviews-videoItems-0-image.webp',
        avatar: '/landing/reviews-videoItems-2-avatar.webp',
        name: 'Olena Melnyk',
      },
      {
        blockType: 'textReview',
        text:
          'I immediately felt trust in you... I was so tired of "breaking myself and putting myself back together." I had already tried different things: pills, marathons, control, but nothing worked and it irritated me. Here, for the first time, I understood that I can handle my state myself.',
        avatar: '/landing/reviews-videoItems-2-avatar.webp',
        name: 'Olena Melnyk',
      },
      {
        blockType: 'textReview',
        text:
          'The information is presented lightly, but very precisely. From the point of view of the body, psyche, and state. As a psychologist, this is very important to me. The practices are simple but deep, and there is a feeling that you are not alone - support is always there.',
        avatar: '/landing/reviews-videoItems-2-avatar.webp',
        name: 'Olena Melnyk',
      },
      {
        blockType: 'textReview',
        text:
          'I came to this project in a state where everything looked okay on the outside, but inside there was constant tension, anxiety, and fatigue. The worst part was that I had already gotten used to living that way. Thanks to the project, I learned to live differently. I enjoy my state and myself.',
        avatar: '/landing/reviews-videoItems-0-avatar.webp',
        name: 'Olena Melnyk',
      },
      {
        blockType: 'textReview',
        text:
          'After Touch, I began treating myself with love. My self-criticism and constant inner pressure decreased. A sense of safety appeared in my body, anxiety became lower, and there was more calm. I learned to choose myself instead of living through fear and other people\'s expectations.',
        avatar: '/landing/reviews-videoItems-0-avatar.webp',
        name: 'Olena Melnyk',
      },
      {
        blockType: 'textReview',
        text:
          'I came out of constant anxiety and hyper-control and felt calm in my body. Energy and lightness appeared, I stopped living in survival mode and began truly living. The Touch project changed my life.',
        avatar: '/landing/reviews-videoItems-0-avatar.webp',
        name: 'Olena Melnyk',
      },
      {
        blockType: 'textReview',
        text:
          'I came out of chronic stress and constant anxiety, allowed myself to rest without guilt, and understood that rest is necessary. Inner tension decreased, softness and calm appeared, and I had more energy. I began allowing myself to live.',
        avatar: '/landing/reviews-videoItems-0-avatar.webp',
        name: 'Olena Melnyk',
      },
    ],
  },
  cta: {
    ...defaultLandingPageContent.cta,
    title: 'Ready to start changing now?',
    description:
      'Leave an application, and we will choose the work format that best fits your state and request.',
    buttonLabel: 'Apply',
    backgroundImage: {
      ...defaultLandingPageContent.cta.backgroundImage,
      alt: 'Call to action background image',
    },
  },
  contact: {
    ...defaultLandingPageContent.contact,
    eyebrow: 'Start changing now',
    title: 'Take the first step',
    script: 'toward a new state',
    image: {
      ...defaultLandingPageContent.contact.image,
      alt: 'Image for the contact section',
    },
    placeholders: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
    },
    submitLabel: 'Send',
    successMessage: 'Thank you! We have received your application.',
    errorMessage: 'Could not send the form. Please try again.',
  },
  footer: {
    leftLinks: [
      { label: 'For whom', href: '#for-who' },
      { label: 'Results', href: '#results' },
    ],
    rightLinks: [
      { label: 'Program', href: '#program' },
      { label: 'About me', href: '#about' },
    ],
    logoText: 'lea21',
    socialLinks: defaultLandingPageContent.footer.socialLinks,
    contact: {
      title: 'Contact',
      label: 'Telegram: @username',
      href: 'https://t.me/username',
    },
    write: {
      title: 'Write to me',
      label: 'Instagram: @username',
      href: 'https://instagram.com/username',
    },
    socialsTitle: 'Social media',
  },
} satisfies LandingPageContent
