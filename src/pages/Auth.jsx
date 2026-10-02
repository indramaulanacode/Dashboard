import { useState } from 'react'
import { AuthLogo } from '../components/Topbar.jsx'
import { Button, Input, Tag } from '../components/ui.jsx'
import { IcCheck, IcDiamond, IcEye, IcLock, IcMail } from '../icons.jsx'

function Shell({ children, mode, onMode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-10 lg:flex">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-purple/20 blur-3xl" />
        <span className="relative inline-flex items-center gap-2.5 text-white">
          <span className="text-brand"><IcDiamond size={24} /></span>
          <span className="text-lg font-extrabold tracking-tight">ShopStack</span>
        </span>
        <div className="relative">
          <h2 className="max-w-md text-3xl font-extrabold leading-tight text-white">
            Manage your store with a dashboard that works as fast as you do.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Track earnings, traffic, payouts and products in one place — beautifully, on any screen.
          </p>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
            {[['$112k', 'Total earning'], ['284k', 'Visits'], ['1.2k', 'Products']].map(([v, l]) => (
              <div key={l} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-lg font-extrabold text-white">{v}</p>
                <p className="text-[11px] text-white/50">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-[11px] text-white/40">2024 ShopStack. All rights reserved.</p>
      </div>

      <div className="flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between">
            <span className="lg:hidden"><AuthLogo /></span>
            <Tag tone="orange">{mode === 'in' ? 'Welcome back' : 'Create account'}</Tag>
          </div>
          {children}
          <p className="mt-6 text-center text-xs text-muted">
            {mode === 'in' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={() => onMode(mode === 'in' ? 'up' : 'in')} className="font-bold text-brand hover:underline">
              {mode === 'in' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Auth({ mode, onMode, onAuth }) {
  const [form, setForm] = useState({ name: '', email: 'MichaelBrooks@gmail.com', password: 'password123' })
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})
  const [remember, setRemember] = useState(true)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (mode === 'up' && !form.name.trim()) errs.name = 'Name is required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (form.password.length < 6) errs.password = 'Minimum 6 characters'
    setErrors(errs)
    if (!Object.keys(errs).length) onAuth()
  }

  return (
    <Shell mode={mode} onMode={onMode}>
      <h1 className="text-2xl font-extrabold tracking-tight">{mode === 'in' ? 'Sign In' : 'Sign Up'}</h1>
      <p className="mt-1 text-xs text-muted">
        {mode === 'in' ? 'Enter your credentials to access your dashboard.' : 'Fill in your details to create your store account.'}
      </p>
      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        {mode === 'up' && (
          <div>
            <Input label="Full Name" placeholder="Michael Brooks" value={form.name} onChange={set('name')} />
            {errors.name && <p className="mt-1 text-[11px] font-semibold text-pink">{errors.name}</p>}
          </div>
        )}
        <div>
          <Input label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
          {errors.email && <p className="mt-1 text-[11px] font-semibold text-pink">{errors.email}</p>}
        </div>
        <div>
          <div className="relative">
            <Input label="Password" type={show ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={set('password')} className="pr-10" />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label="toggle password visibility"
              className="absolute right-3 top-[30px] text-faint transition hover:text-ink"
            >
              <IcEye size={15} />
            </button>
          </div>
          {errors.password && <p className="mt-1 text-[11px] font-semibold text-pink">{errors.password}</p>}
        </div>
        {mode === 'in' && (
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setRemember((r) => !r)} className="flex items-center gap-2 text-xs font-semibold text-muted">
              <span className={`grid h-4 w-4 place-items-center rounded border ${remember ? 'border-brand bg-brand text-white' : 'border-line'}`}>
                {remember && <IcCheck size={10} />}
              </span>
              Remember me
            </button>
            <button type="button" className="text-xs font-bold text-brand hover:underline">Forgot password?</button>
          </div>
        )}
        <Button type="submit" size="lg" className="w-full">
          <IcLock size={15} /> {mode === 'in' ? 'Sign In' : 'Create Account'}
        </Button>
        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-line" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-faint">or</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <Button type="button" variant="outline" size="lg" className="w-full" onClick={onAuth}>
          <IcMail size={15} /> Continue with Google
        </Button>
      </form>
    </Shell>
  )
}
