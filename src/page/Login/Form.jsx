import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { BASE_URL, configHeaders } from "../../api/config";
import { useDispatch } from "react-redux";
import { SET_INFO } from "../../redux/constant/user";
import { useNavigate } from "react-router-dom";
import { userLocalStorage } from "../../api/localService";
import { loginAction } from "../../redux/action/user";

// lotties
const onFinishFailed = errorInfo => {
  console.log("Failed:", errorInfo);
};

export default function FormLogin() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish2 = values => {
    console.log("Success:", values);
    axios
      .post(`${BASE_URL}/QuanLyNguoiDung/DangNhap`, values, {
        headers: configHeaders(),
      })
      .then(res => {
        // đầy res lên redux sau khi login thành công
        let action = {
          type: SET_INFO,
          payload: res.data.content,
        };
        dispatch(action);
        // đẩy data xuống localStorage
        userLocalStorage.set(res.data.content);
        // useNavigate
        message.success("Đăng nhập thành công");
        // chuyển hướng về trang home
        navigate("/");
        console.log(res);
      })
      .catch(err => {
        message.error("Đăng nhập thất bại");
        console.log(err);
      });
  };
  const onFinish = values => {
    dispatch(loginAction(values));
  };
  return (
    <Form
      className='w-1/2'
      layout='vertical'
      name='basic'
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
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

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 20,
        }}
      >
        <Button type='primary' className='bg-orange-600' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
