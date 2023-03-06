
const Badge = ({children, color}) => {

    switch (color) {
        case "blue":
            return  (
                <span 
                    className={`inline-flex bg-blue-100 text-blue-800 text-xs font-medium mr-2 
                        px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300`}>
                        {children}
                </span>)
        case "red":
            return  (
                <span 
                    className={`inline-flex bg-red-100 text-red-800 text-xs font-medium mr-2 
                        px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300`}>
                        {children}
                </span>)
        case "green":
            return  (
                <span 
                    className={`inline-flex bg-green-100 text-green-800 text-xs font-medium mr-2 
                        px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300`}>
                        {children}
                </span>)
        case "yellow":
            return  (
                <span 
                    className={`inline-flex bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 
                        px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300`}>
                        {children}
                </span>)
        default:
            return  (
                <span 
                    className={`inline-flex bg-gray-100 text-gray-800 text-xs font-medium mr-2 
                        px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300`}>
                        {children}
                </span>)


    }

    return  (
        <span 
            className={`
                inline-flex bg-blue-100 text-blue-800 text-xs font-medium mr-2 
                px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300`}>
                {children}
        </span>
        )


}

export default Badge