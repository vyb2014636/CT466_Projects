import { Button, InputForm, InputTextarea, Loading, SelectAdmin } from "components";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBase64 } from "ultils/helpers";
import { apiCreateProduct } from "apis";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { sizes } from "ultils/contants";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

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
      imagesPreview.push({ name: file.name, path: base64 });
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);

  const handleCreateProduct = async (data) => {
    if (data.category) data.category = categories?.find((el) => el._id === data.category)?.title;
    const formData = new FormData();
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    if (data.thumb) formData.append("thumb", data.thumb[0]);
    if (data.images) {
      for (let image of data.images) formData.append("images", image);
    }
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateProduct(formData);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Chúc mừng",
        text: "Tạo sản phẩm thành công!",
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
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h1 className="flex justify-center items-center text-3xl font-bold p-4 border-b w-full">
        <span>Tạo sản phẩm mới</span>
      </h1>
      <div className="p-4 w-[80%]">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
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
                options={categories?.map((el) => ({ code: el._id, value: el.title }))}
                register={register}
                id={"category"}
                errors={errors}
              />
            </div>
            <div className="h-full flex flex-col justify-center flex-1">
              <SelectAdmin
                label="Brand (theo thể loại)"
                options={categories
                  ?.find((el) => el._id === watch("category"))
                  ?.brand?.map((el) => ({ code: el, value: el }))}
                register={register}
                id={"brand"}
                errors={errors}
              />
            </div>
            <div className="h-full flex flex-col justify-center flex-1">
              <SelectAdmin
                label="Size"
                options={sizes.map((el) => ({ code: el.value, value: el.value }))}
                register={register}
                id={"size"}
                errors={errors}
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
            />
          </div>
          <div className="my-4 flex flex-col gap-2">
            <label className="font-bold" htmlFor="thumb">
              Ảnh sản phẩm
            </label>
            <input {...register("thumb", { required: "cần chọn" })} type="file" id="thumb" />
            {errors["thumb"] && <small className="text-xs text-red-600">{errors["thumb"]?.message}</small>}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img src={preview.thumb} alt="thumbnail" className="w-[100px] object-contain" />
            </div>
          )}
          <div className="my-4 flex flex-col gap-2">
            <label className="font-bold" htmlFor="images">
              Ảnh còn lại
            </label>
            <input {...register("images", { required: "cần chọn" })} type="file" id="images" multiple />
            {errors["images"] && <small className="text-xs text-red-600">{errors["images"].message}</small>}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images?.map((el, idx) => (
                <div key={idx} className="w-fit relative">
                  <img src={el.path} alt="product" className="w-[100px] object-contain" />
                </div>
              ))}
            </div>
          )}
          <Button type="submit" name="Tạo sản phẩm" fw />
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
