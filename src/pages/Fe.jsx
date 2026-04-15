import { useNavigate } from 'react-router-dom'
import dioses from '../data/dioses.json'
import monetario from '../data/monetario.json'

export default function Fe() {
  const nav = useNavigate()

  const diosesPublicos = dioses.filter(d => d.tipo !== 'sellado')
  const diosSellado = dioses.find(d => d.tipo === 'sellado')

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      <div style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="mono" style={{ color: 'var(--gold)', fontSize: '0.65rem', marginBottom: 'var(--sp-1)' }}>CODEX — MINISTERIO DE FE</div>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.08em' }}>Fe y Teología</h1>
        <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.65rem', marginTop: 'var(--sp-1)' }}>
          {diosesPublicos.length} dioses del panteón oficial · 1 entrada sellada
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid-2" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => nav('/fe/pergamino')}>
          <div className="card-body">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--crimson)', marginBottom: 2 }}>
              El Pergamino
            </div>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>ART-PER · 3 usos</div>
          </div>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => nav('/fe/cronologia')}>
          <div className="card-body">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', marginBottom: 2 }}>
              Cronología
            </div>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>ERA-0 → ERA-4</div>
          </div>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => nav('/fe/economia')}>
          <div className="card-body">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', marginBottom: 2 }}>
              Sistema Económico
            </div>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>{monetario.length} monedas sagradas</div>
          </div>
        </div>
        <div className="card" style={{ cursor: 'pointer', borderColor: 'rgba(139,38,53,0.3)' }} onClick={() => diosSellado && nav(`/fe/dios/${diosSellado.id}`)}>
          <div className="card-body" style={{ background: 'rgba(21,6,8,0.4)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--crimson)', marginBottom: 2 }}>
              Archivo Sellado
            </div>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--crimson)', opacity: 0.7 }}>HEREJÍA II · ACCESO RESTRINGIDO</div>
          </div>
        </div>
      </div>

      {/* Panteón Oficial */}
      <div className="section-title">Panteón de Alváthia</div>
      <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginBottom: 'var(--sp-3)' }}>
        Los Seis Dioses reconocidos por el Ministerio de Fe
      </div>

      <div className="grid-1" style={{ marginBottom: 'var(--sp-6)' }}>
        {diosesPublicos.map(d => (
          <div
            key={d.id}
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => nav(`/fe/dios/${d.id}`)}
          >
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-1)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--gold)' }}>{d.nombre}</div>
                  {d.epiteto && (
                    <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)', marginTop: 2 }}>{d.epiteto}</div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                  <span className="badge badge-gold">{d.id}</span>
                  {d.simbolo && (
                    <span style={{ fontSize: '1rem' }}>{d.simbolo}</span>
                  )}
                </div>
              </div>

              {d.dominio && (
                <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: 'var(--sp-1)' }}>
                  ◈ {d.dominio}
                </div>
              )}

              {d.descripcion && (
                <p style={{ fontSize: '0.75rem', lineHeight: 1.5, color: 'var(--text-dim)' }}>
                  {d.descripcion.length > 100 ? d.descripcion.slice(0, 100) + '…' : d.descripcion}
                </p>
              )}

              {d.moneda && (
                <div style={{ marginTop: 'var(--sp-2)', display: 'flex', gap: 'var(--sp-2)', alignItems: 'center' }}>
                  <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>Moneda: {d.moneda}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* El Séptimo — sellado */}
      {diosSellado && (
        <>
          <div className="section-title" style={{ color: 'var(--crimson)' }}>Archivo Sellado</div>
          <div
            className="card"
            style={{ cursor: 'pointer', borderColor: 'rgba(139,38,53,0.4)', marginBottom: 'var(--sp-8)' }}
            onClick={() => nav(`/fe/dios/${diosSellado.id}`)}
          >
            <div className="card-body" style={{ background: 'rgba(21,6,8,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--crimson)' }}>
                  {diosSellado.nombre}
                </div>
                <span className="badge badge-crimson">SELLADO</span>
              </div>
              {diosSellado.descripcion && (
                <p style={{ fontSize: '0.75rem', lineHeight: 1.5, color: 'var(--text-dim)' }}>
                  {diosSellado.descripcion.length > 120 ? diosSellado.descripcion.slice(0, 120) + '…' : diosSellado.descripcion}
                </p>
              )}
              <div style={{
                marginTop: 'var(--sp-3)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--crimson)',
                letterSpacing: '0.1em',
              }}>
                ◈ CONSULTA RESTRINGIDA — HEREJÍA DE SEGUNDO GRADO
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}
