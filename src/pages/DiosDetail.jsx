import { useParams, useNavigate } from 'react-router-dom'
import dioses from '../data/dioses.json'
import personajes from '../data/personajes.json'

export default function DiosDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const d = dioses.find(x => x.id === id)

  if (!d) {
    return (
      <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)', textAlign: 'center' }}>
        <div className="mono" style={{ color: 'var(--muted)' }}>ENTRADA NO ENCONTRADA</div>
        <button onClick={() => nav('/fe')} style={{ marginTop: 'var(--sp-4)', background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>← Fe</button>
      </div>
    )
  }

  const isSellado = d.tipo === 'sellado'
  const accentColor = isSellado ? 'var(--crimson)' : 'var(--gold)'

  const persBajoAdvocacion = personajes.filter(p =>
    p.casa && dioses.some(god => god.id === d.id &&
      Object.values(god.advocaciones || {}).some(v =>
        typeof v === 'string' && v.toLowerCase().includes(p.casa?.toLowerCase().replace('Casa ', ''))
      ))
  )

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      <button
        onClick={() => nav('/fe')}
        style={{ background: 'none', border: 'none', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', cursor: 'pointer', padding: 0, marginBottom: 'var(--sp-4)', letterSpacing: '0.08em' }}
      >
        ← FE
      </button>

      {/* Header */}
      <div style={{
        background: isSellado ? 'rgba(21,6,8,0.8)' : 'var(--surface)',
        border: `1px solid ${accentColor}40`,
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: 'var(--r-lg)',
        padding: 'var(--sp-4)',
        marginBottom: 'var(--sp-4)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)' }}>
          <div>
            {d.simbolo && (
              <div style={{ fontSize: '1.5rem', marginBottom: 'var(--sp-1)' }}>{d.simbolo}</div>
            )}
            <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', letterSpacing: '0.06em', color: accentColor }}>
              {d.nombre}
            </h1>
          </div>
          <span className={`badge ${isSellado ? 'badge-crimson' : 'badge-gold'}`}>{d.id}</span>
        </div>
        {d.epiteto && (
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: 'var(--sp-2)' }}>
            {d.epiteto}
          </div>
        )}
        {isSellado && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--crimson)', letterSpacing: '0.12em' }}>
            ◈ CONSULTA RESTRINGIDA — HEREJÍA DE SEGUNDO GRADO
          </div>
        )}
      </div>

      {/* Datos */}
      <div className="detail-block" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)', letterSpacing: '0.1em' }}>
          ATRIBUTOS
        </div>
        {d.dominio && (
          <div className="info-row">
            <span className="info-label">Dominio</span>
            <span className="info-val">{d.dominio}</span>
          </div>
        )}
        {d.moneda && (
          <div className="info-row">
            <span className="info-label">Moneda sagrada</span>
            <span className="info-val" style={{ color: accentColor }}>{d.moneda}</span>
          </div>
        )}
        {d.institución && (
          <div className="info-row">
            <span className="info-label">Institución</span>
            <span className="info-val">{d.institución}</span>
          </div>
        )}
        {d.tipo && (
          <div className="info-row">
            <span className="info-label">Estado</span>
            <span className={`badge ${isSellado ? 'badge-crimson' : 'badge-gold'}`}>{d.tipo}</span>
          </div>
        )}
      </div>

      {/* Descripción */}
      {d.descripcion && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-4)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)' }}>DOCTRINA</div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>{d.descripcion}</p>
        </div>
      )}

      {/* Doctrinas */}
      {d.doctrinas && d.doctrinas.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="section-title">Mandamientos / Doctrinas</div>
          <div className="grid-1">
            {d.doctrinas.map((doc, i) => (
              <div key={i} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                padding: 'var(--sp-3)',
                display: 'flex',
                gap: 'var(--sp-3)',
                alignItems: 'flex-start',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: accentColor, minWidth: 20 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>{doc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advocaciones */}
      {d.advocaciones && Object.keys(d.advocaciones).length > 0 && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="section-title">Advocaciones</div>
          <div className="detail-block">
            {Object.entries(d.advocaciones).map(([key, val]) => (
              <div key={key} className="info-row" style={{ alignItems: 'flex-start' }}>
                <span className="info-label" style={{ textTransform: 'capitalize' }}>{key}</span>
                <span className="info-val" style={{ lineHeight: 1.5 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tensión / conflicto */}
      {d.tension && (
        <div style={{
          background: isSellado ? 'rgba(21,6,8,0.6)' : 'rgba(201,150,58,0.05)',
          border: `1px solid ${accentColor}25`,
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-3)',
          marginBottom: 'var(--sp-8)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: accentColor, marginBottom: 'var(--sp-2)' }}>
            {isSellado ? '⚠ NOTA SELLADA' : '◈ TENSIÓN TEOLÓGICA'}
          </div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>{d.tension}</p>
        </div>
      )}

    </div>
  )
}
