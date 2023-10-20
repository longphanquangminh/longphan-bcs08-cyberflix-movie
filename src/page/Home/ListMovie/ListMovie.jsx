import { Card, Tabs } from "antd";
import { NavLink } from "react-router-dom";
import C18 from "../../../component/C18";
import { useDispatch } from "react-redux";
import { chooseTrailer } from "../../../redux/action/user";
import PlayVideo from "../../../component/PlayVideo";
import { placeholderImage } from "../../../constants/defaultValues";

export default function ListMovie({ movieArr }) {
  const onImageError = e => {
    e.target.src = placeholderImage;
  };
  const dispatch = useDispatch();
  const handleChooseTrailer = trailer => {
    const url = new URL(trailer);
    const videoId = url.searchParams.get("v");
    dispatch(chooseTrailer(videoId));
  };
  const kindOfFilms = ["Đang chiếu", "Sắp chiếu"];
  const renderFilms = index => {
    if (index === 0)
      return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
          {movieArr.slice(0, 16).map((item, index) => (
            <div key={index} className='relative group'>
              <Card
                hoverable
                //   style={{
                //     width: 240,
                //   }}
                cover={
                  <>
                    <img
                      className='h-48 object-cover group-hover:brightness-50 duration-300 group2'
                      onClick={() => handleChooseTrailer(item.trailer ?? "https://www.youtube.com/watch?v=kvAfmYNtugQ")}
                      alt='example'
                      src={item.hinhAnh ? item.hinhAnh : placeholderImage}
                      onError={onImageError}
                    />
                  </>
                }
              >
                <div className='space-y-3'>
                  <p className='w-full flex justify-start items-center'>
                    <C18 />
                    <span className='ml-2 font-semibold text-xl truncate'>{item.tenPhim}</span>
                  </p>
                  <p className='line-clamp-2 text-justify h-12'>{item.moTa}</p>
                </div>
                <NavLink className='text-white' to={`/movie/${item.maPhim}`}>
                  <button className='py-3 mt-3 w-full mx-auto text-white bg-red-500 rounded hover:bg-red-800 duration-300'>Book tickets</button>
                </NavLink>
              </Card>
              <PlayVideo isCard trailer={item.trailer ?? "https://www.youtube.com/watch?v=kvAfmYNtugQ"} />
            </div>
          ))}
        </div>
      );
    if (index === 1)
      return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
          {movieArr.slice(0, 16).map((item, index) => (
            <div key={index} className='relative group'>
              <Card
                hoverable
                //   style={{
                //     width: 240,
                //   }}
                cover={
                  <>
                    <img
                      className='h-48 object-cover group-hover:brightness-50 duration-300 group2'
                      onClick={() => handleChooseTrailer(item.trailer ?? "https://www.youtube.com/watch?v=kvAfmYNtugQ")}
                      alt='example'
                      src={item.hinhAnh ? item.hinhAnh : placeholderImage}
                      onError={onImageError}
                    />
                  </>
                }
              >
                <div className='space-y-3'>
                  <p className='w-full flex justify-start items-center'>
                    <C18 />
                    <span className='ml-2 font-semibold text-xl truncate'>{item.tenPhim}</span>
                  </p>
                  <p className='line-clamp-2 text-justify'>{item.moTa}</p>
                </div>
                <NavLink className='text-white' to={`/movie/${item.maPhim}`}>
                  <button className='py-3 mt-3 w-full mx-auto text-white bg-red-500 rounded hover:bg-red-800 duration-300'>Book tickets</button>
                </NavLink>
              </Card>
              <PlayVideo isCard trailer={item.trailer ?? "https://www.youtube.com/watch?v=kvAfmYNtugQ"} />
            </div>
          ))}
        </div>
      );
  };
  return (
    <div className='container'>
      <Tabs
        defaultActiveKey='1'
        centered
        items={kindOfFilms.map((item, index) => {
          const id = String(index + 1);
          return {
            label: item,
            key: id,
            children: renderFilms(index),
          };
        })}
      />
    </div>
  );
}
