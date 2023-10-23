import { useSelector } from "react-redux";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { ClipLoader } from "react-spinners";

export default function Spinner() {
  const { isLoading } = useSelector(state => state.spinnerReducer);
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <RemoveScrollBar />
      <ClipLoader size={150} color='#36d7b7' speedMultiplier={3} />
    </div>
  ) : (
    <></>
  );
}

// react spinners npm
