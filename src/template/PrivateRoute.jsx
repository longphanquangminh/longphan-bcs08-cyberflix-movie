import { adminLocalStorage } from "../api/localService";

// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default function PrivateRoute({ children }) {
  let admin = adminLocalStorage.get();
  if (admin?.maLoaiNguoiDung === "QuanTri") {
    return children;
  }
  window.location.href = "/admin/auth";
  //   return children;
}
