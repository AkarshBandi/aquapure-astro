import { useEffect } from 'react';

export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in'));
      return;
    }
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${Math.min(i % 4 * 0.06, 0.18)}s`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
