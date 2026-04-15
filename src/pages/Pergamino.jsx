import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pergamino from '../data/pergamino.json'
import personajes from '../data/personajes.json'

export default function Pergamino() {
  const nav = useNavigate()
  const [usoExpandido, setUsoExpandido] = useState(null)

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      <button
        onClick={() => nav('/fe')}
        style={{ background: 'none', border: 'none', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', cursor: 'pointer', padding: 0, marginBottom: 'var(--sp-4)', letterSpacing: '0.08em' }}
      >
        ← FE
      </button>

      {/* Header dramático */}
      <div style={{
        background: 'radial-gradient(ellipse at top, rgba(139,38,53,0.15) 0%, var(--surface) 70%)',
        border: '1px solid rgba(139,38,53,0.5)',
        borderRadius: 'var(--r-lg)',
        padding: 'var(--sp-6)',
        marginBottom: 'var(--sp-6)',
        textAlign: 'center',
      }}>
        <div className="mono" style={{ color: 'var(--crimson)', fontSize: '0.6rem', letterSpacing: '0.15em', marginBottom: 'var(--sp-2)' }}>
          ARTEFACTO — ART-PER
        </div>
        <h1 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', lineHeight: 1.1, color: 'var(--text)' }}>
          El Pergamino<br/>
          <span style={{ color: 'var(--crimson)' }}>Maldito</span>
        </h1>
        <div style={{
          width: 40,
          height: 1,
          background: 'var(--crimson)',
          margin: 'var(--sp-3) auto',
          opacity: 0.5,
        }} />
        <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
          3 USOS DOCUMENTADOS · DESTRUYÓ LA NOBLEZA
        </div>
      </div>

      {/* Origen */}
      {pergamino.origen && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-4)',
          marginBottom: 'var(--sp-4)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)', letterSpacing: '0.1em' }}>
            ORIGEN
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>{pergamino.origen}</p>
        </div>
      )}

      {/* Descripción */}
      {pergamino.descripcion && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          padding: 'var(--sp-4)',
          marginBottom: 'var(--sp-4)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-2)', letterSpacing: '0.1em' }}>
            NATURALEZA
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>{pergamino.descripcion}</p>
        </div>
      )}

      {/* La Regla del Sacrificio */}
      {pergamino.regla && (
        <div style={{
          background: 'rgba(139,38,53,0.08)',
          border: '1px solid rgba(139,38,53,0.4)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-4)',
          marginBottom: 'var(--sp-6)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--crimson)', letterSpacing: '0.12em', marginBottom: 'var(--sp-3)' }}>
            ⚠ {pergamino.regla.titulo || 'LA REGLA DEL SACRIFICIO'}
          </div>

          {pergamino.regla.descripcion && (
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 'var(--sp-3)', color: 'var(--text)' }}>
              {pergamino.regla.descripcion}
            </p>
          )}

          {pergamino.regla.puntos && pergamino.regla.puntos.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              {pergamino.regla.puntos.map((punto, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: 'var(--sp-3)',
                  alignItems: 'flex-start',
                  background: 'rgba(139,38,53,0.08)',
                  borderRadius: 'var(--r-sm)',
                  padding: 'var(--sp-2) var(--sp-3)',
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--crimson)', minWidth: 18 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{punto}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Usos */}
      {pergamino.usos && pergamino.usos.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <div className="section-title">Usos Documentados</div>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-3)' }}>
            {pergamino.usos.length} de 3 usos conocidos
          </div>

          <div className="grid-1">
            {pergamino.usos.map((uso, i) => {
              const pj = uso.usuarioId && personajes.find(p => p.id === uso.usuarioId)
              const isOpen = usoExpandido === i
              return (
                <div
                  key={i}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid rgba(139,38,53,0.3)',
                    borderRadius: 'var(--r-md)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{ padding: 'var(--sp-3)', cursor: 'pointer' }}
                    onClick={() => setUsoExpandido(isOpen ? null : i)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--crimson)', marginBottom: 4 }}>
                          USO #{i + 1} · {uso.fecha || '?'}
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>
                          {uso.usuario || (pj && pj.nombre) || 'Desconocido'}
                        </div>
                        {uso.deseo && (
                          <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: 2, fontStyle: 'italic' }}>
                            "{uso.deseo}"
                          </div>
                        )}
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
                        {isOpen ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{
                      padding: 'var(--sp-3)',
                      borderTop: '1px solid rgba(139,38,53,0.2)',
                      background: 'rgba(139,38,53,0.05)',
                    }}>
                      {uso.sacrificio && (
                        <div style={{ marginBottom: 'var(--sp-2)' }}>
                          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--crimson)', marginBottom: 4 }}>SACRIFICIO</div>
                          <p style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{uso.sacrificio}</p>
                        </div>
                      )}
                      {uso.consecuencia && (
                        <div style={{ marginBottom: 'var(--sp-2)' }}>
                          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 4 }}>CONSECUENCIA</div>
                          <p style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{uso.consecuencia}</p>
                        </div>
                      )}
                      {uso.nota && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5, fontStyle: 'italic' }}>{uso.nota}</p>
                      )}
                      {pj && (
                        <div
                          style={{ marginTop: 'var(--sp-2)', cursor: 'pointer', display: 'inline-block' }}
                          onClick={() => nav(`/personajes/${pj.id}`)}
                        >
                          <span className="persona-chip">→ {pj.nombre}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Mecánica */}
      {pergamino.mecanica && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <div className="section-title">Mecánica Narrativa</div>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--sp-4)',
          }}>
            {typeof pergamino.mecanica === 'string' ? (
              <p style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>{pergamino.mecanica}</p>
            ) : (
              Object.entries(pergamino.mecanica).map(([key, val]) => (
                <div key={key} className="info-row" style={{ alignItems: 'flex-start', marginBottom: 'var(--sp-2)' }}>
                  <span className="info-label" style={{ textTransform: 'capitalize', minWidth: 100 }}>{key}</span>
                  <span style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{val}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Implicaciones */}
      {pergamino.implicaciones && pergamino.implicaciones.length > 0 && (
        <div style={{ marginBottom: 'var(--sp-8)' }}>
          <div className="section-title">Implicaciones Canónicas</div>
          <div className="grid-1">
            {pergamino.implicaciones.map((imp, i) => (
              <div key={i} style={{
                background: 'rgba(201,150,58,0.05)',
                border: '1px solid rgba(201,150,58,0.15)',
                borderRadius: 'var(--r-md)',
                padding: 'var(--sp-3)',
                display: 'flex',
                gap: 'var(--sp-3)',
              }}>
                <div style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', minWidth: 16 }}>◈</div>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{imp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
