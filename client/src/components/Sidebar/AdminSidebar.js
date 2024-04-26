import React, { Fragment, memo, useState } from "react";
import icons from "ultils/icons";
import { useSelector } from "react-redux";
import { adminSidebar } from "ultils/contants";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const { BiLogoStripe, PiShoppingBagFill, IoLogoVue } = icons;
const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="p-4 bg-white flex flex-col gap-8  h-full">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <BiLogoStripe color="green" size={35} />
          <PiShoppingBagFill color="green" size={35} />
          <IoLogoVue color="green" size={30} />
        </div>
        <span className="font-bold text-xl">Quản lý</span>
      </div>
      <div className="rounded-2xl bg-[#EDEFF1]">
        <CardHeader
          avatar={
            <Avatar
              alt="Remy Sharp"
              src={
                currentUser.avatar ||
                "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              }
            />
          }
          title={`${currentUser.firstname} ${currentUser.lastname}`}
          // subheader="September 14, 2016"
        />
      </div>
      <div className="rounded-2xl bg-white list-sidebar-admin">
        <List component="nav" aria-labelledby="nested-list-subheader">
          {adminSidebar?.map((el) => (
            <Fragment>
              {el.type === "single" && (
                <NavLink key={el.id} to={el.path}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{el.icon}</ListItemIcon>
                      <ListItemText
                        primary={el.text}
                        style={{ color: "gray", letterSpacing: "8px", fontWeight: "bold" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              )}
              {el.type === "parent" && (
                <NavLink key={el.id} to={el.path}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleClick}>
                      <ListItemIcon>{el.icon}</ListItemIcon>
                      <ListItemText
                        primary={el.text}
                        style={{ color: "gray", letterSpacing: "8px", fontWeight: "bold" }}
                      />
                      {open ? (
                        <ExpandLess style={{ color: "gray", letterSpacing: "8px", fontWeight: "bold" }} />
                      ) : (
                        <ExpandMore style={{ color: "gray", letterSpacing: "8px", fontWeight: "bold" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {el.submenu?.map((e) => (
                        <NavLink to={e.path} key={e.id}>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>{e.icon}</ListItemIcon>
                            <ListItemText primary={e.text} />
                          </ListItemButton>
                        </NavLink>
                      ))}
                    </List>
                  </Collapse>
                </NavLink>
              )}
            </Fragment>
          ))}
        </List>
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
