import { useDispatch, useSelector } from "react-redux";
import { userLocalStorage } from "../../api/localService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, message } from "antd";
import { SET_INFO } from "../../redux/constant/user";
import { defaultAvatar } from "../../constants/defaultValues";

export default function Header() {
  const navigate = useNavigate();
  const { info } = useSelector(state => {
    return state.userReducer;
  });
  const dispatch = useDispatch();
  const handleLogout = () => {
    message.success("Logout successfully!");
    navigate("/");
    userLocalStorage.remove();
    const action = {
      type: SET_INFO,
      payload: null,
    };
    dispatch(action);
    // window.location.reload();
    // window.location.href = "/";
  };
  const handleLogin = () => {
    // window.location.href = "/login";
    navigate("/login");
  };
  const handleRegister = () => {
    // window.location.href = "/login";
    navigate("/register");
  };
  const handleAccount = () => {
    navigate("/account");
  };
  const location = useLocation();
  const items = [
    {
      key: "1",
      label: info ? <Link to='/account'>{info.hoTen}</Link> : <Link to='/login'>Login</Link>,
    },
    {
      key: "2",
      label: info ? <a onClick={handleLogout}>Logout</a> : <Link to='/register'>Register</Link>,
    },
    {
      key: "3",
      label: (
        <a className='text-black hover:text-gray-700 durataion-300' href='#showtimes'>
          Showtimes
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a className='text-black hover:text-gray-700 durataion-300' href='#cinemas'>
          Cinemas
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a className='text-black hover:text-gray-700 durataion-300' href='#news'>
          News
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <a className='text-black hover:text-gray-700 durataion-300' href='#app'>
          App
        </a>
      ),
    },
  ];
  const renderUserNav = () => {
    const classBtn = "border-2 border-black rounded-lg w-20 text-center hidden md:block";
    if (info) {
      return (
        <div className='flex justify-center items-center gap-x-3'>
          <div className='cursor-pointer flex justify-center items-center gap-x-1 group' onClick={handleAccount}>
            <img src={defaultAvatar} className='w-7 h-7  rounded-lg' alt='' />
            <span className='text-black group-hover:text-gray-500 duration-300'>{info.hoTen.toUpperCase()}</span>
          </div>
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
    <div className='bg-white flex items-center justify-between shadow-lg px-20 py-3 gap-6 fixed z-50 w-full'>
      <p className='text-3xl font-medium text-red-600 animate-pulse text-center'>
        <Link to='/' onClick={() => window.scrollTo(0, 0)}>
          CyberFlix
        </Link>
      </p>
      {location.pathname === "/" && (
        <div className='text-xl font-medium gap-3 lg:gap-12 text-center hidden md:flex justify-center items-center'>
          <a className='text-black hover:text-gray-700 durataion-300' href='#showtimes'>
            Showtimes
          </a>
          <a className='text-black hover:text-gray-700 durataion-300' href='#cinemas'>
            Cinemas
          </a>
          <a className='text-black hover:text-gray-700 durataion-300' href='#news'>
            News
          </a>
          <a className='text-black hover:text-gray-700 durataion-300' href='#app'>
            App
          </a>
        </div>
      )}
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
