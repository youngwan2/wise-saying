import BackMoveButton from '@/components/UI/common/BackMoveButton'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="overflow-hidden min-h-[40vh]">
      <BackMoveButton />
      {children}


    </section>
  )
}
