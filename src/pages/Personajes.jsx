import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import personajes from '../data/personajes.json'

const CATEGORIAS = ['Todos', 'protagonista', 'secundario', 'dios', 'antagonista', 'especial']
const ESTADOS = ['Todos', 'vivo', 'muerto', 'desaparecido', 'inmortal', 'sellado']

const BADGE_MAP = {
  protagonista: 'badge-gold',
  antagonista: 'badge-crimson',
  especial: 'badge-purple',
  dios: 'badge-purple',
  secundario: '',
}

export default function Personajes() {
  const nav = useNavigate()
  const [catFilter, setCatFilter] = useState('Todos')
  const [estadoFilter, setEstadoFilter] = useState('Todos')
  const [query, setQuery] = useState('')

  const filtered = personajes.filter(p => {
    const matchCat = catFilter === 'Todos' || p.categoria === catFilter
    const matchEst = estadoFilter === 'Todos' || p.estado === estadoFilter
    const matchQ = !query || p.nombre.toLowerCase().includes(query.toLowerCase()) ||
      (p.titulo && p.titulo.toLowerCase().includes(query.toLowerCase())) ||
      (p.casa && p.casa.toLowerCase().includes(query.toLowerCase()))
    return matchCat && matchEst && matchQ
  })

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      <div className="section-header" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ color: 'var(--gold)', fontSize: '0.65rem', marginBottom: 'var(--sp-1)' }}>CODEX — PERSONAS</div>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.08em' }}>Personajes</h1>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.65rem', marginTop: 'var(--sp-1)' }}>{personajes.length} entradas registradas</div>
      </div>

      {/* Search */}
      <input
        className="search-input"
        placeholder="Buscar por nombre, título, casa…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginBottom: 'var(--sp-3)' }}
      />

      {/* Filtro categoría */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-2)' }}>
        {CATEGORIAS.map(c => (
          <button
            key={c}
            className={`tab ${catFilter === c ? 'active' : ''}`}
            onClick={() => setCatFilter(c)}
          >
            {c === 'Todos' ? 'Todos' : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Filtro estado */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-4)' }}>
        {ESTADOS.map(e => (
          <button
            key={e}
            className={`tab ${estadoFilter === e ? 'active' : ''}`}
            onClick={() => setEstadoFilter(e)}
          >
            {e === 'Todos' ? 'Todos' : e.charAt(0).toUpperCase() + e.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)' }}>
        {filtered.length} resultados
      </div>

      <div className="grid-1" style={{ marginBottom: 'var(--sp-8)' }}>
        {filtered.map(p => (
          <div
            key={p.id}
            className={`card ${p.categoria === 'antagonista' ? 'card-accent card-accent-crimson' : p.categoria === 'especial' || p.categoria === 'dios' ? 'card-accent card-accent-purple' : p.categoria === 'protagonista' ? 'card-accent' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => nav(`/personajes/${p.id}`)}
          >
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-1)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', marginBottom: 2 }}>{p.nombre}</div>
                  {p.titulo && (
                    <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>{p.titulo}</div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span className={`badge ${BADGE_MAP[p.categoria] || ''}`}>{p.categoria}</span>
                  <span className={`badge ${p.estado === 'muerto' ? 'badge-crimson' : p.estado === 'vivo' ? '' : p.estado === 'inmortal' || p.estado === 'sellado' ? 'badge-purple' : ''}`}
                    style={{ fontSize: '0.55rem' }}>
                    {p.estado}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-1)' }}>
                {p.casa && <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>◈ {p.casa}</div>}
                {p.region && <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>⌖ {p.region}</div>}
              </div>
              {p.rol && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 'var(--sp-2)', lineHeight: 1.4 }}>
                  {p.rol}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
