import Form from "./Form";
import Header from "../../component/Header/Header";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className='flex flex-col min-h-screen bg-movie-background bg-center bg-cover bg-no-repeat bg-fixed relative'>
        <Header />
        <div className='flex flex-1 justify-center items-center'>
          <div className='p-3 m-2 bg-white rounded-lg w-2/3 md:w-1/3'>
            <h1 className='mb-3 font-bold text-2xl text-center'>Login</h1>
            <Form />
            <p className='text-right text-red-500'>
              {"Don't have account? "}
              <Link to='/register' className='font-bold text-red-500 hover:text-red-400 duration-300'>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// form antd
