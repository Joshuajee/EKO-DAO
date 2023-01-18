const TopNav = () => {
    return (
        <nav style={{height: "70px"}} className="px-20 py-4 flex justify-between w-full border-b-2 border-gray-200">
            
            <h1 className="text-2xl text-blue-800 font-bold">EkoDAO</h1>

            <button className="px-10 rounded-lg h-10 text-md bg-blue-800 text-white hover:bg-blue-900">Connect Wallet </button>
        </nav>
    )
}

export default TopNav