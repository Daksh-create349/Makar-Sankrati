import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Makar Sankranti 2026',
    description: 'Celebrating the festival of kites',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
