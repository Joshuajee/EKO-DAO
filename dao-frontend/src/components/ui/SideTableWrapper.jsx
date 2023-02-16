const SideTableWrapper = ({children}) => {

    return (
        <div className="max-h-[500px] overflow-x-hidden overflow-y-auto">
            {children}
        </div>
    )
}

export default SideTableWrapper