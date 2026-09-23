import { useRef } from 'react';

type Stage = { title: string; text: string; image: string };

export default function Timeline({ stages }: { stages: Stage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.timeline-card');
    const w = card ? card.offsetWidth + 32 : 320;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  return (
    <div className="system-timeline-container">
      <button aria-label="Previous stage" className="timeline-arrow timeline-arrow-left" onClick={() => scroll(-1)}>‹</button>
      <button aria-label="Next stage" className="timeline-arrow timeline-arrow-right" onClick={() => scroll(1)}>›</button>
      <div ref={trackRef} className="timeline-row" style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 8 }}>
        {stages.map((s) => (
          <div key={s.title} className="timeline-card" style={{ minWidth: 0 }}>
            <img src={s.image} alt={s.title} width={400} height={280} loading="lazy" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 4, border: '1px solid #e2e8f0', marginBottom: 16 }} />
            <div className="timeline-track-axis"><div className="timeline-node-dot" /></div>
            <div className="timeline-text-content">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
