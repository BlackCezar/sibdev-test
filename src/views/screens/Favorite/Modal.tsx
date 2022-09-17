import React from "react"
import { IModal } from "./favorite.interface"

const Modal: React.FC<IModal> = ({ title, show, closeModal, children }) => {
    if (!show) {
        return null
    }

    return <div className="modal-wrapper" onClick={closeModal}>
        <div className="favorite-modal modal" onClick={ev => ev.stopPropagation()}>
            <div className="modal-title">
                {title}
            </div>
            {children}
        </div>
    </div>
}

export default Modal