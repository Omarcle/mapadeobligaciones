import { useState } from 'react';
import { ExternalLink, ChevronRight, BarChart2, Map, Clock, BookOpen, Bot } from 'lucide-react';
import StarField from './components/StarField';
import EntitySelector from './components/EntitySelector';
import ObligacionCard from './components/ObligacionCard';
import EjesEstrategicos from './components/EjesEstrategicos';
import Timeline from './components/Timeline';
import ChatBot from './components/ChatBot';
import { getObligaciones, STATS, EJES_ESTRATEGICOS } from './data/obligaciones';

const TABS = [
  { id: 'obligaciones', label: 'Obligaciones', icon: <BarChart2 size={15} /> },
  { id: 'ejes', label: 'Ejes ENIA', icon: <Map size={15} /> },
  { id: 'plazos', label: 'Cronograma', icon: <Clock size={15} /> },
];

export default function App() {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [activeTab, setActiveTab] = useState('obligaciones');
  const [chatOpen, setChatOpen] = useState(false);
  const [filterEje, setFilterEje] = useState(null);

  const obligaciones = selectedEntity ? getObligaciones(selectedEntity.id) : [];
  const filtered = filterEje
    ? obligaciones.filter((o) => o.eje === filterEje)
    : obligaciones;

  const urgentCount = obligaciones.filter((o) => o.estado === 'urgente').length;

  return (
    <div className="min-h-screen relative">
      <StarField />

      <div className="relative z-10">
        {/* Hero Header */}
        <header className="border-b border-white/10 px-4 pt-8 pb-6 text-center"
                style={{ background: 'linear-gradient(180deg, rgba(217,16,35,0.08) 0%, transparent 100%)' }}>
          <div className="max-w-4xl mx-auto">
            {/* Flag + badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🇵🇪</span>
              <span className="glass px-3 py-1 rounded-full text-xs font-medium text-yellow-400 border border-yellow-400/20">
                RM N° 152-2026-PCM · Vigente desde 2 mayo 2026
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2 leading-tight">
              Mapa de Obligaciones{' '}
              <span className="text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(90deg, #D91023, #F0A500)' }}>
                ENIA
              </span>
            </h1>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-5">
              Estrategia Nacional de Inteligencia Artificial 2026–2030 · Conoce exactamente qué debe hacer tu entidad pública
            </p>

            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {[
                { label: 'Entidades alcanzadas', value: STATS.entidades_alcance, emoji: '🏛️' },
                { label: 'Ejes estratégicos', value: STATS.ejes, emoji: '🎯' },
                { label: 'Vigente desde', value: '2 may 2026', emoji: '📅' },
                { label: 'Horizonte', value: STATS.horizonte, emoji: '🔭' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-xl p-3">
                  <div className="text-lg mb-0.5">{s.emoji}</div>
                  <div className="font-bold text-white text-sm font-display">{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
          
          {/* Step 1: Select entity */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg enia-gradient flex items-center justify-center text-white font-bold text-sm">1</div>
              <h2 className="font-display font-semibold text-white">¿Qué tipo de entidad pública eres?</h2>
            </div>
            <EntitySelector selected={selectedEntity} onSelect={setSelectedEntity} />
          </section>

          {/* Step 2: Results */}
          {selectedEntity && (
            <section className="animate-fade-in">
              {/* Entity banner */}
              <div
                className="rounded-2xl p-4 mb-5 flex items-center gap-4"
                style={{ background: `linear-gradient(135deg, ${selectedEntity.accent}15, ${selectedEntity.accent}05)`, border: `1px solid ${selectedEntity.accent}30` }}
              >
                <div className="text-4xl">{selectedEntity.emoji}</div>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-white text-lg">{selectedEntity.label}</h2>
                  <p className="text-sm text-slate-400">{selectedEntity.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-semibold" style={{ color: selectedEntity.accent }}>
                      {obligaciones.length} obligaciones totales
                    </span>
                    {urgentCount > 0 && (
                      <span className="badge-urgente text-white flex items-center gap-1">
                        ⚡ {urgentCount} urgentes
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex flex-col items-center gap-1 glass rounded-xl p-3 hover:bg-white/10 transition-colors"
                >
                  <Bot size={20} className="text-yellow-400" />
                  <span className="text-xs text-slate-400">Consultar IA</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 glass rounded-xl p-1 mb-5">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'enia-gradient text-white shadow-lg'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab: Obligaciones */}
              {activeTab === 'obligaciones' && (
                <div>
                  {/* Filter by eje */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    <button
                      onClick={() => setFilterEje(null)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                        !filterEje ? 'enia-gradient text-white' : 'glass text-slate-400 hover:text-white'
                      }`}
                    >
                      Todos ({obligaciones.length})
                    </button>
                    {EJES_ESTRATEGICOS.map((eje) => {
                      const count = obligaciones.filter((o) => o.eje === eje.id).length;
                      if (count === 0) return null;
                      return (
                        <button
                          key={eje.id}
                          onClick={() => setFilterEje(filterEje === eje.id ? null : eje.id)}
                          className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                            filterEje === eje.id
                              ? 'text-white'
                              : 'glass text-slate-400 hover:text-white'
                          }`}
                          style={filterEje === eje.id ? { background: eje.color } : {}}
                        >
                          {eje.emoji} {eje.nombre} ({count})
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filtered.map((obl, i) => (
                      <ObligacionCard key={obl.id} obligacion={obl} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Ejes */}
              {activeTab === 'ejes' && <EjesEstrategicos />}

              {/* Tab: Plazos */}
              {activeTab === 'plazos' && (
                <div>
                  <div className="mb-4 glass rounded-xl p-3 text-sm text-slate-300 border border-yellow-400/20">
                    <span className="text-yellow-400 font-semibold">📌 Nota:</span> Los plazos en días hábiles son contados desde la publicación de la RM N° 152-2026-PCM (2 mayo 2026). Los plazos institucionales dependen de cuándo la SGTD-PCM emita los lineamientos.
                  </div>
                  <Timeline />
                </div>
              )}

              {/* Source link */}
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
                <BookOpen size={12} />
                <span>Fuente oficial:</span>
                <a
                  href="https://cdn.www.gob.pe/uploads/document/file/9902385/8081563-anexo-rm-n-152-2026-pcm-enia%282%29.pdf?v=1778018141"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  ENIA 2026-2030 (PDF oficial) <ExternalLink size={10} />
                </a>
              </div>
            </section>
          )}

          {/* Empty state */}
          {!selectedEntity && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 animate-float">🗺️</div>
              <p className="text-slate-400 text-sm">Selecciona tu tipo de entidad para ver tus obligaciones</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-yellow-400 text-xs">
                <ChevronRight size={14} />
                ¿Tienes dudas? Abre el chat con ENIA-Bot 🤖
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-4 px-4 text-center">
          <p className="text-xs text-slate-500">
            Mapa de Obligaciones ENIA · Basado en RM N° 152-2026-PCM · No es asesoría legal oficial
          </p>
        </footer>
      </div>

      {/* AI Chat Bot */}
      <ChatBot
        entityContext={selectedEntity}
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
      />
    </div>
  );
}
