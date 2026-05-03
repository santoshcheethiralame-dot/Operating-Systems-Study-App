import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UNITS } from '../data/units';

// Dynamic import for all topics for searching
let allTopicsCache = null;

const loadAllTopics = async () => {
  if (allTopicsCache) return allTopicsCache;
  
  try {
    const modules = await Promise.all([
      import('../data/unit1.js'),
      import('../data/unit2.js'),
      import('../data/unit3.js'),
      import('../data/unit4.js')
    ]);
    
    const combined = [];
    modules.forEach((mod, index) => {
      const unitId = index + 1;
      const unitMeta = UNITS.find(u => u.id === unitId);
      
      if (mod.topics) {
        Object.entries(mod.topics).forEach(([id, topic]) => {
          combined.push({
            id,
            unitId,
            unitTitle: unitMeta.shortTitle,
            ...topic
          });
        });
      }
    });
    
    allTopicsCache = combined;
    return combined;
  } catch (err) {
    console.error("Failed to load topics for search", err);
    return [];
  }
};

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      if (!topics) {
        setIsLoading(true);
        loadAllTopics().then(data => {
          setTopics(data);
          setIsLoading(false);
        });
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen, topics]);

  useEffect(() => {
    if (!query.trim() || !topics) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = topics.filter(t => {
      if (t.title?.toLowerCase().includes(q)) return true;
      if (t.tldr?.toLowerCase().includes(q)) return true;
      if (t.keyPoints?.some(kp => kp.toLowerCase().includes(q))) return true;
      return false;
    }).slice(0, 10); // Limit to top 10 results

    setResults(matches);
  }, [query, topics]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '10vh',
      zIndex: 1000,
      fontFamily: 'var(--font-sans)'
    }}>
      <div style={{
        background: 'var(--surface)',
        width: '100%',
        maxWidth: 600,
        borderRadius: 12,
        border: '1px solid var(--border)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh'
      }}>
        {/* Search Input */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)' 
        }}>
          <span style={{ fontSize: 20, marginRight: 12 }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search topics, concepts, key points..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              fontSize: 18,
              outline: 'none',
            }}
          />
          <button 
            onClick={onClose}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              color: 'var(--muted)',
              padding: '4px 8px',
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ESC
          </button>
        </div>

        {/* Results area */}
        <div style={{ overflowY: 'auto', flex: 1, background: 'var(--bg)' }}>
          {isLoading && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
              Loading search index...
            </div>
          )}
          
          {!isLoading && query && results.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
              No results found for "{query}"
            </div>
          )}
          
          {!isLoading && results.length > 0 && (
            <div style={{ padding: 12 }}>
              {results.map((result, i) => (
                <button
                  key={result.id}
                  onClick={() => {
                    onClose();
                    navigate(`/unit/${result.unitId}?topic=${result.id}`);
                  }}
                  style={{
                    width: '100%',
                    background: i === 0 ? 'var(--blue-bg)' : 'transparent',
                    border: 'none',
                    borderLeft: i === 0 ? '3px solid var(--accent)' : '3px solid transparent',
                    padding: '12px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '0 6px 6px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = i === 0 ? 'var(--blue-bg)' : 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{result.emoji}</span>
                    <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: 15 }}>{result.title}</span>
                    <span style={{ 
                      marginLeft: 'auto', 
                      fontSize: 11, 
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                      padding: '2px 6px',
                      borderRadius: 4
                    }}>
                      UNIT {result.unitId}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.4 }}>
                    {result.tldr}
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {!query && !isLoading && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
              Start typing to search across all OS units.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
