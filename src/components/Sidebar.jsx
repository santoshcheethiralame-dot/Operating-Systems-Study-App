import { Link } from 'react-router-dom';

export default function Sidebar({ groups, topics, selectedTopicId, onSelectTopic, openGroups, toggleGroup, unitId }) {
  return (
    <div style={{
      width: 260,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      overflowY: 'auto',
      flexShrink: 0,
      padding: '8px 0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '10px 16px', marginBottom: 8, borderBottom: '1px solid var(--border)' }}>
        <Link to="/" style={{ 
          fontSize: 13, 
          color: 'var(--muted)', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 6,
          textDecoration: 'none'
        }}>
          <span>←</span> Back to Units
        </Link>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {groups.map(g => (
          <div key={g.name || g.group}>
            <button 
              onClick={() => toggleGroup(g.name || g.group)} 
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                padding: '8px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 11,
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                letterSpacing: 0.5,
              }}
            >
              <span>{(g.name || g.group).toUpperCase()}</span>
              <span style={{ opacity: 0.5 }}>{openGroups.has(g.name || g.group) ? "▾" : "▸"}</span>
            </button>
            
            {openGroups.has(g.name || g.group) && g.ids.map(id => {
              const topic = topics[id];
              if (!topic) return null;
              
              const isSelected = selectedTopicId === id;
              
              return (
                <button 
                  key={id} 
                  onClick={() => onSelectTopic(id)} 
                  style={{
                    width: '100%',
                    background: isSelected ? 'var(--blue-bg)' : 'none',
                    border: 'none',
                    borderLeft: isSelected ? '3px solid var(--gold)' : '3px solid transparent',
                    color: isSelected ? 'var(--gold)' : 'var(--text-secondary)',
                    padding: '8px 16px 8px 13px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontWeight: isSelected ? 600 : 400,
                  }}
                  className="sidebar-topic-btn"
                >
                  <span style={{ fontSize: 16 }}>{topic.emoji}</span>
                  <span style={{ 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {topic.title}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
