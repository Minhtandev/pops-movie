import { Navigation, Pagination } from "swiper";
import { Swiper } from "swiper/react";
import "./navigation-swiper.scss";
const NavigationSwiper = ({ children }) => {
  return (
    <div className="navigation-swiper">
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "max-content" }}>
        {children}
      </Swiper>
    </div>
  );
};

export default NavigationSwiper;
