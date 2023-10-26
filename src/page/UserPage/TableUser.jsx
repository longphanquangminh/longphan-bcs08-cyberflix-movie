import "./TableUser.css";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { userServ } from "../../api/api";
import { Button, Input, Popconfirm, Space, Table, Tag, message } from "antd";
// import { Button, Modal, Popconfirm, Space, Table, Tag, message } from "antd";

export default function TableUser(props) {
  const { listUser, fetchListUser } = props;
  // const { confirm } = Modal;
  // const showConfirmDelete = taiKhoan => {
  //   confirm({
  //     title: `Delete account ${taiKhoan}`,
  //     content: `Do you want to delete account ${taiKhoan}?`,
  //     okButtonProps: {
  //       className: "bg-blue-500",
  //     },
  //     onOk() {
  //       deleteUser(taiKhoan);
  //     },
  //   });
  // };
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
  const handleDelete = taiKhoan => deleteUser(taiKhoan);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={e => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            className='bg-blue-500'
            size='small'
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
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
      ...getColumnSearchProps("taiKhoan"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      render: email => <a>{email}</a>,
    },
    {
      title: "Full name",
      dataIndex: "hoTen",
      key: "hoTen",
      ...getColumnSearchProps("hoTen"),
    },
    {
      title: "Account type",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      filters: [
        {
          text: "Admin",
          value: "QuanTri",
        },
        {
          text: "Customer",
          value: "KhachHang",
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
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
      ...getColumnSearchProps("soDt"),
    },
    {
      title: "Action",
      key: "action",
      render: item => (
        <Space size='middle'>
          <Button>Edit</Button>
          {/* {item.maLoaiNguoiDung === "KhachHang" && <Button onClick={() => deleteUser(item.taiKhoan)}>Delete</Button>} */}
          {/* {<Button onClick={() => showConfirmDelete(item.taiKhoan)}>Delete</Button>} */}
          <Popconfirm
            title={`Sure to delete account ${item.taiKhoan}?`}
            okButtonProps={{
              className: "bg-blue-500",
            }}
            onConfirm={() => handleDelete(item.taiKhoan)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        scroll={{
          y: 390,
          x: 1200,
        }}
        dataSource={listUser}
        columns={columnsHeader}
      />
    </div>
  );
}
