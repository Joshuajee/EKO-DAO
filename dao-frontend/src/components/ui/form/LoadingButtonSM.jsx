import { Oval } from 'react-loader-spinner'

const LoadingButtonSM = (props) => {

    const { disabled, loading, children, className } = props

    if (loading) return (
        <button 
            disabled={true}
            className={`rounded-lg w-full bg-gray-400 disabled:bg-gray-400
                disabled:text-gray-200 py-2 ${className}
                `}
                {...props}
                > 
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

    return (
        <button 
            disabled={disabled}
            className="rounded-lg w-full bg-blue-600 hover:bg-blue-700 py-2 text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:text-gray-200"
            {...props}> 
            {children}
        </button>
    )
}

export default LoadingButtonSM