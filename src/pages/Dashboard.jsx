import { useMemo, useState } from 'react'
import { BarChart, LineChart, MiniBars, Sparkline, StackedBarChart } from '../components/charts.jsx'
import { Avatar, Button, Card, CardHead, Pagination, Segmented, StatCard, Tag, statusTone } from '../components/ui.jsx'
import {
  earningBars, earningLine, miniBars, money, overviewBars, overviewLabels, recentSales,
  sparkSets, subLine, topSales, weekStack,
} from '../data.js'
import {
  IcCard, IcDollar, IcDownload, IcEdit, IcEye, IcPlusCircle, IcUsers,
} from '../icons.jsx'

export default function Dashboard({ onNavigate }) {
  const [range, setRange] = useState('Year')
  const [statsRange, setStatsRange] = useState('Year')
  const [editMode, setEditMode] = useState(false)
  const [salesPage, setSalesPage] = useState(1)
  const [gotStarted, setGotStarted] = useState(false)

  const bars = overviewBars[range]
  const perPage = 5
  const sales = useMemo(() => recentSales.slice((salesPage - 1) * perPage, salesPage * perPage), [salesPage])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="mt-0.5 text-xs text-muted">Welcome back, Indra — here is what is happening today.</p>
        </div>
        <Button onClick={() => onNavigate('add-product')}>
          <IcPlusCircle size={15} /> Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Earning" value={money(112893)} delta="15.3%" icon={<IcDollar size={15} />} />
        <StatCard label="Views" value="+112,893" delta="8.1%" icon={<IcEye size={15} />} accent="var(--color-blue)" />
        <StatCard label="Total Sales" value="+112,893" delta="4.6%" icon={<IcCard size={15} />} accent="var(--color-teal)" />
        <StatCard label="Subscriptions" value="+112,893" delta="2.4%" up={false} icon={<IcUsers size={15} />} accent="var(--color-purple)" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-5">
          <CardHead
            title="Overview"
            right={<Segmented options={['Week', 'Month', 'Year']} value={range} onChange={setRange} size="sm" />}
          />
          <div className="mt-5">
            <BarChart data={bars} labels={overviewLabels} height={230} />
          </div>
        </Card>

        <Card className="flex flex-col p-5">
          <CardHead title="Recent Sales" subtitle="You made 265 sales this month" />
          <ul className="mt-4 flex-1 divide-y divide-line">
            {sales.map((s) => (
              <li key={`${s.id}-${salesPage}`} className="flex items-center gap-3 py-2.5">
                <Avatar name={s.name} size={34} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold">{s.name}</p>
                  <p className="truncate text-[11px] text-muted">{s.email}</p>
                </div>
                <span className="text-xs font-bold text-green">+{money(s.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-line pt-3">
            <Pagination page={salesPage} pages={2} onPage={(p) => setSalesPage(Math.min(2, Math.max(1, p)))} total={recentSales.length} shown={sales.length} />
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <CardHead
          title="Stats"
          right={
            <div className="flex flex-wrap items-center gap-2">
              <Segmented options={['Week', 'Month', 'Year']} value={statsRange} onChange={setStatsRange} size="sm" />
              <Button variant="outline" size="sm" onClick={() => setEditMode((v) => !v)} aria-pressed={editMode}>
                <IcEdit size={13} /> {editMode ? 'Done' : 'Edit'}
              </Button>
            </div>
          }
        />
        <div className={`mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr] ${editMode ? 'rounded-xl outline-2 outline-dashed outline-brand/40' : ''}`}>
          <Card className="border-line/70 bg-sunken p-4">
            <CardHead title="Total Earning" subtitle={money(112893)} right={<Tag tone="green">+15.3%</Tag>} />
            <div className="mt-4">
              <LineChart data={earningLine} labels={overviewLabels} height={170} color="var(--color-green)" />
            </div>
          </Card>
          <Card className="border-line/70 bg-sunken p-4">
            <CardHead title="Total Earning" subtitle={money(112893)} right={<Tag tone="orange">+15.3%</Tag>} />
            <div className="mt-4">
              <MiniBars data={miniBars} height={170} color="var(--color-teal)" />
            </div>
          </Card>
          <Card className="border-line/70 bg-sunken p-4">
            <CardHead title="Weekly Sales" subtitle={money(48210)} right={<Tag tone="orange">+9.7%</Tag>} />
            <div className="mt-4">
              <StackedBarChart data={weekStack} height={150} />
            </div>
          </Card>
          <Card className="border-line/70 bg-sunken p-4">
            <CardHead title="Subscriptions" subtitle="+112,893" right={<Tag tone="blue">+2.4%</Tag>} />
            <div className="mt-6">
              <Sparkline data={subLine} color="var(--color-brand)" height={140} dots />
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: 'Total Earning', value: '+112,893', color: 'var(--color-green)', set: sparkSets.green },
          { label: 'Total Sales', value: '+112,893', color: 'var(--color-purple)', set: sparkSets.purple },
          { label: 'Total Views', value: '+112,893', color: 'var(--color-brand)', set: sparkSets.orange },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-xs font-medium text-muted">{s.label}</p>
            <p className="mt-1.5 text-lg font-extrabold">{s.value}</p>
            <div className="mt-4">
              <Sparkline data={s.set} color={s.color} height={56} />
            </div>
            <p className="mt-3 flex justify-between text-[10px] text-faint"><span>Nov 20th</span><span>Dec 20th</span></p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="flex flex-col p-5">
          <CardHead title="Subscriptions Performers" subtitle="Follower This Years" />
          <div className="flex flex-1 flex-col items-center justify-center py-6">
            <p className="text-4xl font-extrabold tracking-tight">+500</p>
            <p className="mt-1 text-[11px] text-muted">new subscribers</p>
          </div>
          <MiniBars data={miniBars} height={72} color="var(--color-teal)" />
          <Button variant={gotStarted ? 'soft' : 'dark'} className="mt-5 w-full" onClick={() => setGotStarted((v) => !v)}>
            {gotStarted ? 'Started ✓' : 'Get Started'}
          </Button>
        </Card>

        <Card className="p-5">
          <CardHead title="Top Sales Product" subtitle="Manage your payments" />
          <ul className="mt-4 divide-y divide-line">
            {topSales.slice(0, 5).map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-sunken text-[10px] font-bold text-muted">
                  {t.product.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold">{t.product}</p>
                  <p className="text-[11px] text-muted">{t.date}</p>
                </div>
                <span className="text-xs font-bold">{money(t.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-end gap-2 border-t border-line pt-3">
            <Button variant="outline" size="sm" onClick={() => onNavigate('product')}>Previous</Button>
            <Button variant="outline" size="sm" onClick={() => onNavigate('product')}>Next</Button>
          </div>
        </Card>

        <Card className="p-5">
          <CardHead title="Payment History" subtitle="Manage your payments" />
          <ul className="mt-4 divide-y divide-line">
            {recentSales.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-2.5">
                <Tag tone={statusTone.Succes}>Succes</Tag>
                <span className="min-w-0 flex-1 truncate text-[11px] text-muted">{p.email}</span>
                <span className="text-xs font-bold">{money(p.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-end gap-2 border-t border-line pt-3">
            <Button variant="outline" size="sm" onClick={() => onNavigate('payment')}>Previous</Button>
            <Button variant="outline" size="sm" onClick={() => onNavigate('payment')}>Next</Button>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <CardHead
          title="Earning momentum"
          subtitle="Monthly bars vs. trend"
          right={<Button variant="outline" size="sm"><IcDownload size={13} /> Export</Button>}
        />
        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarChart data={earningBars} labels={overviewLabels} height={160} fade={false} />
          <LineChart data={earningLine} labels={overviewLabels} height={160} color="var(--color-purple)" fill />
        </div>
      </Card>
    </div>
  )
}
