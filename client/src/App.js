import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public, FAQs, Blogs, DetailProduct, Products, Services, Contacts, FinalRegister, ResetPassword, Profile, DetailsCart } from "pages/public";
import { AdminLayout, CreateProduct, Dashboard, ManageOrder, ManageProducts, ManageUsers } from "pages/admin";

import path from "ultils/path";
import { getCategories } from "store/app/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "components";
import { MemberLayout, Personal, Wishlist, HistoryPurchase, MyCart } from "pages/member";

function App() {
  const dispath = useDispatch();
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  useEffect(() => {
    dispath(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-serif overflow-y-auto ">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQS} element={<FAQs />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.OUR_SERVICE} element={<Services />} />
          <Route path={path.CONTACTS} element={<Contacts />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.PROFILES} element={<Profile />} />
          <Route path={path.MEMBER} element={<MemberLayout />}>
            <Route path={path.PERSONAL} element={<Personal />} />
            <Route path={path.WISHLIST} element={<Wishlist />} />
            <Route path={path.MYCART} element={<MyCart />} />
            <Route path={path.HISTORY_PURCHASE} element={<HistoryPurchase />} />
          </Route>
          <Route path={path.DETAILS_CART} element={<DetailsCart />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.MANAGE_USER} element={<ManageUsers />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />}></Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
