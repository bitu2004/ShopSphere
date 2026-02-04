import '../styles/globals.css'

export const metadata = {
  title: 'ShopSphere - Your Online Shopping Hub',
  description: 'Shop amazing products at unbeatable prices',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
