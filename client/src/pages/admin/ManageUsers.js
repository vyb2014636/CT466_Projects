import React, { useEffect, useState } from "react";
import { apiGetAllUsers } from "apis/user";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { roles } from "ultils/contants";
import { Avatar, Badge, Box, IconButton, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

const ManageUsers = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleEditClick = (id) => {
    console.log("Edit clicked for id:", id);
    // Bạn có thể xử lý _id ở đây, ví dụ: mở một modal chỉnh sửa thông tin của user có _id này.
  };
  const handleRowClick = (params) => {
    const clickedRowId = params.row._idTemp; // Lấy _id của dòng được click
    console.log("Clicked Row Id:", clickedRowId);
    // Bạn có thể xử lý _id ở đây, ví dụ: gửi _id đến server, hiển thị thông tin chi tiết v.v.
  };
  const [filterModel, setFilterModel] = useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [""],
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  const columns = [
    {
      field: "avatar",
      headerName: "Ảnh",
      width: 70,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Avatar
            src={
              params.row.avatar ||
              "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            }
          />
        </div>
      ),
    },

    { field: "firstname", headerName: "Họ", width: 130 },
    { field: "lastname", headerName: "Tên", width: 130 },
    {
      field: "fullname",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstname || ""} ${row.lastname || ""}`,
    },
    { field: "role", headerName: "Vai trò", width: 100 },
    { field: "mobile", headerName: "Liên hệ", width: 100 },
    {
      field: "isBlocked",
      headerName: "Trạng thái",
      width: 100,
      renderCell: (params) => {
        const handleClick = (event, userId) => {
          setSelectedUserId(userId);
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        const handleMenuItemClick = (value) => {
          console.log("Selected:", value);
          handleClose();
        };

        return (
          <Box sx={{ height: "100%", position: "relative" }}>
            <Badge
              color={params.value ? "error" : "success"}
              variant="outlined"
              badgeContent={params.value ? "Khóa" : "Kích hoạt"}
              overlap="rectangle"
              sx={{
                position: "absolute",
                bottom: "70%",
                left: "50%",
                right: "0",
                transform: "translate(-50%)",
                width: "100%",
                minWidth: "60px",
                cursor: "pointer",
              }}
              onClick={(event) => handleClick(event, params.row.id)}
            />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => handleMenuItemClick(false)}>Kích hoạt</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(true)}>Khóa</MenuItem>
            </Menu>
          </Box>
        );
      },
    },
    {
      field: "edit",
      headerName: "Tùy chọn",
      width: 130,
      renderCell: (params) => (
        <Box display="flex" justifyContent="start">
          <IconButton onClick={() => handleEditClick(params.row._idTemp)}>
            <EditIcon />
          </IconButton>
          /
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
    { field: "createdAt", headerName: "Ngày tạo", width: 100 },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const findUsers = async (params) => {
      const response = await apiGetAllUsers(params);
      if (response.success) {
        setRows(
          response.users.map((user, index) => ({
            _idTemp: user._id, // Thêm thuộc tính _idTemp vào mỗi dòng
            id: index + 1,
            lastname: user.lastname,
            firstname: user.firstname,
            avatar: user.avatar,
            role: roles?.find((role) => +role.code === +user.role)?.value,
            mobile: user.mobile,
            isBlocked: user.isBlocked,
            createdAt: moment(user.createdAt).format("DD/MM/YYYY"),
          }))
        );
      }
    };

    findUsers();
  }, []);

  const localeText = {
    // Thay đổi các giá trị cho ô tìm kiếm và các nút trong toolbar
    // Ví dụ: toolbarSearchPlaceholder: "Tìm kiếm",
    toolbarSearchPlaceholder: "Tìm kiếm",
  };

  return (
    <div style={{ width: "99%" }} className="bg-white p-2">
      <DataGrid
        style={{ border: "none" }} // Đặt lineHeight
        rowHeight={80}
        toolbarSearchPlaceholder={"Tìm kiếm"}
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        disableColumnFilter
        disableDensitySelector
        filterModel={filterModel}
        onFilterModelChange={(newModel) => setFilterModel(newModel)}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        localeText={localeText} // Sử dụng localeText để thay đổi ngôn ngữ
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        pageSizeOptions={[1, 2, 3, 4, 5]}
        onRowClick={handleRowClick}
        checkboxSelection
      />
    </div>
  );
};

export default ManageUsers;
