const smooth = (pts) => {
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const mx = (x0 + x1) / 2
    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`
  }
  return d
}

export function BarChart({ data, labels, height = 220, color = 'var(--color-brand)', fade = true, yTicks = ['$0', '$1500', '$3000', '$4500', '$6000'] }) {
  const max = Math.max(...data) * 1.15
  return (
    <div className="w-full">
      <div className="flex gap-3">
        <div className="flex flex-col justify-between py-1 text-right text-[10px] text-faint" style={{ height }}>
          {[...yTicks].reverse().map((t) => (<span key={t}>{t}</span>))}
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0 flex flex-col justify-between">
            {yTicks.map((t) => (<div key={t} className="border-t border-line/70" />))}
          </div>
          <div className="relative flex h-full items-end gap-[6%] px-1" style={{ height }}>
            {data.map((v, i) => (
              <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
                <div
                  className="relative w-full rounded-t-[4px] transition-all duration-300 group-hover:opacity-80"
                  style={{
                    height: `${(v / max) * 100}%`,
                    background: fade ? `linear-gradient(180deg, ${color} 0%, color-mix(in srgb, ${color} 35%, transparent) 100%)` : color,
                  }}
                >
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-ink px-1.5 py-0.5 text-[10px] font-semibold text-canvas opacity-0 transition-opacity group-hover:opacity-100">
                    {v}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {labels && (
        <div className="mt-2 flex gap-[6%] pl-10 px-1">
          {labels.map((l) => (<span key={l} className="flex-1 text-center text-[10px] text-faint">{l}</span>))}
        </div>
      )}
    </div>
  )
}

export function LineChart({ data, labels, height = 180, color = 'var(--color-green)', dots = true, fill = false }) {
  const w = 600
  const h = height
  const max = Math.max(...data) * 1.2
  const min = Math.min(...data) * 0.6
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / (max - min)) * (h - 20) - 10])
  const d = smooth(pts)
  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="var(--color-line)" strokeDasharray="4 6" strokeWidth="1" />
        ))}
        {fill && <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill={color} opacity="0.12" />}
        <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        {dots && pts.map(([x, y], i) => (<circle key={i} cx={x} cy={y} r="4" fill="var(--color-surface)" stroke={color} strokeWidth="2.5" />))}
      </svg>
      {labels && (
        <div className="mt-1 flex">
          {labels.map((l) => (<span key={l} className="flex-1 text-center text-[10px] text-faint">{l}</span>))}
        </div>
      )}
    </div>
  )
}

export function StackedBarChart({ data, height = 180, colorA = 'var(--color-brand)', colorB = '#ffd9b8' }) {
  const max = Math.max(...data.map((d) => d.a + d.b)) * 1.15
  return (
    <div className="w-full">
      <div className="flex items-end gap-[8%]" style={{ height }}>
        {data.map((d) => (
          <div key={d.label} className="group relative flex h-full flex-1 flex-col justify-end">
            <div className="w-full rounded-t-[4px]" style={{ height: `${(d.b / max) * 100}%`, background: colorB }} />
            <div className="w-full" style={{ height: `${(d.a / max) * 100}%`, background: `linear-gradient(180deg, ${colorA}, color-mix(in srgb, ${colorA} 65%, transparent))` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-[8%]">
        {data.map((d) => (<span key={d.label} className="flex-1 text-center text-[10px] text-faint">{d.label}</span>))}
      </div>
    </div>
  )
}

export function Sparkline({ data, color = 'var(--color-green)', height = 48, fill = true, dots = false }) {
  const w = 160
  const max = Math.max(...data) * 1.15
  const min = Math.min(...data) * 0.7
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, height - ((v - min) / (max - min)) * (height - 8) - 4])
  const d = smooth(pts)
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      {fill && <path d={`${d} L ${w} ${height} L 0 ${height} Z`} fill={color} opacity="0.1" />}
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {dots && pts.map(([x, y], i) => (<circle key={i} cx={x} cy={y} r="2.5" fill={color} />))}
    </svg>
  )
}

export function MiniBars({ data, height = 64, color = 'var(--color-teal)' }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-[3px] transition-opacity hover:opacity-75" style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(180deg, ${color}, color-mix(in srgb, ${color} 40%, transparent))` }} />
      ))}
    </div>
  )
}

export function Donut({ segments, size = 168, thickness = 18, centerLabel, centerValue }) {
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const total = segments.reduce((s, x) => s + x.value, 0)
  const lens = segments.map((s) => (s.value / total) * c)
  const offs = lens.map((_, i) => -lens.slice(0, i).reduce((t, l) => t + l, 0))
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth={thickness} />
        {segments.map((s, i) => (
          <circle key={s.label} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth={thickness}
            strokeDasharray={`${lens[i] - 3} ${c - lens[i] + 3}`} strokeDashoffset={offs[i]} strokeLinecap="round" />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-extrabold">{centerValue}</span>
        <span className="text-[11px] text-muted">{centerLabel}</span>
      </div>
    </div>
  )
}
