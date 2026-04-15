import { useParams, useNavigate } from 'react-router-dom'
import personajes from '../data/personajes.json'
import casas from '../data/casas.json'

const BADGE_MAP = {
  protagonista: 'badge-gold',
  antagonista: 'badge-crimson',
  especial: 'badge-purple',
  dios: 'badge-purple',
  secundario: '',
}

export default function PersonajeDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const p = personajes.find(x => x.id === id)

  if (!p) {
    return (
      <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)', textAlign: 'center' }}>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>ENTRADA NO ENCONTRADA</div>
        <div style={{ marginTop: 'var(--sp-4)', fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>{id}</div>
        <button className="btn-back" style={{ marginTop: 'var(--sp-6)' }} onClick={() => nav('/personajes')}>← Volver</button>
      </div>
    )
  }

  const casa = casas.find(c => p.casa && c.nombre.includes(p.casa.replace('Casa ', '')))

  const isEspecial = p.categoria === 'especial' || p.id === 'PER-SPEC-001'
  const accentColor = p.categoria === 'antagonista' ? 'var(--crimson)' : isEspecial ? 'var(--purple)' : 'var(--gold)'

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      {/* Back */}
      <button
        onClick={() => nav('/personajes')}
        style={{
          background: 'none', border: 'none', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', cursor: 'pointer',
          padding: 0, marginBottom: 'var(--sp-4)', letterSpacing: '0.08em',
        }}
      >
        ← PERSONAJES
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
          <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', lineHeight: 1.1 }}>
            {p.nombre}
          </h1>
          <span className={`badge ${BADGE_MAP[p.categoria] || ''}`}>{p.id}</span>
        </div>
        {p.titulo && (
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: accentColor, marginBottom: 'var(--sp-2)' }}>
            {p.titulo}
          </div>
        )}
        <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
          <span className={`badge ${BADGE_MAP[p.categoria] || ''}`}>{p.categoria}</span>
          <span className={`badge ${p.estado === 'muerto' ? 'badge-crimson' : p.estado === 'inmortal' || p.estado === 'sellado' ? 'badge-purple' : ''}`}>
            {p.estado}
          </span>
          {p.estadoDetalle && (
            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', alignSelf: 'center' }}>
              {p.estadoDetalle}
            </span>
          )}
        </div>
      </div>

      {/* Datos básicos */}
      <div className="detail-block" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)', letterSpacing: '0.1em' }}>
          FICHA
        </div>
        {p.casa && (
          <div className="info-row">
            <span className="info-label">Casa</span>
            <span className="info-val"
              style={{ cursor: casa ? 'pointer' : 'default', color: casa ? accentColor : undefined }}
              onClick={() => casa && nav(`/mundo/casa/${casa.id}`)}
            >
              {p.casa}
            </span>
          </div>
        )}
        {p.region && (
          <div className="info-row">
            <span className="info-label">Región</span>
            <span className="info-val">{p.region}</span>
          </div>
        )}
        {p.rol && (
          <div className="info-row" style={{ alignItems: 'flex-start' }}>
            <span className="info-label">Rol</span>
            <span className="info-val" style={{ lineHeight: 1.5 }}>{p.rol}</span>
          </div>
        )}
      </div>

      {/* Nota interna */}
      {p.notaInterna && (
        <div style={{
          background: 'rgba(201, 150, 58, 0.06)',
          border: '1px solid rgba(201, 150, 58, 0.2)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-4)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--gold)', marginBottom: 'var(--sp-2)', letterSpacing: '0.1em' }}>
            ◈ NOTA DEL CODEX
          </div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'var(--text)' }}>{p.notaInterna}</p>
        </div>
      )}

      {/* Eventos */}
      {p.eventos && p.eventos.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="section-title">Eventos clave</div>
          <div className="timeline">
            {p.eventos.map((ev, i) => (
              <div key={i} className="timeline-item">
                {ev.fecha && <div className="timeline-date">{ev.fecha}</div>}
                <div className="timeline-title">{ev.titulo || ev}</div>
                {ev.desc && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 'var(--sp-1)', lineHeight: 1.5 }}>
                    {ev.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Relaciones */}
      {p.relaciones && p.relaciones.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-8)' }}>
          <div className="section-title">Relaciones</div>
          <div className="grid-1">
            {p.relaciones.map((rel, i) => {
              const linked = personajes.find(x => x.id === rel.id)
              return (
                <div
                  key={i}
                  className="card"
                  style={{ cursor: linked ? 'pointer' : 'default' }}
                  onClick={() => linked && nav(`/personajes/${linked.id}`)}
                >
                  <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}>
                        {rel.nombre || (linked && linked.nombre) || rel.id}
                      </div>
                      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 2 }}>
                        {rel.tipo}
                      </div>
                    </div>
                    {linked && <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>→</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}
