import { useMemo, useState } from 'react'
import { Button, Card, Checkbox, PageHeader, Pagination, Select, StatCard, Tag, statusTone } from '../components/ui.jsx'
import { money, payments } from '../data.js'
import { IcCard, IcCheck, IcDownload, IcDollar, IcClock, IcSearch } from '../icons.jsx'

const PER_PAGE = 8

export default function Payment({ query }) {
  const [status, setStatus] = useState('All Status')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])
  const [downloaded, setDownloaded] = useState([])

  const q = (query || '').trim().toLowerCase()
  const filtered = useMemo(
    () =>
      payments.filter(
        (p) =>
          (!q || p.email.toLowerCase().includes(q) || p.status.toLowerCase().includes(q)) &&
          (status === 'All Status' || p.status === status),
      ),
    [q, status],
  )

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, pages)
  const rows = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  const counts = {
    Succes: payments.filter((p) => p.status === 'Succes').length,
    Pending: payments.filter((p) => p.status === 'Pending').length,
    Failed: payments.filter((p) => p.status === 'Failed').length,
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Payment"
        crumb="Payment"
        action={<Button variant="outline"><IcDownload size={15} /> Download Report</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Volume" value={money(payments.length * 100)} delta="9.4%" icon={<IcDollar size={15} />} />
        <StatCard label="Successful" value={String(counts.Succes)} delta="4.2%" icon={<IcCheck size={15} />} accent="var(--color-green)" />
        <StatCard label="Pending" value={String(counts.Pending)} delta="1.1%" up={false} icon={<IcClock size={15} />} accent="#f59e0b" />
        <StatCard label="Failed" value={String(counts.Failed)} delta="0.6%" up={false} icon={<IcCard size={15} />} accent="var(--color-pink)" />
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"><IcSearch size={15} /></span>
            <input
              readOnly
              value={query}
              placeholder="Search by email or status (uses topbar search)…"
              className="h-10 w-full rounded-lg border border-line bg-sunken pl-9 pr-3 text-sm outline-none transition placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <Select options={['All Status', 'Succes', 'Pending', 'Failed']} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} className="sm:w-44" />
        </div>
        {selected.length > 0 && (
          <p className="mt-3 rounded-lg bg-brand-soft px-3 py-2 text-xs font-bold text-brand">{selected.length} rows selected</p>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-line bg-sunken">
              <tr>
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={rows.length > 0 && rows.every((r) => selected.includes(r.id))}
                    onChange={(v) => setSelected(v ? [...new Set([...selected, ...rows.map((r) => r.id)])] : selected.filter((id) => !rows.some((r) => r.id === id)))}
                    label="select all"
                  />
                </th>
                {['Status', 'Email', 'Date', 'Amount', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-faint">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((p) => (
                <tr key={p.id} className={`transition hover:bg-sunken ${selected.includes(p.id) ? 'bg-brand-soft/60' : ''}`}>
                  <td className="px-4 py-3">
                    <Checkbox checked={selected.includes(p.id)} onChange={(v) => setSelected((s) => (v ? [...s, p.id] : s.filter((x) => x !== p.id)))} />
                  </td>
                  <td className="px-4 py-3"><Tag tone={statusTone[p.status]}>{p.status}</Tag></td>
                  <td className="px-4 py-3 text-muted">{p.email}</td>
                  <td className="px-4 py-3 text-muted">{p.date}</td>
                  <td className="px-4 py-3 font-semibold">{money(p.amount)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setDownloaded((d) => [...new Set([...d, p.id])])}
                      aria-label={`download invoice ${p.id}`}
                      className={`grid h-8 w-8 place-items-center rounded-lg transition ${downloaded.includes(p.id) ? 'text-green' : 'text-muted hover:bg-sunken hover:text-ink'}`}
                    >
                      {downloaded.includes(p.id) ? <IcCheck size={14} /> : <IcDownload size={14} />}
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-muted">No payments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-line p-4">
          <Pagination page={safePage} pages={pages} onPage={setPage} total={filtered.length} shown={rows.length} />
        </div>
      </Card>
    </div>
  )
}
