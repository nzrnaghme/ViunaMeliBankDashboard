import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
// @material-ui/core components
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from "assets/jss/material-dashboard-react/components/popUpStyle.js";
import "./index.css"

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUpCustome(props) {
    const classes = useStyles();

    const {
        handleClose,
        className,
        open,
        children,
        title,
        closeBtn } = props;

    return (
        <Dialog
            onClose={handleClose}
            className={[`popUpCustome ${className}`, classes.scrollBar]}
            open={open}
            TransitionComponent={Transition}
        >
            {closeBtn ? (
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            ) : null}
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{children}</DialogContent>
        </Dialog>
    )
}


PopUpCustome.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    open: PropTypes.bool,
    children: PropTypes.node,
    handleClose: PropTypes.func,
    closeBtn: PropTypes.bool
};