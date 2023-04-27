import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%",
        marginTop: 10,
        fontFamily: "bakh",
    },
    labelRTL: {
        right: 0,
        transition: "all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        "&.MuiInputLabel-shrink": {
            transform: "translate(0, 1.5px)",
        },
        fontFamily: "bakh",
    },
}));

export default function CustomSelectInput(props) {
    const classes = useStyles();
    const {
        labelText,
        handleChange,
        value,
        options,
        disabled
    } = props;
    

    return (
        <FormControl className={classes.formControl}>
            <InputLabel className={classes.labelRTL}>{labelText}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={handleChange}
                disabled={disabled}
            >
                {options.map((option) => (
                    <MenuItem value={option._id} key={option._id}>
                        {option.fullName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

CustomSelectInput.propTypes = {
    labelText: PropTypes.node,
    handleChange: PropTypes.func,
    value: PropTypes.any,
    options: PropTypes.array,
    disabled:PropTypes.bool
};
