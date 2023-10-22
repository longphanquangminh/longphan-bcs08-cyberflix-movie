// import { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import { Button, Form, Input, Select, Space, message } from "antd";
import { SET_INFO } from "../../redux/constant/user";
import { userLocalStorage } from "../../api/localService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { layUserInfo, putUserInfo } from "../../api/api";

const SubmitButton = () => {
  // const SubmitButton = ({ form }) => {
  //   const [submittable, setSubmittable] = useState(false);

  //   // Watch all values
  //   const values = Form.useWatch([], form);
  //   useEffect(() => {
  //     form
  //       .validateFields({
  //         validateOnly: true,
  //       })
  //       .then(
  //         () => {
  //           setSubmittable(true);
  //         },
  //         () => {
  //           setSubmittable(false);
  //         },
  //       );
  //   }, [values, form]);
  return (
    // <Button type='primary' className='bg-blue-500' htmlType='submit' disabled={!submittable}>
    //   Submit
    // </Button>
    <Button type='primary' className='bg-blue-500' htmlType='submit'>
      Submit
    </Button>
  );
};

export default function Account() {
  //   return <div className='bg-movie-background h-screen bg-center bg-cover bg-no-repeat bg-fixed relative'></div>;
  const { info } = useSelector(state => {
    return state.userReducer;
  });
  useEffect(() => {
    layUserInfo(info.taiKhoan)
      .then(res => {
        console.log(res);
        form.setFieldsValue({
          ...res.data,
          loaiNguoiDung: res.data.loaiNguoiDung === null ? "Khách hàng" : res.data.loaiNguoiDung,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [info]);
  const { Option } = Select;
  const [form] = Form.useForm();
  const onAccountTypeChange = value => {
    switch (value) {
      case "Khách hàng":
        form.setFieldsValue({
          loaiNguoiDung: "Khách hàng",
        });
        break;
      case "Quản trị":
        form.setFieldsValue({
          loaiNguoiDung: "Quản trị",
        });
        break;
      default:
        form.setFieldsValue({
          loaiNguoiDung: "Khách hàng",
        });
    }
  };
  const onFinishFailed = errorInfo => {
    console.error("Failed:", errorInfo);
    message.error("Error!");
  };
  let dispatch = useDispatch();
  const onFinish = values => {
    putUserInfo({ ...values, maNhom: "GP01", maLoaiNguoiDung: values.loaiNguoiDung === "Khách hàng" ? "KhachHang" : "QuanTri" }, info.accessToken)
      .then(res => {
        message.success("Update success!");
        console.log(res);
        console.log("values", { ...values, maNhom: "GP09", maLoaiNguoiDung: values.loaiNguoiDung === "Khách hàng" ? "KhachHang" : "QuanTri" });
        const { thongTinDatVe, ...dataToStore } = res.data; // trick để làm thongTinDatVe ko dính Redux...
        userLocalStorage.set({ ...dataToStore, accessToken: info.accessToken });
        dispatch({ type: SET_INFO, payload: { ...dataToStore, accessToken: info.accessToken } });
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <>
      <div className='flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative'>
        <Header />
        <div className='flex flex-1 justify-center items-center'>
          <div className='p-3 m-2 bg-white rounded-lg w-2/3 md:w-1/3'>
            <h1 className='mb-3 font-bold text-2xl text-center'>Register</h1>
            <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                <Form.Item
                  name='email'
                  label='E-mail'
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='taiKhoan'
                  label='Nickname'
                  tooltip='What do you want others to call you?'
                  rules={[
                    {
                      required: true,
                      message: "Please input your nickname!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label='Full name'
                  name='hoTen'
                  rules={[
                    {
                      required: true,
                      message: "Please input your full name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='soDT'
                  label='Phone Number'
                  rules={[
                    {
                      pattern: new RegExp(/^0(?!0)\d{9}$/g),
                      message: "Wrong phone number format!",
                    },
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='matKhau'
                  label='Password'
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name='loaiNguoiDung'
                  label='Account type'
                  rules={[
                    {
                      required: true,
                      message: "Please choose account type",
                    },
                  ]}
                >
                  <Select disabled placeholder='Select account type' onChange={onAccountTypeChange}>
                    <Option value='Khách hàng'>Customer</Option>
                    <Option value='Quản trị'>Administrator</Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item className='flex justify-center'>
                <Space>
                  <SubmitButton form={form} />
                </Space>
              </Form.Item>
            </Form>
            <p className='text-right text-red-500'>
              Have account?{" "}
              <Link to='/login' className='font-bold text-red-500 hover:text-red-400 duration-300'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
