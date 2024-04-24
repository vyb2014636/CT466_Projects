import React, { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import { PaginationItem } from "./";
import { useSearchParams } from "react-router-dom";
const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  useEffect(() => {
    const page = params.get("page") || 1;
  }, [params]);

  const pagination = usePagination(totalCount, 1);

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 8;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);
    return `${start} - ${end}`;
  };
  return (
    <div className="flex w-main justify-between items-center">
      {!+params.get("page") && (
        <span className="text-sm italic">{`Sản phẩm từ 1 - ${
          process.env.REACT_APP_PRODUCT_LIMIT || 8
        } của tổng ${totalCount} sản phẩm`}</span>
      )}
      {+params.get("page") && (
        <span className="text-sm italic">{`Sản phẩm từ ${range()} của tổng ${totalCount} sản phẩm`}</span>
      )}
      <div className="flex items-center justify-center">
        {pagination?.map((el) => (
          <PaginationItem key={el}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  );
};

export default Pagination;