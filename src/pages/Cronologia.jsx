import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import timeline from '../data/timeline.json'
import personajes from '../data/personajes.json'

const CATEGORIAS = ['Todos', 'magico', 'politico', 'narrativo']
const ERAS = ['Todos', 'ERA-0', 'ERA-1', 'ERA-2', 'ERA-3', 'ERA-4']

const CAT_LABEL = { magico: 'Mágico', politico: 'Político', narrativo: 'Narrativo' }
const CAT_COLOR = { magico: 'var(--purple)', politico: 'var(--gold)', narrativo: 'var(--text)' }

export default function Cronologia() {
  const nav = useNavigate()
  const [catFilter, setCatFilter] = useState('Todos')
  const [eraFilter, setEraFilter] = useState('Todos')

  const filtered = timeline.filter(ev => {
    const matchCat = catFilter === 'Todos' || ev.categoria === catFilter
    const matchEra = eraFilter === 'Todos' || ev.era === eraFilter
    return matchCat && matchEra
  })

  // Agrupar por era
  const porEra = {}
  filtered.forEach(ev => {
    const era = ev.era || 'Sin era'
    if (!porEra[era]) porEra[era] = []
    porEra[era].push(ev)
  })

  const erasOrdenadas = Object.keys(porEra).sort()

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      <button
        onClick={() => nav('/fe')}
        style={{ background: 'none', border: 'none', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', cursor: 'pointer', padding: 0, marginBottom: 'var(--sp-4)', letterSpacing: '0.08em' }}
      >
        ← FE
      </button>

      <div style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ color: 'var(--gold)', fontSize: '0.65rem', marginBottom: 'var(--sp-1)' }}>CODEX — CRONOLOGÍA</div>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.08em' }}>Historia de Alváthia</h1>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.65rem', marginTop: 'var(--sp-1)' }}>
          {timeline.length} eventos · ERA-0 hasta ERA-4
        </div>
      </div>

      {/* Filtros */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-2)' }}>
        {CATEGORIAS.map(c => (
          <button
            key={c}
            className={`tab ${catFilter === c ? 'active' : ''}`}
            onClick={() => setCatFilter(c)}
          >
            {c === 'Todos' ? 'Todos' : CAT_LABEL[c] || c}
          </button>
        ))}
      </div>

      <div className="tabs" style={{ marginBottom: 'var(--sp-4)' }}>
        {ERAS.map(e => (
          <button
            key={e}
            className={`tab ${eraFilter === e ? 'active' : ''}`}
            onClick={() => setEraFilter(e)}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-3)' }}>
        {filtered.length} eventos
      </div>

      {/* Timeline por era */}
      <div style={{ marginBottom: 'var(--sp-8)' }}>
        {erasOrdenadas.map(era => (
          <div key={era} style={{ marginBottom: 'var(--sp-6)' }}>

            {/* Era header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sp-3)',
              marginBottom: 'var(--sp-3)',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--gold)',
                letterSpacing: '0.12em',
                padding: '3px 10px',
                border: '1px solid var(--gold-dim)',
                borderRadius: 'var(--r-sm)',
              }}>
                {era}
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            {/* Eventos de la era */}
            <div style={{ position: 'relative', paddingLeft: 20 }}>
              <div style={{
                position: 'absolute',
                left: 6,
                top: 6,
                bottom: 6,
                width: 1,
                background: 'linear-gradient(180deg, var(--gold-dim), transparent)',
              }} />

              {porEra[era].map((ev, i) => {
                const catColor = CAT_COLOR[ev.categoria] || 'var(--text)'
                const pjsEvento = ev.personajes && ev.personajes
                  .map(pid => personajes.find(p => p.id === pid))
                  .filter(Boolean)

                return (
                  <div
                    key={ev.id}
                    style={{
                      position: 'relative',
                      marginBottom: 'var(--sp-3)',
                    }}
                  >
                    {/* Dot */}
                    <div style={{
                      position: 'absolute',
                      left: -17,
                      top: 6,
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: ev.sellado ? 'var(--crimson)' : catColor,
                      boxShadow: `0 0 6px ${ev.sellado ? 'var(--crimson)' : catColor}60`,
                    }} />

                    <div style={{
                      background: 'var(--surface)',
                      border: `1px solid ${ev.sellado ? 'rgba(139,38,53,0.3)' : 'var(--border)'}`,
                      borderRadius: 'var(--r-md)',
                      padding: 'var(--sp-3)',
                      ...(ev.sellado ? { background: 'rgba(21,6,8,0.5)' } : {}),
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-1)' }}>
                        <div>
                          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 2 }}>
                            {ev.fecha}
                          </div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: ev.sellado ? 'var(--crimson)' : 'var(--text)' }}>
                            {ev.titulo}
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                          {ev.categoria && (
                            <span className="mono" style={{ fontSize: '0.55rem', color: catColor, letterSpacing: '0.08em' }}>
                              {CAT_LABEL[ev.categoria] || ev.categoria}
                            </span>
                          )}
                          {ev.sellado && <span className="badge badge-crimson" style={{ fontSize: '0.5rem' }}>SELLADO</span>}
                        </div>
                      </div>

                      {ev.desc && (
                        <p style={{ fontSize: '0.78rem', lineHeight: 1.5, color: 'var(--text-dim)', marginTop: 'var(--sp-1)' }}>
                          {ev.desc}
                        </p>
                      )}

                      {pjsEvento && pjsEvento.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 'var(--sp-2)' }}>
                          {pjsEvento.map(pj => (
                            <span
                              key={pj.id}
                              className="persona-chip"
                              style={{ cursor: 'pointer' }}
                              onClick={() => nav(`/personajes/${pj.id}`)}
                            >
                              {pj.nombre}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
