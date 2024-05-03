import React from "react";
import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { useSelector } from "react-redux";
import emptycart from "assets/emptycart.png";
import Button from "components/Button/Button";
import withBase from "hocs/withBase";
import { formatMoney } from "ultils/helpers";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { apiRemoveProductCart } from "apis";
import { toast } from "react-toastify";
import { getCurrentUser } from "store/user/asyncAction";
import path from "ultils/path";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Cart = ({ dispatch, navigate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, currentCart } = useSelector((state) => state.user);
  const removeProductInCart = async (pid, color, size) => {
    const response = await apiRemoveProductCart(pid, color, size);
    if (response.success) {
      dispatch(getCurrentUser());
    } else toast.error(response.mes);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handlePassPage = (e) => {
    e.stopPropagation();
    navigate(`/${path.DETAILS_CART}`);
    handleClose();
  };
  return (
    <>
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
        <StyledBadge badgeContent={currentUser?.cart?.length || 0} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 2, width: "400px" }}>
          <div className="w-full">
            <header className="py-4 border-b-2 text-xl font-bold">
              <span>Giỏ hàng</span>
            </header>
            <div className="max-h-[40vh] overflow-hidden overflow-y-scroll hide-scroll-bar">
              {currentCart?.length === 0 && (
                <div>
                  <img src={emptycart} alt="empty" className="h-[30vh] w-full " />
                </div>
              )}
              {currentCart &&
                currentCart?.map((el) => (
                  <div key={el.product?._id} className="flex justify-between py-2 border-b-2">
                    <div className="flex gap-2 w-[90%]">
                      <img src={el.thumbnail} alt="thumb-cart" className="w-16 h-full object-cover" />
                      <div className="flex flex-col gap-1 w-full">
                        <span className="line-clamp-1">{el?.title}</span>
                        <span>
                          {el.color} - {el.size}
                        </span>
                        <span className="line-clamp-1 text-gray-400">
                          {el.quantity} x <span className="text-gray-500">{`${formatMoney(el.product.price)}đ`}</span>
                        </span>
                      </div>
                    </div>
                    <div className="w-[10%] cursor-pointer" onClick={() => removeProductInCart(el?.product?._id, el?.color, el?.size)}>
                      <HighlightOffIcon sx={{ color: "gray" }} />
                    </div>
                  </div>
                ))}
            </div>
            {currentCart?.length > 0 ? (
              <div className="mt-auto">
                <div className="flex justify-between py-4 border-b-2">
                  <span className="uppercase text-gray-400 tracking-wider font-bold ">Tổng số phụ:</span>
                  <span className=" tracking-wider font-bold">{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el.price * el.quantity), 0)) + " vnđ"}</span>
                </div>
                <div className="flex flex-col gap-1 py-4 ">
                  <button
                    type="button"
                    onClick={(e) => handlePassPage(e)}
                    className="uppercase leading-5 tracking-wide bg-[#ec5327] py-2 text-white flex items-center justify-center  font-bold w-full "
                  >
                    Giỏ hàng
                  </button>
                  <div className="uppercase leading-5 tracking-wide bg-[#474747] py-2 text-white flex items-center justify-center  font-bold w-full">Thanh toán</div>
                </div>
              </div>
            ) : (
              <Button
                handleOnClick={handleClose}
                name="Quay lại cửa hàng"
                styled="uppercase leading-5 tracking-wide bg-[#474747] py-2 text-white flex items-center justify-center  font-bold w-full"
              />
            )}
          </div>
        </Typography>
      </Popover>
    </>
  );
};

export default withBase(memo(Cart));
