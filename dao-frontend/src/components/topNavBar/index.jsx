import ConnectionBtn from "../connection/button"

const TopNavBar = () => {
  return (
    <nav className="bg-[#F3F4F6] h-[70px] fixed px-4 md:px-20 flex items-center justify-between w-full border-b-2 border-gray-200">
      <h1 className="text-3xl text-blue-800 font-bold">EkoDAO</h1>
      <ConnectionBtn />
    </nav>
  )
}

export default TopNavBar