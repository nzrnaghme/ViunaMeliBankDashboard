import React, { useContext } from "react";

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import { GeneralContext } from "providers/GeneralContext";
import "./index.css"

function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
}

export default function Toast() {
    const { msgToast,
        openToast,
        setOpenToast,
        varient } = useContext(GeneralContext)

    return (
        <Snackbar
            open={openToast}
            onClose={() => { setOpenToast(false) }}
            TransitionComponent={TransitionRight}
            message={msgToast}
            className={varient === "success" ? "green" : varient === "warning" ? "orange" : "red"}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
    )
}