import { useEffect, useRef, useState } from 'react'
import { Avatar } from './ui.jsx'
import { IcBell, IcDiamond, IcGear, IcGrid, IcLogOut, IcMenu, IcMoon, IcSearch, IcShield, IcSun, IcUser } from '../icons.jsx'

const notifications = [
  { id: 1, title: 'New sale received', body: 'Indra Maulana paid $1,500.00', time: '2m ago' },
  { id: 2, title: 'Payout scheduled', body: 'BCA •••• 4821 on Monday', time: '1h ago' },
  { id: 3, title: 'Stock running low', body: 'Ipad Air 2024 has 12 left', time: '3h ago' },
]

export default function Topbar({ onMenu, theme, onTheme, query, onQuery, onNavigate, onSignOut }) {
  const [bell, setBell] = useState(false)
  const [menu, setMenu] = useState(false)
  const [read, setRead] = useState([])
  const wrap = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) {
        setBell(false)
        setMenu(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button onClick={onMenu} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-sunken lg:hidden" aria-label="open menu">
          <IcMenu size={18} />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-md">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"><IcSearch size={15} /></span>
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search products, payments…"
              className="h-9 w-full rounded-lg border border-line bg-sunken pl-9 pr-3 text-sm outline-none transition placeholder:text-faint focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <button className="hidden h-9 shrink-0 rounded-lg bg-brand px-3.5 text-xs font-bold text-white transition hover:brightness-110 sm:block">
            Search
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1.5" ref={wrap}>
          <button
            onClick={onTheme}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-sunken hover:text-ink"
            aria-label="toggle theme"
          >
            {theme === 'dark' ? <IcSun size={16} /> : <IcMoon size={16} />}
          </button>
          <button className="hidden h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-sunken hover:text-ink sm:grid" aria-label="apps">
            <IcGrid size={16} />
          </button>
          <div className="relative">
            <button
              onClick={() => { setBell((b) => !b); setMenu(false) }}
              className="relative grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-sunken hover:text-ink"
              aria-label="notifications"
            >
              <IcBell size={16} />
              {notifications.length - read.length > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand ring-2 ring-surface" />
              )}
            </button>
            {bell && (
              <div className="absolute right-0 top-11 w-72 overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-xs font-bold">Notifications</p>
                  <button onClick={() => setRead(notifications.map((n) => n.id))} className="text-[11px] font-semibold text-brand hover:underline">
                    Mark all read
                  </button>
                </div>
                <ul className="max-h-64 overflow-y-auto border-t border-line">
                  {notifications.map((n) => (
                    <li key={n.id}>
                      <button
                        onClick={() => setRead((r) => [...r, n.id])}
                        className={`flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left transition hover:bg-sunken ${read.includes(n.id) ? 'opacity-50' : ''}`}
                      >
                        <span className="text-xs font-bold">{n.title}</span>
                        <span className="text-[11px] text-muted">{n.body}</span>
                        <span className="text-[10px] text-faint">{n.time}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button className="hidden h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-sunken hover:text-ink sm:grid" aria-label="settings" onClick={() => onNavigate('security')}>
            <IcGear size={16} />
          </button>

          <span className="ml-1 hidden rounded-lg border border-line bg-sunken px-2.5 py-1.5 text-[11px] font-bold text-muted md:block">Admin</span>

          <div className="relative">
            <button onClick={() => { setMenu((m) => !m); setBell(false) }} className="ml-1 block" aria-label="account menu">
              <Avatar name="Indra Maulana" size={34} />
            </button>
            {menu && (
              <div className="absolute right-0 top-11 w-52 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-xl">
                <div className="border-b border-line px-4 py-2.5">
                  <p className="text-xs font-bold">Indra Maulana</p>
                  <p className="text-[11px] text-muted">indramaulana@gmail.com</p>
                </div>
                {[
                  { id: 'profile', name: 'My Profile', icon: IcUser },
                  { id: 'security', name: 'Security', icon: IcShield },
                ].map((it) => (
                  <button
                    key={it.id}
                    onClick={() => { onNavigate(it.id); setMenu(false) }}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-semibold text-muted transition hover:bg-sunken hover:text-ink"
                  >
                    <it.icon size={14} /> {it.name}
                  </button>
                ))}
                <button onClick={onSignOut} className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-semibold text-pink transition hover:bg-pink/10">
                  <IcLogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export function AuthLogo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="text-brand"><IcDiamond size={24} /></span>
      <span className="text-lg font-extrabold tracking-tight">ShopStack</span>
    </span>
  )
}
