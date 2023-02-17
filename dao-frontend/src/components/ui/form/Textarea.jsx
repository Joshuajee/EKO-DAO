
const Textarea = ({id, label, placeholder, helperText, value, onChange, min, error, type="text"}) => {

    return (
        <div className="mb-2">
            <label for={id} className="block mb-2 text-sm font-medium"> { label} </label>
            <textarea min={min} value={value} type={type} onChange={(e) => onChange(e.target.value)}  id={id} className="bg-blue-50 border outline-none text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 resize-none h-28" placeholder={placeholder} > </textarea>
            {error && <p className="my-2 text-xs text-red-500">{helperText}</p>}
        </div>
    )
}

export default Textarea