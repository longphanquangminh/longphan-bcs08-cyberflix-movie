import { PlayCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { chooseTrailer } from "../redux/action/user";
import { trailerUrlRegex, trailerYoutube } from "../constants/regex";
import { defaultTrailer } from "../constants/defaultValues";

export default function PlayVideo({ isCard, trailer = defaultTrailer }) {
  const dispatch = useDispatch();
  const handleChooseTrailer = trailer => {
    let videoId = "";
    if (trailerYoutube.test(trailer)) {
      const parts = trailer.split("/");
      videoId = parts[parts.length - 1];
    } else {
      const url = new URL(trailer);
      videoId = url.searchParams.get("v");
    }
    dispatch(chooseTrailer(videoId));
  };
  return (
    <div
      className={`absolute hidden group-hover:block duration-300 ${
        isCard ? `top-1/4` : `top-1/2`
      } text-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer mx-auto z-40`}
      onClick={() => handleChooseTrailer(trailerUrlRegex.test(trailer) ? trailer : defaultTrailer)}
    >
      <PlayCircle size={52} />
    </div>
  );
}
