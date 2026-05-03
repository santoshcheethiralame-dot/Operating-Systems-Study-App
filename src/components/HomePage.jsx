import { Link } from 'react-router-dom';
import { UNITS } from '../data/units';

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg)',
      color: 'var(--text)',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 20px',
      fontFamily: 'var(--font-sans)'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%' }}>
        <header style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ 
            fontSize: 64, 
            marginBottom: 16,
            animation: 'float 6s ease-in-out infinite' 
          }}>
            🖥️
          </div>
          <h1 style={{ 
            fontSize: 48, 
            fontWeight: 900, 
            color: 'var(--text)',
            letterSpacing: '-1px',
            marginBottom: 16
          }}>
            Operating Systems
          </h1>
          <p style={{ 
            fontSize: 20, 
            color: 'var(--muted)', 
            maxWidth: 600, 
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            Master the core concepts of Operating Systems. Select a unit below to start studying.
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: 24 
        }}>
          {UNITS.map(unit => (
            <Link 
              key={unit.id} 
              to={`/unit/${unit.id}`}
              style={{
                background: unit.gradient,
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 32,
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = unit.accentColor;
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px ${unit.accentColor}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
              }}
            >
              <div style={{ 
                position: 'absolute', 
                top: 24, 
                right: 24, 
                fontSize: 48, 
                opacity: 0.8 
              }}>
                {unit.emoji}
              </div>
              
              <div style={{ 
                color: unit.accentColor, 
                fontWeight: 700, 
                fontSize: 14, 
                letterSpacing: 2, 
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                UNIT {unit.id}
                <span style={{
                  background: 'var(--surface)',
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontSize: 10,
                  border: '1px solid var(--border)',
                  color: 'var(--text)'
                }}>
                  SLIDES AVAILABLE
                </span>
              </div>
              
              <h2 style={{ 
                fontSize: 28, 
                fontWeight: 800, 
                marginBottom: 16,
                paddingRight: 60,
                lineHeight: 1.2
              }}>
                {unit.title}
              </h2>
              
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: 15, 
                lineHeight: 1.6,
                fontFamily: 'var(--font-mono)'
              }}>
                {unit.description}
              </p>
              
              <div style={{ 
                marginTop: 32, 
                display: 'inline-flex', 
                alignItems: 'center', 
                color: unit.accentColor,
                fontWeight: 600,
                fontSize: 14,
                gap: 8
              }}>
                Start studying <span style={{ fontSize: 18 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
