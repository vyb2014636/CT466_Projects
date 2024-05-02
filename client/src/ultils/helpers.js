import icons from "./icons";
const { FaRegStar, FaStar, FaStarHalfAlt } = icons;
export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-")
    .split("%20")
    .join("-");

export const formatMoney = (number) => Number(number?.toFixed(1)).toLocaleString();
export const renderStarFromNumber = (number, size) => {
  // if (!Number(number)) return;
  if (typeof number !== "number") return;
  let stars = [];
  if (number === 0) {
    for (let i = 0; i < 5; i++) {
      stars.push(<FaRegStar size={size || 15} />);
    }
    return stars;
  }

  if (number % 1 !== 0) {
    const originalNum = Math.floor(number);
    for (let i = 0; i < +originalNum; i++) stars.push(<FaStar size={size || 15} />);
    stars.splice(originalNum, 0, <FaStarHalfAlt size={size || 15} />);
    const nonStar = originalNum + 1;
    for (let i = nonStar; i < 5; i++) stars.push(<FaRegStar size={size || 15} />);
  } else {
    for (let i = 0; i < +number; i++) stars.push(<FaStar size={size || 15} />);
    for (let i = 5; i > +number; i--) stars.push(<FaRegStar size={size || 15} />);
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
      case "mobile":
        if (!arr[1].match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g)) {
          invalids++;
          setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Số điện thoại không hợp lệ" }]);
        }
        break;
      case "email":
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [...prev, { name: arr[0], mes: "Email không hợp lệ" }]);
        }
        break;
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

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
