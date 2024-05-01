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
  const [lengthTable, setLengthTable] = useState([]);
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
  useEffect(() => {
    setLengthTable(Array.from({ length: rows.length }, (_, index) => +index + 1));
  }, [rows]);

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
            errors={errors}
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
          <InputForm id={"firstname"} register={register} errors={errors} validate={{ required: "Nhập họ" }} />
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
          <InputForm id={"lastname"} register={register} errors={errors} validate={{ required: "Nhập tên" }} />
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
      width: 130,
      renderCell: (params) => {
        return edit && edit._id === params.row._idTemp ? (
          <div className="h-full flex items-center justify-start p-0">
            <SelectAdmin
              register={register}
              errors={errors}
              defaultValue={params?.row?.roleCode}
              id={"role"}
              validate={{
                required: true,
              }}
              options={roles}
              fullWidth
            />
          </div>
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
            errors={errors}
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
      width: 130,
      renderCell: (params) => {
        return edit && edit._id === params.row._idTemp ? (
          <div className="h-full flex items-center justify-center">
            <SelectAdmin
              register={register}
              errors={errors}
              id={"isBlocked"}
              options={blockStatus}
              defaultValue={params?.row?.isBlocked}
            />
          </div>
        ) : (
          <div className="h-full relative">
            <Badge
              color={params.value ? "error" : "success"}
              badgeContent={params.value ? "Khóa" : "Kích hoạt"}
              overlap="rectangle"
              style={{ position: "absolute", left: "0", top: "40%", fontSize: "1.5rem" }}
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
      headerName: "Ghi chú",
      width: 100,
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
        email: edit.email,
        firstname: edit.firstname,
        lastname: edit.lastname,
        mobile: edit.mobile,
        role: edit.role,
        isBlocked: edit.isBlocked,
      });
  }, [edit]);

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <Box sx={{ height: 400, width: 1 }}>
        <DataGrid
          style={{ border: "none" }} // Đặt lineHeight
          rowHeight={80}
          rows={rows}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 3 },
            },
          }}
          pageSizeOptions={lengthTable}
          disableColumnFilter
          disableDensitySelector
        />
      </Box>
    </form>
  );
};

export default ManageUsers;
