import { Oval } from 'react-loader-spinner'

const LoadingButtonSM = (props) => {

    const { disabled, loading, children, color, onClick } = props

    if (loading) return (
        <button 
            onClick={onClick} 
            disabled={true}
            className={`flex justify-center rounded-lg w-full bg-gray-400 disabled:bg-gray-400 disabled:text-gray-200 py-2 px-6`}> 
            <Oval
                height={18}
                width={18}
                color="#ffffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="gray"
                strokeWidth={4}
                strokeWidthSecondary={4}/>
        </button>
    )

    switch (color) {
        case "red":
            return (
                <button 
                    onClick={onClick} 
                    disabled={disabled}
                    className="rounded-lg w-full bg-red-600 hover:bg-red-700 py-2 px-6 text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:text-gray-200"> 
                    {children}
                </button>
            )
        case "green":
            return (
                <button 
                    onClick={onClick} 
                    disabled={disabled}
                    className="rounded-lg w-full bg-green-600 hover:bg-green-700 py-2 px-6 text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:text-gray-200"> 
                    {children}
                </button>
            )
        default:
            return (
                <button 
                    onClick={onClick} 
                    disabled={disabled}
                    className="rounded-lg w-full bg-blue-600 hover:bg-blue-700 py-2 px-6 text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:text-gray-200"> 
                    {children}
                </button>
            )
    }

}

export default LoadingButtonSM