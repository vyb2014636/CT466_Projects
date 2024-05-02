import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ButtonUpload = ({ register, errors, id, label }) => {
  return (
    <div className="flex-1">
      <div className="my-4 flex flex-col gap-2">
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} sx={{ width: "150px" }}>
          {label}
          <VisuallyHiddenInput type="file" {...register(id)} id={id} />
        </Button>
        {errors[id] && <small className="text-xs text-red-600">{errors[id]?.message}</small>}
      </div>
      {/* {preview.thumb && (
                    <div className="my-4">
                      <img src={preview.thumb} alt="thumbnail" className="w-[50px] object-contain border" />
                    </div>
                  )} */}
    </div>
  );
};

export default memo(ButtonUpload);
