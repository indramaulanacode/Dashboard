import { useState } from 'react'
import { Button, Card, CardHead, Input, PageHeader, Select, Tag, Textarea } from '../components/ui.jsx'
import { IcCheck, IcDownload } from '../icons.jsx'

const empty = { name: '', category: 'Laptop', price: '', stock: '', status: 'Active', description: '' }

export default function AddProduct({ addProduct, onNavigate }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setSaved(false)
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Product name is required'
    if (!form.price || Number(form.price) <= 0) errs.price = 'Enter a valid price'
    if (form.stock === '' || Number(form.stock) < 0) errs.stock = 'Enter a valid stock'
    setErrors(errs)
    if (Object.keys(errs).length) return
    addProduct({
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      status: Number(form.stock) === 0 ? 'Out of Stock' : Number(form.stock) < 10 ? 'Low Stock' : form.status,
      sales: 0,
    })
    setForm(empty)
    setSaved(true)
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Add Product"
        crumb="Add Product"
        action={<Button variant="outline" onClick={() => onNavigate('product')}>Back to Product</Button>}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-6">
          <CardHead title="Product Information" subtitle="Fill the details below to publish a new product." />
          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            <div>
              <Input label="Product Name" placeholder="e.g. Macbook Pro M3" value={form.name} onChange={set('name')} />
              {errors.name && <p className="mt-1 text-[11px] font-semibold text-pink">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Select label="Category" options={['Laptop', 'Phone', 'Tablet', 'Audio', 'Wearable']} value={form.category} onChange={set('category')} />
              <div>
                <Input label="Price (USD)" type="number" min="0" placeholder="999" value={form.price} onChange={set('price')} />
                {errors.price && <p className="mt-1 text-[11px] font-semibold text-pink">{errors.price}</p>}
              </div>
              <div>
                <Input label="Stock" type="number" min="0" placeholder="25" value={form.stock} onChange={set('stock')} />
                {errors.stock && <p className="mt-1 text-[11px] font-semibold text-pink">{errors.stock}</p>}
              </div>
            </div>
            <Textarea label="Description" placeholder="Short marketing description…" value={form.description} onChange={set('description')} />
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button type="submit">Save Product</Button>
              <Button type="button" variant="outline" onClick={() => { setForm(empty); setErrors({}); setSaved(false) }}>
                Reset
              </Button>
              {saved && (
                <Tag tone="green" className="h-8"><IcCheck size={13} /> Product saved to catalog</Tag>
              )}
            </div>
          </form>
        </Card>

        <div className="space-y-5">
          <Card className="p-6">
            <CardHead title="Preview" />
            <div className="mt-4 rounded-xl border border-dashed border-line bg-sunken p-5 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-lg font-extrabold text-brand">
                {(form.name || 'NP').slice(0, 2).toUpperCase()}
              </span>
              <p className="mt-3 text-sm font-bold">{form.name || 'Product name'}</p>
              <p className="text-xs text-muted">{form.category}</p>
              <p className="mt-2 text-lg font-extrabold text-brand">
                ${Number(form.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <Tag tone={Number(form.stock) === 0 ? 'pink' : Number(form.stock) < 10 ? 'orange' : 'green'} className="mt-2">
                {Number(form.stock) === 0 ? 'Out of Stock' : Number(form.stock) < 10 ? 'Low Stock' : 'Active'}
              </Tag>
            </div>
          </Card>
          <Card className="p-6">
            <CardHead title="Media" subtitle="Product images (demo)" />
            <button className="mt-4 flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-line bg-sunken py-8 text-muted transition hover:border-brand hover:text-brand">
              <IcDownload size={20} className="rotate-180" />
              <span className="text-xs font-semibold">Drop images or click to upload</span>
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}
