import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { Input, Tooltip } from "antd";

function InputCustom({
  name,
  onChange,
  onFocus,
  onBlur,
  validate,
  className,
  ...props
}) {
  const methods = useFormContext();
  const { register, unregister, setValue, errors } = methods;
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    register({ name }, validate);
    return () => unregister(name);
  }, []);

  const titleTooltip = useMemo(() => {
    return errors?.[name]?.message;
  }, [errors?.[name]?.message]);

  return (
    <Tooltip
      title={titleTooltip}
      visible={showTooltip && titleTooltip ? true : false}
      placement="topLeft"
    >
      <Input
        {...props}
        className={`${className} ${titleTooltip ? "error-input" : ""}`}
        onChange={(e) => {
          onChange(e);
          setValue(name, e.target.value, true);
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
InputCustom.propTypes = {
  name: PropTypes.string,
  validate: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
InputCustom.defaultProps = {
  name: "",
  validate: {},
  onChange: () => {},
  className: "",
  onFocus: () => {},
  onBlur: () => {},
};
export default InputCustom;
