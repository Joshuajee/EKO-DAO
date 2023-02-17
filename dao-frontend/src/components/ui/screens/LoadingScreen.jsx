import { Blocks } from 'react-loader-spinner'

const LoadingScreen = () => {

    return (
        <div className='flex justify-center items-center w-full h-[400px] lg:h-[700px] 2xl:h-[900px]'>
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                />
        </div>
    )
}

export default LoadingScreen