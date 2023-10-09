import Banner from "./Banner";
import Form from "./Form";

export default function Login() {
  return (
    <div className='h-screen bg-orange-600 flex items-center'>
      <div className='container flex items-center bg-white rounded-xl p-10'>
        <Form />
        <Banner />
      </div>
    </div>
  );
}

// form antd
