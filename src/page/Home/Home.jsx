// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Header from "../../component/Header/Header";
import ModalVideo from "react-modal-video";
import ListMovie from "./ListMovie/ListMovie";
import Slider from "./Slider/Slider";
import TabMovie from "./TabMovie/TabMovie";
import { useDispatch, useSelector } from "react-redux";
import { CHOOSE_TRAILER } from "../../redux/constant/user";

export default function Home() {
  // let navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/login");
  // }, []);
  let { chosenTrailer } = useSelector(state => {
    return state.userReducer;
  });
  const dispatch = useDispatch();
  return (
    <>
      <ModalVideo
        channel='youtube'
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={chosenTrailer !== ""}
        videoId={chosenTrailer}
        onClose={() => {
          let action = {
            type: CHOOSE_TRAILER,
            payload: "",
          };
          dispatch(action);
        }}
      />
      <div className='space-y-10'>
        <Slider />
        <ListMovie></ListMovie>
        <TabMovie />
      </div>
    </>
  );
}
