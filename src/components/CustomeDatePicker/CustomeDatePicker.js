import React from "react";
import DatePicker from "react-multi-date-picker"
import PropTypes from "prop-types";
import InputIcon from "react-multi-date-picker/components/input_icon"
import persian from "react-date-object/calendars/persian"
import "./datePicker.css"

export default function CustomeDatePicker(props) {
    const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]
    const mouths = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]

    const {
        className,
        value,
        label,
        onChange,
        range,
        multiple,
        readOnly,
        disabled,
        hideWeekDays,
        hideMonth,
        hideYear,
        fullYear,
        maxDate,
        minDate
    } = props;

    return (
        <div className="datePicker_form">
            <label className={`${value ? "label_datePicker_top" : "label_datePicker"}`}>
                {label}
            </label>
            <DatePicker
                inputClass={`${className} datePick`}
                value={value}
                onChange={onChange}
                multiple={multiple}
                range={range}
                format="YYYY/MM/DD"
                calendar={persian}
                // locale={persian_fa}
                readOnly={readOnly}
                disabled={disabled}
                hideWeekDays={hideWeekDays}
                hideMonth={hideMonth}
                hideYear={hideYear}
                fullYear={fullYear}
                weekDays={weekDays}
                months={mouths}
                minDate={minDate}
                maxDate={maxDate}
                render={<InputIcon />}
                mapDays={({ date }) => {
                    let props = {}
                    let isWeekend = [6].includes(date.weekDay.index)

                    if (isWeekend) props.className = "highlight highlight-red"

                    return props
                }}
            />
        </div>
    )
}

CustomeDatePicker.propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    onChange: PropTypes.func,
    range: PropTypes.bool,
    multiple: PropTypes.bool,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    hideWeekDays: PropTypes.bool,
    hideMonth: PropTypes.bool,
    hideYear: PropTypes.bool,
    fullYear: PropTypes.bool,
    minDate:PropTypes.any,
    maxDate:PropTypes.any,
};
