import { Button, Form, Input, message, Space } from "antd";
import axios from "axios";
import { BASE_URL, configHeaders } from "../../api/config";
import { useDispatch } from "react-redux";
import { SET_INFO } from "../../redux/constant/user";
import { useNavigate } from "react-router-dom";
import { userLocalStorage } from "../../api/localService";
// import { loginAction } from "../../redux/action/user";
import { useEffect, useState } from "react";

// lotties
const onFinishFailed = errorInfo => {
  console.error("Failed:", errorInfo);
};

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

export default function FormLogin() {
  const [form] = Form.useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish2 = values => {
    axios
      .post(`${BASE_URL}/QuanLyNguoiDung/DangNhap`, values, {
        headers: configHeaders(),
      })
      .then(res => {
        message.success("Login success!");
        // đầy res lên redux sau khi login thành công
        let action = {
          type: SET_INFO,
          payload: res.data,
        };
        dispatch(action);
        // đẩy data xuống localStorage
        userLocalStorage.set(res.data);
        // useNavigate
        // chuyển hướng về trang home
        navigate("/");
      })
      .catch(err => {
        message.error("Login fail!");
        console.error(err);
      });
  };
  // const onFinish = values => {
  //   dispatch(loginAction(values));
  // };
  return (
    <Form form={form} layout='vertical' onFinish={onFinish2} onFinishFailed={onFinishFailed} autoComplete='off'>
      <Form.Item
        label='Username'
        name='taiKhoan'
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='matKhau'
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
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
  );
}
