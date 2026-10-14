const MOTION = Object.freeze({ duration: 420, stagger: 55, maximumDelay: 165, distance: '8px', easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' });
const REVEAL_TARGETS = '.page-hero-grid > div, .section-header, .commodity-card, .trust-item, .process-intro, .process-step, .quality-copy, .summary-card, .corridor-band-grid > div, .role-panel, .split-copy > div, .page-section, .form-intro, .form-card, .footer-intro, .footer-col';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const activeAnimations = new Map();
let revealObserver;

function clearMotion() {
  revealObserver?.disconnect();
  for (const animation of activeAnimations.values()) animation.cancel();
  activeAnimations.clear();
}

export function initializeMotion() {
  clearMotion();
  const canAnimate = !reducedMotion.matches && 'IntersectionObserver' in window && 'animate' in Element.prototype;
  if (!canAnimate) return;
  const groupCounts = new Map();
  const delays = new WeakMap();
  const targets = [...document.querySelectorAll(REVEAL_TARGETS)].filter(target => !target.parentElement.closest(REVEAL_TARGETS));
  for (const target of targets) {
    const groupIndex = groupCounts.get(target.parentElement) || 0;
    delays.set(target, Math.min(groupIndex * MOTION.stagger, MOTION.maximumDelay));
    groupCounts.set(target.parentElement, groupIndex + 1);
  }
  revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const shouldReveal = entry.isIntersecting && entry.target.isConnected && !reducedMotion.matches;
      if (!shouldReveal) continue;
      const target = entry.target;
      revealObserver.unobserve(target);
      if (target.contains(document.activeElement)) continue;
      // Start motion only when visible; unsupported browsers never get hidden content.
      const animation = target.animate([
        { opacity: 0, transform: `translateY(${MOTION.distance})` },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: MOTION.duration, delay: delays.get(target), easing: MOTION.easing, fill: 'backwards' });
      activeAnimations.set(target, animation);
      const release = () => activeAnimations.delete(target);
      animation.onfinish = release;
      animation.oncancel = release;
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  targets.forEach(target => revealObserver.observe(target));
}

reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) clearMotion();
});
// A focused control must remain immediately visible, even during an entrance.
document.addEventListener('focusin', event => {
  for (const [target, animation] of activeAnimations) {
    if (target.contains(event.target)) animation.cancel();
  }
});
