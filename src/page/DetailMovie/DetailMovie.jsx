import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailMovie } from "../../api/api";
import { Progress } from "antd";

export default function DetailMovie() {
  // useParams => lấy id từ url
  const [detail, setDetail] = useState({});
  let params = useParams();
  console.log("😀 - DetailMovie - params:", params);
  useEffect(() => {
    getDetailMovie(params.id)
      .then(res => {
        console.log(res);
        setDetail(res.data.content);
      })
      .catch(err => console.log(err));
  }, [params.id]);
  return (
    <div className='flex justify-between items-center'>
      <img className='w-1/3 aspect-square' alt='' src={detail.hinhAnh} />
      <Progress
        size={400}
        strokeColor={"red"}
        strokeWidth={20}
        format={percent => <span className='text-red-600 font-medium block'>{percent / 10} / 10</span>}
        type='circle'
        percent={detail.danhGia * 10}
      />
    </div>
  );
}
