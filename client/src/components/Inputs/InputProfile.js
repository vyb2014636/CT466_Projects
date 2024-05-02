import { TextField } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { memo } from "react";

const InputProfile = ({ label, disabled, register, errors, id, validate, type = "text", fullWidth, defaultValue, styled, readOnly, helperText }) => {
  return (
    <div className={clsx(styled)}>
      <TextField
        id={id}
        label={label}
        defaultValue={defaultValue}
        helperText={helperText}
        type={type}
        {...register(id, validate)}
        // placeholder={placeholder}
        disabled={disabled}
        inputProps={{ min: "0" }}
        className={clsx(fullWidth && "w-full")}
        readOnly={readOnly}
      />
      {/* <div className="h-[70%]">
        {label && <label htmlFor={id}>{label}</label>}
        <Input
          type={type}
          id={id}
          {...register(id, validate)}
          disabled={disabled}
          placeholder={placeholder}
          className={clsx(fullWidth && "w-full")}
          defaultValue={defaultValue}
          readOnly={readOnly}
          inputProps={{ min: "0" }}
        />
      </div> */}
      {errors[id] && <small className="text-xs text-red-600">{errors[id].message}</small>}
    </div>
  );
};

export default memo(InputProfile);
