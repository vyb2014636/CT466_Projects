import React, { memo } from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return <ClipLoader color="orange" className="z-50" />;
};

export default memo(Loading);
