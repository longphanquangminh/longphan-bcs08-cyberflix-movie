import { useDispatch, useSelector } from "react-redux";
import { userLocalStorage } from "../../api/localService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, message } from "antd";
import { SET_INFO } from "../../redux/constant/user";
import { defaultAvatar } from "../../constants/defaultValues";

export default function Header({ scrollIntoShowTimesRef, scrollIntoCinemasRef, scrollIntoNewsRef, scrollIntoAppRef }) {
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
        <a onClick={scrollIntoShowTimesRef} className='text-black hover:text-gray-700 durataion-300'>
          Showtimes
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a onClick={scrollIntoCinemasRef} className='text-black hover:text-gray-700 durataion-300'>
          Cinemas
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a onClick={scrollIntoNewsRef} className='text-black hover:text-gray-700 durataion-300'>
          News
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <a onClick={scrollIntoAppRef} className='text-black hover:text-gray-700 durataion-300'>
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
          <img
            alt=''
            src='https://media.discordapp.net/attachments/1026660684739653674/1189952444277469254/Camera_Cinematography_Logo.png?ex=65fc5192&is=65e9dc92&hm=408186ef256770bd6ba87211a2e0685f682b3fc7b14d27d9f57c648bf425fdd3&=&format=webp&quality=lossless&width=593&height=593'
            className='h-9'
          />
        </Link>
      </p>
      {location.pathname === "/" && (
        <div className='text-xl font-medium gap-3 lg:gap-12 text-center hidden md:flex justify-center items-center'>
          <button onClick={scrollIntoShowTimesRef} className='text-black hover:text-gray-700 durataion-300'>
            Showtimes
          </button>
          <button onClick={scrollIntoCinemasRef} className='text-black hover:text-gray-700 durataion-300'>
            Cinemas
          </button>
          <button onClick={scrollIntoNewsRef} className='text-black hover:text-gray-700 durataion-300'>
            News
          </button>
          <button onClick={scrollIntoAppRef} className='text-black hover:text-gray-700 durataion-300'>
            App
          </button>
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
