export const money = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export const recentSales = [
  { id: 1, name: 'Michael Brooks', email: 'indramaulana@gmail.com', amount: 1500.0 },
  { id: 2, name: 'Michael Brooks', email: 'indramaulana@gmail.com', amount: 1500.0 },
  { id: 3, name: 'Michael Brooks', email: 'indramaulana@gmail.com', amount: 1500.0 },
  { id: 4, name: 'Michael Brooks', email: 'indramaulana@gmail.com', amount: 1500.0 },
  { id: 5, name: 'Michael Brooks', email: 'indramaulana@gmail.com', amount: 1500.0 },
  { id: 6, name: 'Michael Brooks', email: 'indramaulana@gmail.com', amount: 1500.0 },
]

export const overviewBars = {
  Year: [1200, 3900, 1500, 4200, 2600, 3300, 4600, 2100, 1300, 2600, 1100, 2400],
  Month: [900, 2400, 1800, 3100, 2200, 2800, 3600, 1900, 2400, 3000, 2100, 2600],
  Week: [400, 900, 650, 1200, 800, 1000, 1300, 700, 950, 1100, 820, 1000],
}
export const overviewLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const earningLine = [22, 35, 18, 30, 62, 40, 34, 44, 30, 42, 28, 40]
export const earningBars = [30, 42, 36, 48, 40, 52, 44, 56, 48, 60, 52, 64]
export const weekStack = [
  { label: 'Mo', a: 180, b: 120 },
  { label: 'Tu', a: 240, b: 160 },
  { label: 'We', a: 300, b: 190 },
  { label: 'Th', a: 260, b: 150 },
  { label: 'Fr', a: 200, b: 130 },
  { label: 'Sa', a: 280, b: 170 },
  { label: 'Su', a: 230, b: 140 },
]
export const subLine = [12, 18, 10, 22, 14, 26, 16, 30, 20, 34, 26, 40]

export const sparkSets = {
  green: [8, 14, 10, 18, 12, 20, 15, 24, 18, 26],
  purple: [10, 16, 12, 20, 14, 18, 22, 16, 24, 28],
  orange: [20, 14, 18, 10, 16, 12, 20, 15, 24, 30],
  teal: [12, 20, 16, 26, 18, 28, 22, 30, 26, 34],
}

export const miniBars = [34, 52, 40, 62, 48, 70, 55, 66, 50, 74, 58, 68]

export const topSales = [
  { id: 1, product: 'Macbook Pro', date: '02/10/2024', amount: 100 },
  { id: 2, product: 'Iphone 13 Pro', date: '02/10/2024', amount: 100 },
  { id: 3, product: 'Macbook m3 pro', date: '02/10/2024', amount: 100 },
  { id: 4, product: 'Youremail@gmail.com', date: '02/10/2024', amount: 100 },
  { id: 5, product: 'Youremail@gmail.com', date: '02/10/2024', amount: 100 },
  { id: 6, product: 'Youremail@gmail.com', date: '02/10/2024', amount: 100 },
]

export const products = [
  { id: 1, name: 'Macbook Pro M3', category: 'Laptop', price: 2499.0, stock: 24, status: 'Active', sales: 320 },
  { id: 2, name: 'Iphone 15 Pro Max', category: 'Phone', price: 1199.0, stock: 58, status: 'Active', sales: 512 },
  { id: 3, name: 'Airpods Pro 2', category: 'Audio', price: 249.0, stock: 0, status: 'Out of Stock', sales: 210 },
  { id: 4, name: 'Ipad Air 2024', category: 'Tablet', price: 799.0, stock: 12, status: 'Low Stock', sales: 140 },
  { id: 5, name: 'Apple Watch Ultra 2', category: 'Wearable', price: 899.0, stock: 33, status: 'Active', sales: 188 },
  { id: 6, name: 'Samsung Galaxy S24', category: 'Phone', price: 999.0, stock: 41, status: 'Active', sales: 265 },
  { id: 7, name: 'Dell XPS 15', category: 'Laptop', price: 1899.0, stock: 7, status: 'Low Stock', sales: 96 },
  { id: 8, name: 'Sony WH-1000XM5', category: 'Audio', price: 399.0, stock: 64, status: 'Active', sales: 342 },
  { id: 9, name: 'Pixel 8 Pro', category: 'Phone', price: 999.0, stock: 0, status: 'Out of Stock', sales: 122 },
  { id: 10, name: 'Surface Laptop 6', category: 'Laptop', price: 1299.0, stock: 19, status: 'Active', sales: 87 },
  { id: 11, name: 'Galaxy Watch 6', category: 'Wearable', price: 329.0, stock: 27, status: 'Active', sales: 143 },
  { id: 12, name: 'Bose QC Ultra', category: 'Audio', price: 429.0, stock: 15, status: 'Active', sales: 176 },
  { id: 13, name: 'Oneplus 12', category: 'Phone', price: 799.0, stock: 36, status: 'Active', sales: 154 },
  { id: 14, name: 'Macbook Air M3', category: 'Laptop', price: 1099.0, stock: 22, status: 'Active', sales: 231 },
]
export const productsBatch2 = [
  { id: 15, name: 'Galaxy Tab S9', category: 'Tablet', price: 849.0, stock: 18, status: 'Active', sales: 76 },
  { id: 16, name: 'JBL Charge 5', category: 'Audio', price: 179.0, stock: 52, status: 'Active', sales: 198 },
  { id: 17, name: 'Xiaomi 14 Ultra', category: 'Phone', price: 1099.0, stock: 9, status: 'Low Stock', sales: 88 },
  { id: 18, name: 'Asus Zenbook 14', category: 'Laptop', price: 999.0, stock: 26, status: 'Active', sales: 64 },
  { id: 19, name: 'Fitbit Sense 2', category: 'Wearable', price: 249.0, stock: 0, status: 'Out of Stock', sales: 59 },
  { id: 20, name: 'Kindle Paperwhite', category: 'Tablet', price: 149.0, stock: 44, status: 'Active', sales: 132 },
]

