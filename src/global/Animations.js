export const pageAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,

    transition: {
      duration: 1,
    },
  },
};
export const slideAnimation = {
  hidden: {
    opacity: 0,
    y: 300,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
    },
  },
};
export const slideToLeft = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
    },
  },
};
export const slideToRight = {
  hidden: {
    opacity: 0,
    x: -200,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
    },
  },
};
export const burgerAnimation = {
  hidden: {
    opacity: 0,
    x: 300,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
};
