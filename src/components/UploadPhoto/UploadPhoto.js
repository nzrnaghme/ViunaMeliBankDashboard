import React from "react";

import PropTypes from "prop-types";

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar } from "@mui/material";
import "./UploadPhoto.css"

export default function UploadPhoto(props) {
    const {
        src,
        upsertRef,
        onUploadingImg,
        onUpsertClicked } = props

    return (
        <div style={{
            position: "relative",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}
        className="photo">
            <div className="upload">
                <input
                    className="file_input"
                    hidden
                    type="file"
                    accept="image/*"
                    ref={upsertRef}
                    onChange={onUploadingImg}
                />
                <Fab color="secondary" aria-label="edit" onClick={onUpsertClicked}>
                    <EditIcon />
                </Fab>
            </div>
            <Avatar src={src} className="largeAvatar" />
        </div>
    )
}

UploadPhoto.propTypes = {
    src: PropTypes.string,
    onUploadingImg: PropTypes.func,
    upsertRef: PropTypes.any,
    onUpsertClicked: PropTypes.func
};