import React, { useEffect, useContext } from "react";
// nodejs library to set properties for components
import PopUpCustome from "./PopUp";
// @material-ui/core components
import Button from "components/CustomButtons/Button"
import { GeneralContext } from "providers/GeneralContext";

export default function PopUpAction() {
    const { confirmMsg,
        confirmCallback,
        rejectCallback,
        confirmPopupOpen,
        setConfirmPopupOpen, } = useContext(GeneralContext)

    useEffect(() => {
        window.addEventListener("popstate", () => {
            setConfirmPopupOpen(false);
        });
    }, [confirmPopupOpen]);

    const onConfirm = () => {
        confirmCallback();
        setConfirmPopupOpen(false);
    };

    const onReject = () => {
        if (rejectCallback) rejectCallback();
        setConfirmPopupOpen(false);
    };

    return (
        <PopUpCustome
            open={confirmPopupOpen}
            handleClose={() => {
                setConfirmPopupOpen(false);
            }}
            className={"popUpActionCustome"} >
            <p className={"confirmText"}>
                {confirmMsg}
            </p>
            <div className={"btnsConfirmWrapper"}>
                <Button
                    onClick={onConfirm}
                    color="success" >تایید</Button>
                <Button
                    onClick={onReject}
                    color="danger"
                >انصراف</Button>

            </div>

        </PopUpCustome>
    )
}

