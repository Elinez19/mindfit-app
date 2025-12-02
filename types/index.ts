import { SharedValue } from "react-native-reanimated";

/* ---------- Service Types ---------- */
export type Onboarding = {
  id: string | number;
  title: string;
  category: string;
  price: string;
  rating: string;
  image: any; // Local image resource from require()
  description: string;
};

/* ---------- Component Props Types ---------- */
export type OnboardingProps = {
  data?: Onboarding[];
  ctaLabel?: string;
  onCTAPress?: () => void;
  carouselSpeed?: number;
};

export type OnboardingCardProps = {
  onboarding: Onboarding;
};

/* ---------- Carousel Types ---------- */
export type CarouselItemRenderer<T> = (params: {
  item: T;
  index: number;
}) => React.ReactNode;

export type InfiniteCarouselProps<T> = {
  carouselItems: T[];
  renderItem: CarouselItemRenderer<T>;
  onIndexChange?: (index: number) => void;
  autoPlaySpeed?: number;
  itemWidthRatio?: number;
  rotateDeg?: number; // maximum rotation
};

export type CarouselItemProps = {
  index: number;
  scroll: SharedValue<number>;
  containerW: number;
  itemW: number;
  rotateDeg: number;
  children: React.ReactNode;
};

/* ---------- Animation Types ---------- */
export type AnimationConfig = {
  splashDelay: number;
  fadeInDuration: number;
  springDamping: number;
  buttonPressScale: number;
  buttonPressOpacity: number;
};

/* ---------- App Configuration Types ---------- */
export type AppConfig = {
  name: string;
  tagline: string;
  description: string;
  carouselSpeed: number;
  blurIntensity: number;
};

/* ---------- Gradient Types ---------- */
export type GradientColors = {
  primary: readonly [string, string, string];
  secondary: readonly [string, string, string];
  cardOverlay: readonly [string, string, string];
};

/* ---------- Auth Form Types ---------- */
// Form types are now defined in validation/schemas.ts
