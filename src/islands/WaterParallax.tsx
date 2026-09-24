import { useEffect } from 'react';

export default function WaterParallax() {
  useEffect(() => {
    if (window.self !== window.top) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.documentElement.classList.contains('is-tina-edit')) return;

    const heroBg = document.querySelector<HTMLElement>('.hero-section');
    const ctaBg = document.querySelector<HTMLElement>('.cta-section');
    if (!heroBg && !ctaBg) return;

    let raf = 0;
    let ticking = false;
    const tau = 120; // ms damping
    let heroY = 0, ctaY = 0, heroTarget = 0, ctaTarget = 0;
    let last = performance.now();

    const onScroll = () => {
      const sy = window.scrollY;
      heroTarget = sy * 0.08;
      ctaTarget = sy * 0.04;
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    const update = () => {
      const now = performance.now();
      const dt = Math.min(now - last, 33);
      last = now;
      const lerp = 1 - Math.exp(-dt / tau);
      heroY += (heroTarget - heroY) * lerp;
      ctaY += (ctaTarget - ctaY) * lerp;
      if (heroBg) heroBg.style.setProperty('--parallax-y', `${heroY.toFixed(2)}px`);
      if (ctaBg) ctaBg.style.setProperty('--parallax-y', `${ctaY.toFixed(2)}px`);
      if (Math.abs(heroTarget - heroY) > 0.1 || Math.abs(ctaTarget - ctaY) > 0.1) {
        raf = requestAnimationFrame(update);
      } else {
        ticking = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const onVis = () => { if (!document.hidden) onScroll(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);
  return null;
}
