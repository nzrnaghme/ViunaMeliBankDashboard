import { createContext } from "react";

export const GeneralContext = createContext({
    hover: false,
    setHover: () => { },
    confirmMsg: null,
    confirmPopupOpen: false,
    setConfirmPopupOpen: () => { },
    confirmCallback: () => { },
    rejectCallback: () => { },
    onConfirmSetter: (msg, confirmCallback, rejectCallback) => { console.log(msg); console.log(rejectCallback); console.log(confirmCallback); },
    msgToast: null,
    openToast: false,
    setOpenToast: () => { },
    varient: "success",
    onToast: (msgToast, varient) => { console.log(msgToast); console.log(varient); },
});