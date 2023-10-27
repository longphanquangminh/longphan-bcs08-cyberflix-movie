import { useSelector } from "react-redux";

// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default function PrivateRoute({ children }) {
  const { info } = useSelector(state => {
    return state.adminReducer;
  });
  if (info?.maLoaiNguoiDung === "QuanTri") {
    return children;
  }
  window.location.href = "/admin/auth";
  //   return children;
}
