import { useState } from 'react'
import { IcCheck, IcDiamond, IcFacebook, IcInstagram, IcLinkedin, IcMail } from '../icons.jsx'

const columns = [
  { title: 'Get Started', links: ['Service', 'Contact Us', 'Affiliate Program', 'About Us'] },
  { title: 'Dashboard', links: ['Platform', 'Workout Library', 'App Design'] },
  { title: 'Company', links: ['About Us', 'Career', 'Press Kit'] },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer className="mt-6 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <span className="inline-flex items-center gap-2.5">
            <span className="text-brand"><IcDiamond size={22} /></span>
            <span className="text-base font-extrabold tracking-tight">ShopStack</span>
          </span>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted">
            Ease of shopping is our main focus. With powerful search features and customizable filters,
            you can easily find the products you are looking for.
          </p>
          <div className="mt-4 flex gap-2">
            {[IcFacebook, IcInstagram, IcLinkedin].map((Ic, i) => (
              <button key={i} aria-label="social link" className="grid h-8 w-8 place-items-center rounded-full bg-sunken text-muted transition hover:bg-brand hover:text-white">
                <Ic size={14} />
              </button>
            ))}
          </div>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-bold">{c.title}</p>
            <ul className="mt-3 space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <button className="text-xs text-muted transition hover:text-brand">{l}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <p className="text-xs font-bold">Subscribe to Newsletter</p>
        <form
          className="mt-3 flex max-w-md gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (email.trim()) {
              setDone(true)
              setEmail('')
            }
          }}
        >
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"><IcMail size={14} /></span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setDone(false) }}
              placeholder="Enter Your Email Here"
              className="h-10 w-full rounded-lg border border-line bg-sunken pl-9 pr-3 text-sm outline-none transition placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <button type="submit" className="h-10 shrink-0 rounded-lg bg-brand px-4 text-xs font-bold text-white transition hover:brightness-110">
            {done ? <IcCheck size={15} /> : 'Subscribe'}
          </button>
        </form>
        {done && <p className="mt-2 text-[11px] font-semibold text-green">Subscribed — welcome aboard!</p>}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-5 text-[11px] text-faint">
        <span>2024 MaxFit. All rights reserved.</span>
        <span className="flex gap-3">
          <button className="transition hover:text-brand">Twitter</button>
          <button className="transition hover:text-brand">Instagram</button>
          <button className="transition hover:text-brand">Facebook</button>
        </span>
      </div>
    </footer>
  )
}
