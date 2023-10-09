import { useEffect, useState } from "react";
import { getListMovie } from "../../../api/api";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { NavLink } from "react-router-dom";

export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);
  useEffect(() => {
    getListMovie()
      .then(res => {
        console.log(res);
        setMovieArr(res.data.content);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container gap-10'>
      {movieArr.slice(0, 12).map((item, index) => (
        <Card
          key={index}
          hoverable
          //   style={{
          //     width: 240,
          //   }}
          cover={<img className='h-48 object-cover' alt='example' src={item.hinhAnh} />}
        >
          <Meta title='Europe Street beat' description='www.instagram.com' />
          <button className='px-20 py-5 text-white bg-red-500 rounded'>
            <NavLink className='text-white' to={`/movie/${item.maPhim}`}>
              Mua vé
            </NavLink>
          </button>
        </Card>
      ))}
    </div>
  );
}
