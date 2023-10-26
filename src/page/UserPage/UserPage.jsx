import TableUser from "./TableUser";
import { ModalForm, ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { ConfigProvider, Form, message } from "antd";
import { BASE_URL, MA_NHOM, https } from "../../api/config";

const waitTime = (time = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function UserPage() {
  const [form] = Form.useForm();
  return (
    <>
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
          title='Add account'
          trigger={
            <div className='flex justify-end items-center'>
              <button className='mb-3 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-500 duration-300' onClick={() => {}}>
                Add user
              </button>
            </div>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log("run"),
          }}
          submitTimeout={2000}
          onFinish={async values => {
            await waitTime(2000);
            https
              .post(`${BASE_URL}/QuanLyNguoiDung/ThemNguoiDung`, {
                ...values,
                maNhom: MA_NHOM,
              })
              .then(res => {
                console.log(res);
                message.success("Add account successfully!");
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
              placeholder='account123'
              rules={[
                {
                  required: true,
                  message: "Please input nickname!",
                  whitespace: true,
                },
                {
                  min: 5,
                  message: "At least 5 characters",
                },
              ]}
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
                  pattern: new RegExp(/^[A-Za-z\s'-]+$/g),
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

      <TableUser />
    </>
  );
}
