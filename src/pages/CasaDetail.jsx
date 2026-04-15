import { useParams, useNavigate } from 'react-router-dom'
import casas from '../data/casas.json'
import personajes from '../data/personajes.json'
import regiones from '../data/regiones.json'

export default function CasaDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const c = casas.find(x => x.id === id)

  if (!c) {
    return (
      <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)', textAlign: 'center' }}>
        <div className="mono" style={{ color: 'var(--muted)' }}>CASA NO ENCONTRADA</div>
        <button onClick={() => nav('/mundo')} style={{ marginTop: 'var(--sp-4)', background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>← Mundo</button>
      </div>
    )
  }

  const pjsDeCasa = personajes.filter(p =>
    p.casa && p.casa.toLowerCase().includes(c.nombre.toLowerCase().replace('Casa ', ''))
  )

  const region = c.region && regiones.find(r =>
    r.nombre.toLowerCase().includes(c.region.toLowerCase().split(' ')[0].toLowerCase())
  )

  const accentColor = c.tipo === 'real' ? 'var(--gold)' :
    c.estado === 'extinta' ? 'var(--crimson)' : 'var(--text)'

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      <button
        onClick={() => nav('/mundo')}
        style={{ background: 'none', border: 'none', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', cursor: 'pointer', padding: 0, marginBottom: 'var(--sp-4)', letterSpacing: '0.08em' }}
      >
        ← MUNDO
      </button>

      {/* Header */}
      <div style={{
        background: 'var(--surface)',
        border: `1px solid ${accentColor}40`,
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: 'var(--r-lg)',
        padding: 'var(--sp-4)',
        marginBottom: 'var(--sp-4)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)' }}>
          <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}>
            {c.nombre}
          </h1>
          <span className={`badge ${c.estado === 'extinta' ? 'badge-crimson' : c.estado === 'interregno' ? 'badge-purple' : c.tipo === 'real' ? 'badge-gold' : ''}`}>
            {c.estado}
          </span>
        </div>
        {c.lema && (
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: accentColor, fontStyle: 'italic', marginBottom: 4 }}>
            "{c.lema}"
          </div>
        )}
        {c.lemaTraduccion && (
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
            {c.lemaTraduccion}
          </div>
        )}
      </div>

      {/* Ficha */}
      <div className="detail-block" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)', letterSpacing: '0.1em' }}>FICHA HERÁLDICA</div>
        <div className="info-row">
          <span className="info-label">Tipo</span>
          <span className="info-val" style={{ textTransform: 'capitalize' }}>{c.tipo}</span>
        </div>
        {c.region && (
          <div className="info-row">
            <span className="info-label">Región</span>
            <span className="info-val"
              style={{ cursor: region ? 'pointer' : 'default', color: region ? 'var(--gold)' : undefined }}
              onClick={() => region && nav(`/mundo/region/${region.id}`)}
            >
              {c.region}
            </span>
          </div>
        )}
        {c.advocacion && (
          <div className="info-row">
            <span className="info-label">Advocación</span>
            <span className="info-val">{c.advocacion}</span>
          </div>
        )}
        {c.periodo && (
          <div className="info-row">
            <span className="info-label">Período</span>
            <span className="info-val">{c.periodo}</span>
          </div>
        )}
        {c.id && (
          <div className="info-row">
            <span className="info-label">Código</span>
            <span className="info-val mono">{c.id}</span>
          </div>
        )}
      </div>

      {/* Escudo */}
      {c.escudoDesc && (
        <div style={{
          background: 'rgba(201,150,58,0.05)',
          border: '1px solid rgba(201,150,58,0.2)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-4)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--gold)', marginBottom: 'var(--sp-2)' }}>ESCUDO DE ARMAS</div>
          <p className="escudo-desc">{c.escudoDesc}</p>
        </div>
      )}

      {/* Descripción */}
      {c.descripcion && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-4)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)' }}>HISTORIA</div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>{c.descripcion}</p>
        </div>
      )}

      {/* Monarcas */}
      {c.monarcas && c.monarcas.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="section-title">Monarcas / Jefes de Casa</div>
          <div className="timeline">
            {c.monarcas.map((m, i) => (
              <div key={i} className="timeline-item">
                {m.periodo && <div className="timeline-date">{m.periodo}</div>}
                <div className="timeline-title">{m.nombre || m}</div>
                {m.nota && <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2 }}>{m.nota}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personajes */}
      {pjsDeCasa.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="section-title">Miembros destacados</div>
          <div className="grid-1">
            {pjsDeCasa.map(p => (
              <div
                key={p.id}
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => nav(`/personajes/${p.id}`)}
              >
                <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}>{p.nombre}</div>
                    {p.titulo && <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 2 }}>{p.titulo}</div>}
                  </div>
                  <span className={`badge ${p.estado === 'muerto' ? 'badge-crimson' : ''}`}>{p.estado}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nota interna */}
      {c.notaInterna && (
        <div style={{
          background: 'rgba(201,150,58,0.06)',
          border: '1px solid rgba(201,150,58,0.15)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-8)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--gold)', marginBottom: 'var(--sp-2)' }}>◈ NOTA DEL CODEX</div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>{c.notaInterna}</p>
        </div>
      )}

    </div>
  )
}
