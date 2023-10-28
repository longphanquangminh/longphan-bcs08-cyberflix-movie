import Carousel from "react-multi-carousel";
import { message } from "antd";
import { useEffect, useState } from "react";
import { getDataSlider } from "../../../api/api";
import PlayVideo from "../../../component/PlayVideo";
import "react-multi-carousel/lib/styles.css";
export default function Slider() {
  const [banners, setBanners] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getDataSlider();
      setBanners(response.data.content);
    } catch {
      message.error("Error!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const trailer = [
    "https://www.youtube.com/watch?v=uqJ9u7GSaYM",
    "https://www.youtube.com/watch?v=kBY2k3G6LsM",
    "https://www.youtube.com/watch?v=tlBvBQCZKL8",
  ];
  return (
    <>
      <div className='z-50'>
        <Carousel
          className='group'
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={2000}
          centerMode={false}
          dotListClass=''
          draggable
          focusOnSelect={false}
          infinite
          itemClass=''
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 1,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=''
          slidesToSlide={1}
          swipeable
        >
          {banners.map((item, index) => (
            <div key={index}>
              {/* <img className='h-[calc(100vh-60px)] w-full object-cover' src={item.hinhAnh} alt='' /> */}
              <img className='h-screen w-full object-cover' src={item.hinhAnh} alt='' />
              <PlayVideo trailer={trailer[index]} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

// redux thunk - api
