import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router"

const CardWrapper = ({link, children}) => {

    const [padding, setPadding] = useState(false);

    const router = useRouter()

    const go = () => {
        if (link) {
            router.push(link)
        }
    }

    const zoomIn = useCallback(() => {
        if(link) setPadding(false)
    }, [link])

    const zoomOut = useCallback(() => {
        setPadding(true)
    }, [])
    
    useEffect(() => {
        zoomIn()
    }, [zoomIn]);

    console.log(padding)

    return (
        <div 
            // onMouseLeave={zoomOut} 
            // onMouseEnter={zoomIn} 
            onClick={go} 
            className={`cursor-pointer`}
            //className={` ${padding ? 'p-2' : ''} cursor-pointer`}
            >
            {children}
        </div>
    )
}

export default CardWrapper