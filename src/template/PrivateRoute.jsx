import { message } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { info } = useSelector(state => {
    return state.adminReducer;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (info?.maLoaiNguoiDung !== "QuanTri") {
      message.error("Please login first, admin!");
      navigate("/admin/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (info?.maLoaiNguoiDung === "QuanTri") {
    return children;
  }
}
