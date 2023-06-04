import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://bistro-boss-server-swart.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="my-16">
      <SectionTitle
        heading="TESTIMONIALS"
        subHeading="What Our Clients Say"
      ></SectionTitle>
      <div className="mt-11">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.length > 0 &&
            reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="flex flex-col justify-center items-center text-center px-8 md:px-16 space-y-4">
                  <Rating
                    style={{ maxWidth: 150 }}
                    value={review.rating}
                    readOnly
                  />
                  <FaQuoteLeft className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"></FaQuoteLeft>
                  <p>{review.details}</p>
                  <h3 className="text-yellow-500 uppercase font-medium text-3xl">
                    {review.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
