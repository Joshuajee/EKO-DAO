import React, { useState } from "react";
import { IoIosCreate } from "react-icons/io"
import ModalWrapper from "./ModalWrapper";

const CreateButton = ({title, show, close, open, children}) => {

    return (
        <React.Fragment>
            <button 
                onClick={open}
                className={`fixed flex justify-center items-center right-10 bottom-10 bg-green-500 hover:bg-green-700 text-white rounded-full h-16 w-16`}>
                <IoIosCreate size={24} />
            </button>
            <ModalWrapper title={title} open={show} handleClose={close}>
                {children}
            </ModalWrapper>
        </React.Fragment>
    )
}

export default CreateButton