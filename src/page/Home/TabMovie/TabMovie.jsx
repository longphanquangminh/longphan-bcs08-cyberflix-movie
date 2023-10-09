import { useEffect, useState } from "react";
import { getMovieByTheater } from "../../../api/api";
import { Tabs } from "antd";
import moment from "moment/moment";

const onChange = key => {
  console.log(key);
};

export default function TabMovie() {
  const [danhSachHeThongRap, setDanhSachHeThongRap] = useState([]);
  useEffect(() => {
    getMovieByTheater()
      .then(res => {
        console.log(res);
        setDanhSachHeThongRap(res.data.content);
      })
      .catch(err => console.log(err));
  }, []);
  let renderDsPhim = dsPhim => {
    return dsPhim.map((phim, index) => {
      return (
        <div key={index} className='flex space-x-5 p-3 items-center'>
          <img alt='' src={phim.hinhAnh} className='w-20 h-32 object-cover' />
          <div>
            <p className='font-bold'>{phim.tenPhim}</p>
            <div className='grid grid-cols-2 gap-3'>
              {phim.lstLichChieuTheoPhim.slice(0, 8).map((lichChieu, index) => (
                <span className='bg-red-500 text-white rounded shadow px-5 py-2' key={index}>
                  {moment(lichChieu.ngayChieuGioChieu).format("DD-MM-YYYY ~ HH:mm")}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    });
  };
  let handleHeThongRap = () => {
    return danhSachHeThongRap.map((heThongRap, index) => {
      return {
        key: index,
        label: <img className='w-16 h-16' src={heThongRap.logo} alt='' />,
        children: (
          <Tabs
            style={{ height: 500 }}
            tabPosition='left'
            defaultActiveKey='1'
            items={heThongRap.lstCumRap.map(cumRap => {
              return {
                key: cumRap.tenCumRap,
                label: (
                  <div className='text-left w-96 whitespace-normal'>
                    <p className='text-green-800 font-medium'>{cumRap.tenCumRap}</p>
                    <p className='hover:text-green-800'>{cumRap.diaChi}</p>
                  </div>
                ),
                children: <div style={{ height: 500, overflowY: "scroll" }}>{renderDsPhim(cumRap.danhSachPhim)}</div>,
              };
            })}
            onChange={onChange}
          />
        ),
      };
    });
  };

  return (
    <div className='container p-3 rounded border-2 border-l-black'>
      <Tabs style={{ height: 500 }} tabPosition='left' defaultActiveKey='1' items={handleHeThongRap()} onChange={onChange} />
    </div>
  );
}

// tab antd
// heThongRap, cumRap, phim, gioChieu
