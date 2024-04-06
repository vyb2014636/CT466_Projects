import React from "react";
import { useParams } from "react-router-dom";
const DetailProduct = () => {
  const { pid, title } = useParams();
  // console.log(pid);
  // console.log(title);

  return <div>DetailProduct</div>;
};

export default DetailProduct;
