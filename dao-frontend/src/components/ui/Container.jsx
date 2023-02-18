const Container = ({children}) => {
    return (
        <div class={`w-full flex justify-center py-12`}>
            <div className="w-full flex flex-wrap justify-between item-center py-2 lg:py-3 px-2 lg:px-14 2xl:container">
                {children}
            </div>
        </div>
    )
}

export default Container