import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Inicio', icon: HomeIcon },
  { to: '/mundo', label: 'Mundo', icon: MapIcon },
  { to: '/personajes', label: 'Personas', icon: UsersIcon },
  { to: '/fe', label: 'Fe', icon: StarIcon },
  { to: '/buscar', label: 'Buscar', icon: SearchIcon },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      background: 'rgba(8, 8, 16, 0.96)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      height: 'calc(var(--nav-h) + var(--safe-bottom))',
      paddingBottom: 'var(--safe-bottom)',
    }}>
      {navItems.map(({ to, label, icon: Icon }) => {
        const isActive = to === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(to)
        return (
          <NavLink
            key={to}
            to={to}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              textDecoration: 'none',
              color: isActive ? 'var(--gold)' : 'var(--muted)',
              transition: 'color 0.15s',
            }}
          >
            <Icon size={20} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}

function HomeIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}

function MapIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" x2="9" y1="3" y2="18"/>
      <line x1="15" x2="15" y1="6" y2="21"/>
    </svg>
  )
}

function UsersIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function StarIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

function SearchIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  )
}
