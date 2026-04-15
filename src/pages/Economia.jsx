import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import monetario from '../data/monetario.json'
import dioses from '../data/dioses.json'
import regiones from '../data/regiones.json'

export default function Economia() {
  const nav = useNavigate()
  const [monedaSeleccionada, setMonedaSeleccionada] = useState(null)

  // Ordenar monedas por valor
  const monedas = [...monetario].sort((a, b) => (a.valor || 0) - (b.valor || 0))

  // Calcular max valor para barra de proporción
  const maxVal = Math.max(...monedas.map(m => m.valor || 1))

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      <button
        onClick={() => nav('/fe')}
        style={{ background: 'none', border: 'none', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', cursor: 'pointer', padding: 0, marginBottom: 'var(--sp-4)', letterSpacing: '0.08em' }}
      >
        ← FE
      </button>

      <div style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ color: 'var(--gold)', fontSize: '0.65rem', marginBottom: 'var(--sp-1)' }}>CODEX — ECONOMÍA</div>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.08em' }}>Sistema Económico</h1>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.65rem', marginTop: 'var(--sp-1)' }}>
          {monetario.length} monedas sagradas · Respaldadas teológicamente
        </div>
      </div>

      {/* Teología monetaria */}
      {monetario[0]?.teologia && (
        <div style={{
          background: 'rgba(201,150,58,0.06)',
          border: '1px solid rgba(201,150,58,0.2)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-4)',
          marginBottom: 'var(--sp-6)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 'var(--sp-2)' }}>
            ✦ FUNDAMENTO TEOLÓGICO
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>{monetario[0].teologia}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid-2" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="stat-box">
          <div className="stat-val">{monedas.length}</div>
          <div className="stat-label">Monedas</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{monedas[monedas.length - 1]?.valor?.toLocaleString() || '?'}</div>
          <div className="stat-label">Valor máximo</div>
        </div>
      </div>

      {/* Pirámide de valor */}
      <div className="section-title">Escala de valor</div>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding: 'var(--sp-4)',
        marginBottom: 'var(--sp-6)',
      }}>
        {[...monedas].reverse().map((m, i) => {
          const pct = Math.max(8, Math.log10(m.valor || 1) / Math.log10(maxVal) * 100)
          const dios = dioses.find(d => d.moneda === m.nombre || d.id === m.id?.replace('MON-', 'GOD-'))
          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-3)',
                marginBottom: i < monedas.length - 1 ? 'var(--sp-2)' : 0,
                cursor: 'pointer',
              }}
              onClick={() => setMonedaSeleccionada(monedaSeleccionada === m.id ? null : m.id)}
            >
              <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--gold)', minWidth: 80, textAlign: 'right' }}>
                {m.valor?.toLocaleString() || '?'} ×
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  height: 20,
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, rgba(201,150,58,0.6), rgba(201,150,58,0.2))`,
                  borderRadius: 'var(--r-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 8,
                  minWidth: 60,
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    {m.nombre}
                  </span>
                </div>
              </div>
              {dios && (
                <div className="mono" style={{ fontSize: '0.55rem', color: 'var(--muted)', minWidth: 60 }}>
                  {dios.nombre}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Detalle de monedas */}
      <div className="section-title">Fichas por moneda</div>
      <div className="grid-1" style={{ marginBottom: 'var(--sp-6)' }}>
        {monedas.map(m => {
          const isOpen = monedaSeleccionada === m.id
          const dios = dioses.find(d => d.moneda === m.nombre || d.id === m.id?.replace('MON-', 'GOD-'))

          return (
            <div
              key={m.id}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${isOpen ? 'var(--gold-dim)' : 'var(--border)'}`,
                borderRadius: 'var(--r-md)',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              <div
                style={{ padding: 'var(--sp-3)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => setMonedaSeleccionada(isOpen ? null : m.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: 2 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--gold)' }}>{m.nombre}</span>
                    <span className="badge badge-gold" style={{ fontSize: '0.55rem' }}>{m.id}</span>
                  </div>
                  <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
                    Valor: {m.valor?.toLocaleString() || '?'} unidades base
                    {dios && ` · ${dios.nombre}`}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
                  {isOpen ? '▲' : '▼'}
                </span>
              </div>

              {isOpen && (
                <div style={{
                  padding: 'var(--sp-3)',
                  borderTop: '1px solid var(--border)',
                  background: 'rgba(201,150,58,0.03)',
                }}>
                  {m.descripcion && (
                    <p style={{ fontSize: '0.8rem', lineHeight: 1.6, marginBottom: 'var(--sp-2)' }}>{m.descripcion}</p>
                  )}

                  {dios && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--sp-2)',
                        cursor: 'pointer',
                        marginBottom: m.equivalencias?.length ? 'var(--sp-2)' : 0,
                      }}
                      onClick={() => nav(`/fe/dios/${dios.id}`)}
                    >
                      <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>Dios asociado:</span>
                      <span className="persona-chip">{dios.nombre}</span>
                    </div>
                  )}

                  {m.equivalencias && m.equivalencias.length > 0 && (
                    <div>
                      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-1)', marginTop: 'var(--sp-2)' }}>
                        EQUIVALENCIAS
                      </div>
                      <div className="detail-block" style={{ padding: 'var(--sp-2)' }}>
                        {m.equivalencias.map((eq, i) => (
                          <div key={i} className="info-row">
                            <span className="info-label">{eq.moneda || eq.nombre}</span>
                            <span className="info-val">{eq.cantidad || eq.valor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Tabla comparativa */}
      <div className="section-title">Tabla comparativa</div>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        marginBottom: 'var(--sp-8)',
      }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 80px 80px',
          padding: 'var(--sp-2) var(--sp-3)',
          background: 'rgba(201,150,58,0.08)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.08em' }}>MONEDA</div>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.08em', textAlign: 'right' }}>VALOR</div>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.08em', textAlign: 'right' }}>DIOS</div>
        </div>
        {monedas.map((m, i) => {
          const dios = dioses.find(d => d.moneda === m.nombre || d.id === m.id?.replace('MON-', 'GOD-'))
          return (
            <div
              key={m.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 80px 80px',
                padding: 'var(--sp-2) var(--sp-3)',
                borderBottom: i < monedas.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem' }}>{m.nombre}</div>
              <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--gold)', textAlign: 'right' }}>
                {m.valor?.toLocaleString()}
              </div>
              <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'right' }}>
                {dios ? dios.nombre.split(' ')[0] : '—'}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
