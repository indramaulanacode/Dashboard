import { useMemo, useState } from 'react'
import { Button, Card, Checkbox, PageHeader, Pagination, Select, Tag, statusTone } from '../components/ui.jsx'
import { money, productsBatch2 } from '../data.js'
import { IcDownload, IcEdit, IcFilter, IcPlusCircle, IcSearch, IcTrash } from '../icons.jsx'

const PER_PAGE = 8

function Th({ label, k, sort, onSort, className = '' }) {
  return (
    <th className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-faint ${className}`}>
      {k ? (
        <button onClick={() => onSort(k)} className="inline-flex items-center gap-1 hover:text-ink">
          {label}
          {sort.key === k && <span className="text-brand">{sort.dir === 1 ? '↑' : '↓'}</span>}
        </button>
      ) : (
        label
      )}
    </th>
  )
}

export default function Products({ products, setProducts, query, onNavigate }) {
  const [status, setStatus] = useState('All Status')
  const [category, setCategory] = useState('All Category')
  const [local, setLocal] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({ key: null, dir: 1 })
  const [selected, setSelected] = useState([])
  const [loaded, setLoaded] = useState(false)

  const all = useMemo(() => (loaded ? [...products, ...productsBatch2] : products), [products, loaded])
  const q = (query || local).trim().toLowerCase()

  const filtered = useMemo(() => {
    let rows = all.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (status === 'All Status' || p.status === status) &&
        (category === 'All Category' || p.category === category),
    )
    if (sort.key) {
      rows = [...rows].sort((a, b) => (a[sort.key] > b[sort.key] ? sort.dir : -sort.dir))
    }
    return rows
  }, [all, q, status, category, sort])

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, pages)
  const rows = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)
  const categories = ['All Category', ...new Set(all.map((p) => p.category))]

  const toggleSort = (key) =>
    setSort((s) => (s.key === key ? { key, dir: -s.dir } : { key, dir: 1 }))

  const removeSelected = () => {
    setProducts((ps) => ps.filter((p) => !selected.includes(p.id)))
    setSelected([])
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Product"
        crumb="Product"
        action={
          <div className="flex gap-2">
            <Button variant="outline"><IcDownload size={15} /> Export</Button>
            <Button onClick={() => onNavigate('add-product')}><IcPlusCircle size={15} /> Add Product</Button>
          </div>
        }
      />

      <Card className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"><IcSearch size={15} /></span>
            <input
              value={local}
              onChange={(e) => { setLocal(e.target.value); setPage(1) }}
              placeholder="Search product name…"
              className="h-10 w-full rounded-lg border border-line bg-sunken pl-9 pr-3 text-sm outline-none transition placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <Select options={['All Status', 'Active', 'Low Stock', 'Out of Stock']} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} className="md:w-40" />
          <Select options={categories} value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }} className="md:w-40" />
          <Button variant="outline" className="justify-self-start"><IcFilter size={14} /> Filter</Button>
        </div>
        {selected.length > 0 && (
          <div className="mt-3 flex items-center gap-3 rounded-lg bg-brand-soft px-3 py-2">
            <span className="text-xs font-bold text-brand">{selected.length} selected</span>
            <button onClick={removeSelected} className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-pink hover:underline">
              <IcTrash size={13} /> Delete
            </button>
          </div>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="border-b border-line bg-sunken">
              <tr>
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={rows.length > 0 && rows.every((r) => selected.includes(r.id))}
                    onChange={(v) => setSelected(v ? [...new Set([...selected, ...rows.map((r) => r.id)])] : selected.filter((id) => !rows.some((r) => r.id === id)))}
                    label="select all"
                  />
                </th>
                <Th label="Product" k="name" sort={sort} onSort={toggleSort} />
                <Th label="Category" k="category" sort={sort} onSort={toggleSort} />
                <Th label="Price" k="price" sort={sort} onSort={toggleSort} />
                <Th label="Stock" k="stock" sort={sort} onSort={toggleSort} />
                <Th label="Sales" k="sales" sort={sort} onSort={toggleSort} />
                <Th label="Status" />
                <Th label="" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((p) => (
                <tr key={p.id} className={`transition hover:bg-sunken ${selected.includes(p.id) ? 'bg-brand-soft/60' : ''}`}>
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selected.includes(p.id)}
                      onChange={(v) => setSelected((s) => (v ? [...s, p.id] : s.filter((x) => x !== p.id)))}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sunken text-[10px] font-bold text-muted">
                        {p.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="font-bold">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{p.category}</td>
                  <td className="px-4 py-3 font-semibold">{money(p.price)}</td>
                  <td className="px-4 py-3 text-muted">{p.stock}</td>
                  <td className="px-4 py-3 text-muted">{p.sales}</td>
                  <td className="px-4 py-3"><Tag tone={statusTone[p.status]}>{p.status}</Tag></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button aria-label={`edit ${p.name}`} className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-sunken hover:text-ink"><IcEdit size={14} /></button>
                      <button
                        aria-label={`delete ${p.name}`}
                        onClick={() => setProducts((ps) => ps.filter((x) => x.id !== p.id))}
                        className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-pink/10 hover:text-pink"
                      >
                        <IcTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-muted">No products match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-line p-4">
          <Pagination page={safePage} pages={pages} onPage={setPage} total={filtered.length} shown={rows.length} />
          {!loaded && (
            <Button variant="outline" className="mt-3 w-full" onClick={() => setLoaded(true)}>
              Load More Products
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
