// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Header from "../../component/Header/Header";
import ModalVideo from "react-modal-video";
import ListMovie from "./ListMovie/ListMovie";
import Slider from "./Slider/Slider";
import TabMovie from "./TabMovie/TabMovie";
import { useDispatch, useSelector } from "react-redux";
import { CHOOSE_TRAILER } from "../../redux/constant/user";
import { Carousel, Tabs } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  // let navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/login");
  // }, []);
  const kindOfPosts = ["Điện ảnh 24h", "Review", "Khuyến mãi"];
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
  const handlePosts = arrData => {
    return (
      <div className='space-y-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <SinglePost itemData={arrData.slice(0, 2)} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          <SinglePost itemData={arrData.slice(2, 4)} />
          <div className='grid grid-cols-1'>
            <SinglePost itemData={arrData.slice(4, 8)} />
          </div>
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
  let { chosenTrailer } = useSelector(state => {
    return state.userReducer;
  });
  const dispatch = useDispatch();
  return (
    <>
      <ModalVideo
        channel='youtube'
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={chosenTrailer !== ""}
        videoId={chosenTrailer}
        onClose={() => {
          let action = {
            type: CHOOSE_TRAILER,
            payload: "",
          };
          dispatch(action);
        }}
      />
      <div className='space-y-10'>
        <Slider />
        <ListMovie></ListMovie>
        <TabMovie />
        <div className='container'>
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
        <div className='flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative'>
          <div className='flex flex-1 justify-center items-center text-white container'>
            <div className='grid grid-cols-1 md:grid-cols-2 p-3 gap-12'>
              <div className='flex justify-center items-center text-center md:text-justify'>
                <div className='space-y-12'>
                  <h1 className='font-bold text-3xl'>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h1>
                  <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                  <div>
                    <a
                      href='https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197'
                      target='blank'
                      className='uppercase bg-red-600 py-5 px-7 rounded-lg hover:bg-red-800 duration-300'
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
                <div className='absolute top-1/2 text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer'>
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
