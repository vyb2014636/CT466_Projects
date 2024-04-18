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

export const colors = [
  { vn: "đỏ", en: "red" },
  { vn: "đen", en: "black" },
  { vn: "vàng", en: "yellow" },
  { vn: "xanh biển", en: "blue" },
  { vn: "tím", en: "purple" },
  { vn: "kem", en: "cream" },
];

export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Mua nhiều nhất",
  },
  {
    id: 2,
    value: "title",
    text: "Từ A - Z",
  },
  {
    id: 3,
    value: "-title",
    text: "Từ Z - A",
  },
  {
    id: 4,
    value: "-price",
    text: "Giá từ cao đến thấp",
  },
  {
    id: 5,
    value: "price",
    text: "Giá từ thấp đến cao",
  },
  {
    id: 6,
    value: "-createdAt",
    text: "Sản phẩm mới nhất",
  },
];

export const voteOptions = [
  {
    id: 5,
    text: "Rất tốt",
  },
  {
    id: 4,
    text: "Tốt",
  },
  {
    id: 3,
    text: "Bình thường",
  },
  {
    id: 2,
    text: "Tệ",
  },
  {
    id: 1,
    text: "Rất tệ",
  },
];
