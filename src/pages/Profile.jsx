import { useState } from 'react'
import { Avatar, Button, Card, CardHead, Input, PageHeader, Tag, Textarea } from '../components/ui.jsx'
import { IcCheck, IcFacebook, IcInstagram, IcLinkedin, IcTwitter } from '../icons.jsx'

export default function Profile() {
  const [form, setForm] = useState({
    name: 'Michael Brooks',
    email: 'indramaulana@gmail.com',
    phone: '+62 812 3456 7890',
    location: 'Jakarta, Indonesia',
    bio: 'Product designer & front-end developer building delightful dashboards.',
  })
  const [saved, setSaved] = useState(false)
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setSaved(false) }

  return (
    <div className="space-y-5">
      <PageHeader title="My Profile" crumb="My Profile" />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1.6fr]">
        <Card className="p-6 text-center">
          <div className="relative inline-block">
            <Avatar name={form.name} size={88} ring />
            <button
              aria-label="change photo"
              className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-brand text-white shadow-lg transition hover:brightness-110"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
            </button>
          </div>
          <h2 className="mt-4 text-base font-extrabold">{form.name}</h2>
          <p className="text-xs text-muted">{form.email}</p>
          <Tag tone="orange" className="mt-3">Admin</Tag>
          <div className="mt-5 flex justify-center gap-2">
            {[IcFacebook, IcInstagram, IcLinkedin, IcTwitter].map((Ic, i) => (
              <button key={i} aria-label="social profile" className="grid h-9 w-9 place-items-center rounded-full bg-sunken text-muted transition hover:bg-brand hover:text-white">
                <Ic size={14} />
              </button>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 divide-x divide-line rounded-xl bg-sunken py-3">
            {[['320', 'Sales'], ['128', 'Products'], ['4.9', 'Rating']].map(([v, l]) => (
              <div key={l}>
                <p className="text-sm font-extrabold">{v}</p>
                <p className="text-[10px] text-muted">{l}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <CardHead title="Profile Information" subtitle="Update your personal details." />
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => { e.preventDefault(); setSaved(true) }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Full Name" value={form.name} onChange={set('name')} />
              <Input label="Email" type="email" value={form.email} onChange={set('email')} />
              <Input label="Phone" value={form.phone} onChange={set('phone')} />
              <Input label="Location" value={form.location} onChange={set('location')} />
            </div>
            <Textarea label="Bio" value={form.bio} onChange={set('bio')} />
            <div className="flex items-center gap-3">
              <Button type="submit">Save Changes</Button>
              {saved && <Tag tone="green" className="h-8"><IcCheck size={13} /> Profile updated</Tag>}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
