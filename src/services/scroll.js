export const smoothScroll = () => {
  window.scrollBy({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
};
