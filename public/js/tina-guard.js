(() => {
  const isTina = window.self !== window.top;
  if (isTina) {
    document.documentElement.classList.add('is-tina-edit');
    try {
      const obs = new MutationObserver(() => {
        document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in'));
      });
      obs.observe(document.body, { childList: true, subtree: true });
      document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in'));
      });
    } catch {}
  }
})();
