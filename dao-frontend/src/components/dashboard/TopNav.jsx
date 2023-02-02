import { useState } from 'react';
import ConnectionBtn from "../connection/button"
import HambuggerMenu from './HambuggerMenu';

const TopNav = () => {

    const [open, setOpen] = useState(false);

    return (
        <nav style={{height: "70px"}} className="px-4 md:px-20 flex items-center justify-between w-full border-b-2 border-gray-200">
            
            <h1 className="text-3xl text-blue-800 font-bold">EkoDAO</h1>

            <div className='flex items-center'>
                <ConnectionBtn />
                <HambuggerMenu open={open} setOpen={setOpen} />
            </div>

        </nav>
    )
}

export default TopNav