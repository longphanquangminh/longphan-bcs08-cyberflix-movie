import { useSelector } from "react-redux";
import { userLocalStorage } from "../../api/localService";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "antd";

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
  let handleRegister = () => {
    // window.location.href = "/login";
    navigate("/register");
  };
  const items = [
    {
      key: "1",
      label: info ? <span>{info.hoTen}</span> : <Link to='/login'>Login</Link>,
    },
    {
      key: "2",
      label: info ? <a onClick={handleLogout}>Logout</a> : <Link to='/register'>Register</Link>,
    },
  ];
  let renderUserNav = () => {
    let classBtn = "border-2 border-black rounded-lg w-20 text-center hidden md:block";
    if (info) {
      return (
        <div className='flex justify-center items-center gap-x-3'>
          <span>{info.hoTen}</span>
          <button className={classBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
      // đã đăng nhập
    } else {
      return (
        <div className='flex justify-center items-center gap-3'>
          <button className={classBtn} onClick={handleLogin}>
            Login
          </button>
          <button className={classBtn} onClick={handleRegister}>
            Register
          </button>
          <button className='block md:hidden'>Menu</button>
        </div>
      );
    }
  };

  return (
    <div className='bg-white flex items-center justify-between shadow-lg px-20 py-3 gap-6'>
      <p className='text-3xl font-medium text-red-600 animate-pulse text-center'>
        <Link to='/'>CyberFlix</Link>
      </p>
      <div className='space-x-5'>
        <div className='hidden md:block'>{renderUserNav()}</div>
        <div className='block md:hidden'>
          <Dropdown menu={{ items }} placement='bottomRight'>
            <Button>Menu</Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
