import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public, FAQs, Blogs, DetailProduct, Products, Services, Contacts } from "./pages/public";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch } from "react-redux";

function App() {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-serif">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQS} element={<FAQs />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.OUR_SERVICE} element={<Services />} />
          <Route path={path.CONTACTS} element={<Contacts />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
