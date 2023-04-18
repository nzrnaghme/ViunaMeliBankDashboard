import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { maskValue, unmaskValue } from "./Mask";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    rtlActive,
    value,
    onChange,
    mask,
    maskChar,
    multiline,
    rows,
    disabled,
    textLeft,
    className
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
    [" " + classes.labelRTL]: rtlActive,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  let newInputProps = {
    inputMode: inputProps && inputProps.inputMode ? inputProps.inputMode : undefined,
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
    step: inputProps && inputProps.step ? inputProps.step : undefined,
    require: inputProps && inputProps.require ? inputProps.require : false
  };
  return (
    <FormControl
      {...formControlProps}
      className={`${formControlProps.className} ${classes.formControl} ${className}`}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        multiline={multiline}
        rows={rows}
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        disabled={disabled}
        id={id}
        {...inputProps}
        inputProps={newInputProps}
        value={mask ? maskValue(value, mask, maskChar) : value}
        onChange={(e) => {
          if (mask) {
            onChange(unmaskValue(e.target.value, mask))
          } else onChange(e.target.value)
        }}

      />
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} style={textLeft ? { right: "0px" } : { left: "0px" }} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}

      {error &&
        (<p className="errorInput" style={{ color: "red", fontSize: 10 }}>{` ${labelText} به درستی وارد نشده `}</p>)
      }
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  rtlActive: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  maskChar: PropTypes.string,
  mask: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  textLeft: PropTypes.bool,
  className:PropTypes.string
};
