const Container = ({children}) => {
    return (
        <div class={`w-full flex justify-center`}>
            <div className="container w-full flex flex-wrap justify-between item-center py-2 lg:py-3 px-2">
                {children}
            </div>
        </div>
    )
}

export default Container