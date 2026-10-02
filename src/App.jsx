import { useEffect, useState } from 'react'
import Footer from './components/Footer.jsx'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import { products as seedProducts } from './data.js'
import AddProduct from './pages/AddProduct.jsx'
import Auth from './pages/Auth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Earning from './pages/Earning.jsx'
import Help from './pages/Help.jsx'
import Payment from './pages/Payment.jsx'
import Payout from './pages/Payout.jsx'
import Products from './pages/Products.jsx'
import Profile from './pages/Profile.jsx'
import Security from './pages/Security.jsx'
import Traffic from './pages/Traffic.jsx'

export default function App() {
  const [theme, setTheme] = useState('light')
  const [authed, setAuthed] = useState(true)
  const [authMode, setAuthMode] = useState('in')
  const [page, setPage] = useState('dashboard')
  const [query, setQuery] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const [products, setProducts] = useState(seedProducts)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const navigate = (id) => {
    setPage(id)
    setNavOpen(false)
  }

  if (!authed) {
    return (
      <div className={theme === 'dark' ? 'dark' : ''}>
        <Auth
          mode={authMode}
          onMode={setAuthMode}
          onAuth={() => {
            setAuthed(true)
            setPage('dashboard')
          }}
        />
      </div>
    )
  }

  const pages = {
    dashboard: <Dashboard onNavigate={navigate} />,
    product: <Products products={products} setProducts={setProducts} query={query} onNavigate={navigate} />,
    'add-product': <AddProduct addProduct={(p) => setProducts((ps) => [p, ...ps])} onNavigate={navigate} />,
    traffic: <Traffic />,
    earning: <Earning />,
    payment: <Payment query={query} />,
    payout: <Payout />,
    profile: <Profile />,
    security: <Security />,
    help: <Help />,
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="flex h-screen bg-canvas text-ink">
        <Sidebar page={page} onNavigate={navigate} open={navOpen} onClose={() => setNavOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            onMenu={() => setNavOpen(true)}
            theme={theme}
            onTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            query={query}
            onQuery={setQuery}
            onNavigate={navigate}
            onSignOut={() => {
              setAuthed(false)
              setAuthMode('in')
            }}
          />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6">
              {pages[page]}
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
