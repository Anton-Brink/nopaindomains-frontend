// src/app/layout.js
import './globals.css'
import { Providers } from './providers'

export default function RootLayout({ children }) {
    return (
        <html>
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}