export const payments = [
  { id: 1, status: 'Succes', email: 'Youremail@gmail.com', date: '02/10/2024', amount: 100 },
  { id: 2, status: 'Succes', email: 'Youremail@gmail.com', date: '02/10/2024', amount: 100 },
  { id: 3, status: 'Pending', email: 'Youremail@gmail.com', date: '01/10/2024', amount: 100 },
  { id: 4, status: 'Succes', email: 'Youremail@gmail.com', date: '01/10/2024', amount: 100 },
  { id: 5, status: 'Failed', email: 'Youremail@gmail.com', date: '30/09/2024', amount: 100 },
  { id: 6, status: 'Succes', email: 'Youremail@gmail.com', date: '30/09/2024', amount: 100 },
  { id: 7, status: 'Succes', email: 'Youremail@gmail.com', date: '29/09/2024', amount: 100 },
  { id: 8, status: 'Pending', email: 'Youremail@gmail.com', date: '28/09/2024', amount: 100 },
  { id: 9, status: 'Succes', email: 'Youremail@gmail.com', date: '28/09/2024', amount: 100 },
  { id: 10, status: 'Succes', email: 'Youremail@gmail.com', date: '27/09/2024', amount: 100 },
  { id: 11, status: 'Failed', email: 'Youremail@gmail.com', date: '26/09/2024', amount: 100 },
  { id: 12, status: 'Succes', email: 'Youremail@gmail.com', date: '25/09/2024', amount: 100 },
]

export const payouts = [
  { id: 1, method: 'Bank Transfer', account: 'BCA •••• 4821', date: '02/10/2024', amount: 2400.0, status: 'Paid' },
  { id: 2, method: 'Paypal', account: 'youremail@gmail.com', date: '25/09/2024', amount: 1850.5, status: 'Paid' },
  { id: 3, method: 'Bank Transfer', account: 'Mandiri •••• 1093', date: '18/09/2024', amount: 3200.0, status: 'Processing' },
  { id: 4, method: 'Crypto', account: '0x8f...a21c', date: '11/09/2024', amount: 990.0, status: 'Paid' },
  { id: 5, method: 'Paypal', account: 'youremail@gmail.com', date: '04/09/2024', amount: 1420.0, status: 'Failed' },
  { id: 6, method: 'Bank Transfer', account: 'BCA •••• 4821', date: '28/08/2024', amount: 2750.0, status: 'Paid' },
]

export const trafficSources = [
  { label: 'Organic Search', value: 4820, pct: 42 },
  { label: 'Direct', value: 2610, pct: 23 },
  { label: 'Social Media', value: 1980, pct: 17 },
  { label: 'Referral', value: 1140, pct: 10 },
  { label: 'Email', value: 910, pct: 8 },
]
export const trafficBars = [32, 48, 40, 62, 50, 72, 58, 66, 44, 76, 60, 82]
export const trafficLine = [20, 32, 26, 40, 34, 48, 42, 56, 50, 62, 55, 70]

export const earningsMonthly = [
  { month: 'Jan', amount: 8400 },
  { month: 'Feb', amount: 9200 },
  { month: 'Mar', amount: 7800 },
  { month: 'Apr', amount: 11200 },
  { month: 'May', amount: 10400 },
  { month: 'Jun', amount: 12800 },
  { month: 'Jul', amount: 11900 },
  { month: 'Aug', amount: 13600 },
  { month: 'Sep', amount: 12400 },
  { month: 'Oct', amount: 14800 },
  { month: 'Nov', amount: 13900 },
  { month: 'Dec', amount: 16200 },
]

export const faqs = [
  { q: 'How do I add a new product?', a: 'Go to Add Product from the sidebar, fill in the product details and press Save Product. The product will appear in the Product list immediately.' },
  { q: 'When are payouts processed?', a: 'Payouts are processed every Monday. Requests made after Sunday 23:59 are scheduled for the next cycle.' },
  { q: 'How can I reset my password?', a: 'Open Security from the sidebar and use the Change Password form. A confirmation email is sent to your registered address.' },
  { q: 'Where can I download my invoices?', a: 'Every row in the Payment table has a download action in the last column.' },
]
