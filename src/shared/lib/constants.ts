export const TIMELINE_CONSTANTS = {
  ANIMATION_DURATION: 800,
  TARGET_ACTIVE_ANGLE: 45,
  CIRCLE_RADIUS: 265,
  INITIAL_ANIMATION_DURATION: 1,
  INITIAL_ANIMATION_STAGGER: 0.2,
  YEAR_ANIMATION_DURATION: 0.8,
} as const;

export const COLORS = {
  WHITE: 'rgb(255, 255, 255)',
  PRIMARY: 'rgb(66, 86, 122)',
  SECONDARY: 'rgb(93, 95, 239)',
  SECONDARY_BLUE: 'rgb(56, 119, 238)',
  ACCENT: 'rgb(239, 93, 168)',
  BACKGROUND: 'rgb(244, 245, 249)',
  BORDER: 'rgba(48, 62, 88, 0.5)',
  BORDER_LIGHT: 'rgba(48, 62, 88, 0.2)',
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  DESKTOP: 1024,
} as const;

export const SWIPER_CONFIG = {
  MOBILE: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  DESKTOP: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
} as const;
