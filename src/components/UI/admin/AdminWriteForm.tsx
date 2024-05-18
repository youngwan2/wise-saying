
interface PropsType {
    addPostAction:(formData:FormData)=> void
}
export default function AdminWriteForm({addPostAction }:PropsType) {


  return (
      <form action={addPostAction}  className="bg-slate-100 p-8 rounded-md shadow-md max-w-[768px] mx-auto mt-[5em] box-shadow-[inset_0_0_10px_5px_rgba(0,0,0,0.5)]">
      <h2 className="pb-[20px] text-[1.05em] font-bold">새명언 등록</h2>
      <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">카테고리</label>
          <input
            type="text"
            id="category"
            className="border border-gray-300 rounded-md p-2 w-full"
            name='category'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">내용</label>
          <textarea
            id="content"
            className="border border-gray-300 rounded-md p-2 w-full h-32 resize-none"
            name='content'
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">작성자</label>
          <input
            type="text"
            id="author"
            className="border border-gray-300 rounded-md p-2 w-full"
            name='author'
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">등록</button>
          <button type="reset"  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">초기화</button>
        </div>
      </form>
  );
};

