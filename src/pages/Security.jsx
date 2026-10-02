import { useState } from 'react'
import { Button, Card, CardHead, Input, PageHeader, Tag, Toggle } from '../components/ui.jsx'
import { IcCheck, IcLock, IcShield } from '../icons.jsx'

const initialPrefs = [
  { id: 'twoFA', label: 'Two-factor authentication', hint: 'Require a code from your authenticator app on sign in.', on: true },
  { id: 'loginAlerts', label: 'Login alerts', hint: 'Email me when a new device signs in.', on: true },
  { id: 'newsletter', label: 'Product newsletter', hint: 'Monthly digest of new features.', on: false },
  { id: 'publicProfile', label: 'Public profile', hint: 'Let other merchants view your store profile.', on: false },
]

export default function Security() {
  const [prefs, setPrefs] = useState(initialPrefs)
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [msg, setMsg] = useState(null)

  const changePw = (e) => {
    e.preventDefault()
    if (pw.next.length < 8) return setMsg({ tone: 'pink', text: 'New password must be at least 8 characters.' })
    if (pw.next !== pw.confirm) return setMsg({ tone: 'pink', text: 'Passwords do not match.' })
    setPw({ current: '', next: '', confirm: '' })
    setMsg({ tone: 'green', text: 'Password changed successfully.' })
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Security" crumb="Security" />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="p-6">
          <CardHead title="Change Password" subtitle="Use at least 8 characters with mixed case." />
          <form onSubmit={changePw} className="mt-5 space-y-4" noValidate>
            <Input label="Current Password" type="password" value={pw.current} onChange={(e) => setPw((p) => ({ ...p, current: e.target.value }))} />
            <Input label="New Password" type="password" value={pw.next} onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))} />
            <Input label="Confirm New Password" type="password" value={pw.confirm} onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))} />
            <div className="flex items-center gap-3">
              <Button type="submit"><IcLock size={14} /> Update Password</Button>
              {msg && <Tag tone={msg.tone} className="h-8">{msg.text}</Tag>}
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <CardHead title="Security Preferences" subtitle="Toggle how your account is protected." />
          <ul className="mt-5 divide-y divide-line">
            {prefs.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sunken text-brand"><IcShield size={15} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold">{p.label}</p>
                  <p className="text-[11px] text-muted">{p.hint}</p>
                </div>
                <Toggle checked={p.on} label={p.label} onChange={(v) => setPrefs((ps) => ps.map((x) => (x.id === p.id ? { ...x, on: v } : x)))} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <CardHead title="Active Sessions" subtitle="Devices currently signed in to your account." />
        <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { device: 'MacBook Pro · Jakarta', current: true },
            { device: 'iPhone 15 · Jakarta', current: false },
            { device: 'Chrome · Windows 11', current: false },
          ].map((s) => (
            <li key={s.device} className="flex items-center justify-between rounded-xl border border-line bg-sunken px-4 py-3">
              <div>
                <p className="text-xs font-bold">{s.device}</p>
                <p className="text-[11px] text-muted">{s.current ? 'This device' : 'Last active 2d ago'}</p>
              </div>
              {s.current ? (
                <Tag tone="green"><IcCheck size={12} /> Active</Tag>
              ) : (
                <Button variant="ghost" size="sm" className="text-pink hover:bg-pink/10 hover:text-pink">Revoke</Button>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
