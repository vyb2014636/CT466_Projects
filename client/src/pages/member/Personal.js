import React, { useState, useEffect } from "react";
import { Button, InputProfile } from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import avatar from "assets/avatar_default.png";
import { apiUpdateCurrent } from "apis";
import { getCurrentUser } from "store/user/asyncAction";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import withBase from "hocs/withBase";

const Personal = ({ navigate }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isShowUpImage, setIsShowUpImage] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      mobile: currentUser?.mobile,
      email: currentUser?.email,
      avatar: currentUser?.avatar,
      address: currentUser?.address,
    });
  }, []);

  const requiredEdit = () => {
    Swal.fire({
      title: "Bạn có muốn cập nhật hồ sơ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "Không",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditProfile(true);
      }
    });
  };

  const handleUpdateProfile = async (data) => {
    const formData = new FormData(); //vì có ảnh nên phải gửi formdata
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]); //"avatar" key này phải trùng khi route bên server cloudinary
    delete data.avatar; //xóa đi để không sẽ bị gửi ảnh cũ
    for (let i of Object.entries(data)) formData.append(i[0], i[1]); //object entries biến data thành mảng
    const response = await apiUpdateCurrent(formData);
    if (response.success) {
      dispatch(getCurrentUser());
      setEditProfile(false);
      toast.success(response.mes);
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
    } else toast.error(response.mes);
  };

  return (
    <div className="pl-4">
      <div className="flex pb-4 justify-between border-b-2 ">
        <h3 className="text-xl font-bold  uppercase ">Thông tin tài khoản</h3>
        {editProfile ? (
          <IconButton onClick={() => setEditProfile(false)}>
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => requiredEdit()}>
            <BorderColorIcon />
          </IconButton>
        )}
      </div>
      {currentUser.isBlocked && <div className="text-xl text-red-600 my-4">Tài khoản của bạn đã bị khóa</div>}
      <div className="py-6">
        <form onSubmit={handleSubmit(handleUpdateProfile)} className="flex flex-col gap-5">
          {editProfile ? (
            <div className="w-full py-4">
              <div className="w-20 h-20 mx-auto">
                <label
                  htmlFor="avatar"
                  className="cursor-pointer relative w-full animate-scale-up-center"
                  onMouseEnter={() => setIsShowUpImage(true)}
                  onMouseLeave={() => setIsShowUpImage(false)}
                >
                  <img src={currentUser?.avatar || avatar} alt="avatar" className="rounded-full  " />
                  <div className="absolute inset-0 hover:bg-overlay rounded-full  flex items-center justify-center">
                    {isShowUpImage && <CenterFocusWeakIcon className="animate-slide-top" />}
                  </div>
                </label>
                <input type="file" id="avatar" {...register("avatar")} hidden />
              </div>
            </div>
          ) : (
            <div className="">
              <img src={currentUser?.avatar || avatar} alt="avatar-disabled" className="rounded-full w-20 h-20 mx-auto" />
            </div>
          )}
          <div className="flex gap-2">
            <InputProfile register={register} errors={errors} id="firstname" label="Họ" styled="flex-1" fullWidth disabled={!editProfile} />
            <InputProfile register={register} errors={errors} id="lastname" label="Tên" styled="flex-1" fullWidth disabled={!editProfile} />
          </div>
          <InputProfile
            register={register}
            errors={errors}
            id="email"
            label="Địa chỉ Email"
            fullWidth
            disabled={true}
            validate={{
              required: "Vui lòng điền đầy đủ",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Nhập đúng định dạng",
              },
            }}
          />
          <InputProfile
            register={register}
            errors={errors}
            id="mobile"
            label="Số điện thoại"
            styled="flex-1"
            fullWidth
            disabled={!editProfile}
            validate={{
              required: "Vui lòng điền đầy đủ",
              pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                message: "Nhập đúng định dạng",
              },
            }}
          />
          <InputProfile
            register={register}
            errors={errors}
            id="address"
            label="Địa chỉ"
            styled="flex-1"
            fullWidth
            disabled={!editProfile}
            validate={{
              required: "Vui lòng điền đầy đủ",
              // pattern: {
              //   value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
              //   message: "Nhập đúng định dạng",
              // },
            }}
          />

          {isDirty && editProfile && (
            <div className="w-full flex justify-center">
              <Button name="Cập nhật hồ sơ" type="submit" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default withBase(Personal);
