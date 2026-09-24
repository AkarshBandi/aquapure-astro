import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Stage = { title: string; text: string; image: string; fact?: string };

export default function ProcessTimeline({ stages }: { stages: Stage[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pipeFillRef = useRef<HTMLDivElement>(null);
  const dropletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    const fill = pipeFillRef.current;
    const droplet = dropletRef.current;
    if (!section || !fill || !droplet) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'bottom 25%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        droplet,
        { top: '0%' },
        {
          top: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'bottom 25%',
            scrub: 1,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.water-row').forEach((row) => {
        gsap.fromTo(
          row,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ position: 'relative', paddingLeft: 36 }}>
      {/* Vertical water pipe - visible flow */}
      <div
        style={{
          position: 'absolute',
          left: 18,
          top: 0,
          bottom: 0,
          width: 4,
          background: '#e0f2fe',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #bae6fd',
        }}
      >
        <div
          ref={pipeFillRef}
          className="water-fill"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '0%',
            background: 'repeating-linear-gradient(180deg, #0077B6 0 12px, #0096c7 12px 24px)',
            borderRadius: 2,
          }}
        />
        <div
          ref={dropletRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '0%',
            width: 10,
            height: 18,
            background: '#0077B6',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
        />
      </div>

      {/* Steps - no outer cards, flat */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
        {stages.map((s, i) => (
          <div
            key={s.title}
            className="water-row"
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1fr 1.05fr' : '1.05fr 1fr',
              gap: 40,
              alignItems: 'center',
              position: 'relative',
              paddingLeft: 16,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -31,
                top: '50%',
                width: 8,
                height: 8,
                background: '#0077B6',
                border: '2px solid #F0F8FF',
                borderRadius: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            {i % 2 === 0 ? (
              <>
                <div>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0077B6', fontWeight: 700 }}>
                    Step {i + 1} — {s.fact ?? ''}
                  </span>
                  <h3 style={{ fontSize: '1.45rem', color: '#0f172a', margin: '10px 0 10px', lineHeight: 1.25, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800 }}>{s.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.65, fontSize: '0.98rem' }}>{s.text}</p>
                </div>
                <img src={s.image} alt={s.title} width={420} height={280} loading="lazy" decoding="async" fetchPriority="low" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 4, border: '1px solid #e2e8f0' }} />
              </>
            ) : (
              <>
                <img src={s.image} alt={s.title} width={420} height={280} loading="lazy" decoding="async" fetchPriority="low" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 4, border: '1px solid #e2e8f0' }} />
                <div>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0077B6', fontWeight: 700 }}>
                    Step {i + 1} — {s.fact ?? ''}
                  </span>
                  <h3 style={{ fontSize: '1.45rem', color: '#0f172a', margin: '10px 0 10px', lineHeight: 1.25, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800 }}>{s.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.65, fontSize: '0.98rem' }}>{s.text}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <style>{`@keyframes waterFlow { from { background-position: 0 0; } to { background-position: 0 24px; } } .water-fill{ animation: waterFlow 0.8s linear infinite; } @media(max-width:768px){ [style*="gridTemplateColumns"]{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
