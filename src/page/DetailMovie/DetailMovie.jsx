import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailMovie } from "../../api/api";
import { Progress } from "antd";
import { placeholderImage } from "../../constants/defaultValues";
import { imageUrlRegex } from "../../constants/regex";
import moment from "moment/moment";

export default function DetailMovie() {
  // useParams => lấy id từ url
  const [detail, setDetail] = useState({});
  const onImageError = e => {
    e.target.src = placeholderImage;
  };
  let params = useParams();
  useEffect(() => {
    getDetailMovie(params.id)
      .then(res => {
        setDetail(res.data);
      })
      .catch(err => console.error(err));
  }, [params.id]);
  return (
    <div className='bg-[#0a2029]'>
      <div className='flex justify-center items-center container'>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12 my-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12'>
            <div>
              <img
                className='mx-auto w-full'
                alt=''
                src={imageUrlRegex.test(detail.hinhAnh) ? detail.hinhAnh : placeholderImage}
                onError={onImageError}
              />
            </div>
            <div className='text-white space-y-3 text-center md:text-left'>
              <p>{moment(detail.ngayKhoiChieu).format("DD-MM-YYYY")}</p>
              <p className='font-bold text-xl'>{detail.tenPhim}</p>
              <p>120 minutes</p>
              <div className='w-full md:w-1/2'>
                <button className='py-3 mt-3 w-1/2 md:w-full mx-auto text-white bg-red-500 rounded hover:bg-red-800 duration-300' onClick={() => {}}>
                  Mua vé
                </button>
              </div>
            </div>
          </div>
          <Progress
            size={150}
            strokeColor={"green"}
            strokeWidth={10}
            trailColor={"white"}
            format={percent => <span className='text-green-500 font-medium block'>{percent / 10} / 10</span>}
            type='circle'
            percent={detail.danhGia * 10}
            className='mx-auto'
          />
        </div>
      </div>
    </div>
  );
}
