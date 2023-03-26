import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import "assets/css/material-dashboard-react.css?v=1.10.0";
import "assets/fonts/fonts.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "layouts/Main.js";

import Auth from "layouts/Authentication.js"
import { getItem } from "api/storage/storage";
import PopUpAction from "components/PopUp/PopUpAction";
import { GeneralContext } from "providers/GeneralContext";
import Toast from "components/Toast/Toast";
import Loading from "components/Loading/Loading"

const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function App() {
    const roleUser = getItem('role')
    const [confirm, setConfirm] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [openToast, setOpenToast] = React.useState(false);
    const [toast, setToast] = React.useState({});
    const [hover, setHover] = React.useState('amir');

    const onConfirmSetter = (
        msg,
        confirmCallback,
        rejectCallback,
    ) => setConfirm({ msg, confirmCallback, rejectCallback });

    const onToast = (msgToast, varient) => setToast({ msgToast, varient })

    return (
        <GeneralContext.Provider value={{
            hover,
            setHover,
            confirmPopupOpen: open,
            setConfirmPopupOpen: setOpen,
            confirmMsg: confirm.msg,
            confirmCallback: confirm.confirmCallback,
            rejectCallback: confirm.rejectCallback,
            onConfirmSetter,
            msgToast: toast.msgToast,
            openToast: openToast,
            setOpenToast: setOpenToast,
            onToast,
            varient: toast.varient
        }} >
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <PopUpAction />
                        <Toast />
                        <Loading />
                        <Switch>
                            {roleUser === 'admin' ?
                                <Route path="/admin" component={Main} /> :
                                <Route path="/auth" component={Auth} />
                            }



                            {roleUser ?
                                <Redirect from="/" to="/admin/dashboard" /> :
                                <Redirect from="/" to="/auth/login-page" />}
                        </Switch>
                    </BrowserRouter>
                </ThemeProvider>
            </CacheProvider>
        </GeneralContext.Provider>
    )
}