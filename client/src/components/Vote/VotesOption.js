import React, { memo, useRef, useEffect, useState } from "react";
import logo from "assets/logo.png";
import { Button } from "components";
import { voteOptions } from "ultils/contants";
import { FaStar } from "react-icons/fa";

const VotesOption = ({ nameProduct, handleVoteSubmitOption }) => {
  const modalRef = useRef();
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className=" w-[700px] bg-white p-8 rounded-lg flex flex-col items-center justify-center gap-4 "
    >
      <img src={logo} alt="logo" className="w-[300px] object-contain" />
      <h2 className="text-center text-lg">{`Đánh giá & nhận xét cho ${nameProduct}`}</h2>
      <textarea
        className="form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm"
        placeholder="Suy nghĩ của bạn về sản phẩm?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p>Bạn cảm thấy thế nào</p>
        <div className="flex justify-center items-center">
          {voteOptions.map((el) => (
            <div
              className="w-[100px] h-[60px] flex items-center justify-center flex-col gap-2 cursor-pointer hover:text-orange-500"
              key={el.id}
              onClick={() => {
                setChosenScore(el.id);
              }}
            >
              {Number(chosenScore) && chosenScore >= el.id ? <FaStar color="orange" /> : <FaStar color="gray" />}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button name="Gửi" fw handleOnClick={() => handleVoteSubmitOption({ comment, score: chosenScore })}></Button>
    </div>
  );
};

export default memo(VotesOption);
