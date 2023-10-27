// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import Header from "../../component/Header/Header";
import ModalVideo from "react-modal-video";
import ListMovie from "./ListMovie/ListMovie";
import Slider from "./Slider/Slider";
import TabMovie from "./TabMovie/TabMovie";
import { useDispatch, useSelector } from "react-redux";
import { CHOOSE_TRAILER } from "../../redux/constant/user";
import { Carousel, Select, Tabs } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { getListMovie } from "../../api/api";
import { BASE_URL, configHeaders } from "../../api/config";
import moment from "moment/moment";

export default function Home() {
  const [viewMore, setViewMore] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/login");
  // }, []);
  const kindOfPosts = ["Showbiz 24h", "Review", "Promotion"];
  const SinglePost = ({ itemData }) => {
    return (
      <>
        {itemData.map((item, index) => (
          <div key={index}>
            <a target='blank' href={item.url}>
              <img src={item.img} alt='' className='rounded-lg cursor-pointer h-72 w-full object-cover' />
            </a>
            <a target='blank' href={item.url}>
              <h1 className='font-bold text-xl mt-2 mb-3 text-black hover:text-[#fb4226] cursor-pointer duration-300 truncate'>{item.title}</h1>
            </a>
            <p className='text-justify line-clamp-3'>{item.text}</p>
          </div>
        ))}
      </>
    );
  };
  const SinglePostNoText = ({ itemData }) => {
    return (
      <div className='p-0 m-0 grid gap-7'>
        {itemData.map((item, index) => (
          <div key={index} className='flex flex-row justify-start md:justify-between gap-3'>
            <a target='blank' href={item.url} className='basis-auto'>
              <img src={item.img} alt='' className='rounded-lg cursor-pointer h-20 w-20 object-cover' />
            </a>
            <p target='blank' href={item.url} className='basis-4/5 text-gray-700 text-justify'>
              {item.title}
            </p>
          </div>
          // <div key={index}>
          //   {/* <Card
          //     style={{
          //       border: 0,
          //       margin: 0,
          //       padding: 0,
          //     }}
          //   >
          //     <Meta
          //       avatar={<img src={item.img} alt='' className='rounded-lg cursor-pointer h-16 w-16 object-cover' />}
          //       description='This is the description'
          //       style={{
          //         margin: 0,
          //         padding: 0,
          //       }}
          //     />
          //   </Card> */}
          // </div>
        ))}
      </div>
    );
  };
  const handlePosts = arrData => {
    return (
      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <SinglePost itemData={arrData.slice(0, 2)} />
        </div>
        {viewMore && (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <SinglePost itemData={arrData.slice(2, 4)} />
            <div className='grid grid-cols-1'>
              <SinglePostNoText itemData={arrData.slice(4, 8)} />
            </div>
          </div>
        )}
        <div className='flex justify-center'>
          <button
            className='px-6 py-2 text-white w-36 bg-[#fb4226] hover:bg-red-800 duration-300 rounded-lg'
            onClick={() => setViewMore(!viewMore)}
            type='button'
          >
            {viewMore ? "Collapse" : "View more"}
          </button>
        </div>
      </div>
    );
  };
  const renderPosts = index => {
    if (index === 0) {
      return handlePosts(dienAnhPosts);
    } else if (index === 1) {
      return handlePosts(reviewPosts);
    } else {
      return handlePosts(khuyenMaiPosts);
    }
  };
  const [dienAnhPosts, setDienAnhPosts] = useState([]);
  const [reviewPosts, setReviewPosts] = useState([]);
  const [khuyenMaiPosts, setKhuyenMaiPosts] = useState([]);
  useEffect(() => {
    axios
      .get("https://60b9f19280400f00177b744b.mockapi.io/ArticlesDienAnh02")
      .then(res => setDienAnhPosts(res.data))
      .catch(err => console.error(err));
    axios
      .get("https://60babc8f42e1d0001761ff84.mockapi.io/ArticlesReview02")
      .then(res => setReviewPosts(res.data))
      .catch(err => console.error(err));
    axios
      .get("https://60babc8f42e1d0001761ff84.mockapi.io/ArticlesKhuyenMai02")
      .then(res => setKhuyenMaiPosts(res.data))
      .catch(err => console.error(err));
  }, []);
  const { chosenTrailer } = useSelector(state => {
    return state.userReducer;
  });
  const dispatch = useDispatch();
  const [movieArr, setMovieArr] = useState([]);
  const [movieArrFilter, setMovieArrFilter] = useState([]);
  useEffect(() => {
    getListMovie()
      .then(res => {
        setMovieArr([...res.data]);
        const arrData = [...res.data];
        const arrFilter = [];
        arrData.map(item => {
          arrFilter.push({
            value: item.maPhim,
            label: item.tenPhim,
          });
        });
        setMovieArrFilter([...arrFilter]);
      })
      .catch(err => console.error(err));
  }, []);

  const [searchFilm, setSearchFilm] = useState(null);
  const [chosenCinemaArr, setChosenCinemaArr] = useState([]);

  // chọn rạp
  const [searchCinema, setSearchCinema] = useState(null);

  // danh sách suất
  const [searchTime, setSearchTime] = useState(null);

  // chọn suất
  const [chosenTime, setChosenTime] = useState(null);

  const [totalSearchFilm, setTotalSearchFilm] = useState([]);

  useEffect(() => {
    if (searchFilm) {
      axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${searchFilm}`,
        method: "GET",
        headers: configHeaders(),
      })
        .then(res => {
          setTotalSearchFilm(res.data);
          const arrData = [...res.data.heThongRapChieu];
          const arrFilter = [];
          const cumRapList = arrData
            .map(heThongRap =>
              heThongRap.cumRapChieu.map(cumRap => ({
                maCumRap: cumRap.maCumRap,
                tenCumRap: cumRap.tenCumRap,
              })),
            )
            .flat();
          cumRapList.map(item => {
            arrFilter.push({
              value: item.maCumRap,
              label: item.tenCumRap,
            });
          });
          setChosenCinemaArr([...arrFilter]);
        })
        .catch(err => console.error(err));
    }
  }, [searchFilm]);
  useEffect(() => {
    if (searchCinema && searchFilm) {
      const filteredData = totalSearchFilm.heThongRapChieu
        .map(heThongRap => heThongRap.cumRapChieu.filter(cumRap => cumRap.maCumRap === searchCinema))
        .flat();
      const arr = [];
      filteredData.map(item => {
        item.lichChieuPhim.map(itemChild =>
          arr.push({
            value: itemChild.maLichChieu,
            label: moment(itemChild.ngayChieuGioChieu).format("DD-MM-YYYY ~ HH:mm"),
          }),
        );
      });
      setSearchTime([...arr]);
    }
  }, [searchCinema, searchFilm, totalSearchFilm]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <ModalVideo
        channel='youtube'
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={chosenTrailer !== ""}
        videoId={chosenTrailer}
        onClose={() => {
          const action = {
            type: CHOOSE_TRAILER,
            payload: "",
          };
          dispatch(action);
        }}
      />
      <div className='space-y-10'>
        <Slider />
        <div id='showtimes' className='container grid grid-cols-1 lg:grid-cols-4 gap-3'>
          <Select
            disabled={movieArrFilter.length === 0}
            showSearch
            className='w-full'
            placeholder='Choose film'
            optionFilterProp='children'
            filterOption={(input, option) => (option?.label ?? "").includes(input)}
            filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
            options={movieArrFilter}
            onChange={value => {
              setSearchFilm(value);
              setSearchCinema(null);
              setSearchTime(null);
              setChosenTime(null);
            }}
          />
          <Select
            disabled={!searchFilm}
            value={searchCinema}
            showSearch
            className='w-full'
            placeholder='Choose cinema'
            optionFilterProp='children'
            filterOption={(input, option) => (option?.label ?? "").includes(input)}
            filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
            options={chosenCinemaArr}
            onChange={e => {
              setSearchCinema(e);
              setChosenTime(null);
            }}
          />
          <Select
            disabled={!searchCinema}
            value={chosenTime}
            showSearch
            className='w-full'
            placeholder='Choose time'
            optionFilterProp='children'
            filterOption={(input, option) => (option?.label ?? "").includes(input)}
            filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
            options={searchTime}
            onChange={e => setChosenTime(e)}
          />
          <button
            disabled={!chosenTime}
            className={`w-full mx-auto text-white bg-red-500 ${chosenTime ? "opacity-100" : "opacity-50"} rounded ${
              chosenTime && "hover:bg-red-800"
            } duration-300 ${chosenTime ? "cursor-pointer" : "cursor-not-allowed"}`}
            onClick={() => navigate(`/purchase/${chosenTime}`)}
          >
            Book tickets
          </button>
        </div>
        <ListMovie movieArr={movieArr}></ListMovie>
        <div id='cinemas'>
          <TabMovie />
        </div>
        <div className='container' id='news'>
          <Tabs
            defaultActiveKey='1'
            centered
            items={kindOfPosts.map((item, index) => {
              const id = String(index + 1);
              return {
                label: item,
                key: id,
                children: renderPosts(index),
              };
            })}
          />
        </div>
        <div id='app' className='flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative'>
          <div className='flex flex-1 justify-center items-center text-white container'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 py-12'>
              <div className='flex justify-center items-center text-center md:text-justify'>
                <div className='space-y-12'>
                  <h1 className='font-bold text-3xl'>Ứng dụng tiện lợi dành cho dân yêu điện ảnh</h1>
                  <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                  <div>
                    <a
                      href='https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197'
                      target='blank'
                      className='uppercase bg-[#fb4226] py-5 px-7 rounded-lg hover:bg-red-800 duration-300'
                    >
                      APP MIỄN PHÍ – TẢI VỀ NGAY!
                    </a>
                  </div>
                  <p>
                    TIX có hai phiên bản{" "}
                    <a
                      target='blank'
                      href='https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197'
                      className='underline cursor-pointer'
                    >
                      IOS
                    </a>{" "}
                    &{" "}
                    <a target='blank' href='https://play.google.com/store/apps/details?id=com.movie.booking' className='underline cursor-pointer'>
                      Android
                    </a>
                  </p>
                </div>
              </div>
              <div className='relative'>
                <img
                  alt=''
                  src='https://media.discordapp.net/attachments/1026660684739653674/1164198632325660732/phoneFrame2.png'
                  className='mx-auto w-48 z-50'
                />
                <div className='absolute top-1/2 text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <Carousel effect='fade' autoplay dots={false} className='w-[180px] mx-auto'>
                    {Array.from({ length: 15 }, (_, i) => i + 1).map(index => (
                      <img
                        key={index}
                        className='w-[180px] mx-auto rounded-2xl'
                        src={`https://movie-booking-project.vercel.app/img/mobile/slide${index + 1}.jpg`}
                        alt=''
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
