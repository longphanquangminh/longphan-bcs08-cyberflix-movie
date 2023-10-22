import { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import { Button, Form, Input, Space, message } from "antd";
import axios from "axios";
import { BASE_URL, configHeaders } from "../../api/config";
import { SET_INFO } from "../../redux/constant/user";
import { userLocalStorage } from "../../api/localService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        },
      );
  }, [values, form]);
  return (
    <Button type='primary' className='bg-blue-500' htmlType='submit' disabled={!submittable}>
      Submit
    </Button>
  );
};

export default function Register() {
  //   return <div className='bg-movie-background h-screen bg-center bg-cover bg-no-repeat bg-fixed relative'></div>;
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.error("Failed:", errorInfo);
    message("Error!");
  };
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = values => {
    axios
      .post(
        `${BASE_URL}/QuanLyNguoiDung/DangKy`,
        { ...values, maNhom: "GP01", maLoaiNguoiDung: "KhachHang" },
        {
          headers: configHeaders(),
        },
      )
      .then(res => {
        // đầy res lên redux sau khi Register thành công
        let action = {
          type: SET_INFO,
          payload: res.data,
        };
        dispatch(action);
        // đẩy data xuống localStorage
        userLocalStorage.set(res.data);
        // useNavigate
        message.success("Register success!");
        // chuyển hướng về trang home
        navigate("/");
      })
      .catch(err => {
        message.error(err.response.data);
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
                name='confirm'
                label='Confirm Password'
                dependencies={["matKhau"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("matKhau") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The new password that you entered do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item className='flex justify-center'>
                <Space>
                  <SubmitButton form={form} />
                  <Button htmlType='reset'>Reset</Button>
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
