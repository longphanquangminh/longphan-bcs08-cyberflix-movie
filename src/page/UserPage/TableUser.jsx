import { useEffect, useState } from "react";
import { userServ } from "../../api/api";
import { Button, Space, Table, Tag, message } from "antd";

export default function TableUser() {
  const [listUser, setListUser] = useState([]);
  const fetchListUser = () => {
    userServ
      .getList()
      .then(res => {
        setListUser(res.data);
      })
      .catch(err => {
        message.error(err.response.data.content);
      });
  };
  useEffect(() => {
    fetchListUser();
  }, []);
  const deleteUser = taiKhoan => {
    userServ
      .deleteUser(taiKhoan)
      .then(() => {
        message.success("Xóa thành công!");
        fetchListUser();
      })
      .catch(err => {
        message.error(err.response.data.content);
      });
  };
  const columnsHeader = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (item, record) => {
        console.log(record);
        return <>{listUser.indexOf(record) + 1}</>;
      },
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: email => <a>{email}</a>,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Mã loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: tag => (
        <>
          {
            <Tag color={tag === "QuanTri" ? "volcano" : "geekblue"} key={tag}>
              {tag === "QuanTri" ? "QUẢN TRỊ VIP" : "KHÁCH HÀNG VIP"}
            </Tag>
          }
        </>
      ),
    },
    {
      title: "Số ĐT",
      key: "soDT",
      dataIndex: "soDT",
    },
    {
      title: "Hành động",
      key: "action",
      render: item => (
        <Space size='middle'>
          <Button>Edit</Button>
          {/* {item.maLoaiNguoiDung === "KhachHang" && <Button onClick={() => deleteUser(item.taiKhoan)}>Delete</Button>} */}
          {<Button onClick={() => deleteUser(item.taiKhoan)}>Delete</Button>}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={listUser} columns={columnsHeader} />
    </div>
  );
}
