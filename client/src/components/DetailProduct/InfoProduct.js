import React, { memo, useState, useEffect, useCallback } from "react";
import { VoteBar, Button, VotesOption } from "../";
import { tabsInfoProduct } from "../../ultils/contants";
import { renderStarFromNumber } from "../../ultils/helpers";
import { apiRatings } from "../../apis";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";

const InfoProduct = ({ totalRatings, totalCount, nameProduct }) => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex gap-2 items-center">
        {tabsInfoProduct?.map((el) => (
          <span
            key={el.id}
            className={`py-2 px-4  cursor-pointer ${
              activeTab === el.id ? "bg-white border border-b-0 " : "bg-gray-200 "
            }`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
        <span
          className={`py-2 px-4  cursor-pointer ${activeTab === 4 ? "bg-white border border-b-0 " : "bg-gray-200 "}`}
          onClick={() => setActiveTab(4)}
        >
          Đánh giá
        </span>
      </div>
      <div className="w-full border p-4">
        {tabsInfoProduct.some((el) => el.id === activeTab) &&
          tabsInfoProduct.find((el) => el.id === activeTab)?.content}
        {activeTab === 4 && (
          <div>
            <div className="flex p-4">
              <div className="flex-4 border flex flex-col gap-2 items-center justify-center">
                <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
                <span className="flex items-center gap-1">
                  {renderStarFromNumber(totalRatings)?.map((el, index) => (
                    <span key={index}>{el}</span>
                  ))}
                </span>
                <span className="text-sm">{`${totalCount} đánh giá và phản hồi`}</span>
              </div>
              <div className="flex-6 border border-red-600 flex flex-col p-4 order gap-2">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((el) => (
                    <VoteBar key={el} number={el + 1} ratingTotal={totalRatings} ratingCount={2} />
                  ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
              <span>Bạn có muốn đánh giá sản phẩm?</span>
              <Button
                name="Đánh giá sản phẩm"
                handleOnClick={() =>
                  dispatch(showModal({ isShowModal: true, modalChildren: <VotesOption nameProduct={nameProduct} /> }))
                }
              ></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(InfoProduct);
