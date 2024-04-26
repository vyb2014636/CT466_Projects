import path from "./path";
import icons from "./icons";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
export const navigation = [
  {
    id: 1,
    value: "Trang chủ",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "Sản phẩm",
    path: `/Sản phẩm`,
  },
  {
    id: 3,
    value: "FAQs",
    path: `/${path.FAQS}`,
  },
  {
    id: 4,
    value: "Tin tức",
    path: `/${path.BLOGS}`,
  },
  {
    id: 5,
    value: "Liên hệ",
    path: `/${path.CONTACTS}`,
  },
];

export const tabsInfoProduct = [
  {
    id: 1,
    name: "THÔNG TIN CỬA HÀNG",
    content: `Con đường chinh phục Streetwear của thương hiệu DirtyCoins được bắt đầu từ 2017 tại Sài Gòn - Việt Nam, xuất phát ý tưởng về một thương hiệu Việt mang văn hóa đường phố. Với những kinh nghiệm gói ghém từ thương hiệu tiền thân The Yars Shop, anh Khoa Sen đã đã bắt đầu cuộc hành trình DirtyCoins cùng những người bạn GenZ đầy nhiệt huyết và sáng tạo.

    Không quá ồn ào hay phô trương, ‘DirtyCoins’ tượng trưng cho những giá trị nguyên bản nhất của cuộc sống: đó là hiện thực gai góc của những ‘đồng tiền xương máu’, của giá trị lao động đầy mồ hôi, bụi bẩn và nước mắt. DirtyCoins trở thành một thương hiệu của tinh thần thời trang mạnh mẽ, táo bạo nhưng vẫn gần gũi và dễ tiếp cận rộng rãi. Không dừng lại ở đó, DirtyCoins muốn vượt qua giới hạn của một thương hiệu thời trang đơn thuần và trở thành một biểu tượng về văn hóa và phong cách sống của những con người trẻ tuổi.`,
  },
  {
    id: 2,
    name: "HƯỚNG DẪN MUA HÀNG",
    content: `Hướng dẫn sử dụng website TSUN:
    
    - Các bước mua hàng tại Web TSUN:
    
    + Chọn sản phẩm -> chọn Size sản phẩm -> thêm vào giỏ hàng -> thanh toán
    
    (Trong trường hợp các bạn mua nhiều sản phẩm, các bạn thêm từng sản phẩm vào giỏ hàng, sau khi đã đủ sản phẩm và số lượng , các bạn vui lòng kiểm tra thật kỹ giỏ hàng và ấn THANH TOÁN)
    
    + Thanh toán -> Điền đầy đủ thông tin -> Tên -> Số Điện Thoại -> Địa chỉ nhận hàng - > Mail.
    
    ( Đơn hàng thành công là khi các bạn điền đầy đủ thông tin và chính xác, các bạn cần điền đầy đủ thông tin và Mail để TSUN có thể xác nhận đơn hàng qua Mail cho các bạn.)`,
  },

  {
    id: 3,
    name: "CHÍNH SÁCH ĐỔI TRẢ",
    content: `- Chính sách và điều kiện đổi trả của SLY CLOTHING:
    + Các sản phẩm Giảm giá
    Quý khách vui lòng kiểm tra sản phẩm trực tiếp trước khi thanh toán
    Kiểm tra size chart kỹ trước khi đặt hàng
    Sản phẩm giảm giá sẽ không được hỗ trợ đổi - trả ( trừ lỗi của nhà sản xuất )
    Quý khách nên quay video unbox khi khui hàng, SLY chỉ hỗ trợ giải quyết khi có video để tránh mất thời gian 2 bên
    + Các sản phẩm Nguyên giá
    QUÝ KHÁCH vui lòng kiểm tra trước khi thanh toán. SLY hỗ trợ đổi size trong vòng 7 ngày
    Khoản phí trên lệch sẽ không được hoàn lại, trường hợp sản phẩm đổi có giá cao hơn, quý khách chỉ cần thanh toán thêm giá trị chênh lệch
    Vui lòng quay video unbox như ghi chú trên đơn hàng.
    Hàng phải còn mới, chưa qua sử dụng và còn tag sản phẩm.
    Sản phẩm bị lỗi do vận chuyển và do nhà sản xuất.
    Trường hợp đổi hàng từ phía khách hàng, quý khách vui lòng hỗ trợ phần phí giao hàng 2 chiều
    Quý khách gởi lại hàng vui lòng quay lại quá trình đóng gói, để sản phẩm còn mới 100% khi SLY nhận hàng để hỗ trợ đổi - trả nhanh nhất
    + Việc vận chuyển sẽ qua nhiều khâu trung gian hoặc có vấn đề phát sinh từ bên vận chuyển, để đảm bảo quyền lợi tốt nhất cho bạn. Nên quay video trong quá trình mở hàng khi túi niêm phong SLY chưa bị khui, để SLY có thể giải quyết đơn của bạn nhanh nhất.`,
  },
];

export const colors = [
  { vn: "đỏ", en: "red" },
  { vn: "đen", en: "black" },
  { vn: "vàng", en: "yellow" },
  { vn: "xanh biển", en: "blue" },
  { vn: "trắng", en: "white" },
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
    id: 1,
    text: "Rất tệ",
  },
  {
    id: 2,
    text: "Tệ",
  },
  {
    id: 3,
    text: "Bình thường",
  },
  {
    id: 4,
    text: "Tốt",
  },
  {
    id: 5,
    text: "Rất tốt",
  },
];
const { MdDashboard, FaProductHunt, MdGroup, FaMoneyBill } = icons;

export const adminSidebar = [
  {
    id: 1,
    type: "single",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    type: "single",
    text: "Quản lý tài khoản",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <GroupIcon />,
  },
  {
    id: 3,
    type: "parent",
    text: "Quản lý sản phẩm",
    icon: <InventoryIcon />,
    submenu: [
      {
        icon: <AddCircleIcon />,
        text: "Tạo sản phẩm",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
      },
      {
        icon: <ManageSearchIcon />,
        text: "Quản lý sản phẩm",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "single",
    text: "Quản lý đơn hàng",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <DescriptionIcon />,
  },
];

export const roles = [
  {
    code: 1945,
    value: "Admin",
  },
  {
    code: 1979,
    value: "Người dùng",
  },
];
