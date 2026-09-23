import { useEffect, useState, useRef } from 'react';

export default function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        let start: number | null = null;
        const step = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / 900, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * end));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return (
    <h3 ref={ref} style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--color-accent)', lineHeight: 1 }}>
      {n}
      {suffix}
    </h3>
  );
}
