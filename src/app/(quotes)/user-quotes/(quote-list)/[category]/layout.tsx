import type { Metadata } from 'next'

export async function generateMetadata( { params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const category = decodeURIComponent((await params).category)

  return {
    title: category,
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
