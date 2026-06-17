import { EJES_ESTRATEGICOS } from '../data/obligaciones';

const EJE_DETAIL = {
  talento: {
    items: [
      'Programas de capacitación para servidores públicos',
      'Programa Nacional de IA (SGTD-PCM)',
      'Articulación con SERVIR y universidades',
      'Formación en ética de IA',
    ],
  },
  innovacion: {
    items: [
      'Plataforma Nacional de IA',
      'Centro Nacional de Innovación Digital e IA (CNIDIA)',
      'Entornos Sandbox tecnológicos y regulatorios',
      'Proyectos en sectores productivos estratégicos',
    ],
  },
  etica: {
    items: [
      'NTP-ISO/IEC 42001:2025 obligatoria para entidades públicas',
      'Transparencia algorítmica y evaluación de impacto ético',
      'Convenio Marco del Consejo de Europa sobre IA',
      'Gobernanza de datos y seguridad digital',
    ],
  },
  participacion: {
    items: [
      'Plataforma Participa Perú',
      'Cooperación internacional en foros IA',
      'Catálogo IA Perú — plataforma abierta',
      'Adhesión al Convenio del Consejo de Europa sobre IA',
    ],
  },
};

export default function EjesEstrategicos() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {EJES_ESTRATEGICOS.map((eje, i) => {
        const detail = EJE_DETAIL[eje.id];
        return (
          <div
            key={eje.id}
            className="glass rounded-2xl p-4 card-hover animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${eje.color}22` }}
              >
                {eje.emoji}
              </div>
              <div>
                <div className="font-semibold text-sm text-white font-display">{eje.nombre}</div>
                <div className="text-xs text-slate-400">{eje.descripcion}</div>
              </div>
            </div>
            <ul className="space-y-1.5">
              {detail.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: eje.color }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
