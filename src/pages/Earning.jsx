import { useState } from 'react'
import { BarChart, LineChart, MiniBars, Sparkline } from '../components/charts.jsx'
import { Card, CardHead, PageHeader, Segmented, StatCard, Tag } from '../components/ui.jsx'
import { earningsMonthly, money, sparkSets } from '../data.js'
import { IcClock, IcDollar, IcTrendUp, IcWallet } from '../icons.jsx'

export default function Earning() {
  const [range, setRange] = useState('Year')
  const total = earningsMonthly.reduce((s, m) => s + m.amount, 0)

  return (
    <div className="space-y-5">
      <PageHeader
        title="Earning"
        crumb="Earning"
        action={<Segmented options={['Week', 'Month', 'Year']} value={range} onChange={setRange} />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Earning" value={money(total)} delta="15.3%" icon={<IcDollar size={15} />} />
        <StatCard label="Net Revenue" value={money(total * 0.82)} delta="11.2%" icon={<IcTrendUp size={15} />} accent="var(--color-green)" />
        <StatCard label="Pending Clearance" value={money(4820)} delta="2.1%" up={false} icon={<IcClock size={15} />} accent="#f59e0b" />
        <StatCard label="Withdrawn" value={money(total * 0.6)} delta="7.4%" icon={<IcWallet size={15} />} accent="var(--color-purple)" />
      </div>

      <Card className="p-5">
        <CardHead title="Monthly Earning" subtitle="Gross revenue per month" right={<Tag tone="green">+15.3% vs last year</Tag>} />
        <div className="mt-5">
          <BarChart
            data={earningsMonthly.map((m) => m.amount)}
            labels={earningsMonthly.map((m) => m.month)}
            height={230}
            yTicks={['$0', '$4k', '$8k', '$12k', '$16k']}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <CardHead title="Revenue Trend" subtitle="Cumulative" />
          <div className="mt-4">
            <LineChart data={earningsMonthly.map((m) => m.amount / 100)} height={120} color="var(--color-green)" fill />
          </div>
        </Card>
        <Card className="p-5">
          <CardHead title="Daily Average" subtitle="Last 12 weeks" />
          <div className="mt-4">
            <MiniBars data={[42, 58, 46, 66, 52, 74, 60, 70, 55, 78, 64, 82]} height={120} color="var(--color-brand)" />
          </div>
        </Card>
        <Card className="p-5">
          <CardHead title="Forecast" subtitle="Next quarter" />
          <div className="mt-4">
            <Sparkline data={sparkSets.purple} color="var(--color-purple)" height={120} fill dots />
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b border-line bg-sunken">
              <tr>
                {['Month', 'Amount', 'Growth', 'Share'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-faint">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {earningsMonthly.map((m, i) => {
                const prev = earningsMonthly[i - 1]?.amount ?? m.amount
                const growth = ((m.amount - prev) / prev) * 100
                return (
                  <tr key={m.month} className="transition hover:bg-sunken">
                    <td className="px-5 py-3 font-bold">{m.month} 2024</td>
                    <td className="px-5 py-3 font-semibold">{money(m.amount)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-bold ${growth >= 0 ? 'text-green' : 'text-pink'}`}>
                        {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-sunken">
                          <div className="h-full rounded-full bg-brand" style={{ width: `${(m.amount / 16200) * 100}%` }} />
                        </div>
                        <span className="text-[11px] text-muted">{Math.round((m.amount / total) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
