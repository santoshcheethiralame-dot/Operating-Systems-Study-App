import { useState } from 'react';

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ 
        color: 'var(--muted)', 
        fontSize: 12, 
        fontWeight: 'bold', 
        letterSpacing: 1.5, 
        marginBottom: 10 
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export default function TopicView({ topic }) {
  const [reveal, setReveal] = useState({});

  if (!topic) {
    return (
      <div style={{ padding: '40px', color: 'var(--muted)', textAlign: 'center' }}>
        Select a topic from the sidebar to begin.
      </div>
    );
  }

  const toggleReveal = (index) => {
    setReveal(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Title */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span className="topic-emoji" style={{ fontSize: 36 }}>{topic.emoji}</span>
          <h1 className="topic-title" style={{ margin: 0, color: 'var(--gold)', fontSize: 26, fontWeight: 800 }}>{topic.title}</h1>
        </div>
        
        {topic.tldr && (
          <div className="topic-tldr" style={{ 
            background: 'var(--blue-bg)', 
            border: '1px solid var(--blue)', 
            borderRadius: 8, 
            padding: "12px 18px", 
            color: 'var(--accent)', 
            fontSize: 15,
            lineHeight: 1.5
          }}>
            <span style={{ fontWeight: 700, marginRight: 8 }}>💡 TLDR:</span> 
            {topic.tldr}
          </div>
        )}
      </div>

      {/* Explanation */}
      {topic.explanation && (
        <Section label="📖 EXPLANATION">
          <div className="topic-section-content" style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: 8, 
            padding: 20, 
            lineHeight: 1.7, 
            fontSize: 15, 
            color: 'var(--text-secondary)' 
          }}>
            {topic.explanation.split('\n\n').map((p, i) => (
              <p key={i} style={{ margin: i === 0 ? 0 : "16px 0 0 0" }}>{p}</p>
            ))}
          </div>
        </Section>
      )}

      {/* Key Points */}
      {topic.keyPoints && topic.keyPoints.length > 0 && (
        <Section label="🔑 KEY POINTS">
          <div className="topic-section-content" style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: 8, 
            padding: 20 
          }}>
            {topic.keyPoints.map((p, i) => (
              <div key={i} style={{ 
                display: "flex", 
                gap: 12, 
                marginBottom: i < topic.keyPoints.length - 1 ? 12 : 0, 
                fontSize: 15, 
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}>▸</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Formula / Code */}
      {topic.formula && (
        <Section label="🧮 CODE / FORMULA / EXAMPLE">
          <div style={{ 
            background: 'var(--bg)', 
            border: '1px solid var(--blue)', 
            borderRadius: 8, 
            overflow: "hidden" 
          }}>
            <pre style={{ 
              margin: 0, 
              padding: 20, 
              fontSize: 14, 
              color: "#79c0ff", 
              overflowX: "auto", 
              lineHeight: 1.6 
            }}>
              {topic.formula.code}
            </pre>
            {topic.formula.explanation && (
              <div style={{ 
                borderTop: '1px solid var(--border)', 
                padding: "12px 20px", 
                fontSize: 14, 
                color: 'var(--muted)', 
                fontFamily: "var(--font-sans)",
                background: 'var(--surface)'
              }}>
                💬 {topic.formula.explanation}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Exam Tips */}
      {topic.examTips && topic.examTips.length > 0 && (
        <Section label="🎯 EXAM TIPS">
          <div style={{ 
            background: 'var(--green-bg)', 
            border: '1px solid var(--green-border)', 
            borderRadius: 8, 
            padding: 20 
          }}>
            {topic.examTips.map((tip, i) => (
              <div key={i} style={{ 
                display: "flex", 
                gap: 12, 
                marginBottom: i < topic.examTips.length - 1 ? 12 : 0, 
                fontSize: 15, 
                color: 'var(--green)',
                fontWeight: 500,
                lineHeight: 1.5
              }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}>⚡</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Q&A */}
      {topic.questions && topic.questions.length > 0 && (
        <Section label="❓ PRACTICE Q&A — CLICK TO REVEAL">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {topic.questions.map((qa, i) => (
              <div key={i} style={{ 
                background: '#1a1f28', 
                border: '1px solid var(--border)', 
                borderRadius: 8, 
                overflow: "hidden",
                transition: 'border-color 0.2s ease'
              }}>
                <button 
                  onClick={() => toggleReveal(i)} 
                  style={{ 
                    width: "100%", 
                    background: reveal[i] ? 'var(--surface-hover)' : 'none', 
                    border: "none", 
                    padding: "16px 20px", 
                    cursor: "pointer", 
                    textAlign: "left", 
                    color: 'var(--text-secondary)', 
                    fontFamily: "inherit", 
                    fontSize: 15, 
                    fontWeight: 600, 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    lineHeight: 1.5
                  }}
                >
                  <span>Q{i + 1}: {qa.q}</span>
                  <span style={{ 
                    color: 'var(--gold)', 
                    fontSize: 12, 
                    flexShrink: 0, 
                    marginLeft: 16,
                    fontWeight: 700
                  }}>
                    {reveal[i] ? "▲ HIDE" : "▼ SHOW"}
                  </span>
                </button>
                {reveal[i] && (
                  <div className="slide-in" style={{ 
                    padding: "16px 20px", 
                    borderTop: '1px solid var(--border)', 
                    fontSize: 15, 
                    color: 'var(--green)',
                    background: 'var(--bg)',
                    lineHeight: 1.6
                  }}>
                    ✓ {qa.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      <div style={{ height: 64 }} />
    </div>
  );
}
