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
