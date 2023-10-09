// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Header from "../../component/Header/Header";
import ListMovie from "./ListMovie/ListMovie";
import Slider from "./Slider/Slider";
import TabMovie from "./TabMovie/TabMovie";

export default function Home() {
  // let navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/login");
  // }, []);
  return (
    <div className='space-y-10'>
      <Slider />
      <ListMovie></ListMovie>
      <TabMovie />
    </div>
  );
}
