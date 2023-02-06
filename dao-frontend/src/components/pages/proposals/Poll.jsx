const Poll = () => {

    return (
        <div className="block py-4 w-full max-w-xs">

            <h4 className="text-right text-sm mb-2">Poll Result</h4>

            <div className="flex justify-between">
                <p>50%</p>
                <p>50%</p>
            </div>

            <progress value={50} max={100} className="w-full h-[4px] text-blue-600 bg-red-600"></progress>

        </div>
    )
}

export default Poll