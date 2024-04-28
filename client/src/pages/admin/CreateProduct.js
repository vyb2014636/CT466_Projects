import { Button, InputForm, SelectAdmin } from "components";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const handleCreateProduct = (data) => {
    if (data.category) data.category = categories?.find((el) => el._id === data.category)?.title;
    console.log(data);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="flex justify-center items-center text-3xl font-bold p-4 border-b w-full">
        <span>Tạo sản phẩm mới</span>
      </h1>
      <div className="p-4 w-main">
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
            <SelectAdmin
              label="thể loại"
              options={categories?.map((el) => ({ code: el?._id, value: el?.title }))}
              register={register}
              id="category"
              errors={errors}
              styled="flex-1"
              defaultValue=""
              fullWidth
            />
            <SelectAdmin
              label="Brand (theo thể loại)"
              options={categories
                ?.find((el) => el._id === watch("category"))
                ?.brand?.map((el) => ({ code: el, value: el }))}
              register={register}
              id="brand"
              errors={errors}
              styled="flex-1"
              fullWidth
              defaultValue=""
            />
          </div>
          <Button type="submit" name="tạo sản phẩm" />
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
