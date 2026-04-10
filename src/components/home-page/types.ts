export type ResponsiveAsset = {
  desktop: string;
  mobile: string;
  alt: string;
};

export type Benefit = {
  title: string;
  icon: string;
};

export type ResultItem = {
  title: string;
  description: string;
};

export type ModuleItem = {
  title: string;
  description?: string;
  accent?: string;
};

export type ReviewItem = {
  text: string;
  avatar: string;
  name: string;
};

export type VideoReviewItem = {
  image: string;
  avatar: string;
  name: string;
};
