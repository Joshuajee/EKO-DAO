import { Blocks } from 'react-loader-spinner'

const LoadingScreen = ({isError}) => {

    const loader =  <Blocks visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper"/>

    const lottie = (
        <div className='h-60 flex flex-col items-center text-gray-600'>
            <lottie-player 
                src={"https://assets4.lottiefiles.com/packages/lf20_tmsiddoc.json"}  
                background="transparent"  
                speed="1"  loop  autoplay />
            <h3 className='text-lg md:text-3xl mt-6 font-bold'>Resource Not Found</h3>
        </div>
    )

    return (
        <div className='flex justify-center items-center w-full h-[400px] lg:h-[700px] 2xl:h-[900px]'>
            { isError ? lottie : loader }
        </div>
    )
    
}

export default LoadingScreen