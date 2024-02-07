import type { Metadata } from 'next'

type Props = {
  params: { category: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = decodeURIComponent(params.category)

  return {
    title: category,
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
