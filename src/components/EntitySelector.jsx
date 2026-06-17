import { ENTITY_TYPES } from '../data/obligaciones';

export default function EntitySelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {ENTITY_TYPES.map((entity) => {
        const isSelected = selected?.id === entity.id;
        return (
          <button
            key={entity.id}
            onClick={() => onSelect(isSelected ? null : entity)}
            className={`relative p-4 rounded-2xl text-left transition-all duration-300 card-hover border ${
              isSelected
                ? 'border-yellow-400/60 bg-yellow-400/10'
                : 'border-white/10 glass hover:border-white/20'
            }`}
          >
            {isSelected && (
              <div className="absolute top-2 right-2">
                <div className="w-4 h-4 rounded-full enia-gradient flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            )}
            <div className="text-2xl mb-2">{entity.emoji}</div>
            <div className="text-xs font-semibold text-white leading-tight mb-1">{entity.label}</div>
            <div className="text-xs text-slate-400 leading-snug line-clamp-2">{entity.description}</div>
            <div className="mt-2">
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${entity.accent}22`, color: entity.accent }}
              >
                {entity.nivel}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
