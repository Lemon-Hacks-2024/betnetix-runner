export const useAnimationCollapse = () => {
  const beforeEnter = (el: HTMLElement) => {
    el.style.height = "0";
    el.style.opacity = "0";
  };

  const enter = (el: HTMLElement, done: () => void) => {
    el.style.transition = "height 0.3s ease, opacity 0.3s ease";
    requestAnimationFrame(() => {
      el.style.height = el.scrollHeight + "px";
      el.style.opacity = "1";
    });
    el.addEventListener("transitionend", done);
  };

  const leave = (el: HTMLElement, done: () => void) => {
    el.style.transition = "height 0.3s ease, opacity 0.3s ease";
    el.style.height = el.scrollHeight + "px";
    el.style.opacity = "1";

    requestAnimationFrame(() => {
      el.style.height = "0";
      el.style.opacity = "0";
    });
    el.addEventListener("transitionend", done);
  };

  return {
    beforeEnter,
    enter,
    leave,
  };
};
