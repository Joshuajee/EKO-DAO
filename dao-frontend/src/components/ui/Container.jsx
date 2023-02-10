const Container = ({children}) => {
    return (
        <div class={`w-full flex justify-center pb-12`}>
            <div className="container w-full flex flex-wrap justify-between item-center py-2 lg:py-3 px-2 lg:px-14">
                {children}
            </div>
        </div>
    )
}

export default Container