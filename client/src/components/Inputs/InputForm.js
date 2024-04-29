import React, { memo } from "react";
import clsx from "clsx";
import { Input } from "@mui/material";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  styled,
}) => {
  return (
    <div className={clsx("flex flex-col gap-1 h-full", styled)}>
      <div className="h-[70%]">
        {label && <label htmlFor={id}>{label}</label>}
        <Input
          type={type}
          id={id}
          {...register(id, validate)}
          disabled={disabled}
          placeholder={placeholder}
          className={clsx(fullWidth && "w-full")}
          defaultValue={defaultValue}
        />
      </div>
      {errors[id] && <small className="text-xs text-red-600">{errors[id].message}</small>}
    </div>
  );
};

export default memo(InputForm);
