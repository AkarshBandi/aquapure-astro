import { useState } from 'react';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'none',
          background: 'none',
          border: '1px solid #0077B6',
          borderRadius: 4,
          padding: '8px 10px',
          cursor: 'pointer',
          color: '#0077B6',
          fontWeight: 600,
        }}
        className="mobile-toggle"
      >
        {open ? '✕' : '☰'}
      </button>
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: '68px 16px auto 16px',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            zIndex: 1001,
            boxShadow: '0 12px 32px rgba(0,0,0,.12)',
          }}
        >
          <a href="#systems" onClick={() => setOpen(false)} style={{ color: '#0077B6', fontWeight: 500 }}>Our systems</a>
          <a href="#issues" onClick={() => setOpen(false)} style={{ color: '#0077B6' }}>Water issues</a>
          <a href="#story" onClick={() => setOpen(false)} style={{ color: '#0077B6' }}>Our story</a>
          <a href="#resources" onClick={() => setOpen(false)} style={{ color: '#0077B6' }}>Resources</a>
          <a href="#test" onClick={() => setOpen(false)} style={{ background: '#00C853', color: '#fff', padding: '10px 16px', borderRadius: 4, textAlign: 'center', fontWeight: 600 }}>Free water test</a>
        </div>
      )}
      <style>{`@media(max-width:1024px){ .main-nav{ display:none !important; } .mobile-toggle{ display:inline-flex !important; } } @media(min-width:1025px){ .mobile-toggle{ display:none !important; } }`}</style>
    </>
  );
}
