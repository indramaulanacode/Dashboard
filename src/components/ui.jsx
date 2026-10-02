import { IcChevronLeft, IcChevronRight, IcTrendDown, IcTrendUp } from '../icons.jsx'

export function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  const sizes = { sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-11 px-5 text-sm' }
  const variants = {
    primary: 'bg-brand text-white hover:brightness-110 shadow-sm shadow-brand/30',
    soft: 'bg-brand-soft text-brand hover:brightness-95 dark:hover:brightness-125',
    outline: 'border border-line bg-surface text-ink hover:bg-sunken',
    ghost: 'text-muted hover:bg-sunken hover:text-ink',
    dark: 'bg-ink text-canvas hover:opacity-90',
  }
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

export function Card({ className = '', children, ...rest }) {
  return (
    <section className={`rounded-2xl border border-line bg-surface ${className}`} {...rest}>
      {children}
    </section>
  )
}

export function CardHead({ title, subtitle, right, className = '' }) {
  return (
    <div className={`flex flex-wrap items-start justify-between gap-3 ${className}`}>
      <div>
        <h3 className="text-sm font-bold">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

export function StatCard({ label, value, delta, up = true, icon, spark, accent = 'var(--color-brand)' }) {
  return (
    <Card className="p-4 transition-shadow hover:shadow-lg hover:shadow-black/5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-muted">{label}</p>
        {icon && (
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-sunken text-muted" style={{ color: accent }}>
            {icon}
          </span>
        )}
      </div>
      <p className="mt-2 text-xl font-extrabold tracking-tight">{value}</p>
      {delta && (
        <p className={`mt-1 flex items-center gap-1 text-[11px] font-semibold ${up ? 'text-green' : 'text-pink'}`}>
          {up ? <IcTrendUp size={13} /> : <IcTrendDown size={13} />}
          {delta}
          <span className="font-normal text-faint">vs last month</span>
        </p>
      )}
      {spark && <div className="mt-3">{spark}</div>}
    </Card>
  )
}

const tagStyles = {
  green: 'bg-green/10 text-green',
  orange: 'bg-brand/10 text-brand',
  blue: 'bg-blue/10 text-blue',
  pink: 'bg-pink/10 text-pink',
  purple: 'bg-purple/10 text-purple',
  gray: 'bg-sunken text-muted',
}

export function Tag({ tone = 'gray', children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${tagStyles[tone]} ${className}`}>
      {children}
    </span>
  )
}

export const statusTone = { Active: 'green', Succes: 'green', Paid: 'green', Pending: 'orange', Processing: 'blue', 'Low Stock': 'orange', 'Out of Stock': 'pink', Failed: 'pink' }

export function Input({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>}
      <input
        className={`h-10 w-full rounded-lg border border-line bg-sunken px-3 text-sm text-ink outline-none transition placeholder:text-faint focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/20 ${className}`}
        {...props}
      />
    </label>
  )
}

export function Textarea({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>}
      <textarea
        className={`min-h-24 w-full rounded-lg border border-line bg-sunken px-3 py-2 text-sm text-ink outline-none transition placeholder:text-faint focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/20 ${className}`}
        {...props}
      />
    </label>
  )
}

export function Select({ label, options, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-semibold text-muted">{label}</span>}
      <select
        className={`h-10 w-full appearance-none rounded-lg border border-line bg-sunken px-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${className}`}
        {...props}
      >
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </label>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-brand' : 'bg-line'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  )
}

export function Checkbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label || 'select row'}
      onClick={(e) => { e.stopPropagation(); onChange(!checked) }}
      className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded border transition-all ${checked ? 'border-brand bg-brand text-white' : 'border-line bg-surface hover:border-faint'}`}
      style={{ width: 18, height: 18 }}
    >
      {checked && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  )
}

const avatarColors = ['bg-brand', 'bg-blue', 'bg-purple', 'bg-teal', 'bg-pink', 'bg-green']

export function Avatar({ name = 'Michael Brooks', size = 36, className = '', ring = false }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const color = avatarColors[(name.charCodeAt(0) + name.length) % avatarColors.length]
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full font-bold text-white ${color} ${ring ? 'ring-2 ring-brand ring-offset-2 ring-offset-surface' : ''} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  )
}

export function Segmented({ options, value, onChange, size = 'md' }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-line bg-sunken p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-md font-semibold transition-all ${size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'} ${value === o ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function Pagination({ page, pages, onPage, total, shown }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-muted">
        Showing <span className="font-semibold text-ink">{shown}</span> of <span className="font-semibold text-ink">{total}</span> entries
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          aria-label="previous page"
          className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition hover:bg-sunken disabled:opacity-40"
        >
          <IcChevronLeft size={14} />
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onPage(n)}
            aria-current={n === page ? 'page' : undefined}
            className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${n === page ? 'bg-brand text-white shadow-sm shadow-brand/30' : 'text-muted hover:bg-sunken hover:text-ink'}`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === pages}
          aria-label="next page"
          className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition hover:bg-sunken disabled:opacity-40"
        >
          <IcChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}

export function PageHeader({ title, crumb, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-[11px] font-medium text-faint">Home <span className="mx-1">/</span> <span className="text-brand">{crumb || title}</span></p>
        <h1 className="mt-1 text-xl font-extrabold tracking-tight">{title}</h1>
      </div>
      {action}
    </div>
  )
}
