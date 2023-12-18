import { HiOutlineSearch } from 'react-icons/hi'

export default function SearchForm() {
  return (
    <form
      className="rounded-[10px] my-[2em] border-2 max-w-[500px] min-w-[200px] mx-auto "
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className="flex items-center">
        <label
          className="text-4xl p-[5px] min-w-[50px] bg-[#E76F51]"
          htmlFor="search"
        >
          <HiOutlineSearch />
        </label>
        <input
          className="p-[10px] w-[100%]"
          type="search"
          id="search"
          placeholder="안냥"
        />
      </div>
    </form>
  )
}
