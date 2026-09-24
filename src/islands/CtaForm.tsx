import { useState } from 'react';

function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function CtaForm({ id, placeholder = 'Enter your email address', buttonLabel = 'Submit', disclaimer }: { id: string; placeholder?: string; buttonLabel?: string; disclaimer?: string }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!validEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" style={{ padding: '16px', background: '#fff', border: '1px solid var(--color-border)', borderRadius: 4, color: 'var(--color-dark)' }}>
        <strong style={{ display: 'block', marginBottom: 4 }}>You’re on the list.</strong>
        <span style={{ opacity: 0.8, fontSize: '0.9rem', color: 'var(--color-muted)' }}>We’ll send your free water test confirmation shortly — check your inbox.</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          id={`${id}-input`}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
          placeholder={placeholder}
          aria-label="Email address"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: 4,
            border: error ? '1px solid #fecaca' : '1px solid var(--color-border)',
            background: '#fff',
            color: 'var(--color-dark)',
            fontFamily: 'Inter, sans-serif',
          }}
        />
        <button type="submit" className="btn btn-primary" style={{ background: 'var(--color-accent)', color: '#fff', whiteSpace: 'nowrap' }}>
          {buttonLabel}
        </button>
      </div>
      {error ? (
        <span id={`${id}-error`} role="alert" style={{ color: '#e11d48', fontSize: '0.8rem' }}>{error}</span>
      ) : disclaimer ? (
        <span style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>{disclaimer}</span>
      ) : null}
    </form>
  );
}
