import Link from "next/link"
import { useRouter } from "next/router"



const CategoryTab = ({tabs}) => {

    const router = useRouter()

    const currentTab = router.query.tab

    const normal = "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
    const active = "text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"

    const activeInd = (tab, index) => {
        if (currentTab === undefined && index === 0) return active
        else if (currentTab?.toLowerCase() === tab.toLowerCase()) return active
        else return normal
    }

    return (
        <div className="flex justify-center my-4 md:my-8 w-full">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">

                    {
                        tabs.map((tab, index) => {
                            return (
                                <li className="mr-2" key={index}>
                                    <Link href={tab.link} className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${ activeInd(tab.name, index)}`}>
                                        {tab.name}
                                    </Link>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}

export default CategoryTab