import React, { memo } from "react";
import { HashLoader, ClipLoader } from "react-spinners";

const Loading = () => {
  return <ClipLoader color="orange" />;
};

export default memo(Loading);
