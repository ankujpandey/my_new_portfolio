import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ankuj Pandey | Full-Stack Developer Portfolio',
  description: 'Portfolio of Ankuj Pandey – Full-Stack Web Developer specializing in React, Next.js, and Node.js. Explore projects, skills, and experience.',
  keywords: ['Ankuj Pandey', 'Full-Stack Developer', 'Next.js', 'React', 'Portfolio', 'Node.js', 'Web Developer'],
  authors: [
    { name: 'Ankuj Pandey', url: 'https://github.com/ankujpandey' },
    { name: 'Ankuj Pandey', url: 'https://www.linkedin.com/in/ankujpandey/' }, //add linkedin
  ],
  creator: 'https://www.linkedin.com/in/ankujpandey/', // your LinkedIn here
  publisher: 'Ankuj Pandey',
  metadataBase: new URL('https://ankujpandey.dev'),
  openGraph: {
    title: 'Ankuj Pandey | Full-Stack Developer',
    description: 'Explore Ankuj Pandey’s web development portfolio built using React, Next.js, and Node.js.',
    url: 'https://ankujpandey.dev',  //change with the vercel live link
    siteName: 'Ankuj Pandey Portfolio',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
