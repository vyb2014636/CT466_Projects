import React, { memo, useRef, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "./";
import { voteOptions } from "../ultils/helpers";
import { FaStar } from "react-icons/fa";

const VotesOption = ({ nameProduct }) => {
  const modalRef = useRef();
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
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p>Bạn cảm thấy thế nào</p>
        <div className="flex justify-center items-center">
          {voteOptions.map((el) => (
            <div className="w-[100px] h-[60px] flex items-center justify-center flex-col gap-2 cursor-pointer" key={el}>
              <FaStar className="hover:text-orange-500 text-gray-500" />
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button name="Gửi" fw></Button>
    </div>
  );
};

export default memo(VotesOption);
