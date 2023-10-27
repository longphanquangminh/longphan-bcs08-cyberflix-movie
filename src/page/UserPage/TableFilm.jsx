import "./TableUser.css";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { userServ } from "../../api/api";
import { Button, Input, Popconfirm, Space, Table, message, ConfigProvider, Form } from "antd";
import { ModalForm, ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { BASE_URL, MA_NHOM, https } from "../../api/config";
import { defaultTrailer, placeholderImage } from "../../constants/defaultValues";
import { imageUrlRegex, trailerUrlRegex } from "../../constants/regex";
import moment from "moment";
import PlayVideo from "../../component/PlayVideo";
import { useDispatch, useSelector } from "react-redux";
import { chooseTrailer } from "../../redux/action/user";
import ModalVideo from "react-modal-video";
import { CHOOSE_TRAILER } from "../../redux/constant/user";

const waitTime = (time = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function TableFilm(props) {
  const onImageError = e => {
    e.target.src = placeholderImage;
  };
  const dispatch = useDispatch();
  const handleChooseTrailer = trailer => {
    const url = new URL(trailer);
    const videoId = url.searchParams.get("v");
    dispatch(chooseTrailer(videoId));
  };
  const [form] = Form.useForm();
  const { listUser, fetchListUser } = props;
  const deleteUser = taiKhoan => {
    userServ
      .deleteUser(taiKhoan)
      .then(() => {
        message.success("Xóa thành công!");
        fetchListUser();
      })
      .catch(err => {
        message.error(err.response.data ?? err.message);
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
  const { chosenTrailer } = useSelector(state => {
    return state.userReducer;
  });
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
    // {
    //   title: "No.",
    //   dataIndex: "stt",
    //   key: "stt",
    //   render: (_, record) => {
    //     return <>{listUser.indexOf(record) + 1}</>;
    //   },
    // },
    {
      title: "Film code",
      dataIndex: "maPhim",
      key: "maPhim",
      ...getColumnSearchProps("maPhim"),
    },
    {
      title: "Film name",
      dataIndex: "tenPhim",
      key: "tenPhim",
      ...getColumnSearchProps("tenPhim"),
      render: text => <p className='truncate'>{text}</p>,
    },
    {
      title: "Film alias",
      dataIndex: "biDanh",
      key: "biDanh",
      ...getColumnSearchProps("biDanh"),
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      ...getColumnSearchProps("trailer"),
      render: text => (
        <>
          <div className='relative group'>
            <div className='bg-black h-20 w-20 mx-auto rounded-lg'></div>
            <PlayVideo trailer={text ?? defaultTrailer} onClick={() => handleChooseTrailer(trailerUrlRegex.test(text) ? text : defaultTrailer)} />
          </div>
        </>
      ),
    },
    {
      title: "Poster",
      key: "hinhAnh",
      dataIndex: "hinhAnh",
      render: text => (
        <img
          className='w-20 h-20 object-cover mx-auto rounded-lg'
          alt={text}
          src={imageUrlRegex.test(text) ? text : placeholderImage}
          onError={onImageError}
        />
      ),
    },
    {
      title: "Description",
      key: "moTa",
      dataIndex: "moTa",
      ...getColumnSearchProps("moTa"),
      render: text => <p className='truncate'>{text}</p>,
    },
    {
      title: "Started date",
      key: "ngayKhoiChieu",
      dataIndex: "ngayKhoiChieu",
      ...getColumnSearchProps("ngayKhoiChieu"),
      render: text => <p>{moment(text).format("DD-MM-YYYY")}</p>,
    },
    {
      title: "Rating",
      key: "danhGia",
      dataIndex: "danhGia",
      ...getColumnSearchProps("danhGia"),
      render: text => <p>{text} / 10</p>,
    },
    {
      title: "Action",
      key: "action",
      render: item => (
        <Space size='middle'>
          <ConfigProvider button={{ className: "bg-blue-500" }}>
            <ModalForm
              submitter={{
                // Configure the button text
                searchConfig: {
                  resetText: "Reset",
                  submitText: "Submit",
                },
                // Configure the properties of the button
                resetButtonProps: {
                  style: {
                    // Hide the reset button
                    display: "none",
                  },
                },
                submitButtonProps: {},
              }}
              title='Edit account'
              trigger={
                <Button type='primary' onClick={() => form.setFieldsValue({ ...item })}>
                  Edit
                </Button>
              }
              form={form}
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
                onCancel: () => {},
              }}
              submitTimeout={2000}
              onFinish={async values => {
                await waitTime(2000);
                https
                  .put(`${BASE_URL}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, {
                    ...values,
                    maNhom: MA_NHOM,
                  })
                  .then(() => {
                    message.success(`Edit account ${values.taiKhoan} successfully!`);
                    fetchListUser();
                  })
                  .catch(err => {
                    message.error(err.response.data);
                  });
                return true;
              }}
            >
              <ProForm.Group>
                <ProFormText
                  width='md'
                  name='taiKhoan'
                  label='Username'
                  tooltip='What do you want others to call this user?'
                  placeholder=''
                  disabled={true}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input nickname!",
                  //     whitespace: true,
                  //   },
                  //   {
                  //     min: 5,
                  //     message: "At least 5 characters",
                  //   },
                  //   {
                  //     pattern: new RegExp(/^[a-zA-Z0-9_]{3,20}$/),
                  //     message: "Invalid user name format!",
                  //   },
                  // ]}
                />
                <ProFormText
                  width='md'
                  name='email'
                  label='Email'
                  placeholder='example@gmail.com'
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input E-mail!",
                    },
                  ]}
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText
                  width='md'
                  name='hoTen'
                  label='Full name'
                  placeholder='John Doe'
                  rules={[
                    {
                      required: true,
                      message: "Please input full name!",
                    },
                    {
                      pattern: new RegExp(/^[\p{L}\s'-]+$/u),
                      message: "Invalid full name format!",
                    },
                  ]}
                />
                <ProFormText
                  width='md'
                  name='soDt'
                  label='Phone number'
                  placeholder='0903123123'
                  rules={[
                    {
                      pattern: new RegExp(/^0(?!0)\d{9}$/g),
                      message: "Wrong phone number format!",
                    },
                    {
                      required: true,
                      message: "Please input phone number!",
                    },
                  ]}
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText.Password
                  width='md'
                  name='matKhau'
                  type='password'
                  label='Password'
                  placeholder='Enter password...'
                  rules={[
                    {
                      required: true,
                      message: "Please input password!",
                    },
                    {
                      min: 6,
                      message: "At least 6 characters",
                    },
                  ]}
                />
                <ProFormSelect
                  request={async () => [
                    {
                      value: "QuanTri",
                      label: "Admin",
                    },
                    {
                      value: "KhachHang",
                      label: "Customer",
                    },
                  ]}
                  width='md'
                  name='maLoaiNguoiDung'
                  label='Account type'
                  placeholder='Select account type'
                  rules={[
                    {
                      required: true,
                      message: "Please choose account type",
                    },
                  ]}
                />
              </ProForm.Group>
            </ModalForm>
          </ConfigProvider>
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
    <>
      <ModalVideo
        channel='youtube'
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={chosenTrailer !== ""}
        videoId={chosenTrailer}
        onClose={() => {
          const action = {
            type: CHOOSE_TRAILER,
            payload: "",
          };
          dispatch(action);
        }}
      />
      <Table
        scroll={{
          y: 390,
          x: 1200,
        }}
        dataSource={listUser}
        columns={columnsHeader}
      />
    </>
  );
}
