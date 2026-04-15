import { useNavigate } from 'react-router-dom'
import personajes from '../data/personajes.json'
import regiones from '../data/regiones.json'
import dioses from '../data/dioses.json'
import casas from '../data/casas.json'
import timeline from '../data/timeline.json'

export default function Inicio() {
  const nav = useNavigate()
  const ultimos = timeline.slice(-4).reverse()

  return (
    <div className="page-inner fade-up" style={{ paddingTop: 'var(--sp-6)' }}>

      {/* ── Header principal ── */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--sp-8)' }}>
        <div className="mono" style={{ color: 'var(--gold)', marginBottom: 'var(--sp-2)', fontSize: '0.7rem' }}>CODEX OFICIAL</div>
        <h1 style={{ fontSize: '2rem', letterSpacing: '0.12em', lineHeight: 1.1 }}>
          ALVÁTHIA
        </h1>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          color: 'var(--muted)',
          letterSpacing: '0.08em',
          marginTop: 'var(--sp-2)',
        }}>
          Entre Cantos y Coronas
        </div>
        <div style={{
          width: 60,
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--gold-dim), transparent)',
          margin: 'var(--sp-4) auto 0',
        }} />
      </div>

      {/* ── Stats ── */}
      <div className="grid-2" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="stat-box">
          <div className="stat-val">14</div>
          <div className="stat-label">Reinos</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{personajes.length}</div>
          <div className="stat-label">Personajes</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{dioses.length}</div>
          <div className="stat-label">Dioses</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{casas.length}</div>
          <div className="stat-label">Casas</div>
        </div>
      </div>

      {/* ── Era actual ── */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding: 'var(--sp-4)',
        marginBottom: 'var(--sp-6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div className="mono" style={{ color: 'var(--muted)', marginBottom: 'var(--sp-1)' }}>AÑO EN CURSO</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--gold)' }}>
            424 d.d.e.
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="mono" style={{ color: 'var(--muted)', marginBottom: 'var(--sp-1)' }}>ERA ACTIVA</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--text)' }}>
            ERA-4 / Post-Balada
          </div>
        </div>
      </div>

      {/* ── Destacados ── */}
      <div className="section-title">Entradas destacadas</div>

      <div className="grid-1" style={{ marginBottom: 'var(--sp-6)' }}>

        {/* Naevia */}
        <div
          className="card card-accent card-accent-purple"
          onClick={() => nav('/personajes/PER-SPEC-001')}
        >
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)' }}>
              <h2 style={{ fontSize: '1rem' }}>Naevia</h2>
              <span className="badge badge-purple">PER-SPEC-001</span>
            </div>
            <p style={{ fontSize: '0.8125rem' }}>
              Fuera del sistema heráldico. Creó a los plebeyos. Borró la magia del mundo. Regresó para devolver el recuerdo robado.
            </p>
          </div>
        </div>

        {/* Pergamino */}
        <div
          className="card card-accent card-accent-crimson"
          onClick={() => nav('/fe/pergamino')}
        >
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)' }}>
              <h2 style={{ fontSize: '1rem' }}>El Pergamino Maldito</h2>
              <span className="badge badge-crimson">ART-PER</span>
            </div>
            <p style={{ fontSize: '0.8125rem' }}>
              Concede cualquier deseo. Exige sacrificio de altísimo valor personal. Ha sido usado tres veces. La tercera vez destruyó la nobleza de Alváthia.
            </p>
          </div>
        </div>

        {/* Kahlren */}
        <div
          className="card card-accent"
          onClick={() => nav('/personajes/PER-ISVA-001')}
        >
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)' }}>
              <h2 style={{ fontSize: '1rem' }}>Kahlren Isvaren</h2>
              <span className="badge badge-gold">Protagonista</span>
            </div>
            <p style={{ fontSize: '0.8125rem' }}>
              Heredero de Casa Isvaren. Desencadenó la Balada. Sobrevivió como Vahlren Thorne. Se sacrificó en el Cap. 35.
            </p>
          </div>
        </div>

        {/* El Séptimo */}
        <div
          className="card"
          style={{ borderColor: 'rgba(139, 38, 53, 0.4)' }}
          onClick={() => nav('/fe/dios/GOD-SET')}
        >
          <div className="card-body" style={{ background: 'rgba(21, 6, 8, 0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)' }}>
              <h2 style={{ fontSize: '1rem' }}>El Séptimo</h2>
              <span className="badge badge-crimson">SELLADO</span>
            </div>
            <p style={{ fontSize: '0.8125rem' }}>
              No existe en el índice público del Ministerio de Fe. Desterrado más allá del Límite del Universo. No destruido.
            </p>
            <div style={{
              marginTop: 'var(--sp-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--crimson)',
              letterSpacing: '0.1em',
            }}>
              ◈ CONSULTA RESTRINGIDA — HEREJÍA DE SEGUNDO GRADO
            </div>
          </div>
        </div>
      </div>

      {/* ── Últimos eventos ── */}
      <div className="section-title" style={{ cursor: 'pointer' }} onClick={() => nav('/fe/cronologia')}>
        Últimos eventos
      </div>

      <div className="timeline" style={{ marginBottom: 'var(--sp-6)' }}>
        {ultimos.map((evt) => (
          <div
            key={evt.id}
            className={`timeline-item ${evt.sellado ? 'sellado' : ''} ${evt.categoria === 'magico' ? 'magico' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => nav('/fe/cronologia')}
          >
            <div className="timeline-date">{evt.fecha}</div>
            <div className="timeline-title">{evt.titulo}</div>
          </div>
        ))}
      </div>

      {/* ── Accesos rápidos ── */}
      <div className="section-title">Explorar</div>
      <div className="grid-2" style={{ marginBottom: 'var(--sp-8)' }}>
        {[
          { label: 'Cronología', to: '/fe/cronologia', badge: `${timeline.length} eventos` },
          { label: 'Economía', to: '/fe/economia', badge: '6 monedas' },
          { label: 'Regiones', to: '/mundo', badge: '14 reinos' },
          { label: 'Casas Nobles', to: '/mundo', badge: `${casas.length} casas` },
        ].map(({ label, to, badge }) => (
          <div
            key={label}
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => nav(to)}
          >
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem' }}>{label}</div>
              <div className="mono" style={{ fontSize: '0.6rem' }}>{badge}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
