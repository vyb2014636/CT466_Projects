import React, { memo } from "react";
import TextField from "@mui/material/TextField";

const InputTextarea = ({ disabled, register, errors, id, validate, placeholder, defaultValue }) => {
  return (
    <div>
      <TextField
        id={id}
        label="Nhập mô tả"
        multiline
        maxRows={6}
        className="w-full"
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {errors[id] && <small className="text-xs text-red-600">{errors[id].message}</small>}
    </div>
  );
};

export default memo(InputTextarea);
