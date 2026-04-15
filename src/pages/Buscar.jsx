import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import personajes from '../data/personajes.json'
import regiones from '../data/regiones.json'
import casas from '../data/casas.json'
import dioses from '../data/dioses.json'
import timeline from '../data/timeline.json'
import monetario from '../data/monetario.json'

// Índice global de búsqueda
const INDEX = [
  ...personajes.map(p => ({
    id: p.id,
    tipo: 'personaje',
    nombre: p.nombre,
    subtitulo: p.titulo || p.casa || '',
    desc: p.rol || '',
    tags: [p.categoria, p.estado, p.casa, p.region].filter(Boolean),
    href: `/personajes/${p.id}`,
    badge: p.categoria,
    badgeClass: p.categoria === 'protagonista' ? 'badge-gold' : p.categoria === 'antagonista' ? 'badge-crimson' : p.categoria === 'especial' ? 'badge-purple' : '',
  })),
  ...regiones.map(r => ({
    id: r.id,
    tipo: 'región',
    nombre: r.nombre,
    subtitulo: r.cluster || '',
    desc: r.descripcion ? r.descripcion.slice(0, 80) : '',
    tags: [r.cluster, r.advocacion].filter(Boolean),
    href: `/mundo/region/${r.id}`,
    badge: 'región',
    badgeClass: '',
  })),
  ...casas.map(c => ({
    id: c.id,
    tipo: 'casa',
    nombre: c.nombre,
    subtitulo: c.region || '',
    desc: c.lema ? `"${c.lema}"` : '',
    tags: [c.tipo, c.estado, c.region, c.advocacion].filter(Boolean),
    href: `/mundo/casa/${c.id}`,
    badge: c.tipo,
    badgeClass: c.tipo === 'real' ? 'badge-gold' : '',
  })),
  ...dioses.map(d => ({
    id: d.id,
    tipo: 'dios',
    nombre: d.nombre,
    subtitulo: d.epiteto || d.dominio || '',
    desc: d.descripcion ? d.descripcion.slice(0, 80) : '',
    tags: [d.dominio, d.tipo, d.moneda].filter(Boolean),
    href: `/fe/dios/${d.id}`,
    badge: d.tipo === 'sellado' ? 'SELLADO' : 'dios',
    badgeClass: d.tipo === 'sellado' ? 'badge-crimson' : 'badge-purple',
  })),
  ...timeline.map(ev => ({
    id: ev.id,
    tipo: 'evento',
    nombre: ev.titulo,
    subtitulo: `${ev.era} · ${ev.fecha}`,
    desc: ev.desc ? ev.desc.slice(0, 80) : '',
    tags: [ev.era, ev.categoria, ev.sellado ? 'sellado' : null].filter(Boolean),
    href: '/fe/cronologia',
    badge: ev.categoria || 'evento',
    badgeClass: ev.sellado ? 'badge-crimson' : ev.categoria === 'magico' ? 'badge-purple' : '',
  })),
  ...monetario.map(m => ({
    id: m.id,
    tipo: 'moneda',
    nombre: m.nombre,
    subtitulo: `${m.valor?.toLocaleString()} unidades`,
    desc: m.descripcion || '',
    tags: ['economía', 'moneda'].filter(Boolean),
    href: '/fe/economia',
    badge: 'moneda',
    badgeClass: 'badge-gold',
  })),
]

const TIPOS = ['Todos', 'personaje', 'región', 'casa', 'dios', 'evento', 'moneda']

export default function Buscar() {
  const nav = useNavigate()
  const [query, setQuery] = useState('')
  const [tipoFilter, setTipoFilter] = useState('Todos')

  const resultados = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    return INDEX.filter(item => {
      const matchTipo = tipoFilter === 'Todos' || item.tipo === tipoFilter
      const matchQ = item.nombre.toLowerCase().includes(q) ||
        item.subtitulo.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      return matchTipo && matchQ
    })
  }, [query, tipoFilter])

  const total = INDEX.length

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      <div style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ color: 'var(--gold)', fontSize: '0.65rem', marginBottom: 'var(--sp-1)' }}>CODEX — BÚSQUEDA</div>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.08em' }}>Buscar</h1>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.65rem', marginTop: 'var(--sp-1)' }}>
          {total} entradas indexadas
        </div>
      </div>

      {/* Barra de búsqueda */}
      <input
        className="search-input"
        placeholder="Nombre, título, región, era, doctrina…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoFocus
        style={{ marginBottom: 'var(--sp-3)' }}
      />

      {/* Filtro tipo */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-4)', flexWrap: 'wrap' }}>
        {TIPOS.map(t => (
          <button
            key={t}
            className={`tab ${tipoFilter === t ? 'active' : ''}`}
            onClick={() => setTipoFilter(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Resultados */}
      {query.trim() === '' ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-8) 0' }}>
          <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
            INGRESA UNA BÚSQUEDA
          </div>
          <div style={{ marginTop: 'var(--sp-3)', fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            Personajes · Regiones · Casas<br/>
            Dioses · Eventos · Monedas
          </div>
          {/* Sugerencias rápidas */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', justifyContent: 'center', marginTop: 'var(--sp-4)' }}>
            {['Kahlren', 'Naevia', 'Vesteria', 'Pergamino', 'El Séptimo', 'Isvaren'].map(s => (
              <span
                key={s}
                className="badge"
                style={{ cursor: 'pointer', padding: '4px 12px', fontSize: '0.7rem' }}
                onClick={() => setQuery(s)}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ) : resultados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-8) 0' }}>
          <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
            SIN RESULTADOS PARA "{query.toUpperCase()}"
          </div>
          <div style={{ marginTop: 'var(--sp-2)', fontSize: '0.8rem', color: 'var(--muted)' }}>
            Intenta con otro término
          </div>
        </div>
      ) : (
        <>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-3)' }}>
            {resultados.length} resultado{resultados.length !== 1 ? 's' : ''}
          </div>

          <div className="grid-1" style={{ marginBottom: 'var(--sp-8)' }}>
            {resultados.map(item => (
              <div
                key={`${item.tipo}-${item.id}`}
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => nav(item.href)}
              >
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-1)' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', marginBottom: 2 }}>
                        {item.nombre}
                      </div>
                      {item.subtitulo && (
                        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>{item.subtitulo}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                      <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
                      <span className="mono" style={{ fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                        {item.tipo}
                      </span>
                    </div>
                  </div>
                  {item.desc && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4, marginTop: 'var(--sp-1)' }}>
                      {item.desc}{item.desc.length >= 80 ? '…' : ''}
                    </p>
                  )}
                  {item.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 'var(--sp-2)' }}>
                      {item.tags.slice(0, 3).map(t => (
                        <span
                          key={t}
                          className="mono"
                          style={{ fontSize: '0.55rem', color: 'var(--muted)', background: 'var(--surface-2, rgba(255,255,255,0.04))', padding: '2px 6px', borderRadius: 4 }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}
