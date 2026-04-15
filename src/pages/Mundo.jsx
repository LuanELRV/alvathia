import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import regiones from '../data/regiones.json'
import casas from '../data/casas.json'

const TABS = ['Regiones', 'Casas Nobles']

const CLUSTER_LABEL = {
  norte: 'Norte',
  sur: 'Sur',
  este: 'Este',
  oeste: 'Oeste',
  centro: 'Centro',
  continental: 'Continental',
  insular: 'Insular',
}

export default function Mundo() {
  const nav = useNavigate()
  const [tab, setTab] = useState('Regiones')
  const [cluster, setCluster] = useState('Todos')

  const clusters = ['Todos', ...new Set(regiones.map(r => r.cluster).filter(Boolean))]

  const filteredRegiones = regiones.filter(r =>
    cluster === 'Todos' || r.cluster === cluster
  )

  const casasPorTipo = {
    real: casas.filter(c => c.tipo === 'real'),
    mayor: casas.filter(c => c.tipo === 'mayor'),
    menor: casas.filter(c => c.tipo === 'menor'),
  }

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      <div style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ color: 'var(--gold)', fontSize: '0.65rem', marginBottom: 'var(--sp-1)' }}>CODEX — GEOGRAFÍA</div>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.08em' }}>El Mundo</h1>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.65rem', marginTop: 'var(--sp-1)' }}>
          {regiones.length} reinos · {casas.length} casas nobles
        </div>
      </div>

      {/* Stats rápidas */}
      <div className="grid-2" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="stat-box">
          <div className="stat-val">{regiones.reduce((a, r) => a + (r.provincias || 0), 0)}</div>
          <div className="stat-label">Provincias</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{regiones.reduce((a, r) => a + (r.locaciones?.length || 0), 0)}</div>
          <div className="stat-label">Locaciones</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-4)' }}>
        {TABS.map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* ── REGIONES ── */}
      {tab === 'Regiones' && (
        <>
          {/* Filtro cluster */}
          <div className="tabs" style={{ marginBottom: 'var(--sp-4)', flexWrap: 'wrap' }}>
            {clusters.map(c => (
              <button
                key={c}
                className={`tab ${cluster === c ? 'active' : ''}`}
                onClick={() => setCluster(c)}
              >
                {c === 'Todos' ? 'Todos' : (CLUSTER_LABEL[c] || c)}
              </button>
            ))}
          </div>

          <div className="grid-1" style={{ marginBottom: 'var(--sp-8)' }}>
            {filteredRegiones.map(r => (
              <div
                key={r.id}
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => nav(`/mundo/region/${r.id}`)}
              >
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-1)' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>{r.nombre}</div>
                      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 2 }}>
                        {r.id}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                      {r.cluster && (
                        <span className="badge">{CLUSTER_LABEL[r.cluster] || r.cluster}</span>
                      )}
                      {r.provincias > 0 && (
                        <span className="mono" style={{ fontSize: '0.55rem', color: 'var(--muted)' }}>
                          {r.provincias} prov.
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', marginTop: 'var(--sp-1)' }}>
                    {r.area && (
                      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
                        ◫ {r.area.toLocaleString()} km²
                      </div>
                    )}
                    {r.advocacion && (
                      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--gold-dim)' }}>
                        ✦ {r.advocacion}
                      </div>
                    )}
                  </div>

                  {r.descripcion && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 'var(--sp-2)', lineHeight: 1.4 }}>
                      {r.descripcion.length > 120 ? r.descripcion.slice(0, 120) + '…' : r.descripcion}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── CASAS NOBLES ── */}
      {tab === 'Casas Nobles' && (
        <div style={{ marginBottom: 'var(--sp-8)' }}>

          {/* Reales */}
          {casasPorTipo.real.length > 0 && (
            <>
              <div className="section-title">Casas Reales</div>
              <div className="grid-1" style={{ marginBottom: 'var(--sp-4)' }}>
                {casasPorTipo.real.map(c => (
                  <CasaCard key={c.id} casa={c} nav={nav} color="var(--gold)" />
                ))}
              </div>
            </>
          )}

          {/* Mayores */}
          {casasPorTipo.mayor.length > 0 && (
            <>
              <div className="section-title">Casas Mayores</div>
              <div className="grid-1" style={{ marginBottom: 'var(--sp-4)' }}>
                {casasPorTipo.mayor.map(c => (
                  <CasaCard key={c.id} casa={c} nav={nav} color="var(--text)" />
                ))}
              </div>
            </>
          )}

          {/* Menores */}
          {casasPorTipo.menor && casasPorTipo.menor.length > 0 && (
            <>
              <div className="section-title">Casas Menores</div>
              <div className="grid-1">
                {casasPorTipo.menor.map(c => (
                  <CasaCard key={c.id} casa={c} nav={nav} color="var(--muted)" />
                ))}
              </div>
            </>
          )}
        </div>
      )}

    </div>
  )
}

function CasaCard({ casa, nav, color }) {
  return (
    <div
      className="card"
      style={{ cursor: 'pointer' }}
      onClick={() => nav(`/mundo/casa/${casa.id}`)}
    >
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-1)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color }}>{casa.nombre}</div>
            {casa.lema && (
              <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 2, fontStyle: 'italic' }}>
                "{casa.lema}"
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
            <span className={`badge ${casa.estado === 'extinta' ? 'badge-crimson' : casa.estado === 'interregno' ? 'badge-purple' : ''}`}>
              {casa.estado}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
          {casa.region && (
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>⌖ {casa.region}</div>
          )}
          {casa.advocacion && (
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--gold-dim)' }}>✦ {casa.advocacion}</div>
          )}
        </div>
      </div>
    </div>
  )
}
