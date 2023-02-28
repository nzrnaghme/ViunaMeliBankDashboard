import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
    Chip,
    Input,
} from "@material-ui/core";

import "./autocomplete.css"

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%",
        marginTop: 27,
        fontFamily: "bakh",
    },
    labelRTL: {
        right: 0,
        transition: "all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        "&.MuiInputLabel-shrink": {
            transform: "translate(0, 1.5px)",
        },
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        fontFamily: "bakh",
    },
    chip: {
        margin: 2,
    },
}));


export default function CustomeAutoComplete(props) {
    const classes = useStyles();
    const {
        labelText,
        handleChange,
        values,
        currValue,
        handleKeyUp,
        handleDelete
    } = props;




    return (
        <FormControl classes={classes.formControl} className="formControlAuto">
            <div className={"container"}>
                {values.map((item, index) => (
                    <Chip size="small" key={index} onDelete={() => handleDelete(item, index)} label={item} />
                ))}
            </div>
            <div>
                <InputLabel style={{ position: 'relative', top: 12 }} className={classes.labelRTL}>{labelText}</InputLabel>
                <Input
                    value={currValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyUp}
                    style={{ width: 100 }}
                />
            </div>
        </FormControl>
    )

}

CustomeAutoComplete.propTypes = {
    labelText: PropTypes.node,
    handleChange: PropTypes.func,
    values: PropTypes.array,
    currValue: PropTypes.string,
    handleDelete: PropTypes.func,
    handleKeyUp: PropTypes.func
};