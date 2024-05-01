import { Box, MenuItem, TextField } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { Button as ButtonComponent, InputForm, InputTextarea, Loading, SelectAdmin } from "components";
import { getBase64 } from "ultils/helpers";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { apiUpdateProduct } from "apis";
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
const FormEditProduct = ({ editProduct, render, setEdit }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  useEffect(() => {
    reset({
      title: editProduct?.title || "",
      price: editProduct?.price || "",
      quantity: editProduct?.quantity || "",
      color: editProduct?.color || "",
      category: editProduct?.category || "",
      brand: editProduct?.brand || "",
    });
    setPreview({
      thumb: editProduct?.thumb || "",
      images: editProduct?.images || [],
    });
  }, [editProduct]);

  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });

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

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0) handlePreviewImages(watch("images"));
  }, [watch("images")]);

  const handleUpdateProduct = async (data) => {
    if (data.category) data.category = categories?.find((el) => el.title === data.category)?.title;
    data.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0];
    const formData = new FormData();
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    data.images = data.images?.length === 0 ? preview.images : data.images;
    for (let image of data.images) formData.append("images", image);
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateProduct(formData, editProduct._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: response.mes,
      });
      render();
      setEdit(null);
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: response.mes,
      });
    }
  };
  return (
    <div className="absolute inset-0 bg-overlay z-50 flex items-center justify-center">
      <Box
        className="bg-white h-[95%] w-[50%] relative"
        sx={{
          boxShadow: 3,

          p: 1,
          m: 1,
          borderRadius: 2,
        }}
      >
        <div className="flex flex-col items-center justify-center gap-3 ">
          <h1 className="flex justify-center items-center text-2xl font-bold p-4 border-b w-full">
            <span>Chỉnh sửa sản phẩm</span>
          </h1>
          <div className="p-4 ">
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
              <ArrowBackIcon
                onClick={() => setEdit(null)}
                className="absolute top-4 left-4 cursor-pointer hover:text-orange-600"
              />
              <InputForm
                register={register}
                errors={errors}
                id={"title"}
                validate={{
                  required: "Vui lòng nhập tên sản phẩm",
                }}
                fullWidth
                placeholder={"Nhập tên sản phẩm"}
              />
              <div className="w-full flex gap-4 my-6">
                <InputForm
                  register={register}
                  errors={errors}
                  id={"price"}
                  validate={{
                    required: "Vui lòng nhập giá",
                  }}
                  fullWidth
                  placeholder={"Nhập giá"}
                  type="number"
                  styled="flex-1"
                />
                <InputForm
                  register={register}
                  errors={errors}
                  id={"quantity"}
                  validate={{
                    required: "Vui lòng nhập số lượng",
                  }}
                  fullWidth
                  placeholder={"Nhập số lượng"}
                  type="number"
                  styled="flex-1"
                />
                <InputForm
                  register={register}
                  errors={errors}
                  id={"color"}
                  validate={{
                    required: "Vui lòng chọn màu",
                  }}
                  fullWidth
                  placeholder={"Chọn màu"}
                  styled="flex-1"
                />
              </div>
              <div className="w-full flex gap-4 my-6">
                <div className="h-full flex flex-col justify-center flex-1">
                  <SelectAdmin
                    label="Thể loại"
                    options={categories?.map((el) => ({ code: el.title, value: el.title }))}
                    register={register}
                    id="category"
                    errors={errors}
                    defaultValue={editProduct?.category}
                  />
                </div>
                <div className="h-full flex flex-col justify-center flex-1">
                  <SelectAdmin
                    label="Brand (theo thể loại)"
                    options={categories
                      ?.find((el) => el.title === watch("category"))
                      ?.brand?.map((el) => ({ code: el, value: el }))}
                    register={register}
                    id="brand"
                    errors={errors}
                    defaultValue={editProduct?.brand}
                  />
                </div>
              </div>
              <div className="my-4">
                <InputTextarea
                  id="description"
                  errors={errors}
                  register={register}
                  validate={{
                    required: "Vui lòng nhập mô tả",
                  }}
                  defaultValue={editProduct?.description}
                />
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="my-4 flex flex-col gap-2">
                    {/* <label className="font-bold" htmlFor="thumb">
                  Ảnh sản phẩm
                </label>
                <input {...register("thumb", { required: "cần chọn" })} type="file" id="thumb" /> */}
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      sx={{ width: "150px" }}
                    >
                      Ảnh gốc
                      <VisuallyHiddenInput type="file" {...register("thumb")} id="thumb" />
                    </Button>
                    {errors["thumb"] && <small className="text-xs text-red-600">{errors["thumb"]?.message}</small>}
                  </div>
                  {preview.thumb && (
                    <div className="my-4">
                      <img src={preview.thumb} alt="thumbnail" className="w-[50px] object-contain border" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="my-4 flex flex-col gap-2">
                    {/* <label className="font-bold" htmlFor="images">
                  Ảnh còn lại
                </label>
                <input {...register("images", { required: "cần chọn" })} type="file" id="images" multiple /> */}
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      sx={{ width: "200px" }}
                    >
                      Ảnh dự phòng
                      <VisuallyHiddenInput type="file" {...register("images")} id="images" multiple />
                    </Button>
                    {errors["images"] && <small className="text-xs text-red-600">{errors["images"].message}</small>}
                  </div>
                  {preview.images.length > 0 && (
                    <div className="my-4 flex w-full gap-3 flex-wrap">
                      {preview.images?.map((el, idx) => (
                        <div key={idx} className="w-fit relative">
                          <img src={el} alt="product" className="w-[50px] object-contain border" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <ButtonComponent type="submit" name="Thay đổi" fw />
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default memo(FormEditProduct);
