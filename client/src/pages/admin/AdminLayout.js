import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "ultils/path";
import { useSelector } from "react-redux";
import { AdminSidebar, HeaderAdmin } from "components";

import { styled } from "@mui/material/styles";
import { Box, Paper, Stack } from "@mui/material";

const AdminLayout = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  if (!isLoggedIn || !currentUser || +currentUser.role !== 1945)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="flex w-full bg-[#F9FAFB] min-h-screen relative gap-1">
      <div className="w-[20%]">
        <AdminSidebar />
      </div>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Item>
            <HeaderAdmin />
          </Item>
          <Item>
            <Outlet />
          </Item>
        </Stack>
      </Box>
    </div>
  );
};

export default AdminLayout;
