// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import s1 from "../assets/images/s1.jpg";
import s2 from "../assets/images/s2.jpg";
import s3 from "../assets/images/s3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import logo1 from "../assets/images/foodie-logo-zip-file/png/logo-black.png";
import logo2 from "../assets/images/foodie-logo-zip-file/png/logo-white.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MySwiper({ width, height }) {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      className={`w-${width} h-${height}`}
    >
      <SwiperSlide className="  ">
        <div className="flex  ">
          <img src={logo1} alt="" className="  object-fill h-600px w-full  rounded-xl  shadow-inner  shadow-black " />
          <img src={s1} alt="" className="  object-fill h-700px w-full rounded-xl" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex">
          <img src={s2} alt="" className="  object-fill h-700px w-full" />
          <img src={logo2} alt="" className="  object-fill h-600px w-full" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex">
          <img src={s3} alt="" className="  object-fill h-700px w-full" />
          <img src={logo2} alt="" className="  object-fill h-600px w-full" />
        </div>
      </SwiperSlide>
      ...
    </Swiper>
  );
}
