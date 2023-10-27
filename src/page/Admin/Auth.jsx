import { useEffect, useState } from "react";
import { Button, Form, Input, Space, message } from "antd";
import axios from "axios";
import { BASE_URL, configHeaders } from "../../api/config";
import { useNavigate, Link } from "react-router-dom";
import { SET_INFO_ADMIN } from "../../redux/constant/admin";
import { useDispatch, useSelector } from "react-redux";
import { adminLocalStorage } from "../../api/localService";

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

export default function Auth() {
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    message.error("Error!");
    console.error("Failed:", errorInfo);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = values => {
    axios
      .post(
        `${BASE_URL}/QuanLyNguoiDung/DangNhap`,
        { ...values },
        {
          headers: configHeaders(),
        },
      )
      .then(res => {
        message.success("Admin login success!");
        const action = {
          type: SET_INFO_ADMIN,
          payload: res.data,
        };
        dispatch(action);
        adminLocalStorage.set(res.data);
        navigate("/admin/user");
      })
      .catch(err => {
        message.error(err.response.data);
      });
  };
  const { info } = useSelector(state => {
    return state.adminReducer;
  });
  useEffect(() => {
    if (info?.maLoaiNguoiDung === "QuanTri") {
      message.warning("You've already logged in!");
      navigate("/admin/user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative'>
        <div className='flex flex-1 justify-center items-center'>
          <div className='p-3 m-2 bg-white rounded-lg w-2/3 md:w-1/3'>
            <h1 className='mb-3 font-bold text-2xl text-center'>Login as admin</h1>
            <Form form={form} layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
              <Form.Item
                name='taiKhoan'
                label='Username'
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
              <Form.Item className='flex justify-center'>
                <Space>
                  <SubmitButton form={form} />
                  <Button htmlType='reset'>Reset</Button>
                </Space>
              </Form.Item>
            </Form>
            <div className='space-y-3'>
              <p className='text-center text-red-500'>
                <Link to='/login' className='font-bold text-red-500 hover:text-red-400 duration-300'>
                  Login as customer
                </Link>
              </p>
              <p className='text-center text-red-500'>
                <Link to='/' className='font-bold text-red-500 hover:text-red-400 duration-300'>
                  Back to homepage
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
