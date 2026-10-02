import { useState } from 'react'
import {
  IcActivity, IcBox, IcCard, IcChevronDown, IcDashboard, IcDollar, IcHelp,
  IcPlusCircle, IcShield, IcUser, IcWallet, IcX, IcDiamond,
} from '../icons.jsx'

const groups = [
  {
    label: 'Home',
    items: [{ id: 'dashboard', name: 'Dashboard', icon: IcDashboard }],
  },
  {
    label: 'Catalog',
    items: [
      { id: 'product', name: 'Product', icon: IcBox },
      { id: 'add-product', name: 'Add Product', icon: IcPlusCircle },
    ],
  },
  {
    label: 'List',
    items: [
      { id: 'traffic', name: 'Traffic', icon: IcActivity },
      { id: 'earning', name: 'Earning', icon: IcDollar },
      { id: 'payment', name: 'Payment', icon: IcCard },
      { id: 'payout', name: 'Payout', icon: IcWallet },
    ],
  },
  {
    label: 'Account Setting',
    items: [
      { id: 'profile', name: 'My Profile', icon: IcUser },
      { id: 'security', name: 'Security', icon: IcShield },
      { id: 'help', name: 'Help And Support', icon: IcHelp },
    ],
  },
]

export default function Sidebar({ page, onNavigate, open, onClose }) {
  const [collapsed, setCollapsed] = useState({})

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center justify-between px-5">
        <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2.5">
          <span className="text-brand"><IcDiamond size={22} /></span>
          <span className="text-base font-extrabold tracking-tight">ShopStack</span>
        </button>
        <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-sunken lg:hidden" aria-label="close menu">
          <IcX size={16} />
        </button>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-6 pt-2">
        {groups.map((g) => (
          <div key={g.label}>
            <button
              onClick={() => setCollapsed((c) => ({ ...c, [g.label]: !c[g.label] }))}
              className="flex w-full items-center justify-between px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-faint hover:text-muted"
            >
              {g.label}
              <IcChevronDown size={13} className={`transition-transform ${collapsed[g.label] ? '-rotate-90' : ''}`} />
            </button>
            {!collapsed[g.label] && (
              <ul className="space-y-1">
                {g.items.map((it) => {
                  const active = page === it.id
                  return (
                    <li key={it.id}>
                      <button
                        onClick={() => onNavigate(it.id)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                          active
                            ? 'bg-brand text-white shadow-md shadow-brand/25'
                            : 'text-muted hover:bg-sunken hover:text-ink'
                        }`}
                      >
                        <it.icon size={17} />
                        {it.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      <div className="mx-3 mb-4 rounded-2xl bg-brand-soft p-4">
        <p className="text-xs font-bold text-brand">Upgrade to Pro</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted">Unlock advanced analytics and unlimited payouts.</p>
        <button onClick={() => onNavigate('payout')} className="mt-3 w-full rounded-lg bg-brand py-2 text-xs font-bold text-white transition hover:brightness-110">
          Get Started
        </button>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-line bg-surface lg:block">
        <div className="fixed bottom-0 top-0 w-64">{content}</div>
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-label="close menu" />
          <aside className="absolute bottom-0 left-0 top-0 w-72 border-r border-line bg-surface shadow-2xl">{content}</aside>
        </div>
      )}
    </>
  )
}
