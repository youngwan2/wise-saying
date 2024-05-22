import styles from './common.module.css'

export default function PageLoader({text, isFull}:{text?:string, isFull?:boolean}) {
    return (
        <div className={`${isFull? 'bg-[#1E2F6A]':''} w-full h-[100vh] fixed top-0 left-0 right-0 bottom-0 z-[100000]`}>
            <div className={styles.loader_wrapper}>
                <p className='text-white w-[210px] italic animate-pulse ml-[5px] '>{text||"당신의 말이 명언이 되는 순간"}</p>
                <div className='mt-[2em]'>
                    <span className={`${styles.loader_dot} animate-pulse `}></span>
                    <span className={`${styles.loader_dot} animate-pulse `}></span>
                    <span className={`${styles.loader_dot} animate-pulse `}></span>
                </div>
            </div>
        </div>
    )
}