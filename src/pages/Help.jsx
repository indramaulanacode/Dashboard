import { useState } from 'react'
import { Button, Card, CardHead, PageHeader } from '../components/ui.jsx'
import { faqs } from '../data.js'
import { IcChevronDown, IcHelp, IcMail } from '../icons.jsx'

export default function Help() {
  const [open, setOpen] = useState(0)
  const [sent, setSent] = useState(false)
  const [ticket, setTicket] = useState('')

  return (
    <div className="space-y-5">
      <PageHeader title="Help And Support" crumb="Help And Support" />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-6">
          <CardHead title="Frequently Asked Questions" subtitle="Quick answers to common questions." />
          <ul className="mt-4 divide-y divide-line">
            {faqs.map((f, i) => (
              <li key={f.q}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="text-sm font-bold">{f.q}</span>
                  <IcChevronDown size={15} className={`shrink-0 text-muted transition-transform ${open === i ? 'rotate-180 text-brand' : ''}`} />
                </button>
                {open === i && <p className="pb-4 text-xs leading-relaxed text-muted">{f.a}</p>}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <CardHead title="Contact Us" subtitle="We reply within 24 hours." />
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => { e.preventDefault(); if (ticket.trim()) { setSent(true); setTicket('') } }}
          >
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-muted">Describe your issue</span>
              <textarea
                value={ticket}
                onChange={(e) => { setTicket(e.target.value); setSent(false) }}
                required
                className="min-h-28 w-full rounded-lg border border-line bg-sunken px-3 py-2 text-sm outline-none transition placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="I need help with…"
              />
            </label>
            <Button type="submit" className="w-full"><IcMail size={14} /> Send Ticket</Button>
            {sent && <p className="text-center text-[11px] font-semibold text-green">Ticket received — we will be in touch!</p>}
          </form>
          <div className="mt-6 rounded-xl bg-brand-soft p-4 text-center">
            <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand text-white"><IcHelp size={17} /></span>
            <p className="mt-2 text-xs font-bold text-brand">Live chat</p>
            <p className="text-[11px] text-muted">Weekdays 09:00 - 18:00 WIB</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
