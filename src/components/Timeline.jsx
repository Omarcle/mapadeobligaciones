import { PLAZOS_GLOBALES, STATS } from '../data/obligaciones';
import { Calendar, Flag, Zap } from 'lucide-react';

export default function Timeline() {
  const hitos = [
    {
      fecha: '2 may 2026',
      label: 'Vigencia ENIA',
      desc: 'Entra en vigor la RM N° 152-2026-PCM — inicio del proceso de transformación',
      icon: <Flag size={16} />,
      color: '#D91023',
      done: true,
    },
    {
      fecha: '~90 días hábiles',
      label: 'Lineamientos OIA',
      desc: 'SGTD-PCM aprueba lineamientos sobre perfil, responsabilidades y designación del OIA',
      icon: <Zap size={16} />,
      color: '#F0A500',
      done: false,
    },
    {
      fecha: '~120 días hábiles',
      label: 'Catálogo IA Perú',
      desc: 'SGTD-PCM implementa el Catálogo IA Perú y aprueba el marco de referencia para gobierno de tecnologías y datos',
      icon: <Calendar size={16} />,
      color: '#00B4D8',
      done: false,
    },
    {
      fecha: 'Al tener Plan Gov. Datos',
      label: 'Formular Plan de Acción IA',
      desc: 'Cada entidad formula su Plan de Acción IA (mínimo 3 años) luego de designar el OIA y aprobar el Plan de Gobierno de Datos',
      icon: <Calendar size={16} />,
      color: '#06D6A0',
      done: false,
    },
  ];

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-red-600 via-yellow-500 to-teal-400 opacity-40" />
      
      <div className="space-y-4">
        {hitos.map((hito, i) => (
          <div key={i} className="flex gap-4 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
            {/* Icon bubble */}
            <div
              className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${hito.color}22`, border: `1px solid ${hito.color}44` }}
            >
              <span style={{ color: hito.color }}>{hito.icon}</span>
              {hito.done && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="glass rounded-xl p-3 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${hito.color}22`, color: hito.color }}
                >
                  {hito.fecha}
                </span>
                <span className="font-semibold text-sm text-white">{hito.label}</span>
                {hito.done && (
                  <span className="badge-ok flex items-center gap-1">✓ Publicado</span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{hito.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
