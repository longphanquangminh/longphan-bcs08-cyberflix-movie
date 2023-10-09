import { Carousel, ConfigProvider, message } from "antd";
import { useEffect, useState } from "react";
import { getDataSlider } from "../../../api/api";
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
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            dotHeight: 10,
            dotWidth: 60,
            dotActiveWidth: 100,
          },
          /* here is your component tokens */
        },
      }}
    >
      <Carousel effect='fade' afterChange={onChange}>
        {banners.map((item, index) => (
          <img className='h-40 sm:h-64 lg:h-96 xl:h-200 w-full object-cover' key={index} src={item.hinhAnh} alt='' />
        ))}
      </Carousel>
    </ConfigProvider>
  );
}

// redux thunk - api
