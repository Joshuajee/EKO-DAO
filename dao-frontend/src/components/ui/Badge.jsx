
const Badge = ({children, color}) => {

    return  (
        <span 
            className={`
                inline-flex bg-${color}-100 text-${color}-800 text-xs font-medium mr-2 
                px-2.5 py-0.5 rounded-full dark:bg-${color}-900 dark:text-${color}-300`}>
                {children}
        </span>
        )


}

export default Badge

/*
  
    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Yellow</span>
    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Indigo</span>
    <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">Purple</span>
    <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">Pink</span>


*/