import enEN from "antd/locale/en_US";
import { ModalForm, ProForm, ProFormDatePicker, ProFormRate, ProFormText } from "@ant-design/pro-components";
import { ConfigProvider, Form, message } from "antd";
import { BASE_URL, MA_NHOM, https } from "../../api/config";
import { useState, useEffect } from "react";
import { getListMovie } from "../../api/api";
import TableFilm from "./TableFilm";
import { imageUrlRegex, trailerUrlRegex } from "../../constants/regex";

const waitTime = (time = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function MoviePage() {
  const [form] = Form.useForm();
  const [listMovie, setListMovie] = useState([]);
  const fetchListMovie = () => {
    getListMovie()
      .then(res => {
        setListMovie(res.data);
      })
      .catch(err => {
        message.error(err.response.data);
      });
  };
  useEffect(() => {
    fetchListMovie();
  }, []);
  return (
    <>
      <ConfigProvider locale={enEN} button={{ className: "bg-blue-500" }}>
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
          title='Add film'
          trigger={
            <button className='mb-3 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-500 duration-300' onClick={() => {}}>
              Add film
            </button>
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
              .post(`${BASE_URL}/QuanLyPhim/ThemPhim`, {
                ...values,
                maNhom: MA_NHOM,
                danhGia: values.danhGia * 2,
              })
              .then(() => {
                message.success("Add film successfully!");
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
              onChange={value => {
                console.log(value);
              }}
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
      <TableFilm listMovie={listMovie} fetchListMovie={fetchListMovie} />
    </>
  );
}
