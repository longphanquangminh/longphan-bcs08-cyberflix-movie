import { useEffect, useState } from "react";
import { getSeatListByFilm, postTickets } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";
export default function Purchase() {
  const { id } = useParams();
  let { info } = useSelector(state => {
    return state.userReducer;
  });
  const [filmSeats, setFilmSeats] = useState(null);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [totalGiaVe, setTotalGiaVe] = useState(0);
  useEffect(() => {
    const calculateTotalGiaVe = () => {
      const total = chosenSeats.reduce((acc, obj) => acc + obj.giaVe, 0);
      setTotalGiaVe(total);
    };
    calculateTotalGiaVe();
  }, [chosenSeats]);
  useEffect(() => {
    getSeatListByFilm(id)
      .then(res => {
        setFilmSeats({ ...res.data });
        setTimeout(() => setLoading(false), 2000);
      })
      .catch(err => console.error(err));
  }, [id]);
  const addSeat = item => {
    setChosenSeats(prevChosenSeats => {
      const isAlreadyChosen = prevChosenSeats.includes(item);
      return isAlreadyChosen ? prevChosenSeats.filter(seat => seat.maGhe !== item.maGhe || seat.tenGhe !== item.tenGhe) : [...prevChosenSeats, item];
    });
  };
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { confirm, error, success } = Modal;
  const showConfirmLogin = () => {
    confirm({
      title: "You've not logged in",
      content: "Please login!",
      okButtonProps: {
        className: "bg-blue-500",
      },
      onOk() {
        setTimeout(() => navigate("/login"), 100);
      },
    });
  };
  const showNoSeatMessage = () => {
    error({
      title: "You've not chosen seats",
      content: "Please chosen seats!",
      okButtonProps: {
        className: "bg-blue-500",
      },
    });
  };
  const showError = () => {
    error({
      title: "Error",
      content: "Error! Please try again!",
      okButtonProps: {
        className: "bg-blue-500",
      },
    });
  };
  const showSuccess = () => {
    success({
      title: "Successfully",
      content: "You've booked seats successfully!",
      okButtonProps: {
        className: "bg-blue-500",
      },
      onOk() {
        setTimeout(() => navigate("/"), 100);
      },
      onCancel() {
        setTimeout(() => navigate("/"), 100);
      },
    });
  };
  const buyTickets = () => {
    if (info === null) {
      showConfirmLogin();
    } else {
      if (chosenSeats.length === 0) {
        showNoSeatMessage();
      } else {
        postTickets(id, chosenSeats, info)
          .then(() => {
            showSuccess();
          })
          .catch(() => {
            showError();
          });
      }
    }
  };
  if (loading) return <div className='container h-96'>Loading</div>;
  if (!filmSeats) return <div className='container h-96'>No data!</div>;
  return (
    <div className='container'>
      {/* <p className='text-center mt-12'>Please use computer for best view!</p> */}
      <div className='grid grid-cols-1 lg:flex flex-row py-12 gap-6'>
        <div className='basis-2/3'>
          <div className='grid grid-cols-16 gap-3'>
            {filmSeats.danhSachGhe.map((item, index) => (
              <button
                onClick={() => addSeat(item)}
                key={index}
                disabled={item.daDat}
                className={`p-3 ${
                  item.daDat ? "bg-[#767676]" : chosenSeats.includes(item) ? "bg-[#008000]" : item.loaiGhe === "Vip" ? "bg-[#ffa500]" : "bg-[#e9e9e9]"
                } ${!item.daDat && !chosenSeats.includes(item) ? "hover:bg-gray-300" : ""} duration-300 ${
                  item.daDat ? "cursor-not-allowed" : "cursor-pointer"
                } text-center rounded-lg flex justify-center items-center w-auto h-auto lg:w-9 lg:h-9`}
              >
                {!item.daDat ? item.stt : "X"}
              </button>
            ))}
          </div>
          <div className='flex flex-row justify-center items-center gap-12 mt-6'>
            <div className='col-span-1 flex flex-col items-center justify-center'>
              <div className='p-3 bg-[#767676] w-9 h-9 text-center flex justify-center items-center rounded-lg'>X</div>
              <p className='text-center'>Booked</p>
            </div>
            <div className='col-span-1 flex flex-col items-center justify-center'>
              <div className='p-3 bg-[#e9e9e9] w-9 h-9 text-center flex justify-center items-center rounded-lg'></div>
              <p className='text-center'>Normal</p>
            </div>
            <div className='col-span-1 flex flex-col items-center justify-center'>
              <div className='p-3 bg-[#ffa500] w-9 h-9 text-center flex justify-center items-center rounded-lg'></div>
              <p className='text-center'>Vip</p>
            </div>
            <div className='col-span-1 flex flex-col items-center justify-center'>
              <div className='p-3 bg-[#008000] w-9 h-9 text-center flex justify-center items-center rounded-lg'></div>
              <p className='text-center'>Clicked</p>
            </div>
            {/* Add other grid columns here if needed */}
          </div>
        </div>
        <div className='border-0 lg:border-l-2 px-3 space-y-3 basis-1/3'>
          <p className='text-center text-3xl font-bold text-[#8cc34a]'>{totalGiaVe.toLocaleString("vi-VN")} VND</p>
          <div className='flex justify-between items-center'>
            <div>Theater:</div>
            <div>{filmSeats.thongTinPhim.tenCumRap}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div>Address:</div>
            <div className='truncate ml-1'>{filmSeats.thongTinPhim.diaChi}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div>Room name:</div>
            <div>{filmSeats.thongTinPhim.tenRap}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div>Show date and time:</div>
            <div>
              {filmSeats.thongTinPhim.ngayChieu} - {filmSeats.thongTinPhim.gioChieu}
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div>Name:</div>
            <div>{filmSeats.thongTinPhim.tenPhim}</div>
          </div>
          <div className='flex justify-between items-center'>
            <div>Choose:</div>
            <div className='font-normal'>
              {chosenSeats.length > 0 ? (
                chosenSeats.map((item, index) => (
                  <>
                    <span key={index}>Seat {item.tenGhe}</span>
                    {index === chosenSeats.length - 1 ? "" : ", "}
                  </>
                ))
              ) : (
                <p>Not chosen</p>
              )}
            </div>
          </div>
          <div className='w-full flex justify-center items-center'>
            <button className='py-3 mt-3 w-1/2 mx-auto text-white bg-red-500 rounded hover:bg-red-800 duration-300' onClick={buyTickets}>
              Buy tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
