import type { Metadata } from 'next'


type Props = {
  params: { name: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const category = decodeURIComponent(params.name)

  return {
    title: category
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {

  return <section>{children}
  </section>
}
