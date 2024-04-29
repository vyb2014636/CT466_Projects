import React, { memo, useState } from "react";
import clsx from "clsx";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl, InputLabel } from "@mui/material";

const SelectAdmin = ({
  label,
  options = [],
  register,
  errors,
  id,
  validate,
  styled,
  fullWidth,
  defaultValue,
  followCate,
}) => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className={clsx("h-full flex flex-col justify-center ", styled)}>
      <FormControl sx={{ minWidth: 120 }}>
        {/* {label && <label htmlFor={id}>{label}</label>} */}
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          defaultValue={defaultValue}
          className={clsx(fullWidth && "w-full")}
          id={id}
          {...register(id, validate)}
          label={label}
          onChange={handleChange}
        >
          {followCate && <MenuItem value="">--Chọn theo thể loại--</MenuItem>}
          {options?.map((el) => (
            <MenuItem value={el.code} key={el.code}>
              {el.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errors[id] && <small className="text-xs text-red-600">{errors[id]?.message}</small>}
    </div>
  );
};

export default memo(SelectAdmin);
