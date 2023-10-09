import { useSelector } from "react-redux";
import { userLocalStorage } from "../../api/localService";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();
  let { info } = useSelector(state => {
    return state.userReducer;
  });
  let handleLogout = () => {
    userLocalStorage.remove();
    window.location.reload();
    // window.location.href = "/";
    // navigate("/");
  };
  let handleLogin = () => {
    // window.location.href = "/login";
    navigate("/login");
  };
  let renderUserNav = () => {
    let classBtn = "border-2 border-black rounded-xl px-7 py-3";
    if (info) {
      return (
        <>
          <span>{info.hoTen}</span>
          <button className={classBtn} onClick={handleLogout}>
            Đăng xuất
          </button>
        </>
      );
      // đã đăng nhập
    } else {
      return (
        <>
          <button className={classBtn} onClick={handleLogin}>
            Đăng nhập
          </button>
          <button className={classBtn}>Đăng kí</button>
        </>
      );
    }
  };

  return (
    <div className='h-20 flex items-center justify-between shadow-lg px-20'>
      <span className='text-3xl font-medium text-red-600 animate-pulse'>CyberFlix</span>
      <div className='space-x-5'>{renderUserNav()}</div>
    </div>
  );
}
