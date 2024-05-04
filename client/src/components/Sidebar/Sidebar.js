import React from "react";
import { createSlug } from "ultils/helpers";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

const Sidebar = () => {
  let { categories } = useSelector((state) => state.app);
  // const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [border, setBorder] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    setBorder(!border);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {categories?.map((el) => (
          <NavLink to={createSlug(el.title)}>
            <ListItem key={createSlug(el.title)} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowForwardIosIcon />{" "}
                </ListItemIcon>
                <ListItemText primary={el.title} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="text-[18px] font-semibold ">
      <span onClick={toggleDrawer(true)} className={border ? "cursor-pointer " : "cursor-pointer"}>
        Thể loại
      </span>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
// style="overflow-y: hidden; outline: none;" trong class nice-scroll
export default Sidebar;

// ? "border-b-2 text-[18px] border-red-500 font-semibold"
// : "hover:after:content-[''] hover:border-b-2 hover:border-red-500 transition-all transform text-[18px] font-semibold"
