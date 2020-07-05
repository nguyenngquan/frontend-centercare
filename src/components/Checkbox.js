import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "antd";

function CheckboxCustom({ name, onChange, children, ...rest }) {
  const methods = useFormContext();
  const { register, unregister, setValue, errors, watch } = methods;
  useEffect(() => {
    register({ name });
    return () => unregister(name);
  }, [register]);

  return (
    <Checkbox
      {...rest}
      checked={watch(name)}
      onChange={(e) => {
        onChange(e.target.checked);
        setValue(name, e.target.checked, true);
      }}
    >
      {children}
    </Checkbox>
  );
}
CheckboxCustom.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};
CheckboxCustom.defaultProps = {
  name: "",
  onChange: () => {},
};
export default CheckboxCustom;
