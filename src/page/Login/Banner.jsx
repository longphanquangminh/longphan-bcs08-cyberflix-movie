import Lottie from "lottie-react";
import bgAnimate from "./animation_lmvj8uw3.json";

export default function Banner() {
  return (
    <div className='w-1/2'>
      <Lottie animationData={bgAnimate} loop={false} />
    </div>
  );
}
