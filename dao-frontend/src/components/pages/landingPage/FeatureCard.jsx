import Link from "next/link"

const FeatureCard = ({title, icon, route, children}) => {

    return (
        <div className="p-4 md:w-1/3" data-aos="flip-left">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-700 text-white flex-shrink-0">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                            {icon}
                        </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">{title}</h2>
                </div>
                <div  className="flex-grow">
                    <p className="leading-relaxed text-base">{children}</p>
                    <Link href={String(route)} className="mt-3 text-blue-700 inline-flex items-center">Get Started
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default FeatureCard