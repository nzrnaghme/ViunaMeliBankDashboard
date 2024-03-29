import axios from "axios";
// import { getItem } from "./storage/storage"
// import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import "../components/Toast/index.css"

import { GeneralContext } from "providers/GeneralContext";

function TransitionRight(props) {
    return <Slide {...props} direction="left" />;
}

export function removeLoading() {
    const { setLosdingShow } = useContext(GeneralContext)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
        setLosdingShow(false);
    }, [])

    return (
        <Snackbar
            open={open}
            onClose={() => { setOpen(false) }}
            TransitionComponent={TransitionRight}
            message={"درخواست با خطا مواجه شده"}
            className={"red"}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />);
}


const api = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    // timeout: 5000,
});

api.interceptors.response.use(
    (response) => {
        console.log("با موفقیت انجام شد");
        return response;
    },
    async (error) => {
        console.log(error,"error");
        // check if error is expected from backend
        try {

            if (error.code === 'ERR_NETWORK') {
                return (<removeLoading />)
                // toast.warning('لطفا اینترنت را بررسی کنید')
                // return Promise.reject(error);
            }

            const expectedError =
                error.response &&
                error.response.state >= 400 &&
                error.response.status < 500;

            // if error doesnt expected when we log it
            if (!expectedError) {
                console.log(expectedError);
                // tweak it later
                // get error message from backend (see object of response later... maybe its changed)
                try {
                    alert(error.response.data.message[0].message);
                } catch (error) { console.log(error); }
            }
        } catch (error) {
            console.log(error)
        }
        return Promise.reject(error);
    }
);

// will send token to headers request ( in x-auth-token body )
// api.interceptors.request.use((config) => {
//     config.headers["x-auth-token"] = getItem("token");
//     return config;
// });

export default api;


