import { useMemo } from "react";
import { generateRange } from "../ultils/helpers";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 8;
    const paginationCount = Math.ceil(totalProductCount / pageSize);
    const totalPaginationItem = siblingCount + 5;

    if (paginationCount <= totalPaginationItem) return generateRange(1, paginationCount);

    const isShowDotLeft = currentPage - siblingCount > 2;
    const isShowDotRight = currentPage + siblingCount < paginationCount - 1;

    if (isShowDotLeft && !isShowDotRight) {
      const rightStar = paginationCount - 4;
      const rightRange = generateRange(rightStar, paginationCount);
      return [1, <BiDotsHorizontalRounded />, ...rightRange];
    }

    if (!isShowDotLeft && isShowDotRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, <BiDotsHorizontalRounded />, paginationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (isShowDotLeft && isShowDotRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [1, <BiDotsHorizontalRounded />, ...middleRange, <BiDotsHorizontalRounded />, paginationCount];
    }
  }, [totalProductCount, currentPage, siblingCount]); // nếu đối số không đổi thì không cần tính lại
  return paginationArray;
};

export default usePagination;
