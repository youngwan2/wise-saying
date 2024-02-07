import BackMoveButton from "@/components/UI/common/BackMoveButton";

export default function Layout({ children }: { children: React.ReactNode }) {

    return <section className="overflow-hidden">{children}<BackMoveButton /></section>
}
