const a = {
  heThongRapChieu: [
    {
      cumRapChieu: [
        {
          lichChieuPhim: [
            {
              maLichChieu: "45757",
              maRap: "451",
              tenRap: "Rạp 1",
              ngayChieuGioChieu: "2022-05-15T18:30:00",
              giaVe: 75000,
              thoiLuong: 120,
            },
          ],
          maCumRap: "bhd-star-cineplex-3-2",
          tenCumRap: "BHD Star Cineplex - 3/2",
          hinhAnh: null,
        },
        {
          lichChieuPhim: [
            {
              maLichChieu: "46347",
              maRap: "461",
              tenRap: "Rạp 1",
              ngayChieuGioChieu: "2023-01-11T18:12:00",
              giaVe: 100000,
              thoiLuong: 120,
            },
          ],
          maCumRap: "bhd-star-cineplex-bitexco",
          tenCumRap: "BHD Star Cineplex - Bitexco",
          hinhAnh: null,
        },
      ],
      maHeThongRap: "BHDStar",
      tenHeThongRap: "BHD Star Cineplex",
      logo: "http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png",
    },
    {
      cumRapChieu: [
        {
          lichChieuPhim: [
            {
              maLichChieu: "45788",
              maRap: "734",
              tenRap: "Rạp 4",
              ngayChieuGioChieu: "2022-05-21T07:41:00",
              giaVe: 120000,
              thoiLuong: 120,
            },
          ],
          maCumRap: "cns-quoc-thanh",
          tenCumRap: "CNS - Quốc Thanh",
          hinhAnh: null,
        },
      ],
      maHeThongRap: "CineStar",
      tenHeThongRap: "CineStar",
      logo: "http://movie0706.cybersoft.edu.vn/hinhanh/cinestar.png",
    },
    {
      cumRapChieu: [
        {
          lichChieuPhim: [
            {
              maLichChieu: "46228",
              maRap: "762",
              tenRap: "Rạp 2",
              ngayChieuGioChieu: "2022-10-28T16:02:00",
              giaVe: 75000,
              thoiLuong: 120,
            },
          ],
          maCumRap: "glx-nguyen-du\r\n",
          tenCumRap: "GLX - Nguyễn Du",
          hinhAnh: null,
        },
      ],
      maHeThongRap: "Galaxy",
      tenHeThongRap: "Galaxy Cinema",
      logo: "http://movie0706.cybersoft.edu.vn/hinhanh/galaxy-cinema.png",
    },
  ],
  maPhim: 10532,
  tenPhim: "Tăng tốc phía em",
  biDanh: "tang-toc-phia-em",
  trailer: "https://www.youtube.com/watch?v=h261_whvLPM",
  hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/tang-toc-phia-em_gp09.jpg",
  moTa: "Kao (Nat Kitcharit) là một nhà vô địch thế giới môn xếp ly tốc độ (Speed Stack). Tuy thành công và nổi tiếng nhưng Kao lại chỉ như một đứa trẻ to xác suốt ngày chỉ ăn, ngủ và tập luyện. Mọi vấn đề xung quanh anh đều một tay Jay (Yaya) bạn gái anh quán xuyến. Đến một ngày khi Jay quyết định chia tay thì Kao như bị mất tất cả. Anh phải bắt đầu học những kỹ năng sống cơ bản để có thể tự sống một mình và chăm sóc bản thân. Song song đó những đối thủ mới cũng xuất hiện và đe dọa đến vị trí quán quân của Kao.",
  maNhom: "GP09",
  ngayKhoiChieu: "2022-05-11T00:00:00",
  danhGia: 10,
};

a.heThongRapChieu.map(item => {
  console.log(item.tenHeThongRap);
});
