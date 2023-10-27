import { PlayCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { chooseTrailer } from "../redux/action/user";
import { trailerUrlRegex } from "../constants/regex";

export default function PlayVideo({ isCard, trailer = "https://www.youtube.com/watch?v=kvAfmYNtugQ" }) {
  const dispatch = useDispatch();
  const handleChooseTrailer = trailer => {
    const url = new URL(trailer);
    const videoId = url.searchParams.get("v");
    dispatch(chooseTrailer(videoId));
  };
  return (
    <div
      className={`absolute hidden group-hover:block duration-300 ${
        isCard ? `top-1/4` : `top-1/2`
      } text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-40`}
      onClick={() => handleChooseTrailer(trailerUrlRegex.test(trailer) ? trailer : "https://www.youtube.com/watch?v=kvAfmYNtugQ")}
    >
      <PlayCircle size={52} />
    </div>
  );
}
