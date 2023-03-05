const LoadingButton = (props) => {

    const { disabled, loading, children } = props

    if (loading) return (
        <button 
            disabled={true}
            className="mt-4 rounded-lg w-full bg-gray-400 disabled:hover:bg-gray-400 disabled:text-gray-200 py-2"
            {...props}> 
            Please Wait...
        </button>
    )

    return (
        <button 
            disabled={disabled}
            className="mt-4 rounded-lg w-full bg-blue-600 hover:bg-blue-700 py-2 text-white disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:text-gray-200"
            {...props}> 
            {children}
        </button>
    )
}

export default LoadingButton