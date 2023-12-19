import { create } from "zustand";

type State = {
    loginState : boolean
}

type Action = {
    setLoginState: (loginState: State['loginState']) => void
}

const useLoginStateStore = create<State & Action>((set) => ({
    loginState : false,
    setLoginState : (loginState) => set(() =>({loginState : loginState}))
}))


export default useLoginStateStore