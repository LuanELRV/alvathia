import { useParams, useNavigate } from 'react-router-dom'
import regiones from '../data/regiones.json'
import casas from '../data/casas.json'
import personajes from '../data/personajes.json'

export default function RegionDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const r = regiones.find(x => x.id === id)

  if (!r) {
    return (
      <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)', textAlign: 'center' }}>
        <div className="mono" style={{ color: 'var(--muted)' }}>REGIÓN NO ENCONTRADA</div>
        <button onClick={() => nav('/mundo')} style={{ marginTop: 'var(--sp-4)', background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>← Mundo</button>
      </div>
    )
  }

  const casasDeRegion = casas.filter(c =>
    c.region && c.region.toLowerCase().includes(r.nombre.toLowerCase().split(' ')[0].toLowerCase())
  )
  const pjsDeRegion = personajes.filter(p =>
    p.region && p.region.toLowerCase().includes(r.nombre.toLowerCase().split(' ')[0].toLowerCase())
  )

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      {/* Back */}
      <button
        onClick={() => nav('/mundo')}
        style={{ background: 'none', border: 'none', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', cursor: 'pointer', padding: 0, marginBottom: 'var(--sp-4)', letterSpacing: '0.08em' }}
      >
        ← MUNDO
      </button>

      {/* Header */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--gold-dim)',
        borderLeft: '3px solid var(--gold)',
        borderRadius: 'var(--r-lg)',
        padding: 'var(--sp-4)',
        marginBottom: 'var(--sp-4)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)' }}>
          <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}>
            {r.nombre}
          </h1>
          <span className="badge badge-gold">{r.id}</span>
        </div>
        {r.advocacion && (
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--gold)', marginBottom: 'var(--sp-2)' }}>
            ✦ Bajo la advocación de {r.advocacion}
          </div>
        )}
        {r.cluster && (
          <span className="badge">{r.cluster}</span>
        )}
      </div>

      {/* Datos */}
      <div className="detail-block" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)', letterSpacing: '0.1em' }}>GEOGRAFÍA</div>
        {r.area && (
          <div className="info-row">
            <span className="info-label">Área</span>
            <span className="info-val">{r.area.toLocaleString()} km²</span>
          </div>
        )}
        {r.provincias !== undefined && (
          <div className="info-row">
            <span className="info-label">Provincias</span>
            <span className="info-val">{r.provincias}</span>
          </div>
        )}
        {r.monedaDominante && (
          <div className="info-row">
            <span className="info-label">Moneda dominante</span>
            <span className="info-val">{r.monedaDominante}</span>
          </div>
        )}
        {r.fronteras && r.fronteras.length > 0 && (
          <div className="info-row" style={{ alignItems: 'flex-start' }}>
            <span className="info-label">Fronteras</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {r.fronteras.map(f => (
                <span key={f} className="badge" style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const rf = regiones.find(x => x.id === f || x.nombre === f)
                    if (rf) nav(`/mundo/region/${rf.id}`)
                  }}
                >{f}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Descripción */}
      {r.descripcion && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-4)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)' }}>DESCRIPCIÓN</div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--text)' }}>{r.descripcion}</p>
        </div>
      )}

      {/* Economía */}
      {r.economia && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-4)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)' }}>ECONOMÍA</div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--text)' }}>{r.economia}</p>
        </div>
      )}

      {/* Locaciones */}
      {r.locaciones && r.locaciones.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="section-title">Locaciones</div>
          <div className="grid-1">
            {r.locaciones.map((loc, i) => (
              <div key={i} className="card">
                <div className="card-body">
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', marginBottom: 2 }}>
                    {typeof loc === 'string' ? loc : loc.nombre}
                  </div>
                  {loc.tipo && <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>{loc.tipo}</div>}
                  {loc.desc && <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 'var(--sp-1)', lineHeight: 1.4 }}>{loc.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Provincias */}
      {r.provinciasList && r.provinciasList.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="section-title">Provincias</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
            {r.provinciasList.map((prov, i) => (
              <span key={i} className="badge" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>
                {typeof prov === 'string' ? prov : prov.nombre}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Casas */}
      {casasDeRegion.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="section-title">Casas Nobles</div>
          <div className="grid-1">
            {casasDeRegion.map(c => (
              <div key={c.id} className="card" style={{ cursor: 'pointer' }} onClick={() => nav(`/mundo/casa/${c.id}`)}>
                <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}>{c.nombre}</div>
                  <span className={`badge ${c.estado === 'extinta' ? 'badge-crimson' : ''}`}>{c.estado}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personajes */}
      {pjsDeRegion.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-8)' }}>
          <div className="section-title">Personajes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
            {pjsDeRegion.map(p => (
              <span
                key={p.id}
                className="persona-chip"
                style={{ cursor: 'pointer' }}
                onClick={() => nav(`/personajes/${p.id}`)}
              >
                {p.nombre}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Nota interna */}
      {r.notaInterna && (
        <div style={{
          background: 'rgba(201, 150, 58, 0.06)',
          border: '1px solid rgba(201, 150, 58, 0.15)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-8)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--gold)', marginBottom: 'var(--sp-2)' }}>◈ NOTA DEL CODEX</div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>{r.notaInterna}</p>
        </div>
      )}

    </div>
  )
}
