import { apiGetUserOrders } from "apis";
import { CustomSelect, InputForm, Pagination } from "components";
import withBase from "hocs/withBase";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { statusOrders } from "ultils/contants";
import { formatMoney } from "ultils/helpers";

const HistoryPurchase = ({ navigate, location }) => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const q = watch("q");
  const status = watch("status");
  const fetchOrders = async (params) => {
    const response = await apiGetUserOrders({ ...params, limit: process.env.REACT_APP_PRODUCT_LIMIT });
    if (response.success) {
      setOrders(response.order);
      setCounts(response.counts);
    }
  };
  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrders(pr);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-orange-200 ">Lịch sử mua hàng</header>
      <div className="flex justify-end items-center pl-4 my-2">
        <form className="w-[50%] grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <InputForm id="q" register={register} errors={errors} fullWidth placeholder="Tìm....." />
          </div>
          <div className="col-span-1 flex items-center">
            <CustomSelect options={statusOrders} value={status} onChange={(val) => handleSearchStatus(val)} wrapClassname="w-full" placeholder="Chọn trạng thái" />
          </div>
        </form>
      </div>
      <table className="table-auto w-full ">
        <thead>
          <tr className="border bg-blue-950 text-white border-white">
            <th className="text-center p-2">#</th>
            <th className="text-center p-2">Sản phẩm</th>
            <th className="text-center p-2">Tổng tiền</th>
            <th className="text-center p-2">Trạng thái</th>
            <th className="text-center p-2">Ngày mua</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, idx) => (
            <tr className="border-b" key={el._id}>
              <td className="text-center p-2"> {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) * process.env.REACT_APP_PRODUCT_LIMIT + idx + 1}</td>
              <td className="text-center  p-2">
                <span className="flex flex-col items-start gap-4">
                  {el.products?.map((item) => (
                    <span key={item._id} className="flex  items-center gap-2">
                      <img src={item.thumbnail} alt="thumb" className="w-10 h-10 rounded-md object-cover" />
                      <span className="flex flex-col">
                        <span className="text-orange-400 text-sm">{item.title}</span>
                        <span className="flex items-center text-xs gap-2">
                          <span>Số lượng:</span>
                          <span className="text-orange-400">{item.quantity}</span>
                        </span>
                      </span>
                    </span>
                  ))}
                </span>
              </td>
              <td className="text-center p-2">{`${formatMoney(el.total)}đ`}</td>
              <td className="text-center p-2">{el.status}</td>
              <td className="text-center p-2">{moment(el.createdAt)?.format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default withBase(HistoryPurchase);
