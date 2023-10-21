import { Card } from "antd";
import { NavLink } from "react-router-dom";
import C18 from "../../../component/C18";
import { useDispatch } from "react-redux";
import { chooseTrailer } from "../../../redux/action/user";
import PlayVideo from "../../../component/PlayVideo";
import { defaultTrailer, placeholderImage } from "../../../constants/defaultValues";
import { trailerUrlRegex, imageUrlRegex } from "../../../constants/regex";

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
  return (
    <div className='container'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        {movieArr.slice(0, 8).map((item, index) => (
          <div key={index} className='relative group'>
            <Card
              hoverable
              cover={
                <>
                  <img
                    className='h-48 object-cover group-hover:brightness-50 duration-300 group2'
                    onClick={() => handleChooseTrailer(trailerUrlRegex.test(item.trailer) ? item.trailer : defaultTrailer)}
                    alt='example'
                    src={imageUrlRegex.test(item.hinhAnh) ? item.hinhAnh : placeholderImage}
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
              <NavLink className='text-white' to={`/detail/${item.maPhim}`}>
                <button className='py-3 mt-3 w-full mx-auto text-white bg-red-500 rounded hover:bg-red-800 duration-300'>Book tickets</button>
              </NavLink>
            </Card>
            <PlayVideo isCard trailer={item.trailer ?? defaultTrailer} />
          </div>
        ))}
      </div>
    </div>
  );
}
