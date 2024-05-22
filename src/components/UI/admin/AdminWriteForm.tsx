
interface PropsType {
  addPostAction: (formData: FormData) => void
  fields: {
    [key: string]: string
  }[]
  formTitle: string
}
export default function AdminWriteForm({ addPostAction, fields, formTitle }: PropsType) {

  return (
    <form action={addPostAction} className="bg-slate-100 p-8 rounded-md shadow-md max-w-[768px] mx-auto mt-[5em] box-shadow-[inset_0_0_10px_5px_rgba(0,0,0,0.5)]">
      <h2 className="pb-[20px] text-[1.05em] font-bold">{formTitle}</h2>
      {fields.map((field) => {
        return (
          <div className="mb-4" key={field.id}>
            <label htmlFor={field.id} className="block text-gray-700 font-semibold mb-2">{field.label}</label>
            {field.type === 'input'
              ? <input
                type="text"
                id={field.id}
                className="border border-gray-300 rounded-md p-2 w-full"
                name={field.name}
              />
              : <textarea
                id={field.id}
                className="border border-gray-300 rounded-md p-2 w-full h-32 resize-none "
                name={field.name}
              />}
          </div>
        )
      })}

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">등록</button>
        <button type="reset" className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">초기화</button>
      </div>
    </form>
  );
};

