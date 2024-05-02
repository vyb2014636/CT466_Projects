import React from "react";
import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "store/user/userSlice";
import path from "ultils/path";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Profiles = ({ role, currentLogin }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
        {currentLogin?.avatar ? (
          <Avatar
            alt={currentLogin?.firstname}
            src={currentLogin?.avatar}
            sx={{
              bgcolor: deepOrange[500],
              width: 24,
              height: 24,
            }}
          />
        ) : (
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 24,
              height: 24,
            }}
            className="text-sm cursor-pointer"
          >
            {currentLogin?.firstname[0]}
          </Avatar>
        )}
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
        <Typography sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Link className="hover:text-orange-500" to={`/${path.MEMBER}/${path.PERSONAL}`}>
            <span>Hồ sơ</span>
          </Link>
          {+role === 1945 && (
            <Link className="hover:text-orange-500" to={`/${path.ADMIN}/${path.DASHBOARD}`}>
              <span>Quản trị</span>
            </Link>
          )}
          <Link className="hover:text-orange-500" onClick={() => dispatch(logout())}>
            <span>Đăng xuất</span>
          </Link>
        </Typography>
      </Popover>
    </>
  );
};

export default memo(Profiles);
