import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anshu - persona', // The title of your page
  description: 'This is a demo app built with Next.js 13 and the Metadata API', // The description of your page
  applicationName: "persona.me",
  keywords: ['Next.js', 'React', 'JavaScript'],
  category: 'technology',
  openGraph: {
    title: 'Anshu - persona', // The title of your page
    description: 'This is a demo app built with Next.js 13 and the Metadata API',
    siteName: "persona",
    type: 'website', // The type of your page, e.g. website, article, book, etc.
    url: 'persona.me', // The canonical URL of your page
    images: [
      {
        url: 'https://picsum.photos/800/600',
        width: 800,
        height: 600,
      },
      {
        url: 'https://picsum.photos/1800/1600',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US', // The locale of your page, e.g. en_US, fr_FR, etc.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anshu - persona',
    description: 'The React Framework for the Web',
    siteId: '1467726470533754880',
    creator: '@persona',
    creatorId: '1467726470533754880',
    images: ['https://picsum.photos/800/600'],
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      {children}
    </main>
  )
}
