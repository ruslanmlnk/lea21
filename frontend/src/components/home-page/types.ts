export type ImageAsset = {
  url: string
  alt: string
}

export type NavItem = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  url: string
}

export type BenefitIconKey =
  | 'battery'
  | 'heart'
  | 'mind'
  | 'shield'
  | 'smile'
  | 'apple'
  | 'flower'

export type BenefitItem = {
  icon: BenefitIconKey
  label: string
}

export type Benefit = BenefitItem

export type ResultItem = {
  title: string
  description: string
}

export type ProcessStep = {
  title: string
  description: string
  raised?: boolean
}

export type ModuleItem = {
  title: string
  description?: string
}

export type TextReviewItem = {
  blockType: 'textReview'
  text: string
  avatar: string
  name: string
}

export type VideoReviewItem = {
  blockType: 'videoReview'
  video?: null | string
  image: string
  avatar: string
  name: string
}

export type ReviewItem = TextReviewItem | VideoReviewItem

export type ExpertiseStat = {
  title: string
  description: string
  align: 'start' | 'end'
}

export type ContactPlaceholders = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export type FooterContactItem = {
  title: string
  label: string
  href: string
}

export type CertificateItem = {
  label: string
  image: ImageAsset
}

export type LandingPageContent = {
  seo: {
    metaTitle: string
    metaDescription: string
  }
  header: {
    logoText: string
    ctaLabel: string
    navItems: NavItem[]
  }
  hero: {
    titleLineOne: string
    titleLineTwo: string
    script: string
    subtitle: string
    description: string
    desktopDescription: string
    availability: string
    durationValue: string
    durationLabel: string
    backgroundImage: ImageAsset
    figureImage: ImageAsset
  }
  project: {
    title: string
    scriptTitle: string
    intro: string
    body: string
    ctaLabel: string
    ctaHref: string
    image: ImageAsset
  }
  forWho: {
    title: string
    scriptTitle: string
    primaryItems: BenefitItem[]
    secondaryItems: BenefitItem[]
  }
  results: {
    title: string
    summary: string
    backgroundImage: ImageAsset
    image: ImageAsset
    items: ResultItem[]
  }
  process: {
    title: string
    scriptTitle: string
    steps: ProcessStep[]
  }
  program: {
    title: string
    modules: ModuleItem[]
  }
  expertise: {
    title: string
    scriptTitle: string
    description: string
    intro: string
    image: ImageAsset
    stats: ExpertiseStat[]
  }
  certificates: {
    title: string
    scriptWordOne: string
    scriptWordTwo: string
    items: CertificateItem[]
  }
  reviews: {
    title: string
    scriptTitle: string
    items: ReviewItem[]
  }
  cta: {
    title: string
    description: string
    buttonLabel: string
    buttonHref: string
    backgroundImage: ImageAsset
  }
  contact: {
    eyebrow: string
    title: string
    script: string
    image: ImageAsset
    placeholders: ContactPlaceholders
    submitLabel: string
    successMessage: string
    errorMessage: string
  }
  footer: {
    leftLinks: NavItem[]
    rightLinks: NavItem[]
    logoText: string
    socialLinks: SocialLink[]
    contact: FooterContactItem
    write: FooterContactItem
    socialsTitle: string
  }
}
