import React from "react";
import { memo } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { memberSidebar } from "ultils/contants";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { logout } from "store/user/userSlice";
import { useDispatch } from "react-redux";

const MemberSidebar = () => {
  const dispatch = useDispatch();
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <h3 className="text-xl font-bold pl-4 mb-4 uppercase">Tài khoản</h3>
      <List>
        {memberSidebar?.map((el) => (
          <Link to={el.path}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{el.icon}</ListItemIcon>
                <ListItemText primary={el.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <Link>
          <ListItem disablePadding>
            <ListItemButton onClick={() => dispatch(logout())}>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default memo(MemberSidebar);
