import enEN from "antd/locale/en_US";
import "./ButtonPrimary.css";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { adminServ } from "../../api/api";
import { Button, Input, Popconfirm, Space, Table, message, ConfigProvider, Form, Select } from "antd";
import { ModalForm, ProForm, ProFormText, ProFormDatePicker, ProFormRate } from "@ant-design/pro-components";
// import { ModalForm, ProForm, ProFormText, ProFormDatePicker, ProFormRate, ProFormSelect } from "@ant-design/pro-components";
import { BASE_URL, MA_NHOM, https, httpsNoLoading } from "../../api/config";
import { defaultTrailer, placeholderImage } from "../../constants/defaultValues";
import { imageUrlRegex, priceRegex, trailerUrlRegex } from "../../constants/regex";
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
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [chonHeThongRap, setChonHeThongRap] = useState(null);
  const [hinhAnh, setHinhAnh] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [chonRap, setChonRap] = useState(null);
  useEffect(() => {
    https
      .get(`${BASE_URL}/QuanLyRap/LayThongTinHeThongRap`)
      .then(res => {
        const newArray = res.data.map(item => ({
          value: item.maHeThongRap,
          label: item.tenHeThongRap.toUpperCase(),
        }));
        setHeThongRap([...newArray]);
      })
      .catch(err => {
        message.error(err.response.data);
      });
  }, []);
  useEffect(() => {
    if (chonHeThongRap !== null) {
      httpsNoLoading
        .get(`${BASE_URL}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${chonHeThongRap}`)
        .then(res => {
          const newArray = res.data.flatMap(item =>
            item.danhSachRap.map(rapItem => ({
              value: rapItem.maRap,
              label: item.tenCumRap + ": " + rapItem.tenRap,
            })),
          );
          setCumRap([...newArray]);
        })
        .catch(err => {
          message.error(err.response.data);
        });
    }
  }, [chonHeThongRap]);
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
  const { listMovie, fetchListMovie } = props;
  const deleteFilm = maPhim => {
    adminServ
      .deleteFilm(maPhim)
      .then(() => {
        message.success("Delete successfully!");
        fetchListMovie();
      })
      .catch(err => {
        message.error(err.response.data ?? err.message);
      });
  };
  const handleDelete = maPhim => deleteFilm(maPhim);
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
    //     return <>{listMovie.indexOf(record) + 1}</>;
    //   },
    // },
    // {
    //   title: "Film code",
    //   dataIndex: "maPhim",
    //   key: "maPhim",
    //   ...getColumnSearchProps("maPhim"),
    // },
    {
      title: "Film name",
      dataIndex: "tenPhim",
      key: "tenPhim",
      ...getColumnSearchProps("tenPhim"),
      render: text => <p className='truncate'>{text}</p>,
    },
    // {
    //   title: "Film alias",
    //   dataIndex: "biDanh",
    //   key: "biDanh",
    //   ...getColumnSearchProps("biDanh"),
    // },
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
          <ConfigProvider button={{ className: "bg-blue-500" }} locale={enEN}>
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
              title={`Edit film ${item.tenPhim} (#${item.maPhim})`}
              trigger={
                <Button
                  type='primary'
                  onClick={() => {
                    form.setFieldsValue({ ...item, danhGia: item.danhGia / 2, ngayKhoiChieu: moment(item.ngayKhoiChieu) });
                    setHinhAnh(item.hinhAnh);
                  }}
                >
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
                  .post(`${BASE_URL}/QuanLyPhim/CapNhatPhim`, {
                    ...values,
                    maNhom: MA_NHOM,
                    maPhim: item.maPhim,
                    danhGia: values.danhGia * 2,
                  })
                  .then(() => {
                    message.success(`Edit film ${values.tenPhim} successfully!`);
                    fetchListMovie();
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
                  name='tenPhim'
                  label='Film name'
                  placeholder='John Wick 2'
                  rules={[
                    {
                      required: true,
                      message: "Please input film name!",
                      whitespace: true,
                    },
                  ]}
                />
                {/* <ProFormText
              width='md'
              name='biDanh'
              label='Film alias'
              placeholder='john-wick-2'
              rules={[
                {
                  required: true,
                  message: "Please input film alias!",
                },
              ]}
            /> */}
                <ProFormText
                  width='md'
                  name='trailer'
                  label='Youtube trailer'
                  placeholder='https://youtube.com/abc'
                  onChange={value => setTrailerUrl(value)}
                  rules={[
                    {
                      required: true,
                      message: "Please input film trailer!",
                    },
                    {
                      pattern: new RegExp(trailerUrlRegex),
                      message: "Invalid Youtube video url format!",
                    },
                  ]}
                />
                <ProFormText
                  width='md'
                  name='hinhAnh'
                  label='Film poster'
                  placeholder='https://domain.com/abc.png'
                  onChange={e => {
                    setHinhAnh(e.target.value);
                    console.log(e.target.value);
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input film poster!",
                    },
                    {
                      pattern: new RegExp(imageUrlRegex),
                      message: "Invalid image url format!",
                    },
                  ]}
                />
                <img
                  className='w-20 h-20 object-cover mx-auto rounded-lg'
                  alt={hinhAnh}
                  src={imageUrlRegex.test(hinhAnh) ? hinhAnh : placeholderImage}
                  onError={onImageError}
                />
                <ProFormText
                  width='md'
                  name='moTa'
                  label='Film description'
                  placeholder='This is a good film...'
                  rules={[
                    {
                      required: true,
                      message: "Please input film description!",
                      whitespace: true,
                    },
                  ]}
                />
                {/* <ProFormText
              width='md'
              name='ngayKhoiChieu'
              label='Started date'
              placeholder='01/01/2025'
              rules={[
                {
                  required: true,
                  message: "Please input started date!",
                },
              ]}
            /> */}
                <ProFormDatePicker
                  width='md'
                  name='ngayKhoiChieu'
                  fieldProps={{
                    format: "DD-MM-YYYY",
                  }}
                  label='Started date'
                  placeholder='Choose date'
                  rules={[
                    {
                      required: true,
                      message: "Please input started date!",
                    },
                  ]}
                />
                {/* <ProFormText
              width='md'
              name='danhGia'
              label='Rating'
              placeholder='10'
              rules={[
                {
                  required: true,
                  message: "Please input rating!",
                },
              ]}
            /> */}
                <ProFormRate
                  width='md'
                  name='danhGia'
                  label='Rating'
                  rules={[
                    {
                      required: true,
                      message: "Please input rating!",
                    },
                  ]}
                  placeholder='10'
                />
              </ProForm.Group>
            </ModalForm>
          </ConfigProvider>
          <Popconfirm
            title={`Sure to delete film ${item.tenPhim}?`}
            okButtonProps={{
              className: "bg-blue-500",
            }}
            onConfirm={() => handleDelete(item.maPhim)}
          >
            <a>Delete</a>
          </Popconfirm>
          <ConfigProvider button={{ className: "bg-blue-500" }} locale={enEN}>
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
              title={`Create showtime for film ${item.tenPhim} (#${item.maPhim})`}
              trigger={
                <a
                  onClick={() => {
                    form.setFieldsValue({ ...item });
                  }}
                >
                  Time
                </a>
              }
              form={form}
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
                onCancel: () => {
                  setChonHeThongRap(null);
                  setChonRap(null);
                },
              }}
              submitTimeout={2000}
              onFinish={async values => {
                await waitTime(2000);
                httpsNoLoading
                  .post(`${BASE_URL}/QuanLyDatVe/TaoLichChieu`, {
                    ...values,
                    maNhom: MA_NHOM,
                    maPhim: item.maPhim,
                    maRap: chonRap,
                  })
                  .then(() => {
                    message.success(`Create showtime for film ${item.tenPhim} successfully!`);
                  })
                  .catch(err => {
                    message.error(err.response.data);
                  });
                return true;
              }}
            >
              <ProForm.Group>
                <ProFormDatePicker
                  width='md'
                  name='ngayChieuGioChieu'
                  fieldProps={{
                    format: "DD/MM/YYYY hh:mm:ss",
                  }}
                  label='Showtime'
                  placeholder='Choose showtime'
                  rules={[
                    {
                      required: true,
                      message: "Please input showtime!",
                    },
                  ]}
                />
                <ProFormText
                  width='md'
                  name='giaVe'
                  label='Price'
                  placeholder='200.000'
                  rules={[
                    {
                      required: true,
                      message: "Please input price!",
                    },
                    {
                      pattern: new RegExp(priceRegex),
                      message: "Price must be from 75.000 to 200.000 VNĐ",
                    },
                  ]}
                />
                {/* <ProFormSelect
                  request={async () => heThongRap}
                  onChange={value => setChonHeThongRap(value)}
                  name='heThongRap'
                  label='Cinema system'
                  placeholder='Select cinema system'
                  rules={[
                    {
                      required: true,
                      message: "Please choose cinema system",
                    },
                  ]}
                /> */}
              </ProForm.Group>
              <Form.Item
                name='heThongRap'
                label='Cinema system'
                rules={[
                  {
                    required: true,
                    message: "Please choose theater of the cinema",
                  },
                ]}
              >
                <Select options={heThongRap} onChange={value => setChonHeThongRap(value)} placeholder='Select cinema system' />
              </Form.Item>
              <Form.Item
                name='cumRap'
                label='Theater of the cinema'
                rules={[
                  {
                    required: true,
                    message: "Please choose theater of the cinema",
                  },
                ]}
              >
                <Select
                  disabled={chonHeThongRap === null}
                  options={cumRap}
                  onChange={value => setChonRap(value)}
                  placeholder='Select theater of the cinema'
                />
              </Form.Item>
            </ModalForm>
          </ConfigProvider>
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
        dataSource={listMovie}
        columns={columnsHeader}
      />
    </>
  );
}
