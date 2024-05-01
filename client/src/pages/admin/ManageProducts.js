import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { apiAllProducts } from "apis/product";
import { Box, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import moment from "moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import FormEditProduct from "./FormEditProduct";
import { apiDeleteProduct } from "apis";
import { CustomizeVarriant } from "components";

const ManageProducts = () => {
  const [update, setUpdate] = useState(false);
  const [edit, setEdit] = useState(null);
  const [customizeVarriant, setCustomizeVarriant] = useState(null);
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const [rows, setRows] = useState([]);
  const fetchUsers = async () => {
    const response = await apiAllProducts();
    if (response.success) {
      setRows(
        response.products.map((product, index) => ({
          idProduct: product._id, // Thêm thuộc tính _idTemp vào mỗi dòng
          product: product,
          id: index + 1,
          title: product.title,
          price: product.price,
          quantity: product.quantity,
          sold: product.sold,
          thumb: product.thumb,
          brand: product.brand,
          // role: roles?.find((role) => +role.code === +product.role)?.value,
          // roleCode: roles?.find((role) => +role.code === +product.role)?.code,
          totalsRatings: product.totalsRatings,
          category: product.category,
          color: product.color,
          createdAt: moment(product.createdAt).format("DD/MM/YYYY"),
          update: "",
        }))
      );
    }
  };

  const handleDeleteProduct = (pid, name) => {
    Swal.fire({
      title: `Bạn chắc chắn xóa sản phẩm ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "Không",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(pid);
        if (response.success) toast.success(response.mes);
        else toast.success(response.mes);
        render();
      }
    });
  };

  const columns = [
    {
      field: "thumb",
      headerName: "Ảnh",
      width: 100,
      renderCell: (params) => (
        <div className="h-full flex justify-center items-center">
          <img
            src={
              params.row.thumb ||
              "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            }
            alt="thumb"
            className="object-cover h-full "
          />
        </div>
      ),
    },
    {
      field: "title",
      headerName: "Tên sản phẩm",
      width: 250,
    },
    {
      field: "category",
      headerName: "Loại",
      width: 90,
    },
    {
      field: "brand",
      headerName: "brand",
      width: 90,
    },
    {
      field: "price",
      headerName: "Giá",
      width: 120,
    },
    {
      field: "sold",
      headerName: "Đã bán",
      width: 70,
    },

    {
      field: "quantity",
      headerName: "Số lượng",
      width: 100,
    },

    {
      field: "totalsRatings",
      headerName: "Đánh giá",
      width: 80,
    },
    {
      field: "color",
      headerName: "Màu sắc",
      width: 70,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 110,
    },
    {
      field: "edit",
      headerName: "Tùy chọn",
      width: 130,
      renderCell: (params) => (
        <Box display="flex" justifyContent="start">
          <IconButton onClick={() => setEdit(params.row.product)}>
            <EditIcon />
          </IconButton>
          /
          <IconButton onClick={() => handleDeleteProduct(params.row.idProduct, params.row.title)}>
            <DeleteIcon />
          </IconButton>
          /
          <IconButton onClick={() => setCustomizeVarriant(params.row.product)}>
            <MenuIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  useEffect(() => {
    fetchUsers();
  }, [update]);
  return (
    <Box sx={{ height: 650, width: 1 }}>
      {edit && <FormEditProduct editProduct={edit} render={render} setEdit={setEdit} />}
      {customizeVarriant && (
        <CustomizeVarriant
          customizeVarriant={customizeVarriant}
          render={render}
          setCustomizeVarriant={setCustomizeVarriant}
        />
      )}
      <DataGrid
        style={{ border: "none" }} // Đặt lineHeight
        rowHeight={83}
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
          },
        }}
        pageSizeOptions={[4, 6, 8]}
        disableColumnFilter
        disableDensitySelector
      />
    </Box>
  );
};

export default ManageProducts;
