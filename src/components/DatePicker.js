import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { DatePicker, Tooltip } from "antd";
import moment from "moment";

function DatePickerCustom({
  name,
  onChange,
  onFocus,
  onBlur,
  validate,
  className,
  ...props
}) {
  const methods = useFormContext();
  const { register, unregister, setValue, errors, watch } = methods;
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    register({ name }, validate);
    return () => unregister(name);
  }, [register]);

  const titleTooltip = useMemo(() => {
    return errors?.[name]?.message;
  }, [errors?.[name]?.message]);

  return (
    <Tooltip
      title={titleTooltip}
      visible={showTooltip && titleTooltip ? true : false}
      placement="topLeft"
    >
      <DatePicker
        {...props}
        className={`${className} ${titleTooltip ? "error-input" : ""}`}
        value={watch(name) ? moment(watch(name)) : null}
        onChange={(dm, ds) => {
          onChange(ds);
          setValue(name, ds, true);
        }}
        onFocus={(e) => {
          setShowTooltip(true);
          onFocus(e);
        }}
        onBlur={(e) => {
          setShowTooltip(false);
          onBlur(e);
        }}
      />
    </Tooltip>
  );
}
DatePickerCustom.propTypes = {
  name: PropTypes.string,
  validate: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
DatePickerCustom.defaultProps = {
  name: "",
  validate: {},
  onChange: () => {},
  className: "",
  onFocus: () => {},
  onBlur: () => {},
};
export default DatePickerCustom;
