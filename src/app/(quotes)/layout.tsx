import BackMoveButton from "@/components/UI/button/BackMoveButton";

export default function Layout({ children }: { children: React.ReactNode }) {

    return <section>{children}

        <BackMoveButton />
    </section>
}
