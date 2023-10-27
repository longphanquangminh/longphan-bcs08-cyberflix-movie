import { useSelector } from "react-redux";

export default function Dashboard() {
  const { info } = useSelector(state => state.adminReducer);
  return <p className='text-center'>Welcome {info.hoTen} to dashboard!</p>;
}
