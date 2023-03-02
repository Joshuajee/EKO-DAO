const Select = ({id, label, helperText, onChange, error, lists}) => {

    return (
        <div className="mb-2">
            <label for={id} className="block mb-2 text-sm font-medium"> { label} </label>
            <select onChange={(e) => onChange(e.target.value)}  
                id={id} className="bg-blue-50 border outline-none text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5">
                {
                    lists.map((list, i) => {
                        return <option value={list?.value} key={i}>{list.name}</option>
                    })
                }
            </select>
            {error && <p className="my-2 text-xs text-red-500">{helperText}</p>}
        </div>
    )
}

export default Select