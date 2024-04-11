import icons from "./icons";
const { FaRegStar, FaStar, FaStarHalfAlt } = icons;
export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number) => Number(number?.toFixed(1)).toLocaleString();
export const renderStarFromNumber = (number) => {
  if (!Number(number)) return;
  const stars = [];
  if (number === 0) {
    for (let i = 0; i <= 4; i++) stars.push(<FaRegStar />);
  }
  if (number % 1 !== 0) {
    const originalNum = Math.floor(number);
    for (let i = 0; i < +originalNum; i++) stars.push(<FaStar />);
    stars.splice(originalNum, 0, <FaStarHalfAlt />);
    const nonStar = originalNum + 1;
    for (let i = nonStar; i < 5; i++) stars.push(<FaRegStar />);
  } else {
    for (let i = 0; i < +number; i++) stars.push(<FaStar />);
    for (let i = 5; i > +number; i--) stars.push(<FaRegStar />);
  }
  return stars;
};
export function secondsToHms(d) {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
}

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1]?.trim() === "") {
      invalids++;
      setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Vui lòng nhập thông tin" }]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "firstname":
        if (!arr[1].match(/^[ a-zA-Z\-/']+$/)) {
          invalids++;
          setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Họ không hợp lệ" }]);
        }
        break;
      case "lastname":
        if (!arr[1].match(/^[ a-zA-Z\-/']+$/)) {
          invalids++;
          setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Tên không hợp lệ" }]);
        }
        break;
      case "mobile":
        if (!arr[1].match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g)) {
          invalids++;
          setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Số điện thoại không hợp lệ" }]);
        }
        break;
      case "email":
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Email không hợp lệ" }]);
        }
        break;
      // case "password":
      //   if (arr[1].length < 6) {
      //     invalids++;
      //     setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Mật khẩu phải lớn hơn 6 kí tự" }]);
      //   }
      //   if (!arr[1].match(/[a-z]+/)) {
      //     invalids++;
      //     setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Mật khẩu phải có kí tự" }]);
      //   }
      //   if (!arr[1].match(/[A-Z]+/)) {
      //     invalids++;
      //     setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Mật khẩu phải in hoa kí tự đầu" }]);
      //   }
      //   if (!arr[1].match(/[0-9]+/)) {
      //     invalids++;
      //     setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Mật khẩu phải có ít nhất 1 số" }]);
      //   }
      //   if (!arr[1].match(/[$@#&!]+/)) {
      //     invalids++;
      //     setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Mật khẩu phải có 1 kí tự đặc biệt" }]);
      //   }
      //   break;
      case "confirmPassword":
        if (payload.password.length === 0) {
          invalids++;
          setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Vui lòng nhập mật khẩu" }]);
        }
        if (arr[1] !== payload.password) {
          invalids++;
          setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Mật khẩu không khớp" }]);
        }
        break;
      default:
        break;
    }
  }
  return invalids;
};
