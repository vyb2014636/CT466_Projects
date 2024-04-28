import React, { memo } from "react";
import clsx from "clsx";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectAdmin = ({ label, options = [], register, errors, id, validate, styled, fullWidth, defaultValue }) => {
  return (
    <div className={clsx("h-full flex flex-col justify-center ", styled)}>
      <div>
        {label && <label htmlFor={id}></label>}
        <Select defaultValue={defaultValue} className={clsx(fullWidth && "w-full")} id={id} {...register(id, validate)}>
          <MenuItem value="">--Chọn--</MenuItem>
          {options?.map((el) => (
            <MenuItem value={el.code} key={el.code}>
              {el.value}
            </MenuItem>
          ))}
        </Select>
      </div>
      {errors[id] && <small className="text-xs text-red-600">{errors[id]?.message}</small>}
    </div>
  );
};

export default memo(SelectAdmin);
