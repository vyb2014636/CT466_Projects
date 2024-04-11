import React, { useState } from "react";
import { Button, InputFields } from "../../components/";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis";

const ResetPassword = () => {
  const [passwordNew, setPasswordNew] = useState({ password: "" });
  const { token } = useParams();
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ passwordNew: passwordNew.password, token: token });
  };
  return (
    <div className="top-0 left-0 bottom-0 right-0 bg-overlay z-50 flex justify-center py-8 items-center">
      <div className="bg-white w-[50%] h-[350px] flex flex-col items-center justify-center relative">
        <div className="grid gap-2 text-center w-[50%] mb-4">
          <h1 className="text-3xl font-bold">Đặt lại mật khẩu</h1>
          <p className="text-balance text-muted-foreground">Nhập mật khẩu mới cho tài khoản của bạn</p>
        </div>
        <div className="grid gap-4 w-[50%]">
          <div className="grid gap-2">
            <InputFields value={passwordNew.password} nameKey="password" setValue={setPasswordNew} type="password" />
          </div>
          <Button
            name="Gửi"
            styles="border py-2 rounded-lg font-semibold bg-black text-white"
            fw
            handleOnClick={handleResetPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
