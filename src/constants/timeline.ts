export const TIMELINE_CONSTANTS = {
  ANIMATION_DURATION: 800,
  TARGET_ACTIVE_ANGLE: 45,
  CIRCLE_RADIUS: 265,
  INITIAL_ANIMATION_DURATION: 1,
  INITIAL_ANIMATION_STAGGER: 0.2,
  YEAR_ANIMATION_DURATION: 0.8,
} as const;

export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
} as const;

export const SWIPER_CONFIG = {
  MOBILE: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  TABLET: {
    slidesPerView: 2,
    spaceBetween: 40,
  },
  DESKTOP: {
    slidesPerView: 3,
    spaceBetween: 0,
  },
} as const;
