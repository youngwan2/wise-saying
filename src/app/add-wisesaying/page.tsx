import PostForm from "@/components/UI/PostForm"

interface PostType {
    category: string
    author:string,
    
}
export default function AddWisesayingPage() {

    return (
        <section className="absolute left-0 right-0 top-0 bottom-0 bg-[#00000065] p-[10px] rounded-[10px]">
           <PostForm/>
        </section>
    )
}