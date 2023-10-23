// import { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import { Button, Form, Input, Select, Space, message } from "antd";
import { SET_INFO } from "../../redux/constant/user";
import { userLocalStorage } from "../../api/localService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { layUserInfo, putUserInfo } from "../../api/api";
import { MA_NHOM } from "../../api/config";

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
      Update
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
          ...res.data[0],
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);
  const { Option } = Select;
  const [form] = Form.useForm();
  const onAccountTypeChange = value => {
    switch (value) {
      case "KhachHang":
        form.setFieldsValue({
          maLoaiNguoiDung: "KhachHang",
        });
        break;
      case "QuanTri":
        form.setFieldsValue({
          maLoaiNguoiDung: "QuanTri",
        });
        break;
      default:
        form.setFieldsValue({
          maLoaiNguoiDung: "KhachHang",
        });
    }
  };
  const onFinishFailed = errorInfo => {
    console.error("Failed:", errorInfo);
    message.error("Error!");
  };
  const dispatch = useDispatch();
  const onFinish = values => {
    putUserInfo({ ...values, maNhom: MA_NHOM }, info.accessToken)
      .then(res => {
        message.success("Update success!");
        userLocalStorage.set({ ...res.data, accessToken: info.accessToken });
        dispatch({ type: SET_INFO, payload: { ...res.data, accessToken: info.accessToken } });
      })
      .catch(err => {
        console.error(err);
      });
  };
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className='flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative'>
        <div className='fixed min-w-full z-50'>
          <Header />
        </div>
        <div className='flex flex-1 justify-center items-center mt-16 mb-2'>
          {loading ? (
            <p className='text-white text-center'>Loading...</p>
          ) : (
            <div className='p-3 m-2 bg-white rounded-lg w-2/3 md:w-1/3'>
              <div className='mb-3 border-b-2 pb-3'>
                <h1 className='font-bold text-xl'>User Info</h1>
                <p>Info can be changed</p>
              </div>
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
                    name='soDt'
                    label='Phone number'
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
                </div>
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
                  className={`${info.maLoaiNguoiDung === "KhachHang" && "hidden"}`}
                  name='maLoaiNguoiDung'
                  label='Account type'
                  rules={[
                    {
                      required: true,
                      message: "Please choose account type",
                    },
                  ]}
                >
                  <Select disabled={info.maLoaiNguoiDung === "KhachHang"} placeholder='Select account type' onChange={onAccountTypeChange}>
                    <Option value='KhachHang'>Customer</Option>
                    <Option value='QuanTri'>Administrator</Option>
                  </Select>
                </Form.Item>
                <Form.Item className='flex justify-center'>
                  <Space>
                    <SubmitButton form={form} />
                  </Space>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
