import { MdClose } from "react-icons/md"

const ModalWrapper = ({title, open, handleClose, children}) => {

    return (
        <div className="fixed top-0 left-0 h-screen, w-screen">

            <div className="fixed h-screen w-screen bg-slate-800 opacity-70"></div>

            <div className="fixed flex justify-center items-center h-screen w-screen">

                <div className="bg-white rounded-lg w-full max-w-[500px] min-h-[150px]">

                    <div className="flex justify-between border-b-[1px] border-slate-500"> 
                        <h2 className="font-bold text-2xl pl-4 pt-2">{title}</h2> 
                        <button className="pr-4 pt-2" onClick={handleClose}><MdClose size={24} /></button>
                    </div>

                    <div className="p-4">
                        {children}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ModalWrapper