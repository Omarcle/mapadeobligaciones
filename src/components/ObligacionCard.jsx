import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, User, BookOpen, AlertTriangle, CheckCircle, Circle } from 'lucide-react';
import { EJES_ESTRATEGICOS } from '../data/obligaciones';

const STATUS_CONFIG = {
  urgente: {
    label: 'Urgente',
    className: 'badge-urgente text-white',
    icon: <AlertTriangle size={10} />,
  },
  pendiente: {
    label: 'Pendiente',
    className: 'badge-pendiente',
    icon: <Circle size={10} />,
  },
  completado: {
    label: 'Completado',
    className: 'badge-ok',
    icon: <CheckCircle size={10} />,
  },
};

export default function ObligacionCard({ obligacion, index }) {
  const [expanded, setExpanded] = useState(false);
  const eje = EJES_ESTRATEGICOS.find((e) => e.id === obligacion.eje);
  const status = STATUS_CONFIG[obligacion.estado] || STATUS_CONFIG.pendiente;

  return (
    <div
      className="glass rounded-2xl overflow-hidden card-hover animate-slide-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${eje?.color || '#F0A500'}, transparent)` }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${eje?.color || '#F0A500'}22` }}
          >
            {obligacion.icono}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`flex items-center gap-1 ${status.className}`}>
                {status.icon}
                {status.label}
              </span>
              {eje && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${eje.color}22`, color: eje.color }}
                >
                  {eje.emoji} {eje.nombre}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-sm leading-snug text-white">
              {obligacion.titulo}
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {obligacion.descripcion}
        </p>

        {/* Meta info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="flex items-start gap-2 text-xs text-slate-400">
            <Clock size={13} className="text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-yellow-400 font-medium">Plazo</div>
              <div>{obligacion.plazo_referencia}</div>
            </div>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-400">
            <User size={13} className="text-teal-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-teal-400 font-medium">Responsable</div>
              <div>{obligacion.responsable}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <BookOpen size={12} />
          <span>{obligacion.norma}</span>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} /> Ocultar detalle
            </>
          ) : (
            <>
              <ChevronDown size={14} /> Ver detalle
            </>
          )}
        </button>

        {/* Expanded detail */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-white/10 animate-fade-in">
            <p className="text-xs text-slate-400 font-medium mb-2">📋 Detalle de implementación:</p>
            <ul className="space-y-1.5">
              {obligacion.detalle.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                    style={{ background: `${eje?.color || '#F0A500'}33`, color: eje?.color || '#F0A500' }}
                  >
                    {i + 1}
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-3 p-2 rounded-lg bg-white/5 text-xs text-slate-400">
              <span className="text-yellow-400 font-medium">⏱ Plazo completo: </span>
              {obligacion.plazo}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
