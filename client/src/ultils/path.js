const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  PROFILES: "profile/:id_user",
  BLOGS: "blogs",
  FAQS: "faqs",
  CONTACTS: "contacts",
  OUR_SERVICE: "services",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",
  DETAILS_CART: "my-cart-details",
  CHECKOUT: "checkout",

  //Admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCT: "create-product",

  //Member
  MEMBER: "member",
  PERSONAL: "personal",
  MYCART: "my-cart",
  WISHLIST: "wishlist",
  HISTORY_PURCHASE: "history-purchase",
};

export default path;
