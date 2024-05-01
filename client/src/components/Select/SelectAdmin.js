import React, { memo } from "react";
import clsx from "clsx";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";

const SelectAdmin = ({ label, options = [], register, errors, id, validate, fullWidth, defaultValue }) => {
  return (
    <TextField
      id={id}
      select
      label={label}
      defaultValue={defaultValue}
      // helperText="Vui lòng chọn 1 giá trị"
      className={clsx(fullWidth && "w-full")}
      {...register(id, validate)}
    >
      {options.map((el) => (
        <MenuItem value={el.code} key={el.code}>
          {el.value}
        </MenuItem>
      ))}
      {errors[id] && <small className="text-xs text-red-600">{errors[id]?.message}</small>}
    </TextField>
  );
};

export default memo(SelectAdmin);
