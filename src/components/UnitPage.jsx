import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopicView from './TopicView';
import { UNITS } from '../data/units';

// Dynamic import strategy for unit data to avoid massive bundle
const unitModules = {
  1: () => import('../data/unit1.js'),
  2: () => import('../data/unit2.js'),
  3: () => import('../data/unit3.js'),
  4: () => import('../data/unit4.js'),
};

export default function UnitPage() {
  const { unitId } = useParams();
  const idNum = parseInt(unitId, 10);
  
  const unitMeta = UNITS.find(u => u.id === idNum);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [openGroups, setOpenGroups] = useState(new Set());
  
  useEffect(() => {
    if (!unitMeta || !unitModules[idNum]) return;
    
    setLoading(true);
    unitModules[idNum]()
      .then(module => {
        setData(module);
        
        // Auto-open first group and select first topic
        if (module.groups && module.groups.length > 0) {
          const firstGroup = module.groups[0];
          const groupName = firstGroup.name || firstGroup.group;
          setOpenGroups(new Set([groupName]));
          
          if (firstGroup.ids && firstGroup.ids.length > 0) {
            setSelectedTopicId(firstGroup.ids[0]);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load unit data:", err);
        setLoading(false);
      });
  }, [idNum, unitMeta]);
  
  const toggleGroup = (name) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  if (!unitMeta) return <Navigate to="/" />;

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
        Loading topics...
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: 40, color: 'var(--red)' }}>
        Error loading unit data.
        <br/><br/>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const selectedTopic = selectedTopicId && data.topics ? data.topics[selectedTopicId] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ 
        background: 'var(--surface)', 
        borderBottom: '1px solid var(--border)', 
        padding: "12px 20px", 
        display: "flex", 
        alignItems: "center", 
        gap: 16, 
        flexShrink: 0 
      }}>
        <span style={{ fontSize: 24 }}>{unitMeta.emoji}</span>
        <span style={{ fontWeight: 800, color: 'var(--gold)', letterSpacing: 1 }}>
          {unitMeta.title.toUpperCase()}
        </span>
        <span style={{ 
          background: 'var(--blue)', 
          color: "#fff", 
          borderRadius: 4, 
          padding: "2px 8px", 
          fontSize: 11,
          fontWeight: 'bold'
        }}>
          UNIT {idNum}
        </span>
        <span style={{ marginLeft: "auto", color: 'var(--muted)', fontSize: 12, fontWeight: 500 }}>
          {Object.keys(data.topics || {}).length} topics
        </span>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: 'relative' }}>
        <Sidebar 
          groups={data.groups || []} 
          topics={data.topics || {}} 
          selectedTopicId={selectedTopicId} 
          onSelectTopic={setSelectedTopicId} 
          openGroups={openGroups} 
          toggleGroup={toggleGroup}
          unitId={idNum}
        />

        {/* Main Content Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          <TopicView topic={selectedTopic} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        background: 'var(--surface)', 
        borderTop: '1px solid var(--border)', 
        padding: "8px 20px", 
        display: "flex", 
        gap: 20, 
        fontSize: 12, 
        color: 'var(--muted)', 
        flexShrink: 0,
        alignItems: 'center'
      }}>
        <span>📚 {Object.keys(data.topics || {}).length} subtopics</span>
        <span>•</span>
        {selectedTopic && (
          <>
            <span>Current: <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{selectedTopic.title}</span></span>
            <span>•</span>
          </>
        )}
        <span>Tip: Click any Q&A question to toggle the answer.</span>
      </div>
    </div>
  );
}
