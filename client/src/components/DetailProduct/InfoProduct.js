import React, { memo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { VoteBar, Button, VotesOption, Comment } from "../";
import { tabsInfoProduct } from "../../ultils/contants";
import { renderStarFromNumber } from "../../ultils/helpers";
import { apiRatings } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import Swal from "sweetalert2";
import path from "../../ultils/path";

const InfoProduct = ({ totalRatings, ratings, nameProduct, pid, rerender }) => {
  console.log(ratings);
  const [activeTab, setActiveTab] = useState(1);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    comment: "",
    score: "",
  });
  //Xử lý khi người dùng click đánh giá là nếu đăng nhập rồi thì cho đánh giá còn không thì không được
  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to votes!",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Oops!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: <VotesOption nameProduct={nameProduct} handleVoteSubmitOption={handleVoteSubmitOption} />,
        })
      );
    }
  };

  // const handleVoteSubmitOption = useCallback((value) => {
  //   console.log(value);
  // }, []);
  //Lấy dữ liệu mà người đùng đã đánh giá sản phẩm để gửi API về server câp jnhataj đánh giá
  const handleVoteSubmitOption = async ({ score, comment }) => {
    // Nếu có thể hãy xử lý khi bạn chưa đăng nhập ở đây
    if (!score || !comment || !pid) {
      alert("Chưa có thông tin");
      return;
    }
    const response = await apiRatings({ star: score, comment, pid, updatedAt: Date.now() });
    rerender();
    dispatch(
      showModal({
        isShowModal: false,
        modalChildren: null,
      })
    );
  };
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
      </div>
      <div className="w-full border p-4">
        {tabsInfoProduct.some((el) => el.id === activeTab) &&
          tabsInfoProduct.find((el) => el.id === activeTab)?.content}
      </div>
      <div className="review mt-4">
        <div className="flex mb-4">
          <div className="flex-4 border flex flex-col gap-2 items-center justify-center">
            <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(totalRatings)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
            <span className="text-sm">{`${ratings?.length} đánh giá và phản hồi`}</span>
          </div>
          <div className="flex-6 border border-red-600 flex flex-col p-4 order gap-2">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <VoteBar
                  key={el}
                  number={el + 1}
                  ratingTotal={ratings?.length || 0}
                  ratingCount={ratings?.filter((review) => review.star === el + 1)?.length}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <span>Bạn có muốn đánh giá sản phẩm?</span>
          <Button name="Đánh giá sản phẩm" handleOnClick={handleVoteNow}></Button>
        </div>
        <div className="flex flex-col">
          {ratings?.map((el, index) => (
            <Comment
              key={index}
              comment={el.comment}
              idUser={el._id}
              star={el.star}
              updatedAt={el.updatedAt}
              name={`${el.postedBy.lastname} ${el.postedBy.firstname}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(InfoProduct);
