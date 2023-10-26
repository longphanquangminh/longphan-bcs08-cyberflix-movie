import { userServ } from "../../api/api";
import { Button, Modal, Space, Table, Tag, message } from "antd";

export default function TableUser(props) {
  const { listUser, fetchListUser } = props;
  const { confirm } = Modal;
  const showConfirmDelete = taiKhoan => {
    confirm({
      title: `Delete account ${taiKhoan}`,
      content: `Do you want to delete account ${taiKhoan}`,
      okButtonProps: {
        className: "bg-blue-500",
      },
      onOk() {
        deleteUser(taiKhoan);
      },
    });
  };
  const deleteUser = taiKhoan => {
    userServ
      .deleteUser(taiKhoan)
      .then(() => {
        message.success("Xóa thành công!");
        fetchListUser();
      })
      .catch(err => {
        message.error(err.response.data);
      });
  };
  const columnsHeader = [
    {
      title: "No.",
      dataIndex: "stt",
      key: "stt",
      render: (_, record) => {
        return <>{listUser.indexOf(record) + 1}</>;
      },
    },
    {
      title: "Username",
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
      title: "Full name",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Account type",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: tag => (
        <>
          {
            <Tag color={tag === "QuanTri" ? "volcano" : "geekblue"} key={tag}>
              {tag === "QuanTri" ? "Admin" : "Customer"}
            </Tag>
          }
        </>
      ),
    },
    {
      title: "Phone",
      key: "soDt",
      dataIndex: "soDt",
    },
    {
      title: "Action",
      key: "action",
      render: item => (
        <Space size='middle'>
          <Button>Edit</Button>
          {/* {item.maLoaiNguoiDung === "KhachHang" && <Button onClick={() => deleteUser(item.taiKhoan)}>Delete</Button>} */}
          {<Button onClick={() => showConfirmDelete(item.taiKhoan)}>Delete</Button>}
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
