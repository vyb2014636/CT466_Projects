import React from "react";
import avatar from "../assets/avatar_default.png";
import "moment/locale/vi";
import moment from "moment";
import { renderStarFromNumber } from "../ultils/helpers";

const Comment = ({ image = avatar, name = "Tài khoản vô danh", idUser, comment, star, updatedAt }) => {
  return (
    <div className="flex flex-col p-4 border-b-2">
      <div className="votes-top flex justify-between">
        <div className="flex justify-center items-center flex-8 gap-2">
          <div className="w-[4%]">
            <img src={image} alt="avatar" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col flex-grow">
            <h3>{name}</h3>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(star)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
          </div>
        </div>
        <span>{moment(updatedAt)?.fromNow()}</span>
      </div>
      <div className="votes-bottom">
        <div className="flex mt-4 gap-1 bg-gray-200 rounded-md p-4 border border-gray-400">
          <span className="font-bold text-nowrap">Nội dung:</span>
          <span className="flex-grow">{comment}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
