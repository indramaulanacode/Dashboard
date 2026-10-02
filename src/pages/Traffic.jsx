import { useState } from 'react'
import { BarChart, Donut, LineChart, Sparkline } from '../components/charts.jsx'
import { Card, CardHead, PageHeader, Segmented, StatCard, Tag } from '../components/ui.jsx'
import { overviewLabels, sparkSets, trafficBars, trafficLine, trafficSources } from '../data.js'
import { IcActivity, IcGlobe, IcUsers } from '../icons.jsx'

const donutSegments = [
  { label: 'Organic Search', value: 42, color: 'var(--color-brand)' },
  { label: 'Direct', value: 23, color: 'var(--color-teal)' },
  { label: 'Social Media', value: 17, color: 'var(--color-purple)' },
  { label: 'Referral', value: 10, color: 'var(--color-blue)' },
  { label: 'Email', value: 8, color: 'var(--color-pink)' },
]

export default function Traffic() {
  const [range, setRange] = useState('Year')

  return (
    <div className="space-y-5">
      <PageHeader
        title="Traffic"
        crumb="Traffic"
        action={<Segmented options={['Week', 'Month', 'Year']} value={range} onChange={setRange} />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Visits" value="284,120" delta="12.4%" icon={<IcActivity size={15} />} />
        <StatCard label="Unique Visitors" value="96,430" delta="6.8%" icon={<IcUsers size={15} />} accent="var(--color-blue)" />
        <StatCard label="Bounce Rate" value="38.2%" delta="1.9%" up={false} icon={<IcGlobe size={15} />} accent="var(--color-pink)" />
        <StatCard label="Avg. Session" value="4m 32s" delta="3.5%" icon={<IcActivity size={15} />} accent="var(--color-teal)" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-5">
          <CardHead title="Visits Overview" subtitle="Sessions per month" />
          <div className="mt-5">
            <BarChart data={trafficBars} labels={overviewLabels} height={220} />
          </div>
        </Card>
        <Card className="flex flex-col items-center p-5">
          <CardHead title="Traffic Sources" subtitle="Share of total sessions" className="w-full" />
          <div className="my-6">
            <Donut segments={donutSegments} centerValue="284k" centerLabel="total visits" />
          </div>
          <ul className="w-full space-y-2.5">
            {trafficSources.map((s, i) => (
              <li key={s.label} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: donutSegments[i].color }} />
                <span className="flex-1 text-xs font-semibold">{s.label}</span>
                <span className="text-xs text-muted">{s.value.toLocaleString()}</span>
                <span className="w-10 text-right text-xs font-bold">{s.pct}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <CardHead title="Session Trend" subtitle="Weekly active sessions" right={<Tag tone="green">+8.2%</Tag>} />
          <div className="mt-5">
            <LineChart data={trafficLine} labels={overviewLabels} height={170} color="var(--color-blue)" fill />
          </div>
        </Card>
        <Card className="p-5">
          <CardHead title="Engagement" subtitle="Pages per session" right={<Tag tone="purple">+4.1%</Tag>} />
          <div className="mt-5">
            <Sparkline data={sparkSets.teal} color="var(--color-teal)" height={170} fill dots />
          </div>
        </Card>
      </div>
    </div>
  )
}
