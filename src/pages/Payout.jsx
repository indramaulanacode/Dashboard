import { useState } from 'react'
import { Button, Card, CardHead, Input, PageHeader, Select, StatCard, Tag, statusTone } from '../components/ui.jsx'
import { money, payouts } from '../data.js'
import { IcCheck, IcPlusCircle, IcWallet } from '../icons.jsx'

export default function Payout() {
  const [method, setMethod] = useState('Bank Transfer')
  const [account, setAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [requested, setRequested] = useState([])
  const [error, setError] = useState('')

  const request = (e) => {
    e.preventDefault()
    if (!account.trim() || !amount || Number(amount) <= 0) {
      setError('Enter a destination account and a valid amount.')
      return
    }
    setError('')
    setRequested((r) => [
      { id: Date.now(), method, account: account.trim(), date: '03/10/2024', amount: Number(amount), status: 'Processing' },
      ...r,
    ])
    setAccount('')
    setAmount('')
  }

  const rows = [...requested, ...payouts]
  const balance = 24820.5

  return (
    <div className="space-y-5">
      <PageHeader title="Payout" crumb="Payout" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Available Balance" value={money(balance)} delta="6.3%" icon={<IcWallet size={15} />} />
        <StatCard label="Paid This Year" value={money(118420)} delta="12.8%" icon={<IcCheck size={15} />} accent="var(--color-green)" />
        <StatCard label="Processing" value={String(rows.filter((r) => r.status === 'Processing').length)} icon={<IcWallet size={15} />} accent="var(--color-blue)" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1.6fr]">
        <Card className="p-6">
          <CardHead title="Request Payout" subtitle="Funds arrive within 1-3 business days." />
          <form onSubmit={request} className="mt-5 space-y-4" noValidate>
            <Select label="Method" options={['Bank Transfer', 'Paypal', 'Crypto']} value={method} onChange={(e) => setMethod(e.target.value)} />
            <Input label="Destination Account" placeholder="BCA •••• 4821 / email / wallet" value={account} onChange={(e) => setAccount(e.target.value)} />
            <Input label="Amount (USD)" type="number" min="0" placeholder="500" value={amount} onChange={(e) => setAmount(e.target.value)} />
            {error && <p className="text-[11px] font-semibold text-pink">{error}</p>}
            <Button type="submit" className="w-full"><IcPlusCircle size={15} /> Request Payout</Button>
          </form>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="border-b border-line bg-sunken">
                <tr>
                  {['Method', 'Account', 'Date', 'Amount', 'Status'].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-faint">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((p) => (
                  <tr key={p.id} className="transition hover:bg-sunken">
                    <td className="px-5 py-3 font-bold">{p.method}</td>
                    <td className="px-5 py-3 text-muted">{p.account}</td>
                    <td className="px-5 py-3 text-muted">{p.date}</td>
                    <td className="px-5 py-3 font-semibold">{money(p.amount)}</td>
                    <td className="px-5 py-3"><Tag tone={statusTone[p.status]}>{p.status}</Tag></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
