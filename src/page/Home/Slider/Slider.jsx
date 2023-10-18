import { Carousel, ConfigProvider, message } from "antd";
import { useEffect, useState } from "react";
import { getDataSlider } from "../../../api/api";
import PlayVideo from "../../../component/PlayVideo";
// const contentStyle = {
//   margin: 0,
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };
export default function Slider() {
  const onChange = currentSlide => {
    console.log(currentSlide);
  };
  const [banners, setBanners] = useState([]);
  let fetchData = async () => {
    try {
      let response = await getDataSlider();
      //   console.log("😀 - fetchData - response:", response.data.content);
      setBanners(response.data.content);
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };

  useEffect(() => {
    // getDataSlider()
    //   .then(res => {
    //     console.log(res);
    //     setBanners(res.data.content);
    //   })
    //   .catch(err => console.log(err));

    fetchData();
  }, []);
  // try catch
  const trailer = [
    "https://www.youtube.com/watch?v=uqJ9u7GSaYM",
    "https://www.youtube.com/watch?v=kBY2k3G6LsM",
    "https://www.youtube.com/watch?v=tlBvBQCZKL8",
  ];
  return (
    <>
      <div className='z-50'>
        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                dotHeight: 10,
                dotWidth: 60,
                dotActiveWidth: 60,
              },
              /* here is your component tokens */
            },
          }}
        >
          <Carousel effect='fade' afterChange={onChange} className='group'>
            {banners.map((item, index) => (
              <div key={index}>
                <img className='h-[calc(100vh-60px)] w-full object-cover' src={item.hinhAnh} alt='' />
                <PlayVideo trailer={trailer[index]} />
              </div>
            ))}
          </Carousel>
        </ConfigProvider>
      </div>
    </>
  );
}

// redux thunk - api
