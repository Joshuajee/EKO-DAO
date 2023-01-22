import ConnectionBtn from "../connection/button"

const TopNav = () => {
    return (
        <nav style={{height: "70px"}} className="px-4 md:px-20 py-4 flex justify-between w-full border-b-2 border-gray-200">
            
            <h1 className="text-3xl text-blue-800 font-bold">EkoDAO</h1>

            <ConnectionBtn />

        </nav>
    )
}

export default TopNav