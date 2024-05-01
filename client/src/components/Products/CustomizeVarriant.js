import { Box, Button } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import InputForm from "components/Inputs/InputForm";
import { Button as ButtonComponent, Loading, SelectAdmin } from "components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { getBase64 } from "ultils/helpers";
import { sizes } from "ultils/contants";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { showModal } from "store/app/appSlice";
import { apiVarriant } from "apis";

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

const CustomizeVarriant = ({ customizeVarriant, setCustomizeVarriant, render }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  useEffect(() => {
    console.log(customizeVarriant);
    reset({
      title: customizeVarriant?.title,
      price: customizeVarriant?.price,
      color: customizeVarriant?.color,
      // title: customizeVarriant?.title,
    });
  }, [customizeVarriant]);

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File ảnh không đúng!");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  const handleAddVarriant = async (data) => {
    if (data.color === customizeVarriant.color) Swal.fire("Thông báo!", "Màu không được trùng", "info");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      if (data.images) for (let image of data.images) formData.append("images", image);

      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiVarriant(formData, customizeVarriant._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: response.mes,
        });
        reset();
        setPreview({
          thumb: null,
          images: [],
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: response.mes,
        });
      }
    }
  };

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0) handlePreviewImages(watch("images"));
  }, [watch("images")]);

  return (
    <div className="absolute inset-0 bg-overlay z-50 flex items-center justify-center">
      <Box
        className="bg-white  w-[40%] relative"
        sx={{
          boxShadow: 3,

          p: 1,
          m: 1,
          borderRadius: 2,
        }}
      >
        <div className="flex flex-col items-center justify-center gap-3 ">
          <h1 className="flex justify-center items-center text-2xl font-bold p-4 border-b w-full">
            <span>Tùy biến sản phẩm</span>
          </h1>
          <ArrowBackIcon onClick={() => setCustomizeVarriant(null)} className="absolute top-4 left-4 cursor-pointer hover:text-orange-600" />
          <div className="p-4">
            <form onSubmit={handleSubmit(handleAddVarriant)}>
              <div className="">
                <InputForm label="Tên sản phẩm" register={register} errors={errors} id={"title"} fullWidth />
              </div>

              <div className="flex gap-4 items-center my-4">
                <InputForm
                  label="Giá"
                  register={register}
                  errors={errors}
                  id={"price"}
                  validate={{ require: "Hãy điền vào" }}
                  placeholder="0"
                  type="number"
                  styled="flex-2"
                  fullWidth
                />
                <InputForm
                  label="Màu"
                  register={register}
                  errors={errors}
                  id={"color"}
                  validate={{ require: "Hãy điền vào" }}
                  fullWidth
                  placeholder="Màu của 1 loại mới"
                  styled="flex-3"
                />
                <SelectAdmin
                  label="Size"
                  options={sizes?.map((el) => ({ code: el.value, value: el.value }))}
                  id="size"
                  register={register}
                  errors={errors}
                  styled="flex-2"
                  defaultValue={customizeVarriant.size}
                />
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="my-4 flex flex-col gap-2">
                    <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} sx={{ width: "150px" }}>
                      Ảnh gốc
                      <VisuallyHiddenInput type="file" {...register("thumb")} id="thumb" />
                    </Button>
                    {errors["thumb"] && <small className="text-xs text-red-600">{errors["thumb"]?.message}</small>}
                  </div>
                  {preview.thumb && (
                    <div className="my-4">
                      <img src={preview.thumb} alt="thumbnail" className="w-[100px] object-contain border" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="my-4 flex flex-col gap-2">
                    <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} sx={{ width: "200px" }}>
                      Ảnh dự phòng
                      <VisuallyHiddenInput type="file" {...register("images")} id="images" multiple />
                    </Button>
                    {errors["images"] && <small className="text-xs text-red-600">{errors["images"].message}</small>}
                  </div>
                  {preview.images.length > 0 && (
                    <div className="my-4 flex w-full gap-3 flex-wrap">
                      {preview.images?.map((el, idx) => (
                        <div key={idx} className="w-fit relative">
                          <img src={el} alt="product" className="w-[100px] object-contain border" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <ButtonComponent type="submit" name="Tạo biến thể mới" fw />
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default memo(CustomizeVarriant);
