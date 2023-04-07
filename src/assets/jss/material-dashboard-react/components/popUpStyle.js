// import {
//     container,
//     defaultFont,
//     primaryColor,
//     defaultBoxShadow,
//     infoColor,
//     successColor,
//     warningColor,
//     dangerColor,
//     whiteColor,
//     // grayColor,
// } from "assets/jss/material-dashboard-react.js";

const popUpStyle = () => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '0.5px solid slategrey',
        }
    }
})

export default popUpStyle;