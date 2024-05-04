// import React, { useCallback, useEffect, useState } from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { apiAllProducts, apiGetOrders } from "apis/product";
// import { Box, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MenuIcon from "@mui/icons-material/Menu";
// import moment from "moment";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { apiDeleteProduct } from "apis";
// import { blockCategory } from "ultils/contants";

// const ManageOrder = () => {
//   const [update, setUpdate] = useState(false);
//   const [edit, setEdit] = useState(null);
//   const render = useCallback(() => {
//     setUpdate(!update);
//   }, [update]);
//   const [rows, setRows] = useState([]);
//   const fetchOrdersByAdmin = async (params) => {
//     const response = await apiGetOrders(params);
//     if (response.success) {
//       setRows(
//         response.order.map((orders, index) => ({
//           idOrder: orders._id, // Thêm thuộc tính _idTemp vào mỗi dòng
//           orders: orders,
//           id: index + 1,
//           status: orders.status,
//           products: orders.products,
//           total: orders.total,
//           orderBy: orders.orderBy,
//           // role: roles?.find((role) => +role.code === +product.role)?.value,
//           // roleCode: roles?.find((role) => +role.code === +product.role)?.code,
//           createdAt: moment(orders?.createdAt).format("DD/MM/YYYY"),
//           update: "",
//         }))
//       );
//     }
//   };

//   const handleDeleteProduct = (pid, name) => {
//     Swal.fire({
//       title: `Bạn chắc chắn xóa sản phẩm ${name}`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "Không",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Có!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const response = await apiDeleteProduct(pid);
//         if (response.success) toast.success(response.mes);
//         else toast.success(response.mes);
//         render();
//       }
//     });
//   };

//   const columns = [
//     {
//       field: "id",
//       headerName: "#",
//       width: 50,
//     },
//     {
//       field: "products",
//       headerName: "Đơn hàng",
//       width: 300,
//       renderCell: (params) => {
//         params.row.products?.map((el) => <img src={el.thumbnail} alt="thumbnail" key={el._id} />);
//       },
//     },
//     {
//       field: "status",
//       headerName: "Trạng thái",
//       width: 90,
//     },

//     {
//       field: "total",
//       headerName: "Tổng tiền",
//       width: 120,
//     },
//     {
//       field: "edit",
//       headerName: "Tùy chọn",
//       width: 130,
//       renderCell: (params) => (
//         <Box display="flex" justifyContent="start">
//           <IconButton>
//             <EditIcon />
//           </IconButton>
//           /
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   useEffect(() => {
//     fetchOrdersByAdmin();
//   }, []);

//   return (
//     <Box sx={{ height: 650, width: 1 }}>
//       <DataGrid
//         style={{ border: "none" }} // Đặt lineHeight
//         rowHeight={83}
//         rows={rows}
//         columns={columns}
//         slots={{
//           toolbar: GridToolbar,
//         }}
//         slotProps={{ toolbar: { showQuickFilter: true } }}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 6 },
//           },
//         }}
//         pageSizeOptions={[4, 6, 8]}
//         disableColumnFilter
//         disableDensitySelector
//       />
//     </Box>
//   );
// };

// export default ManageOrder;
