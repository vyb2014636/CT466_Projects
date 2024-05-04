import React from "react";
import payment from "assets/payment.svg";
import { useSelector } from "react-redux";
import { Congrat, Paypal } from "components";
import { formatMoney } from "ultils/helpers";
import { useEffect } from "react";
import { useState } from "react";
import withBase from "hocs/withBase";
import { getCurrentUser } from "store/user/asyncAction";

const Checkout = ({ dispatch, navigate }) => {
  const { currentCart, currentUser } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) dispatch(getCurrentUser());
  }, [isSuccess]);
  return (
    <div className="p-8 grid w-full grid-cols-10 h-full min-h-screen  gap-6">
      {isSuccess && <Congrat />}
      <div className="w-full flex justify-center items-center col-span-4 ">
        <img src={payment} alt="payment" className="h-full object-contain" />
      </div>
      <div className="flex w-full flex-col justify-center items-center col-span-6 gap-6">
        <h2 className="text-3xl mb-6 font-bold">Thanh toán đơn đặt hàng</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="border bg-gray-200 p-2">
              <th className="text-center p-2">Sản phẩm</th>
              <th className="text-center p-2">Màu</th>
              <th className="text-center p-2">Size</th>
              <th className="text-center p-2">Giá</th>
              <th className="text-center p-2">Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {currentCart?.map((el) => (
              <tr key={el._id}>
                <td className="p-2 text-start">{el.title}</td>
                <td className="p-2 text-center">{el.color}</td>
                <td className="p-2 text-center">{el.size}</td>
                <td className="p-2 text-center">{`${formatMoney(el.price)} đ`}</td>
                <td className="p-2 text-center">{el.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex border-b py-2 items-center gap-4 text-gray-500 font-semibold w-full">
          <span>Địa chỉ: </span>
          <span>{currentUser.address}</span>
        </div>
        <div className="flex border-b py-2 justify-between text-gray-500 font-semibold w-full">
          <span>Tổng:</span>
          <span>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price * el.quantity), 0)) + " vnđ"}</span>
        </div>

        <div className="w-full mx-auto">
          <Paypal
            setIsSuccess={setIsSuccess}
            payload={{
              products: currentCart,
              total: Math.round(+currentCart?.reduce((sum, el) => sum + Number(el?.price * el.quantity) / 25410, 0)),
              orderBy: currentUser?._id,
              address: currentUser?.address,
            }}
            amount={Math.round(+currentCart?.reduce((sum, el) => sum + Number(el?.price * el.quantity) / 25410, 0))}
          />
        </div>
      </div>
    </div>
  );
};

export default withBase(Checkout);
