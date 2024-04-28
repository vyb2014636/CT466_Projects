import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiGetAllUsers, apiUpdateUser, apiDeleteUser } from "apis/user";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { roles, blockStatus } from "ultils/contants";
import { Avatar, Badge, Box, IconButton } from "@mui/material";
import { Button, InputForm, SelectAdmin } from "components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [edit, setEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
    lastname: "",
    firstname: "",
    role: "",
    mobile: "",
    isBlocked: "",
  });

  const requiredEdit = (user) => {
    Swal.fire({
      title: "Bạn có muốn chỉnh sửa cho tài khoản này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "Không",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEdit(user);
      }
    });
  };
  // useEffect(() => {
  //   if (edit !== null) {
  //     setEdit(edit);
  //   }
  // }, [edit]);
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleUpdate = (data) => {
    Swal.fire({
      title: "Bạn có muốn chỉnh sửa cho tài khoản này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "Không",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiUpdateUser(data, edit._id);
        if (response.success) {
          setEdit(null);
          render();
          toast.success(response.mes);
        } else {
          setEdit(null);
          toast.error(response.mes);
        }
      }
    });
  };
  const handleDelete = (uid) => {
    Swal.fire({
      title: "Bạn có muốn xóa tài khoản này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "Không",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else {
          toast.success(response.mes);
        }
      }
    });
  };
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const findUsers = async (params) => {
      const response = await apiGetAllUsers(params);
      if (response.success) {
        setRows(
          response.users.map((user, index) => ({
            _idTemp: user._id, // Thêm thuộc tính _idTemp vào mỗi dòng
            user: user,
            id: index + 1,
            email: user.email,
            lastname: user.lastname,
            firstname: user.firstname,
            avatar: user.avatar,
            role: roles?.find((role) => +role.code === +user.role)?.value,
            roleCode: roles?.find((role) => +role.code === +user.role)?.code,
            mobile: user.mobile,
            isBlocked: user.isBlocked,
            createdAt: moment(user.createdAt).format("DD/MM/YYYY"),
            update: "",
          }))
        );
      }
    };

    findUsers();
  }, [update, edit]);

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
    {
      field: "email",
      headerName: "Email",
      width: 160,
      renderCell: (params) => {
        return edit && edit._id === params.row._idTemp ? (
          <InputForm
            id={"email"}
            register={register}
            fullWidth
            errors={errors}
            defaultValue={edit && edit._id === params.row._idTemp ? edit?.email : ""}
            validate={{
              required: "Nhập email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Mail không hợp lệ",
              },
            }}
          />
        ) : (
          params.row.email
        );
      },
    },
    {
      field: "firstname",
      headerName: "Họ",
      width: 100,
      renderCell: (params) => {
        return edit && edit._id === params.row._idTemp ? (
          <InputForm
            id={"firstname"}
            register={register}
            fullWidth
            errors={errors}
            defaultValue={edit && edit._id === params.row._idTemp ? edit?.firstname : ""}
            validate={{ required: "Nhập tên" }}
          />
        ) : (
          params.row.firstname
        );
      },
    },
    {
      field: "lastname",
      headerName: "Tên",
      width: 100,
      renderCell: (params) => {
        return edit && edit._id === params.row._idTemp ? (
          <InputForm
            id={"lastname"}
            register={register}
            fullWidth
            errors={errors}
            defaultValue={edit && edit._id === params.row._idTemp ? edit?.lastname : ""}
            validate={{ required: "Nhập tên" }}
          />
        ) : (
          params.row.lastname
        );
      },
    },
    {
      field: "fullname",
      headerName: "Tên đầy đủ",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      valueGetter: (value, row) => `${row.firstname || ""} ${row.lastname || ""}`,
    },
    {
      field: "role",
      headerName: "Vai trò",
      width: 150,
      renderCell: (params) => {
        return edit && edit._id === params.row._idTemp ? (
          <SelectAdmin
            register={register}
            fullWidth
            errors={errors}
            defaultValue={params?.row?.roleCode}
            id={"role"}
            validate={{
              required: true,
            }}
            options={roles}
          />
        ) : (
          params.row.role
        );
      },
    },

    {
      field: "mobile",
      headerName: "Liên hệ",
      width: 150,
      renderCell: (params) => {
        return edit && edit._id === params.row._idTemp ? (
          <InputForm
            register={register}
            fullWidth
            errors={errors}
            defaultValue={params?.row?.mobile}
            id={"mobile"}
            validate={{
              required: "Nhập phone",
              pattern: {
                value: /^[62|0]+\d{9}/gi,
                message: "Phone không hợp lệ",
              },
            }}
          />
        ) : (
          params.row.mobile
        );
      },
    },
    {
      field: "isBlocked",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        return edit && edit._id === params.row._idTemp ? (
          <SelectAdmin
            register={register}
            fullWidth
            errors={errors}
            id={"isBlocked"}
            validate={{
              required: true,
            }}
            options={blockStatus}
            defaultValue={params?.row?.isBlocked}
          />
        ) : (
          <div className="h-full relative">
            <Badge
              color={params.value ? "error" : "success"}
              badgeContent={params.value ? "Khóa" : "Kích hoạt"}
              overlap="rectangle"
              style={{ position: "absolute", left: "0", top: "50%", fontSize: "1.2rem" }}
            />
          </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "Tùy chọn",
      width: 130,
      renderCell: (params) => (
        <Box display="flex" justifyContent="start">
          {edit && edit?._id === params?.row?._idTemp ? (
            <IconButton onClick={() => setEdit(null)}>
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => requiredEdit(params.row.user)}>
              <EditIcon />
            </IconButton>
          )}
          /
          <IconButton onClick={() => handleDelete(params.row._idTemp)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
    { field: "createdAt", headerName: "Ngày tạo", width: 100 },
    {
      field: "update",
      headerName: "Cập nhật",
      width: 110,
      renderCell: (params) => {
        return edit && edit._id === params.row._idTemp ? (
          <div className="h-full w-full overflow-hidden flex justify-center items-center">
            <Button type="submit" name="Cập nhật" fw fh />
          </div>
        ) : (
          ""
        );
      },
    },
  ];
  useEffect(() => {
    if (edit)
      reset({
        firstname: edit.firstname,
        lastname: edit.lastname,
        mobile: edit.mobile,
        role: edit.role,
        isBlocked: edit.isBlocked,
      });
  }, [edit]);

  return (
    <div style={{ width: "99%" }} className="bg-white p-2">
      <form onSubmit={handleSubmit(handleUpdate)}>
        <DataGrid
          style={{ border: "none" }} // Đặt lineHeight
          rowHeight={80}
          toolbarSearchPlaceholder={"Tìm kiếm"}
          rows={rows}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          disableColumnFilter
          filterModel={filterModel}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 4 },
            },
          }}
          pageSizeOptions={[1, 2, 3, 4, 5]}
          // onRowClick={handleRowClick}
          // checkboxSelection
        />
      </form>
    </div>
  );
};

export default ManageUsers;
