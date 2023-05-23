import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <div className="my-16">
      <SectionTitle
        heading="ORDER ONLINE"
        subHeading="From 11:00am to 10:00pm"
      ></SectionTitle>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mt-11"
      >
        <SwiperSlide className="relative">
          <img src={slide1} alt="" />
          <h3 className="absolute bottom-5 md:bottom-10 inset-x-0 text-xs md:text-3xl text-center text-white uppercase">
            Salad
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h3 className="absolute bottom-5 md:bottom-10 inset-x-0 text-xs md:text-3xl text-center text-white uppercase">
            Pizzas
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h3 className="absolute bottom-5 md:bottom-10 inset-x-0 text-xs md:text-3xl text-center text-white uppercase">
            Soups
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <h3 className="absolute bottom-5 md:bottom-10 inset-x-0 text-xs md:text-3xl text-center text-white uppercase">
            Desserts
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <h3 className="absolute bottom-5 md:bottom-10 inset-x-0 text-xs md:text-3xl text-center text-white uppercase">
            Salad
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h3 className="absolute bottom-5 md:bottom-10 inset-x-0 text-xs md:text-3xl text-center text-white uppercase">
            Pizzas
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h3 className="absolute bottom-5 md:bottom-10 inset-x-0 text-xs md:text-3xl text-center text-white uppercase">
            Soups
          </h3>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;
