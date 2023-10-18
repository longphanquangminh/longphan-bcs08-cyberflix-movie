export default function Footer() {
  const logos = [
    "https://movie-booking-project.vercel.app/img/logo-connect/cgv.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/bhd.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/galaxycine.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/cinestar.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/lotte.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/megags.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/bt.jpg",
    "https://movie-booking-project.vercel.app/img/logo-connect/dongdacinema.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/TOUCH.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/cnx.jpg",
    "https://movie-booking-project.vercel.app/img/logo-connect/STARLIGHT.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/dcine.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/zalopay_icon.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/payoo.jpg",
    "https://media.discordapp.net/attachments/1026660684739653674/1164127433969111080/download.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/AGRIBANK.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/VIETTINBANK.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/IVB.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/123go.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/laban.png",
  ];
  const mobileApps = [
    {
      img: "https://movie-booking-project.vercel.app/img/mobile-system/apple-logo.png",
      url: "https://apps.apple.com/vn/app/movie-booking/id644319307",
    },
    {
      img: "https://movie-booking-project.vercel.app/img/mobile-system/android-logo.png",
      url: "https://play.google.com/store/apps/details?id=com.movie.booking",
    },
  ];
  const socialMedia = [
    {
      img: "https://movie-booking-project.vercel.app/img/media/facebook-logo.png",
      url: "https://cgv.vn",
    },
    {
      img: "https://movie-booking-project.vercel.app/img/media/zalo-logo.png",
      url: "https://cgv.vn",
    },
  ];
  return (
    <div className='mt-9 bg-[#212121] text-white'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-6'>
          <div className='space-y-3'>
            <h1 className='uppercase'>TIX</h1>
            <ul className='grid grid-cols-1 md:grid-cols-2'>
              <li className='cursor-pointer text-gray-500 hover:text-gray-300 duration-300'>FAQ</li>
              <li className='cursor-pointer text-gray-500 hover:text-gray-300 duration-300'>Terms of use</li>
              <li className='cursor-pointer text-gray-500 hover:text-gray-300 duration-300'>Brand Guidelines</li>
              <li className='cursor-pointer text-gray-500 hover:text-gray-300 duration-300'>Privacy Policy</li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h1 className='uppercase'>Partners</h1>
            <ul className='grid grid-cols-4 gap-3'>
              {logos.map((item, index) => (
                <li className='grayscale hover:grayscale-0 duration-300' key={index}>
                  <a href='https://www.cgv.vn' target='blank'>
                    <img className='w-10 h-10' src={item} alt={item} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='space-y-3'>
            <h1 className='uppercase'>MOBILE APPS</h1>
            <ul className='grid grid-cols-4 gap-3'>
              {mobileApps.map((item, index) => (
                <li key={index}>
                  <a href={item.url} target='blank'>
                    <img className='w-10 h-10' src={item.img} alt={item.img} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='space-y-3'>
            <h1 className='uppercase'>SOCIAL</h1>
            <ul className='grid grid-cols-4 gap-3'>
              {socialMedia.map((item, index) => (
                <li key={index}>
                  <a href={item.url} target='blank'>
                    <img className='w-10 h-10' src={item.img} alt={item.img} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='w-full h-px bg-white'></div>
        <div className='py-6 grid lg:flex flex-row'>
          <div className='basis-1/4'>
            <img src='https://movie-booking-project.vercel.app/img/logo-connect/zion-logo.jpg' alt='' className='rounded-lg w-24' />
          </div>
          <div className='basis-2/4'>2</div>
          <div className='basis-1/4'>3</div>
        </div>
      </div>
    </div>
  );
}
